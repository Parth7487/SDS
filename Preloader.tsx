import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let animationFrame: number;
    const startTime = Date.now();
    const duration = 1500;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);

      setProgress(newProgress);

      if (newProgress >= 100) {
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(onComplete, 800);
        }, 400);
      } else {
        animationFrame = requestAnimationFrame(updateProgress);
      }
    };

    animationFrame = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          exit={{
            opacity: 0,
            scale: 1.02,
          }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Subtle background gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-black via-charcoal/30 to-black subtle-grain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          />

          {/* Minimal grid pattern */}
          <motion.div
            className="absolute inset-0 opacity-[0.01]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.01 }}
            transition={{ duration: 2 }}
          >
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `linear-gradient(rgba(242,242,242,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(242,242,242,0.05) 1px, transparent 1px)`,
                backgroundSize: "80px 80px",
              }}
            />
          </motion.div>

          <div className="text-center relative z-10">
            {/* Elegant logo mark */}
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="relative">
                {/* Simple, elegant icon */}
                <motion.div
                  className="w-20 h-20 mx-auto mb-8 relative"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <div className="w-full h-full border-2 border-beige/40 rounded-lg flex items-center justify-center">
                    <span className="text-beige text-2xl font-bold">S</span>
                  </div>

                  {/* Subtle breathing animation */}
                  <motion.div
                    className="absolute inset-0 border border-beige/20 rounded-lg"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.5, 0.2, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>

                {/* Studio name */}
                <motion.h1
                  className="text-2xl font-light text-gray-100 tracking-wide"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  SHOPIFY DEV STUDIO
                </motion.h1>
                <motion.p
                  className="text-sm text-gray-400 font-light tracking-widest mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  PREMIUM THEME DEVELOPMENT
                </motion.p>
              </div>
            </motion.div>

            {/* Elegant progress display */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <motion.div
                className="text-4xl font-light text-beige mb-3 font-mono"
                key={Math.floor(progress)}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {Math.floor(progress).toString().padStart(2, "0")}%
              </motion.div>
            </motion.div>

            {/* Minimal progress bar */}
            <div className="w-64 h-px bg-gray-700 mx-auto mb-8 overflow-hidden">
              <motion.div
                className="h-full bg-beige"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "easeOut" }}
              />
            </div>

            {/* Loading status */}
            <motion.p
              className="text-gray-500 text-xs font-light tracking-wider"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              LOADING EXPERIENCE
            </motion.p>
          </div>

          {/* Minimal corner accents */}
          {[
            { position: "top-8 left-8" },
            { position: "top-8 right-8" },
            { position: "bottom-8 left-8" },
            { position: "bottom-8 right-8" },
          ].map((corner, index) => (
            <motion.div
              key={index}
              className={`absolute ${corner.position} w-16 h-16`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
            >
              <div className="w-full h-full border-l border-t border-beige/20" />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
