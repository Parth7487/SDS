import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-32 bg-navy relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-mint/10 rounded-full blur-3xl" />
        <div className="absolute top-20 left-20 w-32 h-32 bg-mint/5 rounded-full blur-2xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-mint/5 rounded-full blur-2xl" />
      </div>

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(0,255,178,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,178,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            You <span className="text-gradient">Imagine</span> It.
            <br />
            We <span className="text-gradient">Build</span> It.
          </h2>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Transform your Shopify vision into a powerful, conversion-optimized
            reality. Let's create something extraordinary together.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-mint text-navy hover:bg-mint/90 font-bold text-lg px-12 py-4 rounded-full mint-glow hover:mint-glow-strong transition-all duration-300 transform relative overflow-hidden group"
              >
                <span className="relative z-10">Start Your Project Today</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => scrollToSection("work")}
                variant="outline"
                className="border-2 border-mint text-mint hover:bg-mint/10 font-semibold text-lg px-8 py-4 rounded-full transition-all duration-300"
              >
                View Our Work
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-mint/20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <motion.div
                className="text-4xl font-bold text-mint mb-2"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                viewport={{ once: true }}
              >
                2-4
              </motion.div>
              <div className="text-gray-400 text-sm">Weeks Delivery</div>
            </div>
            <div className="text-center">
              <motion.div
                className="text-4xl font-bold text-mint mb-2"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                viewport={{ once: true }}
              >
                100%
              </motion.div>
              <div className="text-gray-400 text-sm">Custom Code</div>
            </div>
            <div className="text-center">
              <motion.div
                className="text-4xl font-bold text-mint mb-2"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                viewport={{ once: true }}
              >
                24/7
              </motion.div>
              <div className="text-gray-400 text-sm">Support</div>
            </div>
            <div className="text-center">
              <motion.div
                className="text-4xl font-bold text-mint mb-2"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.5 }}
                viewport={{ once: true }}
              >
                ∞
              </motion.div>
              <div className="text-gray-400 text-sm">Revisions</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
