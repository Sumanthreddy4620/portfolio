// ============================================================
//  Seed Script: Embed resume data and store in Supabase
//  Run once: node scripts/seed-embeddings.mjs
//  Requirements: set SUPABASE_URL, SUPABASE_SERVICE_KEY, JINA_API_KEY in .env
// ============================================================

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env manually (no dotenv dependency needed)
const envPath = resolve(__dirname, '../.env');
const envContent = readFileSync(envPath, 'utf-8');
const env = Object.fromEntries(
  envContent.split('\n')
    .filter(line => line.trim() && !line.startsWith('#'))
    .map(line => {
      const idx = line.indexOf('=');
      return [line.slice(0, idx).trim(), line.slice(idx + 1).trim()];
    })
);

const SUPABASE_URL = env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = env.SUPABASE_SERVICE_KEY;
const JINA_API_KEY = env.JINA_API_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY || !JINA_API_KEY) {
  console.error('❌ Missing env vars. Check your .env file.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ── Resume data chunks ─────────────────────────────────────────────────────
// Source: Sumanth Reddy Kasireddy's actual resume (July 2026)
// Update these chunks whenever your resume changes, then re-run this script.
const RESUME_CHUNKS = [
  {
    section: 'profile',
    content: `Name: Sumanth Reddy Kasireddy
Title: Computer Science Undergraduate | Full-Stack Developer & Competitive Programmer
Phone: +91 7013410428
Email: k.sumanthreddy4620@gmail.com
Location: Miryalguda, India 508207
LinkedIn: https://www.linkedin.com/in/sumanthreddykasireddy/
GitHub: https://github.com/Sumanthreddy4620
Portfolio: https://sumanthreddykasireddy.vercel.app`,
  },
  {
    section: 'resume-download',
    content: `Sumanth's Resume / CV Download:
If a visitor asks for Sumanth's resume, CV, or wants to download his resume, provide this direct link:
https://sumanthreddykasireddy.vercel.app/resume.pdf?v=20260728

The resume is a PDF document that can be viewed or downloaded directly from the portfolio website.`,
  },
  {
    section: 'summary',
    content: `Professional Summary:
Full-stack developer specializing in AI-integrated, animation-rich web applications, with hands-on expertise using React.js, Node.js, REST APIs, Supabase (PostgreSQL), Three.js, and GSAP. Strong foundation in Data Structures, Algorithms, and System Design principles, backed by consistent competitive programming in C++. Passionate about building highly scalable, secure, and visually captivating digital products that solve real-world problems.`,
  },
  {
    section: 'skills',
    content: `Technical Skills:

Languages: C++, C, JavaScript (ES6+), SQL

Frameworks & Libraries:
- React.js
- Node.js
- Express.js
- REST APIs
- Three.js (React Three Fiber)
- GSAP (GreenSock Animation Platform)
- Tailwind CSS
- Canvas API

AI & Cloud Services:
- Gemini Pro / Vision API
- Supabase (PostgreSQL)
- Vercel
- Render

Tools & Practices:
- Git, GitHub
- JWT / Token Authentication
- Data Structures & Algorithms
- Object-Oriented Programming (OOP)
- System Design principles`,
  },
  {
    section: 'education',
    content: `Education:

1. Bachelor of Technology in Computer Science & Engineering
   Institution: SR International Institute of Technology, Hyderabad
   Expected Graduation: September 2027
   Status: Undergraduate CS Student

2. Intermediate Certificate (MPC — Mathematics, Physics, Chemistry)
   Institution: Narayana Junior College, Madhapur, Hyderabad
   Completed: April 2023`,
  },
  {
    section: 'experience',
    content: `Work Experience & Capabilities:
Sumanth demonstrates technical capabilities through full-stack AI-integrated projects, creative 3D web engineering, and competitive programming.
Featured Projects & Live Links:
1. Plantio: [Plantio — AI-Powered Botanical & Plant Care Platform](https://plantio-plants.vercel.app) (React.js, Node.js, Gemini AI Vision API, Supabase PostgreSQL, HTML5 Canvas API, REST APIs)
2. 3D Portfolio: [Interactive 3D Personal Portfolio](https://sumanthreddykasireddy.vercel.app) (React Three Fiber, GSAP, Jina AI, Supabase pgvector, Groq LLM, EmailJS)
3. Competitive Programming (100+ problems solved on LeetCode & CodeChef in C++)

He is open to immediate software engineering internship opportunities and full-time positions post-graduation in September 2027.`,
  },
  {
    section: 'project-plantio',
    content: `Featured Project 1: Plantio — AI-Powered Botanical & Plant Care Platform
Live Demo Link: [Plantio](https://plantio-plants.vercel.app)
URL: https://plantio-plants.vercel.app
Technologies: React.js | Node.js | Gemini AI Vision API | Supabase (PostgreSQL) | REST APIs | HTML5 Canvas API | Vercel | Render | JWT / HMAC Token Auth

Key Achievements & Engineering Highlights:
- AI Disease Diagnosis & Botanical Scanner: Engineered an AI Doctor gateway utilizing Gemini Vision API to analyze plant leaf images and text queries in real time, detecting 740+ plant diseases, pests, and nutrient deficiencies with organic remedy suggestions.
- Interactive Site-Wide AI Chatbot: Built a floating, responsive AI assistant modal (AIChatModal) available across all pages for instant interactive plant troubleshooting, context-aware care advice, and botanical Q&A.
- Photo Growth Journal & Canvas Compression: Developed a multi-stage visual growth timeline (Day 1 to Year 1) with client-side HTML5 Canvas image compression (JPEG 0.7, max 450px), optimizing photo uploads to under 30KB for instant cloud sync to Supabase PostgreSQL.
- Smart Watering Tracker & Batch Operations: Implemented dynamic watering status badges (Watered, Due Today, Overdue) with 1-click single and batch "Water All" actions, syncing custom care frequencies across user devices.
- Full-Stack REST Architecture & 300K+ Species DB: Built a standalone Node.js REST backend with HMAC token auth and integrated Wikipedia & botanical APIs to serve real-time search, category filters, and detailed care guides across 300,000+ plant species.
- SEO & Open Graph Optimization: Implemented structured Open Graph (OG) meta tags, Twitter Cards, and dynamic social preview banner cards (1024x526), achieving maximum search visibility and social media share preview fidelity on Vercel.`,
  },
  {
    section: 'project-portfolio',
    content: `Featured Project 2: Interactive 3D Personal Portfolio
Live Demo Link: [3D Portfolio](https://sumanthreddykasireddy.vercel.app)
Technologies: React.js | Three.js (React Three Fiber) | GSAP | Tailwind CSS | Jina AI | Supabase pgvector | Groq LLM | EmailJS | Vercel
URL: https://sumanthreddykasireddy.vercel.app

Key Achievements & Engineering Highlights:
- Interactive 3D Graphics: Built an immersive 3D hero section utilizing React Three Fiber featuring a mechanical keyboard model and an interactive rotating globe model with dynamic ambient lighting.
- Scroll-Driven Animations: Implemented fluid micro-interactions and scroll-triggered motion effects (GSAP SplitText, BorderGlow carousel) across Hero, About, Work, and Contact sections.
- RAG-Based AI Assistant & SEO Optimization: Engineered a RAG-based AI assistant using Jina AI embeddings and Supabase pgvector for semantic search, with Groq for real-time LLM inference, and configured structured SEO metadata, achieving high performance and search visibility on Vercel.
- Performance Architecture: Engineered lazy-loading architecture to optimize bundle sizes and improve initial page load performance.`,
  },
  {
    section: 'portfolio-architecture',
    content: `Portfolio Website Architecture & Technical Details:

1. HERO SECTION:
   - Interactive 3D mechanical keyboard model with real-time mouse-tracking rotation (React Three Fiber)
   - Custom lighting: ambient, directional, point, spotlight
   - GSAP SplitText letter-by-letter title animation
   - Responsive 3D canvas scaling for mobile, tablet, desktop

2. ABOUT SECTION:
   - Multi-column CSS Grid with glassmorphism cards
   - Mouse-tracking radial glow overlay
   - Live rotating 3D Earth Globe (react-globe.gl)
   - GSAP ScrollTrigger card entrance animations

3. WORK (PROJECTS) SECTION:
   - Interactive projects carousel showcasing Plantio and 3D Interactive Portfolio
   - Scroll-triggered BorderGlow animated gradient cards

4. AI CHATBOT & BACKEND:
   - Integrated serverless RAG AI Chatbot backed by Jina AI embeddings, Supabase pgvector vector search, and Groq Llama-3.3 LLM.

5. CONTACT SECTION:
   - EmailJS contact form + Supabase database integration`,
  },
  {
    section: 'interests',
    content: `Sumanth's interests and activities:
- Full-Stack Web Development & API Engineering (React.js, Node.js, Supabase, Express.js, REST APIs)
- Algorithmic Problem Solving & Competitive Programming (LeetCode, CodeChef, C++)
- 3D Graphics & Creative Web Design (Three.js, React Three Fiber, GSAP animations)
- Physical fitness (daily skipping workouts)
- Strategy gaming (Clash of Clans)
- PC Hardware & Workspace Aesthetics`,
  },
  {
    section: 'availability',
    content: `Availability & Career Goals:
- Actively looking for engineering internship opportunities immediately.
- Open to full-time software engineering roles after graduation in September 2027.
- Open to frontend, backend, or full-stack software development positions.
- Dedicated to building scalable, secure, and visually captivating digital products.`,
  },
  {
    section: 'background',
    content: `Background & Story:
Sumanth Kasireddy is a Computer Science & Engineering student at SR International Institute of Technology, Hyderabad.
He balances full-stack software engineering (React.js, Node.js, REST APIs, Supabase PostgreSQL, Three.js, GSAP) with rigorous competitive programming in C++.
He completed MPC Intermediate at Narayana Junior College, Madhapur, Hyderabad (April 2023) and resides in Miryalguda, India.`,
  },
  {
    section: 'competitive-programming',
    content: `Competitive Programming Details:
Sumanth practices algorithms in C++ on LeetCode and CodeChef with 100+ problems solved.
Key Areas:
- Arrays & Strings (e.g., Regular Expression Matching, Rotated Sorted Array Search)
- Dynamic Programming (e.g., House Robber, Climbing Stairs)
- Binary Search & Graph Traversals
- String Matching & Backtracking
Focus: Clean, bug-free implementations, optimal time/space complexity, and strong DSA fundamentals.`,
  },
  {
    section: 'work-style',
    content: `Sumanth's problem-solving and work style:
- Systematic debugging and root-cause resolution without quick-fix hacks.
- Passionate about building robust, high-performance full-stack architectures.
- Strong attention to UI design, micro-animations, and user experience polish.
- Combines logical problem solving (algorithms in C++) with creative front-end design (Three.js, GSAP).`,
  },
  {
    section: 'faq',
    content: `Frequently Asked Questions about Sumanth:

Q: Can I download or view Sumanth's resume?
A: Yes! Download it here: [Sumanth's Resume](https://sumanthreddykasireddy.vercel.app/resume.pdf?v=20260728)

Q: What are Sumanth's main projects?
A: 1. Plantio: [Plantio — Botanical Care Platform](https://plantio-plants.vercel.app) (React.js, Node.js, Gemini Vision AI, Supabase PostgreSQL, HTML5 Canvas API)
2. Personal Portfolio: [Portfolio](https://sumanthreddykasireddy.vercel.app) (React Three Fiber, GSAP, Jina AI, Supabase pgvector, Groq LLM)

Q: What is Sumanth's educational background?
A: B.Tech in Computer Science & Engineering at SR International Institute of Technology, Hyderabad (Expected September 2027). Intermediate MPC at Narayana Junior College, Madhapur, Hyderabad (April 2023).

Q: What tech stack does Sumanth use?
A: Languages: C++, C, JavaScript (ES6+), SQL. Frameworks & Tools: React.js, Node.js, Express.js, REST APIs, Supabase (PostgreSQL), Three.js (React Three Fiber), GSAP, Tailwind CSS, Canvas API, Git, GitHub, Vercel, Render, JWT.

Q: How can I contact Sumanth?
A: Phone: +91 7013410428 | Email: k.sumanthreddy4620@gmail.com | LinkedIn: https://www.linkedin.com/in/sumanthreddykasireddy/ | GitHub: https://github.com/Sumanthreddy4620`,
  },
];

// ── Jina AI embedding function ─────────────────────────────────────────────
async function embedTexts(texts) {
  const res = await fetch('https://api.jina.ai/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${JINA_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'jina-embeddings-v3',
      task: 'retrieval.passage',
      input: texts,
      dimensions: 1024,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Jina API error: ${errText}`);
  }

  const data = await res.json();
  return data.data.map(d => d.embedding);
}

// ── Main seed function ─────────────────────────────────────────────────────
async function seed() {
  console.log('🌱 Starting resume data seeding...\n');

  // Step 1: Clear existing data
  console.log('🗑️  Clearing existing resume_chunks...');
  const { error: deleteError } = await supabase.from('resume_chunks').delete().neq('id', 0);
  if (deleteError) {
    console.warn('⚠️  Could not clear table:', deleteError.message);
  } else {
    console.log('✅ Table cleared.\n');
  }

  // Step 2: Embed all chunks in batches of 5
  const BATCH_SIZE = 5;
  const allRows = [];

  for (let i = 0; i < RESUME_CHUNKS.length; i += BATCH_SIZE) {
    const batch = RESUME_CHUNKS.slice(i, i + BATCH_SIZE);
    const texts = batch.map(c => c.content);

    console.log(`📡 Embedding batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(RESUME_CHUNKS.length / BATCH_SIZE)} (${batch.map(c => c.section).join(', ')})...`);

    const embeddings = await embedTexts(texts);
    batch.forEach((chunk, idx) => {
      allRows.push({
        section: chunk.section,
        content: chunk.content,
        embedding: embeddings[idx],
      });
    });

    if (i + BATCH_SIZE < RESUME_CHUNKS.length) {
      await new Promise(r => setTimeout(r, 500));
    }
  }

  // Step 3: Insert all rows
  console.log(`\n💾 Inserting ${allRows.length} chunks into Supabase...`);
  const { error: insertError } = await supabase.from('resume_chunks').insert(allRows);
  if (insertError) {
    console.error('❌ Insert failed:', insertError.message);
    process.exit(1);
  }

  console.log(`\n✅ Successfully seeded ${allRows.length} resume chunks!`);
  console.log('🎉 Your chatbot database is ready.\n');
  console.log('Sections seeded:');
  allRows.forEach(r => console.log(`  - ${r.section}`));
}

seed().catch(err => {
  console.error('❌ Seed script failed:', err);
  process.exit(1);
});

