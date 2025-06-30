import { useState, useEffect, useMemo } from "react";
import Preloader from "../components/Preloader";
import ScrollProgress from "../components/ScrollProgress";
import ElegantNavigation from "../components/sections/ElegantNavigation";
import ElegantHero from "../components/sections/ElegantHero";
import AnimatedTestimonials from "../components/sections/AnimatedTestimonials";
import Footer from "../components/sections/Footer";
import { VelocityScroll } from "../components/ui/scroll-based-velocity";
import { StickyScroll } from "../components/ui/sticky-scroll-reveal";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const stickyScrollContent = useMemo(
    () => [
      {
        title: "Custom Shopify Theme Development",
        description:
          "We create bespoke Shopify themes tailored to your brand identity. Every element is carefully crafted to reflect your unique style while ensuring optimal performance and user experience.",
        content: (
          <div className="h-full w-full bg-gradient-to-br from-beige to-clay flex items-center justify-center text-black">
            <div className="text-center p-8">
              <div className="text-6xl mb-4">🎨</div>
              <div className="text-2xl font-medium">Custom Themes</div>
            </div>
          </div>
        ),
      },
      {
        title: "Performance Optimization",
        description:
          "Lightning-fast loading speeds and seamless user interactions. We optimize every aspect of your store to ensure it performs flawlessly across all devices and connection speeds.",
        content: (
          <div className="h-full w-full bg-gradient-to-br from-graphite to-charcoal flex items-center justify-center text-white">
            <div className="text-center p-8">
              <div className="text-6xl mb-4">⚡</div>
              <div className="text-2xl font-medium">Speed Optimization</div>
            </div>
          </div>
        ),
      },
      {
        title: "Advanced Functionality",
        description:
          "Custom features and integrations that set your store apart. From complex product configurators to seamless third-party integrations, we bring your vision to life.",
        content: (
          <div className="h-full w-full bg-gradient-to-br from-beige/20 to-clay/20 flex items-center justify-center text-beige">
            <div className="text-center p-8">
              <div className="text-6xl mb-4">⚙️</div>
              <div className="text-2xl font-medium">Custom Features</div>
            </div>
          </div>
        ),
      },
      {
        title: "Ongoing Support & Maintenance",
        description:
          "Dedicated support to keep your store running smoothly. We provide regular updates, security monitoring, and feature enhancements to ensure your store continues to grow with your business.",
        content: (
          <div className="h-full w-full bg-gradient-to-br from-black to-charcoal flex items-center justify-center text-beige">
            <div className="text-center p-8">
              <div className="text-6xl mb-4">🛡️</div>
              <div className="text-2xl font-medium">24/7 Support</div>
            </div>
          </div>
        ),
      },
    ],
    [],
  );

  useEffect(() => {
    // Set dark mode by default for the landing page
    document.documentElement.classList.add("dark");

    // Prevent scrolling during preloader
    document.body.style.overflow = "hidden";

    return () => {
      // Cleanup function to maintain proper state
      document.body.style.overflow = "unset";
    };
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoaded(true);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      {/* Preloader */}
      {!isLoaded && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Main application */}
      {isLoaded && (
        <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
          {/* Scroll progress bar */}
          <ScrollProgress />

          {/* Navigation */}
          <ElegantNavigation />

          {/* Main content */}
          <main className="relative">
            {/* Hero Section - Banner */}
            <div id="hero" className="relative z-20">
              <ElegantHero />
            </div>

            {/* Clients Section - Testimonials */}
            <div className="relative z-20 large-content">
              <AnimatedTestimonials />
            </div>
          </main>

          {/* Sticky Scroll Reveal Section */}
          <div className="relative z-20">
            <StickyScroll content={stickyScrollContent} />
          </div>

          {/* Scroll Velocity Section */}
          <div className="relative z-20 gpu-accelerated">
            <VelocityScroll
              text="Shopify Development • Performance Optimization • Custom Themes • "
              default_velocity={3}
              className="text-4xl font-light text-beige motion-safe"
            />
          </div>

          {/* Footer */}
          <Footer />
        </div>
      )}
    </>
  );
};

export default Index;
