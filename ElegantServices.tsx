import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    title: "Theme Development",
    description:
      "Custom Shopify themes built from the ground up with performance, scalability, and your brand identity at the core.",
    icon: "🎨",
  },
  {
    title: "Performance Optimization",
    description:
      "Lightning-fast loading times and seamless user experiences that convert visitors into customers.",
    icon: "⚡",
  },
  {
    title: "Custom Functionality",
    description:
      "Bespoke features and integrations that set your store apart and drive your unique business goals.",
    icon: "⚙️",
  },
  {
    title: "Ongoing Support",
    description:
      "Dedicated maintenance and updates to keep your store running smoothly and growing with your business.",
    icon: "🛡️",
  },
];

const ElegantServices = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      className="py-32 bg-gradient-to-b from-black via-charcoal/30 to-black relative min-h-screen flex items-center"
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
            Our <span className="text-beige">Services</span>
          </h2>
          <p className="text-xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
            We specialize in creating exceptional Shopify experiences that
            combine aesthetic excellence with technical precision.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <Card className="elegant-card h-full transition-all duration-500 hover:border-beige/40">
                <CardContent className="p-8">
                  <div className="text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-medium text-gray-100 mb-4 group-hover:text-beige transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed font-light">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Technology stack */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3 className="text-lg font-medium text-gray-300 mb-8 tracking-wide">
            TECHNOLOGIES WE MASTER
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {[
              "Shopify Liquid",
              "React",
              "TypeScript",
              "Figma",
              "GitHub",
              "Shopify Plus",
            ].map((tech, index) => (
              <motion.span
                key={index}
                className="text-gray-400 hover:text-beige font-light tracking-wide transition-colors duration-300"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ElegantServices;
