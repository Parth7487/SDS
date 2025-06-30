import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-navy/95 backdrop-blur-md border-b border-mint/20"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 bg-mint rounded-lg flex items-center justify-center">
              <span className="text-navy font-bold text-sm">S</span>
            </div>
            <span className="text-white font-bold text-xl">Dev Studio</span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("work")}
              className="text-white hover:text-mint transition-colors duration-200"
            >
              Work
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-white hover:text-mint transition-colors duration-200"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-white hover:text-mint transition-colors duration-200"
            >
              About
            </button>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-mint text-navy hover:bg-mint/90 font-semibold px-6 py-2 rounded-lg mint-glow hover:mint-glow-strong transition-all duration-300"
            >
              Start Your Project
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
