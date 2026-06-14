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
        title: "Personal Portfolio — Showcasing My Skills & Projects",
        description: 'A modern developer portfolio built with React, Three.js, and Tailwind CSS. Featuring interactive 3D elements, smooth animations, and responsive design to highlight my projects, skills, and passion for web development.',
        tags: ['React', 'Three.js', 'Tailwind CSS','Javascript'],
        image: '/assets/portfolio.png',
        glowColor: '160 90 65',
        colors: ['#34d399', '#60a5fa', '#a78bfa', '#fb923c', '#f472b6', '#facc15', '#38bdf8', '#4ade80'],
    }
];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
    return {
        deskScale: isSmall ? 0.28 : isMobile ? 0.34 : 0.4,
        deskPosition: isSmall ? [2.0,-4.3,3.3] : isMobile ? [3.0, -6.3, -0.2] : isTablet ? [5.0, -4.9, 2.9]: [5.0, -3.5, 2.9]
    };
};