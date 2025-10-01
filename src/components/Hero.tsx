import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section 
      className="cosmic-bg min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ transform: `translateY(${scrollY * 0.5}px)` }}
    >
      <div className="container mx-auto px-4 text-center z-10">
        <div className="space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
            EXPLORE THE
            <br />
            <span className="text-emphasis glow-text">ETERNAL</span>
            <br />
            QUESTIONS
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Dive into the <span className="text-emphasis">timeless wisdom</span> of 
            philosophical thought, converse with <span className="text-emphasis">great minds</span>,
            and explore the depths of <span className="text-emphasis">human consciousness</span>.
          </p>

          <Button 
            onClick={scrollToContent}
            variant="outline"
            size="lg"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 mt-8"
          >
            Begin Your Journey
          </Button>
        </div>
      </div>

      <button 
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-8 h-8 text-accent" />
      </button>
    </section>
  );
};

export default Hero;
