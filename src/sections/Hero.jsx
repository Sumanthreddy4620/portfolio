import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import KeyBoard from "../components/KeyBoard.jsx";
import { Suspense, useRef } from "react";
import CanvasLoader from "../components/CanvasLoader.jsx";
// import { Leva, useControls } from "leva";
import { useMediaQuery } from "react-responsive";
import { calculateSizes } from "../constants/index.js";

const KeyBoardWrapper = ({ scale, position, rotation }) => {
    const ref = useRef();

    useFrame(({ mouse }) => {
        if (ref.current) {
            ref.current.rotation.y = rotation[1] + mouse.x * 0.1;
            ref.current.rotation.x = rotation[0] + (-mouse.y * 0.1);
        }
    });

    return <KeyBoard ref={ref} scale={scale} position={position} rotation={rotation} />;
};

const Hero = () => {
    const isSmall = useMediaQuery({ maxWidth: 440 });
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
    const sizes = calculateSizes(isSmall, isMobile, isTablet);

    // const x = useControls('KeyBoard', {
    //     positionX: { value: 5.0, min: -10, max: 10 },
    //     positionY: { value: -3.5, min: -10, max: 10 },
    //     positionZ: { value: 2.9, min: -10, max: 10 },
    //     rotationX: { value: -2.1, min: -10, max: 10 },
    //     rotationY: { value: 3.7, min: -10, max: 10 },
    //     rotationZ: { value: 3.3, min: -10, max: 10 },
    //     scale: { value: 0.4, min: 0.1, max: 2 },
    // });

    return (
        <section className="min-h-screen w-full flex flex-col relative overflow-hidden" id="home">
            <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
                <p className="sm:text-3xl text-2xl font-medium text-white text-center font-generalsans" style={{zIndex : 20}}>
                    Hi, I am Sumanth <span className="waving-hand">👋</span>
                </p>
                <p className="hero_tag text-gray_gradient">
                    I build things that look good and work better.
                </p>
            </div>
            <div className="w-full h-full absolute inset-0">
                {/*<Leva />*/}
                <Canvas>
                    <Suspense fallback={<CanvasLoader />}>
                        <PerspectiveCamera makeDefault position={[0, 0, 20]} />
                        <KeyBoardWrapper
                            scale={sizes.deskScale}
                            position={sizes.deskPosition}
                            rotation={[-2.1, 3.7, 3.3]}
                        />
                        <ambientLight intensity={1} />
                        <directionalLight position={[10, 10, 10]} intensity={0.5} />
                    </Suspense>
                </Canvas>
            </div>
        </section>
    );
};

export default Hero;