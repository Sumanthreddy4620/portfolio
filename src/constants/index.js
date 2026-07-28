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
            "A full-stack AI plant care platform with real-time leaf disease diagnosis, interactive AI chatbot, HTML5 Canvas growth timeline, and smart care tracking across 300,000+ species.",
        highlights: [
            {
                title: "AI Disease Diagnosis & Botanical Scanner",
                text: "Gemini Vision API leaf scanner detecting 740+ plant diseases, pests, and nutrient deficiencies with organic remedy advice."
            },
            {
                title: "Interactive Site-Wide AI Chatbot",
                text: "Floating AIChatModal available across all pages for instant interactive plant troubleshooting and botanical Q&A."
            },
            {
                title: "Canvas Compression & Care Sync",
                text: "Client-side HTML5 Canvas image compression (<30KB) and 1-click batch watering sync to Supabase PostgreSQL."
            }
        ],
        tags: ["React.js", "Node.js", "Gemini AI Vision API", "Supabase", "Canvas API", "REST API", "Tailwind CSS"],
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
            "An immersive developer portfolio featuring custom 3D Three.js models, GSAP scroll-driven micro-interactions, and a serverless RAG AI assistant.",
        highlights: [
            {
                title: "Interactive 3D Graphics",
                text: "React Three Fiber 3D mechanical keyboard hero model and interactive rotating globe with dynamic ambient lighting."
            },
            {
                title: "Scroll-Driven Animations",
                text: "Fluid GSAP SplitText typography animations and BorderGlow carousel effects across Hero, About, Work, and Contact sections."
            },
            {
                title: "RAG-Based AI Assistant",
                text: "Serverless vector RAG assistant using Jina AI embeddings, Supabase pgvector search, and Groq LLM real-time inference."
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
];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
    return {
        deskScale: isSmall ? 0.28 : isMobile ? 0.34 : 0.4,
        deskPosition: isSmall ? [2.0, -4.3, 3.3] : isMobile ? [3.0, -6.3, -0.2] : isTablet ? [5.0, -4.9, 2.9] : [5.0, -3.5, 2.9]
    };
};
