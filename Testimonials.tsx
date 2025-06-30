import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    quote:
      "Shopify Dev Studio transformed our vision into a stunning reality. Their attention to detail and technical expertise is unmatched.",
    author: "Sarah Chen",
    role: "CEO, Luxe Fashion",
    avatar: "/api/placeholder/64/64",
    rating: 5,
  },
  {
    quote:
      "The team delivered beyond our expectations. Our conversion rate increased by 67% within the first month of launch.",
    author: "Michael Rodriguez",
    role: "Founder, Tech Innovations",
    avatar: "/api/placeholder/64/64",
    rating: 5,
  },
  {
    quote:
      "Professional, responsive, and incredibly talented. They understood our brand and brought it to life perfectly.",
    author: "Emily Watson",
    role: "Director, Artisan Collective",
    avatar: "/api/placeholder/64/64",
    rating: 5,
  },
  {
    quote:
      "Working with Shopify Dev Studio was seamless. They handled everything from design to deployment with precision.",
    author: "David Park",
    role: "CMO, Global Brands",
    avatar: "/api/placeholder/64/64",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-navy-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-32 left-20 w-48 h-48 bg-mint rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-20 w-56 h-56 bg-mint rounded-full blur-3xl" />
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
            Client <span className="text-gradient">Testimonials</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it. Hear what our clients say about
            their experience working with us.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Card className="bg-navy-700/50 border-mint/20 backdrop-blur-sm h-full transition-all duration-300 hover:border-mint/40 hover:bg-navy-700/70">
                <CardContent className="p-8">
                  {/* Rating stars */}
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.span
                        key={i}
                        className="text-mint text-xl"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.1 + i * 0.1,
                        }}
                        viewport={{ once: true }}
                      >
                        ★
                      </motion.span>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-lg text-gray-300 mb-6 leading-relaxed italic">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12 border-2 border-mint/20">
                      <AvatarImage src={testimonial.avatar} />
                      <AvatarFallback className="bg-mint/20 text-mint">
                        {testimonial.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-white group-hover:text-mint transition-colors duration-300">
                        {testimonial.author}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-mint mb-2">50+</div>
              <div className="text-gray-400 text-sm">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-mint mb-2">98%</div>
              <div className="text-gray-400 text-sm">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-mint mb-2">24h</div>
              <div className="text-gray-400 text-sm">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-mint mb-2">5★</div>
              <div className="text-gray-400 text-sm">Average Rating</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
