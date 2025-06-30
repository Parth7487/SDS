import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const caseStudies = [
  {
    title: "Luxury Fashion House",
    category: "Fashion & Lifestyle",
    description:
      "A sophisticated e-commerce experience that reflects the brand's heritage while driving modern conversion goals.",
    metrics: {
      conversion: "+89%",
      performance: "0.7s",
      revenue: "+156%",
    },
    year: "2024",
  },
  {
    title: "Artisan Marketplace",
    category: "Handcrafted Goods",
    description:
      "Multi-vendor platform with custom artist profiles and seamless shopping experience that celebrates craftsmanship.",
    metrics: {
      conversion: "+67%",
      performance: "1.1s",
      revenue: "+234%",
    },
    year: "2024",
  },
  {
    title: "Tech Startup Store",
    category: "B2B Technology",
    description:
      "Clean, conversion-focused design with complex product configurations and enterprise-grade functionality.",
    metrics: {
      conversion: "+145%",
      performance: "0.9s",
      revenue: "+289%",
    },
    year: "2023",
  },
];

const ElegantCaseStudies = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="work"
      ref={containerRef}
      className="py-32 bg-charcoal/30 relative"
    >
      <div className="max-w-7xl mx-auto px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-light text-gray-100 mb-6 leading-tight">
            Selected <span className="text-beige">Work</span>
          </h2>
          <p className="text-xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
            Each project represents a unique challenge solved with thoughtful
            design and meticulous attention to detail.
          </p>
        </motion.div>

        {/* Case studies grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -12 }}
              className="group cursor-pointer"
            >
              <Card className="elegant-card h-full transition-all duration-500 hover:border-beige/40">
                {/* Project image placeholder */}
                <div className="relative h-64 bg-gradient-to-br from-graphite to-charcoal overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="bg-black/60 text-beige px-3 py-1 rounded text-xs font-light tracking-wide">
                      {study.year}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-gray-300 text-sm font-light">
                      {study.category}
                    </div>
                  </div>
                </div>

                <CardContent className="p-8">
                  <h3 className="text-2xl font-medium text-gray-100 mb-4 group-hover:text-beige transition-colors duration-300">
                    {study.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed font-light mb-8">
                    {study.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-beige font-medium text-lg">
                        {study.metrics.conversion}
                      </div>
                      <div className="text-gray-500 text-xs tracking-wide">
                        CONVERSION
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-beige font-medium text-lg">
                        {study.metrics.performance}
                      </div>
                      <div className="text-gray-500 text-xs tracking-wide">
                        LOAD TIME
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-beige font-medium text-lg">
                        {study.metrics.revenue}
                      </div>
                      <div className="text-gray-500 text-xs tracking-wide">
                        REVENUE
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View all work CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.button
            className="elegant-button-outline px-8 py-3 text-base font-medium tracking-wide rounded transition-all duration-300"
            whileHover={{ scale: 1.02, y: -2 }}
          >
            View All Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ElegantCaseStudies;
