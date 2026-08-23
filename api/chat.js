// ============================================================
//  Vercel Serverless Function: POST /api/chat
//  Flow: Embed query (Jina) → Vector search (Supabase) → LLM (Groq)
// ============================================================

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL         = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const JINA_API_KEY         = process.env.JINA_API_KEY;
const GROQ_API_KEY         = process.env.GROQ_API_KEY;

// ── 1. Embed a query string using Jina AI ──────────────────────────────────
async function embedQuery(text) {
  console.log('   [API] 🔤 Calling Jina AI Embeddings API (model: jina-embeddings-v3)...');
  const res = await fetch('https://api.jina.ai/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${JINA_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'jina-embeddings-v3',
      task: 'retrieval.query',
      input: [text],
      dimensions: 1024,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Jina embed failed: ${err}`);
  }
  const data = await res.json();
  const embedding = data.data[0].embedding; // float[]
  console.log(`   [API] ✅ Vector generated! (${embedding.length} float dimensions)`);
  return embedding;
}

// ── 2. Retrieve top-k relevant resume chunks from Supabase ─────────────────
async function retrieveChunks(embedding, matchCount = 4) {
  console.log('   [API] 🔍 Querying Supabase pgvector RPC function "match_resume_chunks"...');
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  const { data, error } = await supabase.rpc('match_resume_chunks', {
    query_embedding: embedding,
    match_count: matchCount,
  });
  if (error) throw new Error(`Supabase RPC error: ${error.message}`);
  console.log(`   [API] ✅ Found ${data ? data.length : 0} matching document chunks in Supabase vector database.`);
  return data; // [{ section, content, similarity }]
}

// ── 3. Call Groq LLM with retrieved context ────────────────────────────────
async function callGroq(systemPrompt, messages) {
  console.log('   [API] 🚀 Calling Groq API (model: meta-llama/llama-4-scout-17b-16e-instruct)...');
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map(m => ({ role: m.role, content: m.content })),
      ],
      max_tokens: 512,
      temperature: 0.7,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Groq HTTP ${res.status}`);
  }
  const data = await res.json();
  console.log('   [API] ✅ LLM response received from Groq!');
  return data.choices?.[0]?.message?.content ?? "I couldn't generate a response.";
}

// ── Main handler ───────────────────────────────────────────────────────────
export default async function handler(req, res) {
  // CORS headers (needed for local dev)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array is required' });
    }

    // Get the latest user message for embedding
    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
    if (!lastUserMsg) return res.status(400).json({ error: 'No user message found' });

    console.log('\n=================== 🤖 AI CHATBOT RAG PIPELINE STARTED ===================');
    console.log('1. 📥 User Question Received:', `"${lastUserMsg.content}"`);

    // Step 1: Embed the query
    console.log('\n2. 🔤 Step 1: Text-to-Embedding (Vectorization)');
    const queryEmbedding = await embedQuery(lastUserMsg.content);

    // Step 2: Retrieve relevant chunks
    console.log('\n3. 🔍 Step 2: Database Retrieval (Vector Search in Supabase)');
    const chunks = await retrieveChunks(queryEmbedding, 4);

    if (chunks && chunks.length > 0) {
      chunks.forEach((c, idx) => {
        console.log(`      📄 Chunk #${idx + 1} | Section: [${c.section}] | Similarity: ${(c.similarity * 100).toFixed(1)}%`);
        console.log(`         Content: "${c.content.substring(0, 100).replace(/\n/g, ' ')}..."`);
      });
    }

    // Step 3: Build context from retrieved chunks
    const context = chunks && chunks.length > 0
      ? chunks.map(c => `[${c.section.toUpperCase()}]\n${c.content}`).join('\n\n---\n\n')
      : 'No specific information found. Answer based on general knowledge about the portfolio.';

    // Step 4: Build system prompt with retrieved context only
    console.log('\n4. 🧠 Step 3: Prompt Augmentation (Injecting DB Context into LLM)');
    const systemPrompt = `You are a highly professional AI assistant embedded in Sumanth Reddy Kasireddy's developer portfolio website.
Your role is to assist visitors, recruiters, and collaborators in learning about Sumanth's skills, projects, background, and availability.

RULES:
- Maintain a polite, formal, and helpful tone. No slang or emojis.
- Speak in third person when referring to Sumanth (e.g., "Sumanth developed this...", "His primary focus is...").
- Be direct, honest, and specific. Never fabricate certifications, internships, or scores.
- Only answer questions related to Sumanth's professional background and portfolio.
- When mentioning or describing Sumanth's projects, ALWAYS provide the direct clickable live links:
  • Plantio: [Plantio](https://plantio-plants.vercel.app)
  • Personal Portfolio: [Portfolio](https://sumanthreddykasireddy.vercel.app)
- Note: Sumanth's featured projects are Plantio and his 3D Interactive Portfolio. Do NOT mention Velvet Pour or Cocktail landing page.
- For contact/profiles, share: LinkedIn: https://www.linkedin.com/in/sumanthreddykasireddy/ | GitHub: https://github.com/Sumanthreddy4620

RELEVANT CONTEXT (retrieved from knowledge base):
${context}

Answer the visitor's question using ONLY the information provided above. If the context doesn't contain the answer, say so honestly.`;

    // Step 5: Call Groq
    console.log('\n5. 🚀 Step 4: LLM Generation (Groq Llama-4 Scout 17B)');
    const reply = await callGroq(systemPrompt, messages.filter(m => m.role !== 'system'));

    console.log('\n6. 💬 Generated Response Snippet:', `"${reply.substring(0, 100).replace(/\n/g, ' ')}..."`);
    console.log('=================== 🏁 AI CHATBOT RAG PIPELINE COMPLETED ===================\n');

    return res.status(200).json({
      reply,
      debugInfo: {
        userQuery: lastUserMsg.content,
        embeddingDimensions: queryEmbedding.length,
        embeddingSnippet: queryEmbedding.slice(0, 5),
        retrievedChunksCount: chunks?.length || 0,
        retrievedChunks: chunks?.map(c => ({
          section: c.section,
          similarity: `${(c.similarity * 100).toFixed(1)}%`,
          contentSnippet: c.content.substring(0, 120) + '...'
        }))
      }
    });

  } catch (err) {
    console.error('[/api/chat] ❌ Error in Chatbot Pipeline:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}

