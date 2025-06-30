import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <section className="py-32 bg-gradient-to-b from-charcoal/50 via-black to-charcoal/30 relative overflow-hidden min-h-screen flex items-center">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,255,178,0.2) 1px, transparent 0)`,
            backgroundSize: "30px 30px",
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
          <h2 className="text-4xl md:text-6xl font-light text-gray-100 mb-6 leading-tight">
            About <span className="text-beige">Us</span>
          </h2>
          <p className="text-xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
            We're a team of passionate developers and designers who specialize
            in creating extraordinary Shopify experiences.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-medium text-gray-100 mb-6">
              Crafting Digital Excellence
            </h3>
            <p className="text-gray-400 text-lg font-light leading-relaxed mb-8">
              With years of experience in Shopify development, we've helped
              brands across the globe transform their e-commerce presence. Our
              team combines technical expertise with creative vision to deliver
              solutions that not only look stunning but also drive real business
              results.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-3xl font-light text-beige mb-2">5+</div>
                <div className="text-gray-500 font-light">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-light text-beige mb-2">50+</div>
                <div className="text-gray-500 font-light">
                  Projects Completed
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="elegant-card">
              <CardContent className="p-6">
                <h4 className="text-xl font-medium text-gray-100 mb-3">
                  Our Mission
                </h4>
                <p className="text-gray-400 font-light">
                  To empower brands with exceptional Shopify solutions that
                  drive growth, enhance user experience, and exceed
                  expectations.
                </p>
              </CardContent>
            </Card>

            <Card className="elegant-card">
              <CardContent className="p-6">
                <h4 className="text-xl font-medium text-gray-100 mb-3">
                  Our Approach
                </h4>
                <p className="text-gray-400 font-light">
                  We believe in collaboration, attention to detail, and
                  delivering solutions that are not just functional but truly
                  exceptional.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
