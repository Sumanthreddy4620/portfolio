export const navLinks = [
    {
        id: 1,
        name: 'Home',
        href: '#home',
    },
    {
        id: 2,
        name: 'About',
        href: '#about',
    },
    {
        id: 3,
        name: 'Work',
        href: '#work',
    },
    {
        id: 4,
        name: 'Contact',
        href: '#contact',
    },
];
export const projects = [
    {
        title: "Plantio — AI-Powered Botanical & Plant Care Platform",
        url: "https://plantio-plants.vercel.app",
        description:
            "Engineered a responsive full-stack AI plant intelligence platform featuring a Gemini Vision API leaf scanner, interactive site-wide AI chatbot modal, HTML5 Canvas growth timeline, and smart watering tracking across 300,000+ species.",
        highlights: [
            {
                title: "AI Disease Diagnosis & Botanical Scanner",
                text: "Engineered an AI Doctor gateway utilizing Gemini Vision API to analyze plant leaf images and text queries in real time, detecting 740+ plant diseases, pests, and nutrient deficiencies with organic remedy suggestions."
            },
            {
                title: "Interactive Site-Wide AI Chatbot",
                text: "Built a floating, responsive AI assistant modal (AIChatModal) available across all pages for instant interactive plant troubleshooting, context-aware care advice, and botanical Q&A."
            },
            {
                title: "Photo Growth Journal & Canvas Compression",
                text: "Developed a multi-stage visual growth timeline (Day 1 to Year 1) with client-side HTML5 Canvas image compression (JPEG 0.7, max 450px), optimizing photo uploads to under 30KB for instant cloud sync to Supabase PostgreSQL."
            },
            {
                title: "Smart Watering Tracker & Batch Operations",
                text: "Implemented dynamic watering status badges (Watered, Due Today, Overdue) with 1-click single and batch 'Water All' actions, syncing custom care frequencies across user devices."
            },
            {
                title: "Full-Stack REST Architecture & 300K+ Species DB",
                text: "Built a standalone Node.js REST backend with HMAC token auth and integrated Wikipedia & botanical APIs to serve real-time search, category filters, and detailed care guides across 300,000+ plant species."
            }
        ],
        tags: ["React.js", "Node.js", "Gemini AI Vision API", "Supabase", "REST API", "HTML5 Canvas API", "Render", "Vercel"],
        image: "/assets/plantio.png",
        glowColor: "140 80 50",
        colors: [
            "#10b981",
            "#059669",
            "#34d399",
            "#14b8a6",
            "#84cc16",
            "#06b6d4",
            "#3b82f6",
            "#6366f1",
        ],
    },
    {
        title: "Interactive 3D Personal Portfolio",
        url: "https://sumanthreddykasireddy.vercel.app",
        description:
            "An immersive developer portfolio featuring a custom 3D mechanical keyboard & globe hero section, GSAP scroll-driven animations, a RAG-based AI assistant, and SEO optimization on Vercel.",
        highlights: [
            {
                title: "Interactive 3D Graphics",
                text: "Built immersive 3D visuals utilizing React Three Fiber, including a mechanical keyboard hero model and an interactive rotating globe model, with dynamic ambient lighting."
            },
            {
                title: "Scroll-Driven Animations",
                text: "Implemented fluid micro-interactions and scroll-triggered motion effects (GSAP SplitText, BorderGlow carousel) across Hero, About, Work, and Contact sections."
            },
            {
                title: "RAG-Based AI Assistant",
                text: "Engineered a RAG-based AI assistant using Jina AI embeddings and Supabase pgvector for semantic search, with Groq for real-time LLM inference."
            }
        ],
        tags: ["React.js", "Three.js", "GSAP", "Tailwind CSS", "Jina AI", "Supabase pgvector", "Groq LLM", "Vercel"],
        image: "/assets/portfolio.png",
        glowColor: "160 90 65",
        colors: [
            "#34d399",
            "#60a5fa",
            "#a78bfa",
            "#fb923c",
            "#f472b6",
            "#facc15",
            "#38bdf8",
            "#4ade80",
        ],
    },
    {
        title: "Competitive Programming & Algorithmic Problem Solving",
        url: "https://leetcode.com/u/Sumanthreddy4620/",
        description:
            "Solved 100+ algorithmic problems spanning Arrays, Strings, Dynamic Programming, Binary Search, Graph Traversals, and String Matching on LeetCode and CodeChef in C++.",
        highlights: [
            {
                title: "Algorithmic Breadth",
                text: "Solved 100+ algorithmic problems spanning Arrays, Strings, Dynamic Programming, Binary Search, Graph Traversals, and String Matching (e.g., Rotated Sorted Array Search, House Robber, Regular Expression Matching)."
            },
            {
                title: "Optimization & Complexity Analysis",
                text: "Consistently practice algorithm optimization, time & space complexity analysis, and clean implementation in C++."
            }
        ],
        tags: ["C++", "Data Structures", "Algorithms", "LeetCode", "CodeChef", "Dynamic Programming", "Graph Traversals"],
        image: "/assets/terminal.png",
        glowColor: "210 80 60",
        colors: [
            "#ef4444",
            "#f97316",
            "#f59e0b",
            "#10b981",
            "#06b6d4",
            "#3b82f6",
            "#8b5cf6",
            "#ec4899",
        ],
    },
    {
        title: "Velvet Pour — Motion Landing Page",
        url: "https://mojito-velvetpour.vercel.app",
        description:
            "Designed and developed an animated marketing landing page featuring scroll-based storytelling, custom GSAP timelines, and smooth parallax transitions to optimize visual pacing and user engagement.",
        highlights: [
            {
                title: "Cinematic Motion",
                text: "Custom GSAP timelines and smooth parallax transitions optimizing visual pacing and user engagement."
            }
        ],
        tags: ["React.js", "GSAP", "Vanilla CSS", "Vite"],
        image: "/assets/velvet-pour.png",
        glowColor: "40 80 80",
        colors: [
            "#22d3ee",
            "#14b8a6",
            "#10b981",
            "#84cc16",
            "#f59e0b",
            "#f97316",
            "#ec4899",
            "#8b5cf6",
        ],
    },
];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
    return {
        deskScale: isSmall ? 0.28 : isMobile ? 0.34 : 0.4,
        deskPosition: isSmall ? [2.0, -4.3, 3.3] : isMobile ? [3.0, -6.3, -0.2] : isTablet ? [5.0, -4.9, 2.9] : [5.0, -3.5, 2.9]
    };
};