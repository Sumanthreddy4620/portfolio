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
        title: "Plantio — Botanical Care & Plant Intelligence Platform",
        url: "https://plantio-plants.vercel.app",
        description:
            "A responsive full-stack web application delivering real-time search, category filtering, and smart care guidance across 300,000+ live plant species and 740+ disease/pest diagnostics.",
        highlights: [
            {
                title: "Full-Stack Architecture & APIs",
                text: "Integrated iNaturalist and Wikipedia REST APIs for real-time search & taxonomy metadata across 300,000+ species."
            },
            {
                title: "Cloud DB & Persistent Auth",
                text: "Built a Node.js backend with JWT authentication & Supabase (PostgreSQL) for persistent user accounts & schedule sync."
            },
            {
                title: "Algorithmic Care Engine",
                text: "Automated inference module generating dynamic watering frequencies, toxicity warnings, and light guides."
            },
            {
                title: "Interactive Care Dashboards",
                text: "User plant management dashboards with photo uploads, watering reminder modal editors, and grid filling layouts."
            }
        ],
        tags: ["React.js", "Node.js", "Supabase", "REST API", "iNaturalist API", "JWT", "Tailwind CSS"],
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
            "An immersive developer portfolio featuring a custom 3D mechanical keyboard hero section with mouse tracking, GSAP scroll-driven animations, an AI chatbot, and SEO optimization on Vercel.",
        highlights: [
            {
                title: "3D Graphics & Lighting",
                text: "Built with React Three Fiber featuring dynamic ambient lighting and real-time mouse-tracking model rotation."
            },
            {
                title: "Scroll-Driven Animations",
                text: "GSAP SplitText and BorderGlow carousel micro-interactions across Hero, About, Work, and Contact sections."
            },
            {
                title: "AI Chatbot Assistant",
                text: "Serverless RAG pipeline combining Jina AI vector embeddings, Supabase pgvector, and Groq Llama-3.3 LLM."
            }
        ],
        tags: ["React.js", "Three.js", "GSAP", "Tailwind CSS", "EmailJS", "Vercel"],
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
        title: "Velvet Pour — Motion Landing Page",
        url: "https://mojito-velvetpour.vercel.app",
        description:
            "A premium beverage landing page showcasing cinematic animations, smooth scroll-linked movements, elegant custom typography layouts, and immersive visual storytelling.",
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
        deskPosition: isSmall ? [2.0,-4.3,3.3] : isMobile ? [3.0, -6.3, -0.2] : isTablet ? [5.0, -4.9, 2.9]: [5.0, -3.5, 2.9]
    };
};