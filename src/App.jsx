/* eslint react/no-unknown-property: off, react/prop-types: off */
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";

function FloatingForms({ isPaused }) {
    const group = useRef();
    const orb = useRef();
    const ring = useRef();

    useFrame(({ clock, pointer }) => {
        if (isPaused) return;

        const time = clock.getElapsedTime();
        if (group.current) {
            group.current.rotation.y = time * 0.16 + pointer.x * 0.12;
            group.current.rotation.x = pointer.y * 0.08;
            group.current.position.y = Math.sin(time * 0.7) * 0.08;
        }
        if (orb.current) {
            orb.current.rotation.y = time * 0.22;
            orb.current.scale.setScalar(1 + Math.sin(time * 1.1) * 0.025);
        }
        if (ring.current) ring.current.rotation.z = time * 0.12;
    });

    return (
        <group ref={group}>
            <mesh ref={orb} position={[0, 0, 0]}>
                <sphereGeometry args={[1.05, 48, 48]} />
                <meshPhysicalMaterial
                    color="#ff6848"
                    roughness={0.24}
                    metalness={0.12}
                    clearcoat={0.7}
                    clearcoatRoughness={0.2}
                />
            </mesh>

            <mesh ref={ring} rotation={[1.13, 0.18, -0.34]}>
                <torusGeometry args={[1.42, 0.018, 12, 120]} />
                <meshStandardMaterial
                    color="#2727d9"
                    metalness={0.5}
                    roughness={0.28}
                />
            </mesh>

            <mesh position={[1.03, 0.82, 0.28]} scale={0.19}>
                <icosahedronGeometry args={[1, 2]} />
                <meshStandardMaterial
                    color="#ffca55"
                    roughness={0.24}
                    metalness={0.18}
                />
            </mesh>
            <mesh position={[-1.18, -0.7, 0.25]} scale={0.13}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial
                    color="#b8d9c8"
                    roughness={0.2}
                    metalness={0.12}
                />
            </mesh>
            <mesh position={[0.85, -1.05, -0.35]} rotation={[0.5, 0.4, 0.2]}>
                <torusGeometry args={[0.19, 0.045, 12, 40]} />
                <meshStandardMaterial
                    color="#2727d9"
                    metalness={0.5}
                    roughness={0.25}
                />
            </mesh>
        </group>
    );
}

function HeroScene({ isPaused }) {
    return (
        <Canvas
            camera={{ position: [0, 0, 4.7], fov: 40 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
            aria-hidden="true"
        >
            <ambientLight intensity={1.25} />
            <directionalLight position={[3, 4, 4]} intensity={2.2} />
            <pointLight position={[-3, -2, 2]} color="#b8d9c8" intensity={30} />
            <FloatingForms isPaused={isPaused} />
        </Canvas>
    );
}

const objects = [
    {
        number: "01",
        name: "The Daydream",
        type: "A study in soft forms",
        className: "object-card--peach",
        shape: "shape--orb",
    },
    {
        number: "02",
        name: "Orbit No. 2",
        type: "A little room to wander",
        className: "object-card--blue",
        shape: "shape--ring",
    },
    {
        number: "03",
        name: "Small Wonder",
        type: "Made to catch the light",
        className: "object-card--green",
        shape: "shape--pill",
    },
];

function App() {
    const [isPaused, setIsPaused] = useState(
        () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );

    useEffect(() => {
        const motionPreference = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        );
        const syncMotionPreference = (event) => setIsPaused(event.matches);

        motionPreference.addEventListener("change", syncMotionPreference);
        return () =>
            motionPreference.removeEventListener(
                "change",
                syncMotionPreference,
            );
    }, []);

    return (
        <main>
            <header className="site-header">
                <a className="wordmark" href="#home" aria-label="Forma home">
                    forma<span className="wordmark__dot">.</span>
                </a>
                <nav className="main-nav" aria-label="Main navigation">
                    <a href="#objects">Objects</a>
                    <a href="#about">Our world</a>
                </nav>
                <a className="header-link" href="#about">
                    Say hello <span aria-hidden="true">↗</span>
                </a>
            </header>

            <section className="hero" id="home" aria-labelledby="hero-title">
                <div className="hero-copy">
                    <p className="eyebrow">
                        <span /> An independent digital playground
                    </p>
                    <h1 id="hero-title">
                        A little more
                        <br />
                        wonder in your <span>world.</span>
                    </h1>
                    <p className="hero-description">
                        We make playful digital objects that bring a little
                        motion, magic, and meaning to the everyday.
                    </p>
                    <a className="primary-link" href="#objects">
                        Explore the objects <span aria-hidden="true">↗</span>
                    </a>
                    <div className="hero-note">
                        <span className="hero-note__line" />
                        <span>Thoughtfully made. Happily unexpected.</span>
                    </div>
                </div>

                <div
                    className="hero-art"
                    aria-label="An animated 3D coral form surrounded by orbiting shapes"
                >
                    <div className="art-wash" />
                    <div className="art-caption art-caption--top">
                        FIG. 01 <span>—</span> FORM IN MOTION
                    </div>
                    <HeroScene isPaused={isPaused} />
                    <div className="art-caption art-caption--bottom">
                        A softer kind of digital
                    </div>
                    <button
                        className="motion-toggle"
                        type="button"
                        onClick={() => setIsPaused((paused) => !paused)}
                        aria-pressed={isPaused}
                        aria-label={
                            isPaused ? "Resume animation" : "Pause animation"
                        }
                    >
                        <span aria-hidden="true">{isPaused ? "▶" : "Ⅱ"}</span>
                        {isPaused ? "Play motion" : "Pause motion"}
                    </button>
                    <span className="orbit-label orbit-label--one">∞</span>
                    <span className="orbit-label orbit-label--two">01</span>
                </div>

                <a className="scroll-cue" href="#objects">
                    <span>Scroll to explore</span>
                    <span aria-hidden="true">↓</span>
                </a>
            </section>

            <section
                className="objects-section"
                id="objects"
                aria-labelledby="objects-title"
            >
                <div className="section-heading">
                    <div>
                        <p className="eyebrow">
                            <span /> A few things we made
                        </p>
                        <h2 id="objects-title">
                            Objects with a little <em>extra.</em>
                        </h2>
                    </div>
                    <p className="section-intro">
                        A growing collection of curious forms, made for screens
                        and the people on the other side of them.
                    </p>
                </div>

                <div className="object-grid">
                    {objects.map((object) => (
                        <article
                            className={`object-card ${object.className}`}
                            key={object.number}
                        >
                            <div
                                className="object-card__art"
                                aria-hidden="true"
                            >
                                <span
                                    className={`object-shape ${object.shape}`}
                                />
                                <span className="object-card__number">
                                    {object.number}
                                </span>
                                <span className="object-card__sparkle">✳</span>
                            </div>
                            <div className="object-card__details">
                                <div>
                                    <h3>{object.name}</h3>
                                    <p>{object.type}</p>
                                </div>
                                <span aria-hidden="true">↗</span>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <footer className="site-footer" id="about">
                <a className="wordmark wordmark--footer" href="#home">
                    forma<span className="wordmark__dot">.</span>
                </a>
                <p>Made with curiosity &amp; a little bit of code.</p>
                <a href="mailto:hello@forma.studio">
                    Have a good idea? <span aria-hidden="true">↗</span>
                </a>
            </footer>
        </main>
    );
}

export default App;
