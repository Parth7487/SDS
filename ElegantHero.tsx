import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { SplashCursor } from "../ui/splash-cursor";

const ElegantHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const isInView = useInView(containerRef, { once: true });

  // Smooth scroll-based transforms
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -100]), {
    stiffness: 100,
    damping: 30,
  });
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.8], [1, 0]), {
    stiffness: 100,
    damping: 30,
  });
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.8], [1, 0.95]), {
    stiffness: 100,
    damping: 30,
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden gpu-accelerated motion-safe"
      style={{
        y,
        opacity,
        scale,
        willChange: "transform, opacity",
        transform: "translateZ(0)",
      }}
    >
      {/* Elegant background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-charcoal/40 to-black subtle-grain" />

      {/* Fluid cursor effect - optimized */}
      <div className="absolute inset-0 z-0 gpu-accelerated">
        <SplashCursor
          DENSITY_DISSIPATION={3.0}
          VELOCITY_DISSIPATION={2.2}
          SPLAT_FORCE={3500}
          SPLAT_RADIUS={0.12}
          COLOR_UPDATE_SPEED={7}
        />
      </div>

      {/* Subtle ambient background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 4 }}
      >
        <div
          className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(230,177,126,0.1) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(209,169,122,0.08) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-8 text-center">
        {/* Main headline with elegant reveal */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light leading-[0.9] tracking-tight text-gray-100 mb-8">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              We Bring
            </motion.span>
            <motion.span
              className="block text-beige"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              Shopify Dreams
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              to Life
            </motion.span>
          </h1>
        </motion.div>

        {/* Elegant subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          Custom Shopify themes built for brands that demand excellence,
          performance, and timeless design.
        </motion.p>

        {/* Clean CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={() => scrollToSection("contact")}
              className="elegant-button px-8 py-3 text-base font-medium tracking-wide rounded"
            >
              Schedule a Call
            </Button>
          </motion.div>

          <motion.button
            onClick={() => scrollToSection("work")}
            className="elegant-button-outline px-8 py-3 text-base font-medium tracking-wide rounded transition-all duration-300"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            View Our Work
          </motion.button>
        </motion.div>

        {/* Subtle scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <motion.div
            className="w-px h-16 bg-gradient-to-b from-transparent via-beige/60 to-transparent"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ElegantHero;
