import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const caseStudies = [
  {
    title: "Luxury Fashion Brand",
    description:
      "High-end fashion store with custom animations and seamless checkout experience.",
    image: "/api/placeholder/400/300",
    tags: ["Custom Liquid", "Performance", "Mobile-First"],
    metrics: { conversion: "+45%", speed: "2.3s", sales: "+120%" },
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Tech Startup Store",
    description:
      "Modern B2B store with complex product configurations and integrations.",
    image: "/api/placeholder/400/300",
    tags: ["API Integration", "Custom Features", "B2B"],
    metrics: { conversion: "+67%", speed: "1.8s", sales: "+89%" },
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Artisan Marketplace",
    description:
      "Multi-vendor marketplace with custom vendor dashboards and commission tracking.",
    image: "/api/placeholder/400/300",
    tags: ["Multi-vendor", "Dashboard", "Analytics"],
    metrics: { conversion: "+34%", speed: "2.1s", sales: "+156%" },
    color: "from-green-500 to-emerald-500",
  },
];

const CaseStudies = () => {
  return (
    <section id="work" className="py-20 bg-navy relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,255,178,0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
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
            Case <span className="text-gradient">Studies</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real results from real projects. See how we've helped brands
            transform their Shopify presence and drive exceptional growth.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="group cursor-pointer"
            >
              <Card className="bg-navy-700/50 border-mint/20 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-mint/40 hover:bg-navy-700/70">
                <div className="relative h-48 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${study.color} opacity-80`}
                  />
                  <div className="absolute inset-0 bg-navy-800/50" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex flex-wrap gap-2">
                      {study.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-mint/20 text-mint px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-mint transition-colors duration-300">
                    {study.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {study.description}
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-mint font-bold text-lg">
                        {study.metrics.conversion}
                      </div>
                      <div className="text-gray-400 text-xs">Conversion</div>
                    </div>
                    <div className="text-center">
                      <div className="text-mint font-bold text-lg">
                        {study.metrics.speed}
                      </div>
                      <div className="text-gray-400 text-xs">Load Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-mint font-bold text-lg">
                        {study.metrics.sales}
                      </div>
                      <div className="text-gray-400 text-xs">Sales Growth</div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-mint/20 text-mint hover:bg-mint/10 hover:border-mint/40 transition-all duration-300"
                  >
                    View Case Study
                  </Button>
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
          <Button className="bg-mint text-navy hover:bg-mint/90 font-semibold px-8 py-3 rounded-lg mint-glow hover:mint-glow-strong transition-all duration-300">
            View All Projects
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudies;
