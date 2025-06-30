import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
    title: "Shopify Development",
    description:
      "Custom Shopify themes with advanced Liquid templating, performance optimization, and seamless third-party integrations.",
    features: [
      "Custom Liquid Development",
      "Performance Optimization",
      "App Integrations",
      "Checkout Customization",
    ],
    color: "from-mint/20 to-mint/5",
    borderColor: "border-mint/30",
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: "Design to Code",
    description:
      "Pixel-perfect conversion of Figma designs to fully responsive, interactive Shopify themes with attention to every detail.",
    features: [
      "Figma to Shopify",
      "Responsive Design",
      "Micro-interactions",
      "Cross-browser Testing",
    ],
    color: "from-purple-500/20 to-purple-500/5",
    borderColor: "border-purple-500/30",
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z" />
      </svg>
    ),
    title: "Performance & SEO",
    description:
      "Lightning-fast stores with Core Web Vitals optimization, advanced SEO implementation, and conversion rate optimization.",
    features: [
      "Speed Optimization",
      "Core Web Vitals",
      "Technical SEO",
      "Analytics Setup",
    ],
    color: "from-blue-500/20 to-blue-500/5",
    borderColor: "border-blue-500/30",
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
      </svg>
    ),
    title: "Maintenance & Support",
    description:
      "Ongoing support, regular updates, feature additions, and 24/7 monitoring to keep your store performing at its peak.",
    features: [
      "24/7 Support",
      "Regular Updates",
      "Feature Additions",
      "Performance Monitoring",
    ],
    color: "from-green-500/20 to-green-500/5",
    borderColor: "border-green-500/30",
  },
];

const techStack = [
  { name: "Shopify", icon: "🛍️", color: "#00FFB2" },
  { name: "Liquid", icon: "💧", color: "#00B4D8" },
  { name: "Figma", icon: "🎨", color: "#F24E1E" },
  { name: "GitHub", icon: "🐙", color: "#24292E" },
  { name: "React", icon: "⚛️", color: "#61DAFB" },
  { name: "TypeScript", icon: "📝", color: "#3178C6" },
];

const EnhancedServices = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      ref={containerRef}
      className="py-32 bg-navy-50 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div className="absolute inset-0 opacity-30" style={{ y }}>
        <div className="absolute top-20 left-10 w-64 h-64 bg-mint/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </motion.div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,255,178,0.3) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

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
            Our{" "}
            <span className="bg-gradient-to-r from-mint via-mint/80 to-mint bg-clip-text text-transparent">
              Services
            </span>
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            From concept to launch, we deliver comprehensive Shopify solutions
            that drive results and exceed expectations through cutting-edge
            technology and creative excellence.
          </motion.p>
        </motion.div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80, rotateX: -30 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, rotateX: 0 }
                  : { opacity: 0, y: 80, rotateX: -30 }
              }
              transition={{
                duration: 0.8,
                delay: 0.6 + index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                z: 50,
              }}
              className="group perspective-1000"
            >
              <Card
                className={`bg-navy-700/50 ${service.borderColor} backdrop-blur-sm h-full transition-all duration-500 hover:bg-navy-700/70 relative overflow-hidden group-hover:shadow-2xl`}
              >
                {/* Animated background gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <CardContent className="p-8 relative z-10">
                  {/* Icon */}
                  <motion.div
                    className="text-mint mb-6"
                    whileHover={{ scale: 1.2, rotateZ: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {service.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-mint transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        className="text-sm text-mint flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={
                          isInView
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: -20 }
                        }
                        transition={{
                          duration: 0.5,
                          delay: 0.8 + index * 0.1 + idx * 0.1,
                        }}
                      >
                        <motion.span
                          className="w-2 h-2 bg-mint rounded-full mr-3 flex-shrink-0"
                          whileHover={{ scale: 1.5 }}
                        />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>

                {/* Hover effect overlay */}
                <motion.div className="absolute inset-0 bg-gradient-to-t from-mint/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tech stack */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h3 className="text-2xl font-bold text-white mb-8">
            Technologies We Master
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-3 bg-navy-700/30 backdrop-blur-sm px-6 py-3 rounded-full border border-mint/20 hover:border-mint/40 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(0, 255, 178, 0.1)",
                }}
              >
                <span className="text-2xl">{tech.icon}</span>
                <span className="font-semibold text-white">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-32 right-8 text-mint/20 text-6xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          ⚡
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-8 text-mint/20 text-4xl"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          💎
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedServices;
