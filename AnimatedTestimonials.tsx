import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    quote:
      "Shopify Dev Studio completely transformed our online presence. The attention to detail and technical expertise resulted in a 78% increase in conversions within the first month.",
    author: "Sarah Chen",
    role: "CEO & Founder",
    company: "Luxe Fashion Empire",
    avatar: "/api/placeholder/80/80",
    rating: 5,
    metric: "+78% conversions",
    industry: "Fashion",
  },
  {
    quote:
      "Working with this team was an absolute game-changer. They didn't just build us a store—they built us a conversion machine that drives real business results.",
    author: "Michael Rodriguez",
    role: "Co-Founder",
    company: "Tech Innovations Hub",
    avatar: "/api/placeholder/80/80",
    rating: 5,
    metric: "+234% revenue",
    industry: "Technology",
  },
  {
    quote:
      "The level of creativity and technical skill exceeded all our expectations. Our new store perfectly captures our brand story while delivering exceptional performance.",
    author: "Emily Watson",
    role: "Creative Director",
    company: "Artisan Collective",
    avatar: "/api/placeholder/80/80",
    rating: 5,
    metric: "+145% engagement",
    industry: "Handcraft",
  },
  {
    quote:
      "From concept to launch, every detail was meticulously crafted. The result is a store that not only looks stunning but performs flawlessly across all devices.",
    author: "David Park",
    role: "Marketing Director",
    company: "Global Electronics",
    avatar: "/api/placeholder/80/80",
    rating: 5,
    metric: "+189% sales",
    industry: "Electronics",
  },
  {
    quote:
      "The team's deep understanding of Shopify and e-commerce best practices helped us achieve results we never thought possible. Truly exceptional work.",
    author: "Lisa Thompson",
    role: "Brand Manager",
    company: "Wellness & Beauty Co.",
    avatar: "/api/placeholder/80/80",
    rating: 5,
    metric: "+156% retention",
    industry: "Beauty",
  },
];

const AnimatedTestimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section
      ref={containerRef}
      className="py-32 bg-gradient-to-b from-black via-charcoal/20 to-black relative overflow-hidden min-h-screen flex items-center"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-32 left-20 w-64 h-64 bg-beige/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 right-20 w-80 h-80 bg-clay/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Floating quote marks */}
      <motion.div
        className="absolute top-20 left-10 text-mint/20 text-9xl font-serif"
        animate={{
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        "
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-10 text-mint/20 text-9xl font-serif rotate-180"
        animate={{
          rotate: [180, 190, 170, 180],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6,
        }}
      >
        "
      </motion.div>

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
            Client{" "}
            <span className="bg-gradient-to-r from-mint via-mint/80 to-mint bg-clip-text text-transparent">
              Love
            </span>
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Don't just take our word for it. See what our clients say about
            their transformation journey with us.
          </motion.p>
        </motion.div>

        {/* Main testimonial carousel */}
        <div className="relative max-w-5xl mx-auto mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100, rotateY: 30 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -100, rotateY: -30 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="perspective-1000"
            >
              <Card className="bg-navy-700/60 border-mint/30 backdrop-blur-xl overflow-hidden relative">
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-mint/5 via-transparent to-purple-500/5"
                  animate={{
                    background: [
                      "linear-gradient(135deg, rgba(0,255,178,0.05) 0%, transparent 50%, rgba(139,92,246,0.05) 100%)",
                      "linear-gradient(225deg, rgba(139,92,246,0.05) 0%, transparent 50%, rgba(0,255,178,0.05) 100%)",
                      "linear-gradient(135deg, rgba(0,255,178,0.05) 0%, transparent 50%, rgba(139,92,246,0.05) 100%)",
                    ],
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />

                <CardContent className="p-12 relative z-10">
                  <div className="grid md:grid-cols-3 gap-8 items-center">
                    {/* Quote section */}
                    <div className="md:col-span-2">
                      {/* Industry tag */}
                      <motion.span
                        className="inline-block bg-mint/20 text-mint px-3 py-1 rounded-full text-sm font-medium mb-6"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        {testimonials[currentIndex].industry}
                      </motion.span>

                      {/* Quote */}
                      <motion.blockquote
                        className="text-2xl md:text-3xl text-white mb-8 leading-relaxed font-light italic"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      >
                        "{testimonials[currentIndex].quote}"
                      </motion.blockquote>

                      {/* Rating stars */}
                      <motion.div
                        className="flex mb-6"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        {[...Array(testimonials[currentIndex].rating)].map(
                          (_, i) => (
                            <motion.span
                              key={i}
                              className="text-mint text-2xl mr-1"
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                duration: 0.3,
                                delay: 0.6 + i * 0.1,
                              }}
                            >
                              ★
                            </motion.span>
                          ),
                        )}
                      </motion.div>

                      {/* Metric highlight */}
                      <motion.div
                        className="inline-flex items-center bg-mint/10 border border-mint/30 rounded-full px-4 py-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                      >
                        <span className="text-mint font-bold text-lg mr-2">
                          📈
                        </span>
                        <span className="text-mint font-semibold">
                          {testimonials[currentIndex].metric}
                        </span>
                      </motion.div>
                    </div>

                    {/* Author section */}
                    <motion.div
                      className="text-center md:text-left"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <motion.div
                        className="relative inline-block mb-4"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Avatar className="w-24 h-24 border-4 border-mint/30 mx-auto">
                          <AvatarImage
                            src={testimonials[currentIndex].avatar}
                          />
                          <AvatarFallback className="bg-mint/20 text-mint text-xl">
                            {testimonials[currentIndex].author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <motion.div
                          className="absolute inset-0 border-4 border-mint/50 rounded-full"
                          animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.5, 0, 0.5],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>

                      <h4 className="font-bold text-white text-xl mb-1">
                        {testimonials[currentIndex].author}
                      </h4>
                      <p className="text-mint font-medium mb-1">
                        {testimonials[currentIndex].role}
                      </p>
                      <p className="text-gray-400">
                        {testimonials[currentIndex].company}
                      </p>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <motion.button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-navy-700/80 border border-mint/30 rounded-full flex items-center justify-center text-mint hover:bg-mint/10 transition-all duration-300"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            ←
          </motion.button>
          <motion.button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-navy-700/80 border border-mint/30 rounded-full flex items-center justify-center text-mint hover:bg-mint/10 transition-all duration-300"
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            →
          </motion.button>
        </div>

        {/* Testimonial indicators */}
        <div className="flex justify-center space-x-3 mb-16">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-mint scale-125"
                  : "bg-mint/30 hover:bg-mint/60"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {[
            { label: "Projects Delivered", value: "50+" },
            { label: "Client Satisfaction", value: "98%" },
            { label: "Average Rating", value: "5.0★" },
            { label: "Response Time", value: "24h" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
            >
              <motion.div
                className="text-3xl font-bold text-mint mb-2"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedTestimonials;
