import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const EnhancedContact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { toast } = useToast();
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace with your actual Formspree endpoint
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast({
          title: "Message sent successfully! 🎉",
          description: "We'll get back to you within 24 hours.",
        });
        setFormData({
          name: "",
          email: "",
          company: "",
          projectType: "",
          budget: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const projectTypes = [
    "New Shopify Store",
    "Store Redesign",
    "Performance Optimization",
    "Custom Features",
    "App Integration",
    "Migration",
    "Other",
  ];

  const budgetRanges = [
    "$5k - $10k",
    "$10k - $25k",
    "$25k - $50k",
    "$50k - $100k",
    "$100k+",
  ];

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-32 bg-navy relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(0,255,178,0.1) 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 border border-mint/20 rounded-full"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute bottom-20 right-10 w-24 h-24 bg-mint/10 rounded-lg"
        animate={{
          rotate: [0, 45, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

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
            Let's Build Something{" "}
            <span className="bg-gradient-to-r from-mint via-mint/80 to-mint bg-clip-text text-transparent">
              Incredible
            </span>
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Ready to transform your Shopify vision into reality? Let's discuss
            your project and create something extraordinary together.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="bg-navy-700/60 border-mint/30 backdrop-blur-xl relative overflow-hidden">
              {/* Animated background */}
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

              <CardContent className="p-10 relative z-10">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      className="text-center py-16"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.6 }}
                    >
                      {/* Success animation */}
                      <motion.div
                        className="w-24 h-24 bg-mint/20 rounded-full flex items-center justify-center mx-auto mb-8 relative"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          duration: 0.6,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        <motion.div
                          className="text-mint text-4xl"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                        >
                          ✓
                        </motion.div>
                        <motion.div
                          className="absolute inset-0 border-4 border-mint/50 rounded-full"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [1, 0, 1],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>

                      <motion.h3
                        className="text-3xl font-bold text-white mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        Message Sent Successfully!
                      </motion.h3>
                      <motion.p
                        className="text-gray-300 mb-8 text-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                      >
                        Thank you for reaching out! We'll review your project
                        details and get back to you within 24 hours.
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                      >
                        <Button
                          onClick={() => setIsSubmitted(false)}
                          className="bg-mint text-navy hover:bg-mint/90 font-semibold px-8 py-3"
                        >
                          Send Another Message
                        </Button>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.form
                      onSubmit={handleSubmit}
                      className="space-y-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6 }}
                    >
                      {/* Name and Email row */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={
                            isInView
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: -20 }
                          }
                          transition={{ duration: 0.5, delay: 0.8 }}
                        >
                          <label className="block text-white mb-3 font-medium">
                            Full Name *
                          </label>
                          <motion.div
                            animate={
                              focusedField === "name"
                                ? { scale: 1.02, borderColor: "#00FFB2" }
                                : { scale: 1 }
                            }
                            transition={{ duration: 0.2 }}
                          >
                            <Input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              onFocus={() => setFocusedField("name")}
                              onBlur={() => setFocusedField(null)}
                              required
                              className="bg-navy-800/50 border-mint/20 text-white placeholder-gray-400 focus:border-mint focus:ring-mint py-3"
                              placeholder="Your full name"
                            />
                          </motion.div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={
                            isInView
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: 20 }
                          }
                          transition={{ duration: 0.5, delay: 0.9 }}
                        >
                          <label className="block text-white mb-3 font-medium">
                            Email Address *
                          </label>
                          <motion.div
                            animate={
                              focusedField === "email"
                                ? { scale: 1.02, borderColor: "#00FFB2" }
                                : { scale: 1 }
                            }
                            transition={{ duration: 0.2 }}
                          >
                            <Input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              onFocus={() => setFocusedField("email")}
                              onBlur={() => setFocusedField(null)}
                              required
                              className="bg-navy-800/50 border-mint/20 text-white placeholder-gray-400 focus:border-mint focus:ring-mint py-3"
                              placeholder="your.email@example.com"
                            />
                          </motion.div>
                        </motion.div>
                      </div>

                      {/* Company */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={
                          isInView
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 20 }
                        }
                        transition={{ duration: 0.5, delay: 1 }}
                      >
                        <label className="block text-white mb-3 font-medium">
                          Company Name
                        </label>
                        <Input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="bg-navy-800/50 border-mint/20 text-white placeholder-gray-400 focus:border-mint focus:ring-mint py-3"
                          placeholder="Your company name"
                        />
                      </motion.div>

                      {/* Project Type and Budget */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={
                            isInView
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: -20 }
                          }
                          transition={{ duration: 0.5, delay: 1.1 }}
                        >
                          <label className="block text-white mb-3 font-medium">
                            Project Type
                          </label>
                          <select
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleChange}
                            className="w-full bg-navy-800/50 border border-mint/20 text-white py-3 px-4 rounded-md focus:border-mint focus:ring-mint"
                          >
                            <option value="">Select project type</option>
                            {projectTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={
                            isInView
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: 20 }
                          }
                          transition={{ duration: 0.5, delay: 1.2 }}
                        >
                          <label className="block text-white mb-3 font-medium">
                            Budget Range
                          </label>
                          <select
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="w-full bg-navy-800/50 border border-mint/20 text-white py-3 px-4 rounded-md focus:border-mint focus:ring-mint"
                          >
                            <option value="">Select budget range</option>
                            {budgetRanges.map((range) => (
                              <option key={range} value={range}>
                                {range}
                              </option>
                            ))}
                          </select>
                        </motion.div>
                      </div>

                      {/* Message */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={
                          isInView
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 20 }
                        }
                        transition={{ duration: 0.5, delay: 1.3 }}
                      >
                        <label className="block text-white mb-3 font-medium">
                          Project Details *
                        </label>
                        <motion.div
                          animate={
                            focusedField === "message"
                              ? { scale: 1.02, borderColor: "#00FFB2" }
                              : { scale: 1 }
                          }
                          transition={{ duration: 0.2 }}
                        >
                          <Textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            onFocus={() => setFocusedField("message")}
                            onBlur={() => setFocusedField(null)}
                            required
                            rows={6}
                            className="bg-navy-800/50 border-mint/20 text-white placeholder-gray-400 focus:border-mint focus:ring-mint resize-none"
                            placeholder="Tell us about your project goals, timeline, and any specific requirements..."
                          />
                        </motion.div>
                      </motion.div>

                      {/* Submit button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={
                          isInView
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 20 }
                        }
                        transition={{ duration: 0.5, delay: 1.4 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-mint text-navy hover:bg-mint/90 font-bold text-lg py-4 rounded-lg relative overflow-hidden group"
                          >
                            <span className="relative z-10">
                              {isSubmitting ? (
                                <div className="flex items-center justify-center space-x-2">
                                  <motion.div
                                    className="w-5 h-5 border-2 border-navy border-t-transparent rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{
                                      duration: 1,
                                      repeat: Infinity,
                                      ease: "linear",
                                    }}
                                  />
                                  <span>Sending Message...</span>
                                </div>
                              ) : (
                                "Start the Conversation"
                              )}
                            </span>
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                              initial={{ x: "-100%" }}
                              whileHover={{ x: "100%" }}
                              transition={{ duration: 0.6 }}
                            />
                          </Button>
                        </motion.div>
                      </motion.div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div>
              <motion.h3
                className="text-3xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1 }}
              >
                Ready to Get Started?
              </motion.h3>
              <motion.p
                className="text-gray-300 text-lg leading-relaxed mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                Whether you need a complete store redesign, performance
                optimization, or custom feature development, we're here to bring
                your Shopify vision to life with precision and creativity.
              </motion.p>
            </div>

            {/* Contact details */}
            <div className="space-y-6">
              {[
                {
                  icon: "📧",
                  title: "Email Us",
                  content: "hello@shopifydevstudio.com",
                  color: "#00FFB2",
                },
                {
                  icon: "⚡",
                  title: "Response Time",
                  content: "Within 24 hours",
                  color: "#8B5CF6",
                },
                {
                  icon: "🌍",
                  title: "Location",
                  content: "Remote, Worldwide",
                  color: "#3B82F6",
                },
                {
                  icon: "🎯",
                  title: "Expertise",
                  content: "Shopify Plus Certified",
                  color: "#F97316",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-navy-700/30 rounded-lg border border-mint/10 hover:border-mint/30 transition-all duration-300"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                >
                  <motion.div
                    className="text-2xl"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  >
                    {item.icon}
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="font-medium" style={{ color: item.color }}>
                      {item.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional CTA */}
            <motion.div
              className="bg-gradient-to-r from-mint/10 via-purple-500/10 to-mint/10 p-6 rounded-lg border border-mint/20"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              <h4 className="text-white font-semibold mb-2">
                Prefer to schedule a call?
              </h4>
              <p className="text-gray-300 text-sm mb-4">
                Book a free 30-minute consultation to discuss your project in
                detail.
              </p>
              <motion.button
                className="text-mint hover:text-mint/80 font-medium transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule a Call →
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedContact;
