import React, { Suspense, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Environment, Html } from "@react-three/drei";
import * as THREE from "three";

const LOGO_SRC = "/StensizeLogo.png";

function Particles({ count = 500 }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 5;
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      arr[i * 3 + 0] = r * Math.sin(theta) * Math.cos(phi);
      arr[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      arr[i * 3 + 2] = r * Math.cos(theta);
    }
    return arr;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.01} sizeAttenuation color="#ffffff" opacity={0.45} transparent />
    </points>
  );
}

function Hero3D() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 42 }} dpr={[1, 2]}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} />
      <Suspense fallback={<Html center><div className="text-white/70">Loading…</div></Html>}>
        <Particles count={600} />
        {/* <SRibbon /> */}
        <Environment preset="city" />
      </Suspense>
      <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.6} />
      <Stars radius={50} depth={30} count={1200} factor={2} fade speed={0.5} />
    </Canvas>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  
  return (
    <section id="home" className="relative overflow-hidden">
        <motion.div style={{ y: glowY }} className="pointer-events-none absolute -inset-x-10 -top-40 h-80 opacity-30" aria-hidden>
          <div className="h-full w-full" style={{ background: "radial-gradient(60% 60% at 60% 40%, rgba(255,255,255,0.12) 0%, rgba(0,0,0,0) 70%)" }} />
        </motion.div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-10">
          <div className="relative rounded-3xl border bg-[#151518] border-white/10 p-0 overflow-hidden flex flex-col md:flex-row gap-8 items-stretch">
            <div className="absolute inset-0">
              <Hero3D />
            </div>
            {/* Right: 3D Cube Logo */}
            <div className="relative flex-1 min-w-0 flex items-center justify-center p-1 sm:p-10">
              <div className="w-full h-full text-center">
                <Canvas camera={{ position: [5, 4.5, 4.5], fov: 50 }}>
                  <ambientLight intensity={0.7} />
                  <directionalLight position={[3, 4, 5]} intensity={1.2} />
                  <OrbitControls enablePan={false} enableZoom={false} />
                  <Suspense fallback={<Html center><div className="text-white/70">Loading…</div></Html>}>
                    <mesh>
                      <boxGeometry args={[3.5, 3.5, 3.5]} />
                      <meshStandardMaterial>
                        <primitive
                          attach="map"
                          object={useMemo(() => {
                            const texture = new THREE.TextureLoader().load(LOGO_SRC);
                            texture.anisotropy = 16;
                            return texture;
                          }, [])}
                        />
                      </meshStandardMaterial>
                    </mesh>
                  </Suspense>
                </Canvas>
              </div>
            </div>
            {/* Left: 3D Canvas + Content */}
            <div className="relative flex-2 min-w-0">
              <div className="relative z-10 p-6 sm:p-7 h-full flex flex-col">
                <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-white/60">
                  <span>Engineering</span><span className="opacity-40">•</span><span>Design</span><span className="opacity-40">•</span><span>Artificial Intelligence</span>
                </div>
                <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                  Transforming Ideas into
                  <span className="text-white/70"> Digital Reality</span>
                </h1>
                <p className="mt-4 text-base sm:text-lg text-white/70 max-w-xl">
                  Stensize delivers modern web, mobile, design, and AI solutions to help businesses grow and stand out.
                </p>
                <div className="mt-auto pt-6 flex flex-wrap gap-3">
                  <motion.a whileTap={{ scale: 0.97 }} href="#contact" className="px-6 py-3 rounded-2xl bg-white text-black font-semibold shadow hover:shadow-lg transition-shadow">Start a project</motion.a>
                  <motion.a whileTap={{ scale: 0.97 }} href="#work" className="px-6 py-3 rounded-2xl border border-white/15 text-blue-200 hover:bg-white/5">Our work</motion.a>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  )
}
