import React from 'react'
import Navbar from "./sections/Navbar.jsx";
import Hero from "./sections/Hero.jsx";
import Particles from "./sections/Particles.jsx";
import Work from "./sections/Work.jsx";
import About from "./sections/About.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";
const App = () => {
    return (
        <main className="relative w-full">
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 0 }}>
                <Particles
                    particleColors={["#ffffff"]}
                    particleCount={200}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover
                    alphaParticles={false}
                    disableRotation={false}
                    pixelRatio={1}
                />
            </div>
            <div style={{ position: 'relative', zIndex: 10 }}>
                <Navbar />
                <Hero />
                <About />
                <Work />
                <Contact />
                <Footer />
            </div>
        </main>
    )
}
export default App


