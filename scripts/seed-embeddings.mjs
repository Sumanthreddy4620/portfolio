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

const SUPABASE_URL         = env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = env.SUPABASE_SERVICE_KEY;
const JINA_API_KEY         = env.JINA_API_KEY;

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
Title: Computer Science Undergraduate | Frontend Developer & Competitive Programmer
Phone: +91 7013410428
Email: k.sumanthreddy4620@gmail.com
Location: Miryalguda, India 508207
LinkedIn: https://www.linkedin.com/in/sumanthreddy-kasireddy-72b6662a9/
GitHub: https://github.com/Sumanthreddy4620
Portfolio: https://sumanthreddykasireddy.vercel.app`,
  },
  {
    section: 'resume-download',
    content: `Sumanth's Resume / CV Download:
If a visitor asks for Sumanth's resume, CV, or wants to download his resume, provide this direct link:
https://sumanthreddykasireddy.vercel.app/resume.pdf

The resume is a PDF document that can be viewed or downloaded directly from the portfolio website.`,
  },
  {
    section: 'summary',
    content: `Professional Summary:
Detail-oriented Computer Science undergraduate (4th year, expected graduation September 2027) with hands-on experience building full-stack, animation-driven web applications using React, Three.js, and GSAP. Solid foundation in data structures and algorithms strengthened through consistent competitive programming in C++. Committed to writing clean, high-performance code and eager to contribute to a dynamic software development team.`,
  },
  {
    section: 'skills',
    content: `Technical Skills:

Languages: C++, C, JavaScript, HTML/CSS

Web & Frameworks:
- React.js
- Three.js (React Three Fiber / R3F)
- GSAP (GreenSock Animation Platform)
- Tailwind CSS
- EmailJS

Tools & Platforms:
- Git, GitHub
- Vercel
- VS Code
- Google Search Console

CS Fundamentals:
- Data Structures & Algorithms
- Object-Oriented Programming (OOP)
- Competitive Programming`,
  },
  {
    section: 'education',
    content: `Education:

1. Bachelor of Science, Computer Science
   Institution: SR International Institute of Technology
   Location: Rampally, Dayara, Keesara, Hyderabad
   Expected Graduation: September 2027
   Status: Currently in 4th year (final year)

2. Intermediate Certificate (MPC — Mathematics, Physics, Chemistry)
   Institution: Narayana Junior College
   Location: Madhapur, Hyderabad
   Completed: April 2023`,
  },
  {
    section: 'experience',
    content: `Work Experience:
Sumanth does not have formal internship experience yet. His technical capabilities are demonstrated 
through his projects (Personal Portfolio Website, Cocktail-Themed Landing Page, Competitive Programming) 
and consistent competitive programming on LeetCode. He is open to immediate internship and full-time opportunities.`,
  },
  {
    section: 'project-portfolio',
    content: `Project 1: Personal Portfolio Website
Technologies: React, Three.js (React Three Fiber / R3F), GSAP, Tailwind CSS
URL: https://sumanthreddykasireddy.vercel.app

Key achievements:
- Built a 3D interactive hero section featuring a mechanical keyboard model with real-time mouse-tracking rotation using React Three Fiber.
- Implemented scroll-triggered animations (GSAP SplitText, BorderGlow carousel) across Hero, About, Work, and Contact sections for a polished, motion-driven UX.
- Integrated a working contact form via EmailJS and deployed on Vercel; configured Google Search Console and sitemap for discoverability.
- Added an AI-powered chatbot to assist visitors and answer questions about the portfolio and projects in real time.
- Engineered lazy-loading architecture to optimize bundle sizes and improve initial page load performance.`,
  },
  {
    section: 'project-velvetpour',
    content: `Project 2: Cocktail-Themed Landing Page (also known as Velvet Pour)
Technologies: React, GSAP
URL: https://mojito-velvetpour.vercel.app

Key achievements:
- Designed and built an animated marketing landing page with scroll-based storytelling and GSAP timeline animations.
- Focused on smooth transitions and visual pacing to create an immersive, brand-driven browsing experience.
- Demonstrates ability to create emotionally engaging, visually stunning web experiences.`,
  },
  {
    section: 'project-competitive-programming',
    content: `Project 3: Competitive Programming Practice
Technologies: C++, LeetCode

Key achievements:
- Solved 100+ problems spanning arrays, dynamic programming, binary search, and string matching.
- Example problems: Rotated Sorted Arrays, Climbing Stairs, House Robber, Regular Expression Matching.
- Core topics: Arrays, Dynamic Programming (DP), Backtracking, Binary Search, String Matching.
- Practices consistently on LeetCode with focus on accuracy and clean solutions.`,
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
   - Interactive projects carousel
   - Scroll-triggered BorderGlow animated gradient cards

4. CONTACT SECTION:
   - EmailJS contact form + Supabase database backup

5. PERFORMANCE:
   - Lazy-loading of 3D components
   - Vite optimized bundling
   - Vercel deployment + Google Search Console + sitemap`,
  },
  {
    section: 'interests',
    content: `Sumanth's interests and activities:
- Algorithmic Problem Solving & Competitive Programming (LeetCode, C++)
- 3D Graphics & Creative Web Design (Three.js, GSAP animations)
- Full-stack development (expanding into Node.js, Express.js, SQL)
- Physical fitness (daily skipping workouts)
- Strategy gaming (Clash of Clans)
- PC Hardware & Workspace Aesthetics`,
  },
  {
    section: 'availability',
    content: `Availability & Career Goals:
- Actively looking for internship opportunities immediately.
- Open to full-time software engineering roles after graduation in September 2027.
- Interested in frontend, backend, or full-stack positions.
- Currently expanding into backend: Node.js, Express.js, SQL databases (MySQL/PostgreSQL).
- Eager to contribute to a dynamic software development team.`,
  },
  {
    section: 'background',
    content: `Background & Story:
Sumanth discovered software engineering through college coursework at SR International Institute of Technology, Hyderabad.
It grew from academic interest into genuine passion. He excels in two areas:

Frontend Development: Building interactive UIs with React, Three.js, and GSAP.
Competitive Programming: Solving algorithmic problems in C++ on LeetCode.

He is from Miryalguda, India, completed MPC Intermediate at Narayana Junior College, and is currently a 4th-year CS student.`,
  },
  {
    section: 'competitive-programming',
    content: `Competitive Programming approach:
Sumanth practices on LeetCode using C++ and has solved 100+ problems.
Core topics mastered:
- Arrays and String Manipulation (e.g., Regular Expression Matching)
- Dynamic Programming (Climbing Stairs, House Robber)
- Binary Search (Rotated Sorted Arrays)
- Backtracking, Graphs, Union-Find, Tries

Approach: aims for perfect accuracy and clean execution, eliminating minor bugs, building solid fundamentals.`,
  },
  {
    section: 'work-style',
    content: `Sumanth's problem-solving and work style:
- Proceeds systematically when debugging — no quick fixes or copy-pasting.
- Grinds through problems until the root cause is fully understood.
- Ensures code is robust, clean, and performant.

Professional strengths:
- Relentless persistence and structured problem-solving
- Strong attention to detail in UI/animation polish
- Able to work on both creative (3D/animation) and logical (DS/algorithms) challenges`,
  },
  {
    section: 'faq',
    content: `Frequently Asked Questions about Sumanth:

Q: Can I download or view Sumanth's resume?
A: Yes! Download it here: https://sumanthreddykasireddy.vercel.app/resume.pdf

Q: What sets your portfolio apart?
A: Built entirely from scratch — no templates. Features a custom 3D mechanical keyboard hero, GSAP SplitText animations, BorderGlow carousel, an AI chatbot, and Google Search Console/sitemap integration.

Q: Do you have internship experience?
A: Not yet. Technical capabilities shown through projects and 100+ LeetCode solutions in C++.

Q: What is your educational background?
A: BS Computer Science at SR International Institute of Technology, Hyderabad (Expected September 2027). MPC Intermediate at Narayana Junior College, Hyderabad (April 2023).

Q: What technologies are you learning?
A: Node.js, Express.js, MySQL/PostgreSQL for full-stack development.

Q: What is your CGPA?
A: Not shared publicly. Projects and problem-solving speak for capabilities.

Q: How can I contact Sumanth?
A: LinkedIn: https://www.linkedin.com/in/sumanthreddy-kasireddy-72b6662a9/ | GitHub: https://github.com/Sumanthreddy4620 | Email: k.sumanthreddy4620@gmail.com | Phone: +91 7013410428`,
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
        section:   chunk.section,
        content:   chunk.content,
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
