import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const caseStudies = [
  {
    title: "Luxury Fashion Empire",
    client: "High-End Fashion Brand",
    description:
      "Complete store redesign with advanced product customization, AR try-on features, and premium checkout experience.",
    image: "/api/placeholder/600/400",
    metrics: { conversion: "+78%", speed: "1.9s", revenue: "+156%" },
    tags: ["Custom Liquid", "AR Integration", "Performance", "Mobile-First"],
    color: "from-purple-500/20 to-pink-500/20",
    accentColor: "#8B5CF6",
    year: "2024",
  },
  {
    title: "Tech Startup Ecosystem",
    client: "B2B SaaS Platform",
    description:
      "Multi-vendor marketplace with complex product configurations, subscription management, and analytics dashboard.",
    image: "/api/placeholder/600/400",
    metrics: { conversion: "+92%", speed: "1.6s", revenue: "+234%" },
    tags: ["API Integration", "Subscriptions", "B2B Features", "Analytics"],
    color: "from-blue-500/20 to-cyan-500/20",
    accentColor: "#3B82F6",
    year: "2024",
  },
  {
    title: "Artisan Collective",
    client: "Handcrafted Goods",
    description:
      "Storytelling-focused design with immersive product galleries, artist profiles, and sustainable shopping features.",
    image: "/api/placeholder/600/400",
    metrics: { conversion: "+65%", speed: "2.1s", revenue: "+145%" },
    tags: ["Storytelling", "Sustainability", "Artist Profiles", "Gallery"],
    color: "from-green-500/20 to-emerald-500/20",
    accentColor: "#10B981",
    year: "2023",
  },
  {
    title: "Global Electronics",
    client: "Consumer Electronics",
    description:
      "International e-commerce platform with multi-currency support, advanced filtering, and product comparison tools.",
    image: "/api/placeholder/600/400",
    metrics: { conversion: "+54%", speed: "1.8s", revenue: "+189%" },
    tags: ["Multi-currency", "International", "Comparison", "Advanced Search"],
    color: "from-orange-500/20 to-red-500/20",
    accentColor: "#F97316",
    year: "2023",
  },
];

const InteractiveCaseStudies = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="work"
      ref={containerRef}
      className="py-32 bg-navy relative overflow-hidden"
    >
      {/* Animated background */}
      <motion.div className="absolute inset-0 opacity-20" style={{ y }}>
        {/* Moving grid pattern */}
        <motion.div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(0,255,178,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,178,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 border border-mint/20 rounded-lg"
        animate={{
          rotate: [0, 45, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-20 right-10 w-24 h-24 bg-mint/10 rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl md:text-7xl font-bold text-white mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Case{" "}
            <span className="bg-gradient-to-r from-mint via-mint/80 to-mint bg-clip-text text-transparent">
              Studies
            </span>
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Real results from real projects. Explore how we've transformed
            brands across industries with innovative Shopify solutions.
          </motion.p>
        </motion.div>

        {/* Case studies grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="group cursor-pointer"
            >
              <Card className="bg-navy-700/50 border-mint/20 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-mint/40 hover:bg-navy-700/70 h-full">
                {/* Image container */}
                <div className="relative h-64 overflow-hidden">
                  {/* Placeholder for image */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${study.color}`}
                    animate={
                      hoveredCard === index ? { scale: 1.1 } : { scale: 1 }
                    }
                    transition={{ duration: 0.6 }}
                  />

                  {/* 3D tilt effect overlay */}
                  <motion.div
                    className="absolute inset-0 bg-navy-800/60 flex items-center justify-center"
                    animate={
                      hoveredCard === index
                        ? {
                            rotateY: 5,
                            rotateX: 5,
                            z: 20,
                          }
                        : {
                            rotateY: 0,
                            rotateX: 0,
                            z: 0,
                          }
                    }
                    transition={{ duration: 0.3 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="text-center text-white">
                      <div
                        className="text-6xl mb-4"
                        style={{ color: study.accentColor }}
                      >
                        🎨
                      </div>
                      <div className="text-lg font-semibold">
                        {study.client}
                      </div>
                      <div className="text-mint text-sm">{study.year}</div>
                    </div>
                  </motion.div>

                  {/* Hover effect particles */}
                  {hoveredCard === index && (
                    <motion.div className="absolute inset-0">
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-mint rounded-full"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: i * 0.05,
                          }}
                        />
                      ))}
                    </motion.div>
                  )}

                  {/* Tags overlay */}
                  <div className="absolute top-4 left-4 right-4">
                    <div className="flex flex-wrap gap-2">
                      {study.tags.slice(0, 2).map((tag, idx) => (
                        <motion.span
                          key={idx}
                          className="bg-navy-800/80 backdrop-blur-sm text-mint px-3 py-1 rounded-full text-xs font-medium border border-mint/20"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={
                            isInView
                              ? { opacity: 1, scale: 1 }
                              : { opacity: 0, scale: 0.8 }
                          }
                          transition={{
                            duration: 0.5,
                            delay: 0.8 + index * 0.1 + idx * 0.1,
                          }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                <CardContent className="p-8">
                  <motion.h3
                    className="text-2xl font-bold text-white mb-3 group-hover:text-mint transition-colors duration-300"
                    animate={hoveredCard === index ? { x: 10 } : { x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {study.title}
                  </motion.h3>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {study.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <motion.div
                        className="text-mint font-bold text-xl"
                        animate={
                          hoveredCard === index
                            ? {
                                scale: [1, 1.2, 1],
                                color: [
                                  study.accentColor,
                                  "#00FFB2",
                                  study.accentColor,
                                ],
                              }
                            : { scale: 1 }
                        }
                        transition={{ duration: 0.5 }}
                      >
                        {study.metrics.conversion}
                      </motion.div>
                      <div className="text-gray-400 text-xs">Conversion</div>
                    </div>
                    <div className="text-center">
                      <motion.div
                        className="text-mint font-bold text-xl"
                        animate={
                          hoveredCard === index
                            ? {
                                scale: [1, 1.2, 1],
                                color: [
                                  study.accentColor,
                                  "#00FFB2",
                                  study.accentColor,
                                ],
                              }
                            : { scale: 1 }
                        }
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        {study.metrics.speed}
                      </motion.div>
                      <div className="text-gray-400 text-xs">Load Time</div>
                    </div>
                    <div className="text-center">
                      <motion.div
                        className="text-mint font-bold text-xl"
                        animate={
                          hoveredCard === index
                            ? {
                                scale: [1, 1.2, 1],
                                color: [
                                  study.accentColor,
                                  "#00FFB2",
                                  study.accentColor,
                                ],
                              }
                            : { scale: 1 }
                        }
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        {study.metrics.revenue}
                      </motion.div>
                      <div className="text-gray-400 text-xs">Revenue</div>
                    </div>
                  </div>

                  <motion.div
                    animate={
                      hoveredCard === index
                        ? { y: 0, opacity: 1 }
                        : { y: 10, opacity: 0.7 }
                    }
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full border-mint/20 text-mint hover:bg-mint/10 hover:border-mint/40 transition-all duration-300"
                    >
                      View Full Case Study
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-mint text-navy hover:bg-mint/90 font-bold text-lg px-12 py-4 rounded-full relative overflow-hidden group">
              <span className="relative z-10">View All Projects</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveCaseStudies;
