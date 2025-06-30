import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const ScrollStoryPanel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-20%" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Create three distinct phases based on scroll progress
  const phase1Opacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0]);
  const phase2Opacity = useTransform(
    scrollYProgress,
    [0.2, 0.4, 0.6, 0.8],
    [0, 1, 1, 0],
  );
  const phase3Opacity = useTransform(scrollYProgress, [0.6, 0.8, 1], [0, 1, 1]);

  const backgroundOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.05, 0.15, 0.05],
  );

  return (
    <div
      ref={containerRef}
      className="relative z-10"
      style={{ height: "300vh" }} // 3x viewport height for scroll distance
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-charcoal via-black to-charcoal"
          style={{
            opacity: isInView ? backgroundOpacity : 0,
          }}
        />

        {/* Subtle ambient elements */}
        {isInView && (
          <motion.div
            className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(230,177,126,0.1) 0%, transparent 70%)",
              opacity: phase2Opacity,
            }}
          />
        )}

        {/* Content container */}
        <div className="relative z-20 max-w-5xl mx-auto px-8 text-center">
          {/* Phase 1: Introduction */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-center"
            style={{
              opacity: isInView ? phase1Opacity : 0,
              willChange: "opacity",
            }}
          >
            <motion.h2 className="text-5xl md:text-7xl font-light text-gray-100 mb-8 leading-tight">
              Crafting Digital
              <br />
              <span className="text-beige">Excellence</span>
            </motion.h2>
            <motion.p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
              Every pixel, every interaction, every line of code is meticulously
              crafted to elevate your brand above the ordinary.
            </motion.p>
          </motion.div>

          {/* Phase 2: Process */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-center"
            style={{
              opacity: isInView ? phase2Opacity : 0,
              willChange: "opacity",
            }}
          >
            <motion.h2 className="text-5xl md:text-7xl font-light text-gray-100 mb-8 leading-tight">
              From Vision
              <br />
              <span className="text-beige">to Reality</span>
            </motion.h2>
            <motion.p className="text-xl text-gray-400 font-light max-w-2xl mx-auto mb-12">
              We transform ambitious ideas into high-performance Shopify
              experiences that drive growth and inspire confidence.
            </motion.p>

            {/* Process indicators */}
            <div className="flex justify-center space-x-16">
              {[
                { number: "01", label: "Discovery" },
                { number: "02", label: "Design" },
                { number: "03", label: "Development" },
                { number: "04", label: "Launch" },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="text-beige text-lg font-light mb-2">
                    {step.number}
                  </div>
                  <div className="text-gray-400 text-sm font-light tracking-wide">
                    {step.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Phase 3: Results */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-center"
            style={{
              opacity: isInView ? phase3Opacity : 0,
              willChange: "opacity",
            }}
          >
            <motion.h2 className="text-5xl md:text-7xl font-light text-gray-100 mb-8 leading-tight">
              Measurable
              <br />
              <span className="text-beige">Impact</span>
            </motion.h2>
            <motion.p className="text-xl text-gray-400 font-light max-w-2xl mx-auto mb-12">
              Our clients see real results: increased conversions, improved
              performance, and a brand presence that truly stands out.
            </motion.p>

            {/* Results grid */}
            <div className="grid grid-cols-3 gap-12 max-w-3xl mx-auto">
              {[
                { metric: "127%", label: "Average Revenue Increase" },
                { metric: "0.8s", label: "Average Load Time" },
                { metric: "98", label: "Average Lighthouse Score" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="text-3xl font-light text-beige mb-2">
                    {stat.metric}
                  </div>
                  <div className="text-gray-400 text-sm font-light">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Progress indicator */}
        {isInView && (
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-30">
            <div className="w-px h-24 bg-gray-800">
              <motion.div
                className="w-full bg-beige origin-top"
                style={{
                  scaleY: scrollYProgress,
                  willChange: "transform",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScrollStoryPanel;
