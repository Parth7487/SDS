import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-charcoal border-t border-beige/20 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-beige rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">S</span>
              </div>
              <span className="text-gray-100 font-medium text-xl">
                Shopify Dev Studio
              </span>
            </div>
            <p className="text-gray-400 font-light max-w-md leading-relaxed">
              Premium Shopify theme development agency creating exceptional
              e-commerce experiences that drive results and exceed expectations.
            </p>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-gray-100 font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("work")}
                  className="text-gray-400 hover:text-mint transition-colors duration-200"
                >
                  Our Work
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-gray-400 hover:text-mint transition-colors duration-200"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-gray-400 hover:text-mint transition-colors duration-200"
                >
                  Contact
                </button>
              </li>
            </ul>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:hello@shopifydevstudio.com"
                  className="text-gray-400 hover:text-mint transition-colors duration-200"
                >
                  hello@shopifydevstudio.com
                </a>
              </li>
              <li className="text-gray-400">Remote, Worldwide</li>
              <li className="text-gray-400">24h Response Time</li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div
          className="border-t border-mint/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Shopify Dev Studio. All rights reserved.
          </p>

          <div className="flex items-center space-x-6">
            <span className="text-gray-400 text-sm">Built with ❤️ using</span>
            <div className="flex items-center space-x-3">
              <span className="text-mint text-sm font-medium">React</span>
              <span className="text-gray-500">•</span>
              <span className="text-mint text-sm font-medium">TypeScript</span>
              <span className="text-gray-500">•</span>
              <span className="text-mint text-sm font-medium">Tailwind</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
