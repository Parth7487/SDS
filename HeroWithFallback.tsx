import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ShopifyStorefront from "../3d/ShopifyStorefront";
import FloatingShapes from "../3d/FloatingShapes";
import Loading3DCanvas from "../3d/Loading3DCanvas";

// Error boundary for 3D components
class Canvas3DErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log("3D Canvas Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

const HeroWithFallback = () => {
  const [supports3D, setSupports3D] = useState(true);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Fallback 2D background
  const Fallback2D = () => (
    <div className="absolute inset-0 opacity-80">
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-600 to-navy-800" />
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-mint rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-600 to-navy-800" />

      {/* 3D Background with error boundary */}
      <Canvas3DErrorBoundary fallback={<Fallback2D />}>
        {supports3D && (
          <div className="absolute inset-0 opacity-80">
            <Canvas
              onCreated={() => setSupports3D(true)}
              onError={() => setSupports3D(false)}
            >
              <Suspense fallback={<Loading3DCanvas />}>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                <ambientLight intensity={0.4} />
                <pointLight
                  position={[10, 10, 10]}
                  intensity={0.8}
                  color="#00FFB2"
                />
                <pointLight
                  position={[-10, -10, -10]}
                  intensity={0.5}
                  color="#ffffff"
                />
                <FloatingShapes />
                <Environment preset="night" />
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  enableRotate={true}
                  autoRotate
                  autoRotateSpeed={0.5}
                />
              </Suspense>
            </Canvas>
          </div>
        )}
      </Canvas3DErrorBoundary>

      {/* Fallback if 3D fails */}
      {!supports3D && <Fallback2D />}

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <motion.div
          className="text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-white">We Bring</span>{" "}
            <span className="text-gradient">Shopify Dreams</span>{" "}
            <span className="text-white">to Life</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Custom Shopify themes built for brands that demand more
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-mint text-navy hover:bg-mint/90 font-bold text-lg px-8 py-4 rounded-lg mint-glow hover:mint-glow-strong transition-all duration-300 transform hover:scale-105"
            >
              Let's Build
            </Button>
          </motion.div>
        </motion.div>

        {/* Right 3D content with fallback */}
        <motion.div
          className="relative h-96 lg:h-[500px]"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Canvas3DErrorBoundary
            fallback={
              <div className="w-full h-full bg-gradient-to-br from-mint/20 to-navy-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-mint/30 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-mint text-4xl">🛍️</span>
                  </div>
                  <p className="text-mint font-semibold">Shopify Store</p>
                </div>
              </div>
            }
          >
            {supports3D && (
              <Canvas>
                <Suspense fallback={<Loading3DCanvas />}>
                  <PerspectiveCamera makeDefault position={[0, 0, 8]} />
                  <ambientLight intensity={0.6} />
                  <pointLight
                    position={[5, 5, 5]}
                    intensity={1}
                    color="#00FFB2"
                  />
                  <pointLight
                    position={[-5, -5, 5]}
                    intensity={0.8}
                    color="#ffffff"
                  />
                  <ShopifyStorefront />
                  <Environment preset="night" />
                </Suspense>
              </Canvas>
            )}
          </Canvas3DErrorBoundary>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-mint rounded-full flex justify-center">
          <div className="w-1 h-3 bg-mint rounded-full mt-2 animate-pulse-slow" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroWithFallback;
