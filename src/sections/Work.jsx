import React, { useState } from 'react';
import BorderGlow from '../components/ui/BorderGlow';
import { projects } from '../constants/index.js';

const Work = () => {
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent(i => Math.max(0, i - 1));
    const next = () => setCurrent(i => Math.min(projects.length - 1, i + 1));

    return (
        <section className="w-full py-20 c-space" id="work">
            <h1 className="sm:text-3xl text-2xl font-semibold text-white text-center font-generalsans mb-12">
                Projects ShowCase
            </h1>

            <div className="relative max-w-5xl mx-auto px-2 py-6">

                <div style={{ overflow: 'clip' }}>
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${current * 100}%)` }}
                    >
                        {projects.map((p, i) => (
                            <div key={i} className="min-w-full px-4 py-10">
                                <BorderGlow
                                    glowColor={p.glowColor}
                                    backgroundColor="#0E0E10"
                                    borderRadius={16}
                                    glowRadius={40}
                                    glowIntensity={0.6}
                                    coneSpread={25}
                                    colors={p.colors}
                                    animated={true}
                                >
                                    <div className="p-8 flex flex-col lg:flex-row gap-8 items-center">
                                        <div className="flex-1 flex flex-col gap-5">
                                            <h2 className="text-white text-xl sm:text-2xl font-bold leading-snug">
                                                {p.title}
                                            </h2>
                                            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                                                {p.description}
                                            </p>
                                            {p.tags && (
                                                <div className="flex flex-wrap gap-2 mt-1">
                                                    {p.tags.map((tag, k) => (
                                                        <span
                                                            key={k}
                                                            style={{ borderColor: p.colors[k % p.colors.length] + '40', color: p.colors[k % p.colors.length] }}
                                                            className="px-3 py-1 text-xs font-medium rounded-full border bg-white/5 tracking-wide"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="w-full lg:w-[45%] rounded-xl overflow-hidden border border-white/10 shrink-0">
                                            <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                </BorderGlow>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-center gap-4 mt-2">
                    <button
                        onClick={prev}
                        disabled={current === 0}
                        className="p-3 rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
                    >
                        ←
                    </button>

                    <div className="flex gap-2">
                        {projects.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                    i === current ? 'bg-white scale-125' : 'bg-white/30'
                                }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={next}
                        disabled={current === projects.length - 1}
                        className="p-3 rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
                    >
                        →
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Work;