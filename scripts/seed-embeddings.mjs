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
    .map(line => line.split('=').map((v, i) => i === 0 ? v.trim() : v.trim()))
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
// Each chunk is a focused piece of information the chatbot can retrieve.
// Update these chunks whenever your resume changes, then re-run this script.
const RESUME_CHUNKS = [
  {
    section: 'profile',
    content: `Name: Sumanth Reddy Kasireddy
Title: Frontend Developer & Competitive Programmer
Location: India
Email: k.sumanthreddy4620@gmail.com
LinkedIn: https://www.linkedin.com/in/sumanthreddy-kasireddy-72b6662a9/
GitHub: https://github.com/Sumanthreddy4620
Portfolio: https://sumanthreddykasireddy.vercel.app`,
  },
  {
    section: 'summary',
    content: `Sumanth Reddy Kasireddy is a Computer Science and Engineering undergraduate student (B.Tech, 2023–2027) 
specializing in modern Frontend Web Development and Competitive Programming. 
He focuses on developing highly performant, visually rich, and interactive user interfaces 
using React, Three.js, and GSAP. He also possesses strong logical reasoning 
skills built through methodically practicing algorithmic problems in C++.`,
  },
  {
    section: 'skills',
    content: `Skills Sumanth is comfortable with:
- React, Three.js, React Three Fiber, GSAP (GreenSock), Tailwind CSS
- JavaScript (ES6+), HTML5, CSS3
- C++ (Data Structures & Algorithms)
- Git, GitHub, Vercel

Skills currently learning:
- Node.js
- SQL Databases (MySQL / PostgreSQL — foundational knowledge)

Academic/foundational knowledge:
- Data Structures & Algorithms
- Operating Systems (coursework)
- Compiler Design fundamentals (regular expressions, NFA/DFA, lexical analysis)

Tools: VS Code, Git, GitHub, Vercel, Figma`,
  },
  {
    section: 'education',
    content: `Education:
- Degree: B.Tech in Computer Science and Engineering
- Institution: SR International Institute of Technology
- Duration: 2023 – 2027 (currently in progress)
- CGPA: Not disclosed publicly. Sumanth prefers to let his projects and code quality speak for his capabilities.`,
  },
  {
    section: 'experience',
    content: `Work Experience:
Sumanth does not have formal internship experience yet. His technical capabilities are demonstrated 
through his projects (3D Portfolio Website, Velvet Pour) and his competitive programming practice. 
He is open to immediate internship opportunities.`,
  },
  {
    section: 'project-portfolio',
    content: `Project: Personal 3D Portfolio Website
URL: https://sumanthreddykasireddy.vercel.app
Description: A high-performance personal portfolio showcasing interactive 3D elements, premium micro-animations, 
and responsive design interfaces. Features a custom-textured interactive 3D mechanical keyboard scene in the 
hero section, smooth scroll-driven typography animations, a project display carousel, and a fully integrated 
contact portal. Engineered with a lazy-loading architecture to optimize bundle sizes and improve initial page 
load performance.
Technologies: React, Three.js, React Three Fiber, GSAP, Tailwind CSS, EmailJS, Vite, Vercel`,
  },
  {
    section: 'project-velvetpour',
    content: `Project: Velvet Pour
URL: https://mojito-velvetpour.vercel.app
Description: A premium beverage landing page showcasing cinematic animations, smooth scroll-linked movements, 
elegant custom typography layouts, and immersive visual storytelling. Designed to mirror modern high-end 
brand aesthetics. Demonstrates Sumanth's ability to create emotionally engaging, visually stunning web experiences.
Technologies: React, GSAP, Tailwind CSS, Vite`,
  },
  {
    section: 'portfolio-architecture',
    content: `Portfolio Website Architecture & Technical Details:

1. HERO SECTION:
   - Interactive 3D mechanical keyboard model loaded from GLB file using React Three Fiber and Three.js
   - Custom lighting: ambient, directional, point, and spotlight for premium appearance
   - Keys have white custom emissive glow (intensity 0.8)
   - Title text animations powered by GSAP SplitText (letter-by-letter fade-in)
   - 3D canvas scales dynamically for mobile, tablet, and desktop viewports

2. ABOUT SECTION:
   - Multi-column CSS Grid with glassmorphism cards
   - Mouse-tracking radial glow overlay (cursor follows spotlight gradient)
   - Live rotating 3D Earth Globe built with react-globe.gl
   - GSAP ScrollTrigger animations for card entrance

3. WORK (PROJECTS) SECTION:
   - Interactive projects carousel
   - Scroll-triggered BorderGlow card structure with animated gradients

4. CONTACT SECTION:
   - Functional contact form using EmailJS (no backend required)

5. PERFORMANCE OPTIMIZATION:
   - Lazy-loading of heavy 3D components and assets
   - Built with Vite for optimized production bundling`,
  },
  {
    section: 'interests',
    content: `Sumanth's interests and hobbies:
- Algorithmic Problem Solving & Competitive Programming
- 3D Graphics & Creative Web Design
- Physical fitness (daily skipping workouts)
- Strategy gaming (Clash of Clans)
- PC Hardware & Workspace Aesthetics

Beyond coding, Sumanth maintains a balanced lifestyle combining technical pursuits with fitness and strategic gaming.`,
  },
  {
    section: 'availability',
    content: `Availability & Career:
- Sumanth is open to engineering internship opportunities immediately.
- Open to full-time roles beginning after graduation in 2027.
- Currently exploring full-stack engineering pathways.
- Open to frontend, backend, or full-stack positions.`,
  },
  {
    section: 'background',
    content: `How Sumanth got into programming:
He discovered his interest in software engineering through college coursework at SR International Institute of Technology. 
It developed as an academic interest that quickly grew into a passion. He enjoys two distinct areas:
- Frontend Development: Designing intuitive, creative, and highly interactive user interfaces.
- Competitive Programming: Methodically solving complex algorithmic challenges and logical puzzles.`,
  },
  {
    section: 'competitive-programming',
    content: `Competitive Programming approach:
Sumanth focuses on steady, consistent skill building rather than chasing leaderboard metrics on platforms like LeetCode or Codeforces. 
His practice centers on mastering core concepts including Arrays, Dynamic Programming (DP), Backtracking, Union-Find, Tries, and Graphs. 
He aims for perfect accuracy and clean execution, focusing on eliminating minor errors to ensure fundamentals remain solid.`,
  },
  {
    section: 'work-style',
    content: `Sumanth's problem-solving and work approach:
When debugging or resolving a complex issue, he proceeds systematically. He avoids quick fixes or copy-pasting solutions; 
instead, he grinds through the problem until he completely understands the root cause of the error. 
This thoroughness ensures that the code is robust and performant. 
His main professional strength is relentless persistence and structured problem-solving.`,
  },
  {
    section: 'faq',
    content: `Frequently Asked Questions about Sumanth:

Q: What sets your portfolio apart from other developers?
A: It is designed and built from scratch rather than using templates. The custom 3D hero model, performance tuning (lazy-loading), 
and hand-crafted GSAP animations demonstrate ability to solve real software challenges and optimize user experience.

Q: Do you have any internship experience?
A: No formal internship experience yet. Technical capabilities are demonstrated through projects and competitive programming.

Q: Do you hold any technical certifications?
A: Several certifications are in progress, but none are officially finalized at this time.

Q: What is your current CGPA?
A: Not shared publicly. Projects, code quality, and problem-solving skills speak for capabilities.

Q: What technologies are you currently exploring?
A: Expanding into backend development using Node.js and Express.js, along with SQL databases (MySQL and PostgreSQL).`,
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
    console.warn('⚠️  Could not clear table (may not exist yet):', deleteError.message);
  } else {
    console.log('✅ Table cleared.\n');
  }

  // Step 2: Embed all chunks in batches of 5 (Jina rate limits)
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

    // Small delay between batches to respect rate limits
    if (i + BATCH_SIZE < RESUME_CHUNKS.length) {
      await new Promise(r => setTimeout(r, 500));
    }
  }

  // Step 3: Insert all rows into Supabase
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
