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
  return data.data[0].embedding; // float[]
}

// ── 2. Retrieve top-k relevant resume chunks from Supabase ─────────────────
async function retrieveChunks(embedding, matchCount = 4) {
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  const { data, error } = await supabase.rpc('match_resume_chunks', {
    query_embedding: embedding,
    match_count: matchCount,
  });
  if (error) throw new Error(`Supabase RPC error: ${error.message}`);
  return data; // [{ section, content, similarity }]
}

// ── 3. Call Groq LLM with retrieved context ────────────────────────────────
async function callGroq(systemPrompt, messages) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
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

    // Step 1: Embed the query
    const queryEmbedding = await embedQuery(lastUserMsg.content);

    // Step 2: Retrieve relevant chunks
    const chunks = await retrieveChunks(queryEmbedding, 4);

    // Step 3: Build context from retrieved chunks
    const context = chunks.length > 0
      ? chunks.map(c => `[${c.section.toUpperCase()}]\n${c.content}`).join('\n\n---\n\n')
      : 'No specific information found. Answer based on general knowledge about the portfolio.';

    // Step 4: Build system prompt with retrieved context only
    const systemPrompt = `You are a highly professional AI assistant embedded in Sumanth Reddy Kasireddy's developer portfolio website.
Your role is to assist visitors, recruiters, and collaborators in learning about Sumanth's skills, projects, background, and availability.

RULES:
- Maintain a polite, formal, and helpful tone. No slang or emojis.
- Speak in third person when referring to Sumanth (e.g., "Sumanth developed this...", "His primary focus is...").
- Be direct, honest, and specific. Never fabricate certifications, internships, or scores.
- Only answer questions related to Sumanth's professional background and portfolio.
- If asked off-topic questions, politely decline and redirect to Sumanth's profile.
- For contact/profiles, share: LinkedIn: https://www.linkedin.com/in/sumanthreddy-kasireddy-72b6662a9/ | GitHub: https://github.com/Sumanthreddy4620

RELEVANT CONTEXT (retrieved from knowledge base):
${context}

Answer the visitor's question using ONLY the information provided above. If the context doesn't contain the answer, say so honestly.`;

    // Step 5: Call Groq
    const reply = await callGroq(systemPrompt, messages.filter(m => m.role !== 'system'));

    return res.status(200).json({ reply });

  } catch (err) {
    console.error('[/api/chat] Error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
