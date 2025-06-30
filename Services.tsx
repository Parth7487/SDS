import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: "🛍️",
    title: "Shopify Development",
    description:
      "Custom Shopify themes and stores built with liquid, performance optimization, and seamless integrations.",
    features: [
      "Custom Liquid Development",
      "Performance Optimization",
      "App Integrations",
    ],
  },
  {
    icon: "🎨",
    title: "Design to Code",
    description:
      "Pixel-perfect conversion of Figma designs to fully functional Shopify themes with responsive layouts.",
    features: [
      "Figma to Shopify",
      "Responsive Design",
      "Cross-browser Testing",
    ],
  },
  {
    icon: "⚡",
    title: "Performance & SEO",
    description:
      "Lightning-fast stores with advanced optimization, Core Web Vitals improvement, and SEO best practices.",
    features: ["Speed Optimization", "Core Web Vitals", "Technical SEO"],
  },
  {
    icon: "🔧",
    title: "Maintenance & Support",
    description:
      "Ongoing support, updates, and feature additions to keep your store running smoothly and growing.",
    features: ["24/7 Support", "Regular Updates", "Feature Additions"],
  },
];

const Services = () => {
  return (
    <section
      id="services"
      className="py-20 bg-navy-50 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-mint rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-mint rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From concept to launch, we deliver comprehensive Shopify solutions
            that drive results and exceed expectations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <Card className="bg-navy-700/50 border-mint/20 backdrop-blur-sm h-full transition-all duration-300 hover:border-mint/40 hover:bg-navy-700/70">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-mint transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-mint flex items-center"
                      >
                        <span className="w-2 h-2 bg-mint rounded-full mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-center items-center gap-8 text-mint">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-mint/20 rounded-lg flex items-center justify-center">
                <span className="text-mint font-bold">S</span>
              </div>
              <span className="font-semibold">Shopify</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-mint/20 rounded-lg flex items-center justify-center">
                <span className="text-mint font-bold">L</span>
              </div>
              <span className="font-semibold">Liquid</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-mint/20 rounded-lg flex items-center justify-center">
                <span className="text-mint font-bold">F</span>
              </div>
              <span className="font-semibold">Figma</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-mint/20 rounded-lg flex items-center justify-center">
                <span className="text-mint font-bold">G</span>
              </div>
              <span className="font-semibold">GitHub</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
