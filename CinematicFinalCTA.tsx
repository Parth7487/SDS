import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

const CinematicFinalCTA = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="py-40 bg-navy relative overflow-hidden"
    >
      {/* Dynamic background */}
      <motion.div className="absolute inset-0" style={{ y }}>
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-mint/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.2, 0.05],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </motion.div>

      {/* Animated grid overlay */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(0,255,178,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,178,0.1) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
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

      {/* Floating geometric elements */}
      <motion.div
        className="absolute top-32 left-16 w-16 h-16 border-2 border-mint/30 rounded-lg"
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-64 right-16 w-12 h-12 bg-mint/20 rounded-full"
        animate={{
          y: [0, -40, 0],
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-32 left-1/4 w-8 h-8 border border-mint/40 rotate-45"
        animate={{
          rotate: [45, 225, 405],
          scale: [1, 1.5, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-48 right-1/4 w-6 h-6 bg-purple-500/30 rounded-full"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <motion.div
          style={{ scale }}
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Main headline */}
          <motion.h2
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <motion.span
              animate={{
                textShadow: [
                  "0 0 20px rgba(0,255,178,0.5)",
                  "0 0 40px rgba(0,255,178,0.8)",
                  "0 0 20px rgba(0,255,178,0.5)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Let's Build
            </motion.span>
            <br />
            <motion.span
              className="bg-gradient-to-r from-mint via-mint/80 to-mint bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Something
            </motion.span>
            <br />
            <motion.span
              animate={{
                color: ["#ffffff", "#00FFB2", "#ffffff"],
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            >
              Incredible
            </motion.span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            className="text-2xl md:text-3xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Transform your Shopify vision into a{" "}
            <motion.span
              className="text-mint font-semibold"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 2 }}
            >
              conversion-optimized
            </motion.span>{" "}
            reality that drives growth and exceeds expectations.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {/* Primary CTA */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-mint to-mint/80 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <Button
                onClick={() => scrollToSection("contact")}
                className="relative bg-mint text-navy hover:bg-mint/90 font-bold text-xl px-16 py-5 rounded-full overflow-hidden group"
              >
                <span className="relative z-10">Start the Conversation</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8 }}
                />
                {/* Ripple effect */}
                <motion.div
                  className="absolute inset-0 bg-white/20 rounded-full"
                  initial={{ scale: 0, opacity: 1 }}
                  whileHover={{
                    scale: [0, 1.5],
                    opacity: [0.3, 0],
                  }}
                  transition={{ duration: 0.6 }}
                />
              </Button>
            </motion.div>

            {/* Secondary CTA */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => scrollToSection("work")}
                variant="outline"
                className="border-2 border-mint/60 text-mint hover:bg-mint/10 hover:border-mint font-semibold text-lg px-12 py-5 rounded-full transition-all duration-300 relative group overflow-hidden"
              >
                <span className="relative z-10">Explore Our Work</span>
                <motion.div
                  className="absolute inset-0 bg-mint/5 rounded-full"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats/Guarantees */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto pt-16 border-t border-mint/20"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            {[
              { value: "2-4", label: "Weeks Delivery", icon: "⚡" },
              { value: "100%", label: "Custom Code", icon: "💎" },
              { value: "24/7", label: "Support", icon: "🛡️" },
              { value: "∞", label: "Revisions", icon: "🔄" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ duration: 0.6, delay: 1.8 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <motion.div
                  className="text-3xl mb-2"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                >
                  {stat.icon}
                </motion.div>
                <motion.div
                  className="text-4xl md:text-5xl font-bold text-mint mb-2 group-hover:text-white transition-colors duration-300"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Final message */}
          <motion.div
            className="mt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 2.2 }}
          >
            <motion.p
              className="text-lg text-gray-400 max-w-3xl mx-auto"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Ready to transform your Shopify store into a revenue-generating
              machine?
              <br />
              <motion.span
                className="text-mint font-medium"
                animate={{
                  color: ["#00FFB2", "#ffffff", "#00FFB2"],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                Let's make it happen.
              </motion.span>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* Particle effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-mint/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default CinematicFinalCTA;
