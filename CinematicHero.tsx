import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
  Float,
} from "@react-three/drei";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import * as THREE from "three";

// Enhanced 3D Shopify Storefront
const FloatingStorefront = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.25) * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.05} floatIntensity={0.2}>
      <group ref={groupRef}>
        {/* Main screen with cinematic styling */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[4, 5, 0.1]} />
          <meshStandardMaterial
            color="#0A0A0A"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Screen content */}
        <mesh position={[0, 0, 0.06]}>
          <boxGeometry args={[3.6, 4.6, 0.01]} />
          <meshStandardMaterial color="#1B1B1F" />
        </mesh>

        {/* Header with gold gradient */}
        <mesh position={[0, 1.8, 0.07]}>
          <boxGeometry args={[3.4, 0.6, 0.01]} />
          <meshStandardMaterial
            color="#FFD580"
            emissive="#FFD580"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Product cards */}
        {[-1.2, 0, 1.2].map((x, i) => (
          <mesh key={i} position={[x, 0.2, 0.07]}>
            <boxGeometry args={[0.8, 1.2, 0.01]} />
            <meshStandardMaterial color="#F2F2F2" opacity={0.95} transparent />
          </mesh>
        ))}

        {/* CTA Button with accent color */}
        <mesh position={[0, -1.5, 0.07]}>
          <boxGeometry args={[2, 0.5, 0.01]} />
          <meshStandardMaterial
            color="#FF5E5B"
            emissive="#FF5E5B"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Floating geometric elements */}
        <Float speed={2} rotationIntensity={0.8} floatIntensity={1}>
          <mesh position={[-3, 2, 1]}>
            <octahedronGeometry args={[0.15]} />
            <meshStandardMaterial color="#FFD580" wireframe />
          </mesh>
        </Float>

        <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.6}>
          <mesh position={[3, -1, 0.5]}>
            <sphereGeometry args={[0.12]} />
            <meshStandardMaterial
              color="#FF5E5B"
              emissive="#FF5E5B"
              emissiveIntensity={0.3}
            />
          </mesh>
        </Float>

        <Float speed={3} rotationIntensity={0.6} floatIntensity={0.8}>
          <mesh position={[-2, -2, 1.5]}>
            <boxGeometry args={[0.08, 0.08, 0.08]} />
            <meshStandardMaterial color="#FFD580" metalness={1} roughness={0} />
          </mesh>
        </Float>
      </group>
    </Float>
  );
};

// Cinematic ripple background effect
const CinematicRippleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawCinematicWaves = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const time = timeRef.current * 0.0008;
      const mouseX = mouseRef.current.x / canvas.width;
      const mouseY = mouseRef.current.y / canvas.height;

      // Create sophisticated gradient
      const gradient = ctx.createRadialGradient(
        canvas.width * mouseX,
        canvas.height * mouseY,
        0,
        canvas.width * mouseX,
        canvas.height * mouseY,
        canvas.width * 0.6,
      );

      gradient.addColorStop(0, "rgba(255, 213, 128, 0.08)");
      gradient.addColorStop(0.4, "rgba(255, 94, 91, 0.04)");
      gradient.addColorStop(1, "rgba(10, 10, 10, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw elegant flowing waves
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);

        for (let x = 0; x <= canvas.width; x += 15) {
          const baseY = canvas.height / 2;
          const waveY =
            baseY +
            Math.sin((x * 0.008 + time + i * 1.5) * Math.PI) * 40 +
            Math.sin((mouseX * 8 + time + i * 0.7) * Math.PI) * 25;
          ctx.lineTo(x, waveY);
        }

        const alpha = 0.06 - i * 0.01;
        const color = i % 2 === 0 ? "255, 213, 128" : "255, 94, 91";
        ctx.strokeStyle = `rgba(${color}, ${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      timeRef.current += 16.67;
      animationFrame = requestAnimationFrame(drawCinematicWaves);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    drawCinematicWaves();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ mixBlendMode: "normal" }}
    />
  );
};

const CinematicHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -150]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const isInView = useInView(containerRef, { once: true });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ y, opacity }}
    >
      {/* Cinematic base background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-charcoal to-graphite" />

      {/* Interactive ripple background */}
      <CinematicRippleBackground />

      {/* Subtle grain texture */}
      <div className="absolute inset-0 cinematic-grain opacity-40" />

      {/* Grid overlay with fade */}
      <div className="absolute inset-0 opacity-[0.03]">
        <motion.div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255,213,128,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,213,128,0.2) 1px, transparent 1px)`,
            backgroundSize: "100px 100px",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Floating ambient elements */}
      <motion.div
        className="absolute top-40 left-20 w-20 h-20 border border-gold/20 rotate-45"
        animate={{
          rotate: [45, 225, 405],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-80 right-24 w-16 h-16 bg-accent/10 rounded-full"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
        {/* Content side */}
        <motion.div
          className="text-center lg:text-left space-y-12"
          initial={{ opacity: 0, x: -80 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          {/* Main headline with cinematic reveal */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-bold leading-[0.9] tracking-tight">
              <motion.span
                className="block text-gray-100 mb-2"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                WE BRING
              </motion.span>
              <motion.span
                className="block text-gradient mb-2"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1 }}
              >
                SHOPIFY
              </motion.span>
              <motion.span
                className="block text-gray-100 mb-2"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                DREAMS
              </motion.span>
              <motion.span
                className="block text-gold"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.4 }}
                style={{
                  textShadow: "0 0 30px rgba(255, 213, 128, 0.6)",
                }}
              >
                TO LIFE
              </motion.span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-2xl md:text-3xl text-gray-300 max-w-2xl font-light leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            Custom Shopify themes built for{" "}
            <motion.span
              className="text-gold font-medium"
              animate={{
                color: ["#FFD580", "#FF5E5B", "#FFD580"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              bold, growing brands
            </motion.span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gold to-accent rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <Button
                onClick={() => scrollToSection("contact")}
                className="relative bg-gradient-to-r from-gold to-accent text-black hover:from-gold/90 hover:to-accent/90 font-bold text-lg px-12 py-6 rounded-xl overflow-hidden group tracking-wide"
              >
                <span className="relative z-10">SCHEDULE A CALL</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "200%" }}
                  transition={{ duration: 0.8 }}
                />
              </Button>
            </motion.div>

            <motion.button
              onClick={() => scrollToSection("work")}
              className="text-gray-200 border-2 border-gold/40 hover:border-gold/80 hover:text-gold px-10 py-6 rounded-xl transition-all duration-300 relative group font-medium tracking-wide"
              whileHover={{ scale: 1.05, y: -8 }}
            >
              <span className="relative z-10">VIEW OUR WORK</span>
              <motion.div
                className="absolute inset-0 bg-gold/5 rounded-xl"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* 3D Showcase side */}
        <motion.div
          className="relative h-[600px] lg:h-[750px]"
          initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
          animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
          transition={{ duration: 1.5, delay: 0.8 }}
        >
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <Suspense fallback={null}>
              <PerspectiveCamera makeDefault position={[0, 0, 8]} />
              <ambientLight intensity={0.2} />
              <pointLight
                position={[5, 5, 5]}
                intensity={1.2}
                color="#FFD580"
              />
              <pointLight
                position={[-5, -5, 5]}
                intensity={0.8}
                color="#FF5E5B"
              />
              <spotLight
                position={[0, 10, 10]}
                angle={0.3}
                intensity={1}
                color="#FFD580"
                castShadow
              />
              <FloatingStorefront />
              <Environment preset="night" />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.2}
              />
            </Suspense>
          </Canvas>

          {/* Performance metrics with cinematic styling */}
          <motion.div
            className="absolute top-24 -left-8 bg-black/90 backdrop-blur-sm border border-gold/30 rounded-xl px-6 py-4"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <div className="text-gold font-bold text-xl">+127%</div>
            <div className="text-gray-400 text-xs tracking-wider uppercase">
              Revenue Growth
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-32 -right-8 bg-black/90 backdrop-blur-sm border border-accent/30 rounded-xl px-6 py-4"
            animate={{ y: [0, 18, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 2.5 }}
          >
            <div className="text-accent font-bold text-xl">0.9s</div>
            <div className="text-gray-400 text-xs tracking-wider uppercase">
              Load Time
            </div>
          </motion.div>

          <motion.div
            className="absolute top-1/2 -left-12 bg-black/90 backdrop-blur-sm border border-gold/30 rounded-xl px-6 py-4"
            animate={{ x: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          >
            <div className="text-gold font-bold text-xl">99</div>
            <div className="text-gray-400 text-xs tracking-wider uppercase">
              Lighthouse Score
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Cinematic scroll indicator */}
      <motion.div
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className="w-8 h-16 border-2 border-gold/50 rounded-full flex justify-center p-3">
          <motion.div
            className="w-1 h-6 bg-gradient-to-b from-gold to-accent rounded-full"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default CinematicHero;
