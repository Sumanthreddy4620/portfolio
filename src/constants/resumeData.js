// ============================================================
//  RESUME DATA — Sumanth Reddy Kasireddy
//  Used by ChatBot.jsx to power the AI assistant's knowledge.
// ============================================================

export const resumeData = {
  name: "Sumanth Reddy Kasireddy",
  title: "Frontend Developer & Competitive Programmer",
  location: "India",
  email: "k.sumanthreddy4620@gmail.com",
  linkedin: "https://www.linkedin.com/in/sumanthreddy-kasireddy-72b6662a9/",
  github: "https://github.com/Sumanthreddy4620",
  portfolio: "https://sumanthreddykasireddy.vercel.app",

  summary: `
    I am a Computer Science and Engineering undergraduate student (B.Tech, 2023–2027) 
    specializing in modern Frontend Web Development and Competitive Programming. 
    I focus on developing highly performant, visually rich, and interactive user interfaces 
    using React, Three.js, and GSAP. Additionally, I possess strong logical reasoning 
    skills built through methodically practicing algorithmic problems in C++.
  `,

  skills: {
    comfortable: [
      "React", "Three.js", "React Three Fiber", "GSAP (GreenSock)", "Tailwind CSS",
      "JavaScript (ES6+)", "HTML5", "CSS3", "C++ (Data Structures & Algorithms)",
      "Git", "GitHub", "Vercel", "Figma",
    ],
    learning: [
      "Node.js", "Express.js", "SQL Databases (MySQL / PostgreSQL — foundational knowledge)",
    ],
    academic: [
      "Data Structures & Algorithms",
      "Operating Systems (coursework)",
      "Compiler Design fundamentals (regular expressions, NFA/DFA, lexical analysis)",
    ],
    tools: ["VS Code", "Git", "GitHub", "Vercel", "Figma"],
  },

  education: [
    {
      degree: "B.Tech in Computer Science and Engineering",
      institution: "SR International Institute of Technology",
      year: "2023 – 2027",
      gpa: null, // Private / Not specified
    },
  ],

  experience: [], // No professional internships yet. Proof of skill is demonstrated through project work and competitive programming.

  projects: [
    {
      name: "Personal 3D Portfolio Website",
      url: "https://sumanthreddykasireddy.vercel.app",
      description:
        "A high-performance personal portfolio showcasing interactive 3D elements, premium micro-animations, " +
        "and responsive design interfaces. The site features a custom-textured interactive 3D mechanical keyboard " +
        "scene in the hero section, smooth scroll-driven typography animations, a project display carousel, and " +
        "a fully integrated contact portal. Engineered with a lazy-loading architecture to optimize bundle sizes " +
        "and improve initial page load performance.",
      tech: ["React", "Three.js", "React Three Fiber", "GSAP", "Tailwind CSS", "EmailJS", "Vite", "Vercel"],
    },
    {
      name: "Velvet Pour",
      url: "https://mojito-velvetpour.vercel.app",
      description:
        "A premium beverage landing page showcasing cinematic animations, smooth scroll-linked movements, " +
        "elegant custom typography layouts, and immersive visual storytelling. Designed to mirror modern high-end " +
        "brand aesthetics.",
      tech: ["React", "GSAP", "Tailwind CSS", "Vite"],
    },
  ],

  certifications: [], // Under progress, none officially listed.

  interests: [
    "Algorithmic Problem Solving & Competitive Programming",
    "3D Graphics & Creative Web Design",
    "Physical fitness routines (daily skipping workouts)",
    "Strategy gaming (Clash of Clans)",
    "PC Hardware & Workspace Aesthetics",
  ],

  availability:
    "Open to engineering internship opportunities immediately. Open to full-time roles beginning after graduation in 2027.",
};

// ============================================================
//  EXTENDED KNOWLEDGE BASE — WEB PORTFOLIO & PROFESSIONAL PROFILE
//  Rich, structured details about the website and Sumanth's philosophy.
//  Enables the chatbot to answer technical inquiries with high precision.
// ============================================================

export const knowledgeBase = `
────────────────────────────────────────────────────────────
PORTFOLIO WEBSITE DETAILS & ARCHITECTURE
────────────────────────────────────────────────────────────
This portfolio website is a custom, performance-optimized single-page application.
Here is the structural and technical breakdown:

1. HERO SECTION:
   • Features a highly detailed, interactive 3D mechanical keyboard model.
   • Model is loaded from a GLB file (/models/mechanical_keyboard.glb) using React Three Fiber (@react-three/fiber) and Three.js.
   • Custom lighting is implemented in the Three.js Canvas, including ambient light for base illumination, directional light, point light, and spotlight for highlights.
   • Keys use a cloned material with a white custom emissive glow (intensity set to 0.8) to give a modern, premium appearance.
   • Title text animations are powered by GSAP SplitText, creating a smooth, letter-by-letter fade-in on page entrance.
   • The 3D canvas scales and shifts position dynamically based on screen size (custom responsive scales are calculated for mobile, tablet, and desktop viewports).

2. ABOUT SECTION:
   • Constructed using a multi-column CSS Grid containing interactive glassmorphism cards.
   • Features a mouse-tracking radial glow overlay. As the user moves their cursor over the cards, a glowing spotlight gradient follows the cursor dynamically.
   • Includes a live rotating 3D Earth Globe built with 'react-globe.gl', centered visually and highlighting geographic connectivity.
   • Scroll entrance animations for the grid cards are executed with GSAP ScrollTrigger to ensure cards glide up gracefully when they enter the viewport.

3. WORK (PROJECTS) SECTION:
   • Implements an interactive projects carousel.
   • Uses a custom, scroll-triggered BorderGlow card structure that animates gradients along the border of the active project card.

4. CONTACT SECTION:
   • A fully functional contact form utilizing EmailJS to send client inquiries directly to Sumanth's inbox securely, without requiring a backend server.

5. PERFORMANCE OPTIMIZATION:
   • Loading 3D models directly on page load typically hurts performance, especially on mobile or slower network connections.
   • Resolved this by lazy-loading the heavy 3D components and assets. The critical HTML page shell and CSS layout render immediately, and the 3D scene loads progressively in the background.
   • Built using Vite for optimized production bundling and asset hashing.

────────────────────────────────────────────────────────────
HOW I GOT INTO PROGRAMMING
────────────────────────────────────────────────────────────
I discovered my interest in software engineering through my college coursework at SR International Institute of Technology. 
It developed as an academic interest that quickly grew into a passion. I enjoy two distinct areas:
• Frontend Development: Designing intuitive, creative, and highly interactive user interfaces.
• Competitive Programming: Methodically solving complex algorithmic challenges and logical puzzles.

────────────────────────────────────────────────────────────
COMPETITIVE PROGRAMMING APPROACH
────────────────────────────────────────────────────────────
I focus on steady, consistent skill building rather than chasing leaderboard metrics on platforms like LeetCode or Codeforces. 
My practice centers on mastering core concepts including Arrays, Dynamic Programming (DP), Backtracking, Union-Find, Tries, and Graphs. 
I aim for perfect accuracy and clean execution, focusing on eliminating minor errors to ensure my fundamentals remain solid.

────────────────────────────────────────────────────────────
HOW I WORK / PROBLEM-SOLVING APPROACH
────────────────────────────────────────────────────────────
When debugging or resolving a complex issue, I proceed systematically. I avoid quick fixes or copy-pasting solutions; 
instead, I grind through the problem until I completely understand the root cause of the error. This thoroughness ensures 
that the code is robust and performant.

────────────────────────────────────────────────────────────
BEYOND CODING
────────────────────────────────────────────────────────────
I maintain a balanced lifestyle by combining technical pursuits with fitness and strategic gaming. 
I keep a consistent fitness routine centered around daily skipping workouts. Additionally, I enjoy playing Clash of Clans 
and follow news regarding PC hardware developments and modern workspace setups.

────────────────────────────────────────────────────────────
CAREER OBJECTIVES & DIRECTION
────────────────────────────────────────────────────────────
Currently pursuing a B.Tech in Computer Science and Engineering (graduation expected in 2027) at SR International Institute of Technology. 
I am exploring full-stack engineering pathways and remain open to frontend, backend, or full-stack positions. 

Internships: Open to immediate internship opportunities.
Full-time Roles: Open to opportunities starting post-graduation in 2027.

────────────────────────────────────────────────────────────
PRE-ANSWERED FAQS (PROFESSIONAL TONE)
────────────────────────────────────────────────────────────
Q: What sets your portfolio apart from other developers?
A: It is designed and built from scratch rather than using templates. The custom 3D hero model, the performance tuning (such as lazy-loading the 3D assets to keep the page load instant), and the hand-crafted GSAP animations demonstrate my ability to solve actual software challenges and optimize user experience.

Q: What is your main professional strength?
A: Relentless persistence and structured problem-solving. Whether I am optimization rendering loops in Three.js or solving dynamic programming problems in C++, I work through challenges methodically until I find the most robust and clean solution.

Q: What technologies are you currently exploring?
A: I am expanding my knowledge into backend development using Node.js and Express.js, along with SQL databases (MySQL and PostgreSQL), to become a well-rounded Full-Stack Engineer.

Q: Do you have any internship experience?
A: I do not have formal internship experience yet. My technical capabilities are demonstrated through my projects, such as Velvet Pour, this 3D portfolio, and my competitive programming accomplishments.

Q: Do you hold any technical certifications?
A: I have several certifications in progress, but I prefer to list only completed milestones. None are officially finalized at this time.

Q: What is your current CGPA?
A: I do not share academic metrics publicly, preferring to let my projects, code quality, and logical problem-solving skills speak for my capabilities.
`;
