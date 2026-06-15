import { useState, useRef } from 'react';
import Globe from 'react-globe.gl';
import Button from '../components/Button.jsx';

const GridCard = ({ children, spotX, spotY, color, gridRef, isInGrid }) => {
    const cardRef = useRef(null);

    const getLocalPos = () => {
        if (!cardRef.current || !gridRef?.current) return { x: 0, y: 0 };
        const rect = cardRef.current.getBoundingClientRect();
        const gridRect = gridRef.current.getBoundingClientRect();
        return {
            x: spotX - (rect.left - gridRect.left),
            y: spotY - (rect.top - gridRect.top),
        };
    };

    const isNear = () => {
        if (!cardRef.current || !gridRef?.current) return false;
        const rect = cardRef.current.getBoundingClientRect();
        const gridRect = gridRef.current.getBoundingClientRect();
        const absX = spotX + gridRect.left;
        const absY = spotY + gridRect.top;
        const margin = 150;
        return (
            absX >= rect.left - margin &&
            absX <= rect.right + margin &&
            absY >= rect.top - margin &&
            absY <= rect.bottom + margin
        );
    };

    const { x, y } = getLocalPos();

    return (
        <div ref={cardRef} className="grid-container h-full relative overflow-hidden">
            <div
                className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] transition-opacity duration-300"
                style={{
                    opacity: isInGrid && isNear() ? 1 : 0,
                    background: `radial-gradient(350px circle at ${x}px ${y}px, ${color}, transparent 70%)`,
                }}
            />
            {children}
        </div>
    );
};

const About = () => {
    const [hasCopied, setHasCopied] = useState(false);
    const [cursor, setCursor] = useState({ x: 0, y: 0 });
    const [isInGrid, setIsInGrid] = useState(false);
    const gridRef = useRef(null);

    const handleCopy = () => {
        navigator.clipboard.writeText('k.sumanthreddy4620@gmail.com');
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2000);
    };

    const handleMouseMove = (e) => {
        const rect = gridRef.current.getBoundingClientRect();
        setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <section className="c-space my-20" id="about">
            <div
                ref={gridRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsInGrid(true)}
                onMouseLeave={() => setIsInGrid(false)}
                className="relative grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full"
            >
                {/* Shared background glow */}
                <div
                    className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
                    style={{
                        opacity: isInGrid ? 1 : 0,
                        background: `radial-gradient(600px circle at ${cursor.x}px ${cursor.y}px, rgba(255,255,255,0.03), transparent 50%)`,
                    }}
                />

                {/* Card 1 */}
                <div className="col-span-1 xl:row-span-3 relative z-10">
                    <GridCard spotX={cursor.x} spotY={cursor.y} color="rgba(255,255,255,0.1)" gridRef={gridRef} isInGrid={isInGrid}>
                        <img src="assets/grid1.png" alt="grid-1" className="w-full sm:h-[276px] h-fit object-contain" />
                        <div>
                            <p className="grid-headtext">Hi, I'm Sumanthreddy Kasireddy</p>
                            <p className="grid-subtext">
                                Computer Science student focused on Full-Stack Development, React applications, and interactive web experiences.
                            </p>
                        </div>
                    </GridCard>
                </div>

                {/* Card 2 */}
                <div className="col-span-1 xl:row-span-3 relative z-10">
                    <GridCard spotX={cursor.x} spotY={cursor.y} color="rgba(255,255,255,0.1)" gridRef={gridRef} isInGrid={isInGrid}>
                        <img src="assets/grid2.png" alt="grid-2" className="w-full sm:h-[276px] h-fit object-contain" />
                        <div>
                            <p className="grid-headtext">Tech Stack</p>
                            <p className="grid-subtext">
                                My toolkit includes C, C++, Python, JavaScript, React, and full-stack development technologies. I enjoy turning ideas into functional applications and am currently exploring React Three Fiber to create immersive 3D experiences on the web.
                            </p>
                        </div>
                    </GridCard>
                </div>

                {/* Card 3 - Globe */}
                <div className="col-span-1 xl:row-span-4 relative z-10">
                    <GridCard spotX={cursor.x} spotY={cursor.y} color="rgba(255,255,255,0.1)" gridRef={gridRef} isInGrid={isInGrid}>
                        <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
                            <Globe
                                height={326}
                                width={326}
                                backgroundColor="rgba(0, 0, 0, 0)"
                                backgroundImageOpacity={0.5}
                                showAtmosphere
                                showGraticules
                                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                                // labelsData={[{ lat: 17.3, lng: 79.1, text: 'Miryalaguda, India', color: 'white', size: 15 }]}
                            />
                        </div>
                        <div>
                            <p className="grid-headtext">Open to Internships & Collaborations</p>
                            <p className="grid-subtext">I'm based in India and eager to collaborate with developers, startups, and teams worldwide. I'm actively seeking internship opportunities where I can contribute, learn, and grow as a software developer.</p>
                            <a href="#contact" className="w-fit"><Button name="Contact Me" isBeam containerClass="w-full mt-10" /></a>
                        </div>
                    </GridCard>
                </div>

                {/* Card 4 */}
                <div className="xl:col-span-2 xl:row-span-3 relative z-10">
                    <GridCard spotX={cursor.x} spotY={cursor.y} color="rgba(255,255,255,0.1)" gridRef={gridRef} isInGrid={isInGrid}>
                        <img src="assets/grid3.png" alt="grid-3" className="w-full sm:h-[266px] h-fit object-contain" />
                        <div>
                            <p className="grid-headtext">My Passion for Coding</p>
                            <p className="grid-subtext">
                                I love solving problems and building things through code. Programming isn't just my profession—it's my passion. I enjoy exploring new technologies, and enhancing my skills.
                            </p>
                        </div>
                    </GridCard>
                </div>

                {/* Card 5 - Email */}
                <div className="xl:col-span-1 xl:row-span-2 relative z-10">
                    <GridCard spotX={cursor.x} spotY={cursor.y} color="rgba(255,255,255,0.1)" gridRef={gridRef} isInGrid={isInGrid}>
                        <img
                            src="assets/grid4.png"
                            alt="grid-4"
                            className="w-full md:h-[126px] sm:h-[276px] lg:h-[200px] h-fit object-cover sm:object-top"
                        />
                        <div className="space-y-2">
                            <p className="grid-subtext text-center">Contact me</p>
                            <div className="copy-container" onClick={handleCopy}>
                                <img src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'} alt="copy" />
                                <p className="lg:text-xl md:text-xl font-medium text-gray_gradient text-white">
                                    k.sumanthreddy4620@gmail.com
                                </p>
                            </div>
                        </div>
                    </GridCard>
                </div>

            </div>
        </section>
    );
};

export default About;