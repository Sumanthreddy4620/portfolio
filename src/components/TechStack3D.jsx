import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Html } from '@react-three/drei';
import CanvasLoader from './CanvasLoader.jsx';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

// SVG Icons dictionary for fallbacks & special icons
const TechIcons = {
    react: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(0 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 12 12)" />
            <circle cx="12" cy="12" r="2" fill="#61DAFB" />
        </svg>
    ),
    threejs: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="#E2E8F0" strokeWidth="1.8">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
    ),
    cpp: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#00599C">
            <path d="M12 2L2 6.5v11L12 22l10-4.5v-11L12 2zm1 12.5h-2v-2H9v-2h2v-2h2v2h2v2h-2v2z" />
        </svg>
    ),
    js: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#F7DF1E">
            <rect width="24" height="24" rx="4" fill="#F7DF1E" />
            <path d="M7.5 18c.5.8 1.4 1.3 2.5 1.3 1.5 0 2.4-.8 2.4-2.1v-6h-2v6c0 .4-.3.7-.7.7-.4 0-.7-.2-.9-.5l-1.3.6zm7.2.1c1.2 0 2.2-.6 2.7-1.6l-1.6-1c-.3.5-.7.8-1.1.8-.6 0-.9-.3-.9-.8 0-1.2 3.1-1.3 3.1-3.6 0-1.5-1.2-2.6-3-2.6-1.5 0-2.6.7-3.1 1.8l1.6 1c.3-.5.7-.8 1.4-.8.6 0 .9.3.9.7 0 1.2-3.1 1.3-3.1 3.6 0 1.6 1.3 2.5 3.1 2.5z" fill="#000000" />
        </svg>
    ),
    nodejs: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#5FA04E">
            <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm6 13.5l-6 3.3-6-3.3V9.5l6-3.3 6 3.3v6z" />
        </svg>
    ),
    supabase: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#3ECF8E">
            <path d="M13.4 2.1a1 1 0 00-1.7.7v7.7H3.9a1 1 0 00-.7 1.7l10 10.3a1 1 0 001.7-.7v-7.7h7.8a1 1 0 00.7-1.7l-10-10.3z" />
        </svg>
    ),
    tailwind: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#06B6D4">
            <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
        </svg>
    ),
    gsap: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#88CE02">
            <path d="M12 2L2 19h20L12 2zm0 4.5L18.5 17h-13L12 6.5z" />
        </svg>
    ),
    express: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#F8FAFC">
            <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h11v2H4v-2z" />
        </svg>
    ),
    gemini: (
        <svg className="w-3.5 h-3.5 overflow-visible" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C12 7.523 7.523 12 2 12C7.523 12 12 16.477 12 22C12 16.477 16.477 12 22 12C16.477 12 12 7.523 12 2Z" fill="url(#gemini-sparkle-grad)" />
            <defs>
                <linearGradient id="gemini-sparkle-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4E9FDF" />
                    <stop offset="0.5" stopColor="#9B72CB" />
                    <stop offset="1" stopColor="#D96570" />
                </linearGradient>
            </defs>
        </svg>
    ),
    sql: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#4169E1">
            <path d="M12 3c-4.97 0-9 1.57-9 3.5v11C3 19.43 7.03 21 12 21s9-1.57 9-3.5v-11C21 4.57 16.97 3 12 3zm0 2c3.87 0 7 1.12 7 1.5S15.87 8 12 8 5 6.88 5 6.5 8.13 5 12 5zm0 5c3.87 0 7 1.12 7 1.5s-3.13 1.5-7 1.5-7-1.12-7-1.5S8.13 10 12 10zm0 5c3.87 0 7 1.12 7 1.5s-3.13 1.5-7 1.5-7-1.12-7-1.5 3.13-1.5 7-1.5z" />
        </svg>
    ),
    rest: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#FF6C37">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
    ),
};

const techItems = [
    { id: 'react', name: 'React.js', category: 'Frontend', color: '#61DAFB', iconKey: 'react', devicon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', isDarkIcon: false },
    { id: 'threejs', name: 'Three.js', category: '3D & AI', color: '#a78bfa', iconKey: 'threejs', devicon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg', desc: 'WebGL 3D graphics rendering, shaders, and R3F scenes.', isDarkIcon: true },
    { id: 'cpp', name: 'C++', category: 'Languages', color: '#38bdf8', iconKey: 'cpp', devicon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', desc: 'Object-oriented programming, data structures, and memory mgmt.', isDarkIcon: false },
    { id: 'js', name: 'JavaScript', category: 'Languages', color: '#facc15', iconKey: 'js', devicon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', desc: 'Modern ES6+ asynchronous logic and DOM manipulation.', isDarkIcon: false },
    { id: 'nodejs', name: 'Node.js', category: 'Backend', color: '#4ade80', iconKey: 'nodejs', devicon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', desc: 'Event-driven JavaScript runtime environment for backend APIs.', isDarkIcon: false },
    { id: 'supabase', name: 'Supabase', category: 'Backend', color: '#34d399', iconKey: 'supabase', devicon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg', desc: 'PostgreSQL database, authentication, and vector embeddings.', isDarkIcon: false },
    { id: 'tailwind', name: 'Tailwind', category: 'Frontend', color: '#38bdf8', iconKey: 'tailwind', devicon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', desc: 'Utility-first CSS framework for responsive modern layouts.', isDarkIcon: false },
    { id: 'gsap', name: 'GSAP', category: '3D & AI', color: '#88CE02', iconKey: 'gsap', devicon: '', desc: 'Timeline-based scroll animations and SplitText physics.', isDarkIcon: false, useInline: true },
    { id: 'express', name: 'Express.js', category: 'Backend', color: '#e2e8f0', iconKey: 'express', devicon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', desc: 'Lightweight RESTful server framework for Node.js APIs.', isDarkIcon: true },
    { id: 'gemini', name: 'Gemini AI', category: '3D & AI', color: '#9B72CB', iconKey: 'gemini', devicon: '', desc: 'Google Gemini multimodal AI models and Vision API processing.', isDarkIcon: false, useInline: true },
    { id: 'sql', name: 'SQL', category: 'Backend', color: '#fb923c', iconKey: 'sql', devicon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', desc: 'Relational data modeling, indexing, and complex queries.', isDarkIcon: false },
    { id: 'rest', name: 'REST APIs', category: 'Backend', color: '#f472b6', iconKey: 'rest', devicon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg', desc: 'HTTP architectures, JSON protocols, and endpoint design.', isDarkIcon: false },
];

// Central wireframe core sitting at center of sphere
const TechCore = ({ hoveredItem, selectedItem }) => {
    const coreRef = useRef();
    const materialRef = useRef();
    const lightRef = useRef();

    const activeColor = hoveredItem?.color || selectedItem?.color || "#94a3b8";

    useFrame((state, delta) => {
        if (coreRef.current) {
            coreRef.current.rotation.y += delta * 0.04;
        }

        if (materialRef.current) {
            const targetColor = new THREE.Color(activeColor);
            materialRef.current.color.lerp(targetColor, 0.08);
            materialRef.current.emissive.lerp(targetColor, 0.08);
            materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
                materialRef.current.emissiveIntensity,
                hoveredItem || selectedItem ? 0.7 : 0.25,
                0.08
            );
        }

        if (lightRef.current) {
            const targetColor = new THREE.Color(activeColor);
            lightRef.current.color.lerp(targetColor, 0.08);
            lightRef.current.intensity = THREE.MathUtils.lerp(
                lightRef.current.intensity,
                hoveredItem || selectedItem ? 2.0 : 1.0,
                0.08
            );
        }
    });

    return (
        <group>
            <mesh ref={coreRef}>
                <icosahedronGeometry args={[0.32, 1]} />
                <meshStandardMaterial
                    ref={materialRef}
                    wireframe
                    color="#94a3b8"
                    emissive="#475569"
                    emissiveIntensity={0.25}
                    transparent
                    opacity={0.3}
                />
            </mesh>
            <pointLight ref={lightRef} distance={3.5} intensity={1.0} color="#94a3b8" />
        </group>
    );
};

// Network Edges: ONLY real 3D link lines
const NetworkEdges = ({ nodePositions, techItems, hoveredId, selectedItem }) => {
    const { innerGeometry, outerGeometry } = useMemo(() => {
        const innerPoints = [];
        const outerPoints = [];
        const count = nodePositions.length;
        const connectedPairs = new Set();

        for (let i = 0; i < count; i++) {
            const p1 = new THREE.Vector3(...nodePositions[i]);

            // Inner edge: center (0,0,0) to node
            innerPoints.push(new THREE.Vector3(0, 0, 0));
            innerPoints.push(p1);

            // Outer edges: node to 2 nearest neighbors
            const neighbors = [];
            for (let j = 0; j < count; j++) {
                if (i === j) continue;
                const p2 = new THREE.Vector3(...nodePositions[j]);
                neighbors.push({ index: j, dist: p1.distanceTo(p2) });
            }
            neighbors.sort((a, b) => a.dist - b.dist);

            for (let k = 0; k < 2; k++) {
                const j = neighbors[k].index;
                const pairKey = i < j ? `${i}-${j}` : `${j}-${i}`;
                if (!connectedPairs.has(pairKey)) {
                    connectedPairs.add(pairKey);
                    outerPoints.push(p1);
                    outerPoints.push(new THREE.Vector3(...nodePositions[j]));
                }
            }
        }

        return {
            innerGeometry: new THREE.BufferGeometry().setFromPoints(innerPoints),
            outerGeometry: new THREE.BufferGeometry().setFromPoints(outerPoints),
        };
    }, [nodePositions]);

    return (
        <group>
            {/* Inner link edges connecting core to nodes */}
            <lineSegments geometry={innerGeometry}>
                <lineBasicMaterial color="#38bdf8" transparent opacity={0.2} />
            </lineSegments>

            {/* Outer link edges connecting neighbor nodes */}
            <lineSegments geometry={outerGeometry}>
                <lineBasicMaterial color="#ffffff" transparent opacity={0.15} />
            </lineSegments>

            {/* Dynamic active highlighted beam for hovered or selected node */}
            {techItems.map((item, index) => {
                const isHovered = hoveredId === item.id;
                const isSelected = selectedItem?.id === item.id;
                if (!isHovered && !isSelected) return null;

                const pos = nodePositions[index];
                const activeGeometry = new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(0, 0, 0),
                    new THREE.Vector3(pos[0], pos[1], pos[2]),
                ]);

                return (
                    <line key={`active-link-${item.id}`} geometry={activeGeometry}>
                        <lineBasicMaterial color={item.color} transparent opacity={0.95} linewidth={2} />
                    </line>
                );
            })}
        </group>
    );
};

// Compact Floating Tech Icon Node with continuous smooth 3D depth perception
const TechNode = ({ item, position, isHovered, isSelected, isFilteredOut, onHover, onClick }) => {
    const groupRef = useRef();
    const [nodeOpacity, setNodeOpacity] = useState(1);

    useFrame(({ camera }) => {
        if (groupRef.current) {
            const worldPos = new THREE.Vector3();
            groupRef.current.getWorldPosition(worldPos);

            const distToCamera = worldPos.distanceTo(camera.position);

            // Core center position in world space
            const coreWorldPos = new THREE.Vector3(0, -0.18, 0);
            const coreDistToCamera = coreWorldPos.distanceTo(camera.position);

            // Is node behind core center?
            const isBehindCenter = distToCamera > coreDistToCamera + 0.02;

            // Continuous 3D depth scaling
            const depthFactor = THREE.MathUtils.mapLinear(distToCamera, 3.5, 7.5, 1.1, 0.7);
            const clampedDepth = THREE.MathUtils.clamp(depthFactor, 0.65, 1.15);

            const hoverScale = isHovered || isSelected ? 1.25 : isFilteredOut ? 0.3 : 1.0;
            const targetScale = hoverScale * clampedDepth;
            groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12);

            // Opacity dims smoothly for nodes orbiting in the background (0.5) vs foreground (1.0)
            const targetOpacity = isFilteredOut ? 0.15 : isBehindCenter ? 0.45 : 1.0;
            setNodeOpacity(targetOpacity);
        }
    });

    const getIconStyle = () => {
        if (isHovered || isSelected) {
            if (item.isDarkIcon) {
                return { filter: 'invert(1) opacity(1)', transform: 'scale(1.1)' };
            }
            return { filter: 'grayscale(0%) opacity(1)', transform: 'scale(1.1)' };
        }
        if (item.isDarkIcon) {
            return { filter: 'invert(0.75) opacity(0.75)', transform: 'scale(1)' };
        }
        return { filter: 'grayscale(100%) opacity(0.75)', transform: 'scale(1)' };
    };

    return (
        <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.15}>
            <group ref={groupRef} position={position}>
                {/* 3D Invisible Pointer Receiver */}
                <mesh
                    onPointerOver={(e) => {
                        e.stopPropagation();
                        onHover(item.id);
                        document.body.style.cursor = 'pointer';
                    }}
                    onPointerOut={(e) => {
                        e.stopPropagation();
                        onHover(null);
                        document.body.style.cursor = 'default';
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick(item);
                    }}
                >
                    <sphereGeometry args={[0.18, 16, 16]} />
                    <meshBasicMaterial transparent opacity={0} />
                </mesh>

                {/* Micro Glass Icon Badge */}
                <Html
                    center
                    distanceFactor={4.5}
                    style={{
                        pointerEvents: 'auto',
                        transition: 'opacity 0.25s ease-out, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        opacity: nodeOpacity,
                    }}
                >
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            onClick(item);
                        }}
                        onMouseEnter={() => onHover(item.id)}
                        onMouseLeave={() => onHover(null)}
                        className="relative group/node flex flex-col items-center justify-center cursor-pointer select-none"
                    >
                        {/* Micro Floating Label Pill on Hover */}
                        <AnimatePresence>
                            {(isHovered || isSelected) && (
                                <motion.div
                                    initial={{ opacity: 0, y: 5, scale: 0.82 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 3, scale: 0.85 }}
                                    transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                                    className="absolute -top-5 px-1.5 py-0.5 rounded-full bg-black/90 border backdrop-blur-md shadow-md pointer-events-none whitespace-nowrap z-50 flex items-center gap-1"
                                    style={{ borderColor: item.color }}
                                >
                                    <span className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: item.color }} />
                                    <span className="text-[10px] font-medium tracking-tight text-white font-generalsans">
                                        {item.name}
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Standard 28px Circular Disc */}
                        <div
                            className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ease-out bg-black/40 backdrop-blur-sm ${
                                isHovered || isSelected
                                    ? 'scale-125 border-white ring-1 ring-white/40'
                                    : 'border-white/20 hover:border-white/50 scale-100'
                            }`}
                            style={{
                                borderColor: isHovered || isSelected ? item.color : undefined,
                                boxShadow: isHovered || isSelected ? `0 0 12px ${item.color}` : undefined,
                            }}
                        >
                            {!item.useInline && item.devicon ? (
                                <img
                                    src={item.devicon}
                                    alt={item.name}
                                    className="w-3.5 h-3.5 object-contain transition-all duration-300 ease-out"
                                    style={getIconStyle()}
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        if (e.currentTarget.nextSibling) {
                                            e.currentTarget.nextSibling.style.display = 'flex';
                                        }
                                    }}
                                />
                            ) : null}

                            <div
                                className={`${!item.useInline && item.devicon ? 'hidden' : 'flex'} items-center justify-center transition-all duration-300 ease-out text-slate-300`}
                                style={getIconStyle()}
                            >
                                {TechIcons[item.iconKey]}
                            </div>
                        </div>
                    </div>
                </Html>
            </group>
        </Float>
    );
};

// Main Scene Component inside Canvas
const TechScene = ({ selectedCategory, hoveredId, selectedItem, setHoveredId, setSelectedItem }) => {
    const radius = 1.28;
    const orbitalGroupRef = useRef();
    const controlsRef = useRef();

    useFrame((state, delta) => {
        // Slow, elegant continuous multi-axis rotation
        if (orbitalGroupRef.current && !hoveredId && !selectedItem) {
            orbitalGroupRef.current.rotation.y += delta * 0.08;
            orbitalGroupRef.current.rotation.x += delta * 0.02;
        }

        if (controlsRef.current) {
            controlsRef.current.update();
        }
    });

    const nodePositions = useMemo(() => {
        const coords = [];
        const count = techItems.length;
        const phi = Math.PI * (3 - Math.sqrt(5));

        for (let i = 0; i < count; i++) {
            const y = 1 - (i / (count - 1)) * 2;
            const radiusAtY = Math.sqrt(1 - y * y);
            const theta = phi * i;

            const x = Math.cos(theta) * radiusAtY;
            const z = Math.sin(theta) * radiusAtY;

            coords.push([x * radius, y * radius, z * radius]);
        }
        return coords;
    }, [radius]);

    const hoveredItem = useMemo(() => techItems.find((t) => t.id === hoveredId), [hoveredId]);

    return (
        <>
            <ambientLight intensity={0.9} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.4} color="#38bdf8" />

            {/* Orbital Group with slow continuous multi-axis 360-degree rotation */}
            <group ref={orbitalGroupRef} position={[0, -0.18, 0]} rotation={[0.32, 0, 0.18]}>
                {/* Network link edges */}
                <NetworkEdges
                    nodePositions={nodePositions}
                    techItems={techItems}
                    hoveredId={hoveredId}
                    selectedItem={selectedItem}
                />

                {/* Center Core */}
                <TechCore hoveredItem={hoveredItem} selectedItem={selectedItem} />

                {/* 3D Tech Nodes */}
                {techItems.map((item, index) => {
                    const isFilteredOut = selectedCategory !== 'All' && item.category !== selectedCategory;
                    return (
                        <TechNode
                            key={item.id}
                            item={item}
                            position={nodePositions[index]}
                            isHovered={hoveredId === item.id}
                            isSelected={selectedItem?.id === item.id}
                            isFilteredOut={isFilteredOut}
                            onHover={setHoveredId}
                            onClick={setSelectedItem}
                        />
                    );
                })}
            </group>

            {/* Orbit Controls with UNRESTRICTED 360-degree multi-directional rotation */}
            <OrbitControls
                ref={controlsRef}
                enableZoom={false}
                rotateSpeed={0.8}
                enablePan={false}
            />
        </>
    );
};

// Container Component with UI controls & detail drawer overlay
const TechStack3D = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [hoveredId, setHoveredId] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    const categories = ['All', 'Frontend', 'Backend', 'Languages', '3D & AI'];

    // Toggle selection: clicking the currently selected skill deselects it, returning model to normal
    const handleNodeClick = (item) => {
        if (selectedItem?.id === item.id) {
            setSelectedItem(null);
            return;
        }

        setSelectedItem(item);
        if (selectedCategory !== 'All' && item.category !== selectedCategory) {
            setSelectedCategory('All');
        }
    };

    const isSkillActive = Boolean(hoveredId || selectedItem);

    return (
        <div className="relative w-full h-[290px] sm:h-[320px] rounded-2xl overflow-hidden bg-transparent flex flex-col justify-between p-3 group">
            {/* Category Filter Pills Container (z-30 when unselected so buttons are 100% clickable; z-10 when skill active) */}
            <div className={`flex items-center justify-center w-full pointer-events-auto px-1 transition-all duration-300 ease-out ${
                isSkillActive ? 'z-10' : 'z-30'
            }`}>
                <div className="flex items-center justify-center gap-0.5 sm:gap-1 bg-black/60 p-0.5 sm:p-1 rounded-xl border border-white/10 text-xs backdrop-blur-md font-generalsans shadow-lg">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-lg transition-all duration-200 font-medium text-[8px] sm:text-[9.5px] whitespace-nowrap ${
                                selectedCategory === cat
                                    ? 'bg-white/20 text-white shadow-sm'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* 3D Canvas: z-0 when idle; z-40 ONLY when skill hovered/selected with smooth transition */}
            <div className={`absolute inset-0 w-full h-full transition-all duration-500 ease-out scale-100 ${
                isSkillActive ? 'z-40 pointer-events-auto' : 'z-0 pointer-events-auto'
            }`}>
                <Canvas camera={{ position: [0, 0, 4.6], fov: 42 }}>
                    <React.Suspense fallback={<CanvasLoader />}>
                        <TechScene
                            selectedCategory={selectedCategory}
                            hoveredId={hoveredId}
                            selectedItem={selectedItem}
                            setHoveredId={setHoveredId}
                            setSelectedItem={handleNodeClick}
                        />
                    </React.Suspense>
                </Canvas>
            </div>

            {/* Selected item details card with smooth spring animation (z-50) */}
            <div className="z-50 w-full pointer-events-auto font-generalsans">
                <AnimatePresence mode="wait">
                    {selectedItem && (
                        <motion.div
                            key={selectedItem.id}
                            initial={{ opacity: 0, y: 12, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                            transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                            className="bg-black/90 border border-white/15 backdrop-blur-md p-2 rounded-xl flex items-center justify-between gap-2.5 shadow-xl max-w-full overflow-hidden"
                        >
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                                <div
                                    className="w-7 h-7 rounded-lg flex items-center justify-center p-1 shrink-0 shadow-inner transition-all duration-300"
                                    style={{ backgroundColor: `${selectedItem.color}20`, border: `1px solid ${selectedItem.color}50` }}
                                >
                                    {!selectedItem.useInline && selectedItem.devicon ? (
                                        <img
                                            src={selectedItem.devicon}
                                            alt={selectedItem.name}
                                            className="w-3.5 h-3.5 object-contain"
                                            style={selectedItem.isDarkIcon ? { filter: 'brightness(0) invert(1)' } : undefined}
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                if (e.currentTarget.nextSibling) {
                                                    e.currentTarget.nextSibling.style.display = 'flex';
                                                }
                                            }}
                                        />
                                    ) : null}

                                    <div
                                        className={`${!selectedItem.useInline && selectedItem.devicon ? 'hidden' : 'flex'} items-center justify-center text-slate-300`}
                                    >
                                        {TechIcons[selectedItem.iconKey]}
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                        <h4 className="text-[11px] font-bold text-white leading-tight">{selectedItem.name}</h4>
                                        <span className="text-[8px] sm:text-[8.5px] px-1.5 py-0.2 rounded-full bg-white/10 text-gray-300 font-mono">
                                            {selectedItem.category}
                                        </span>
                                    </div>
                                    <p className="text-[9px] sm:text-[9.5px] text-gray-300 line-clamp-2 leading-tight mt-0.5 break-words">
                                        {selectedItem.desc}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="text-gray-400 hover:text-white p-1 hover:bg-white/10 rounded-md transition-all text-xs shrink-0"
                                title="Close details"
                            >
                                ✕
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TechStack3D;
