import { useState, useEffect } from "react";
import {
  Brain,
  BookOpen,
  Users,
  Lightbulb,
  Sparkles,
  Quote,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const PhilosophyShowcase = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const showcaseItems = [
    {
      icon: Brain,
      title: "Duy Vật Lịch Sử",
      subtitle: "Tồn tại quyết định ý thức",
      description:
        "Khám phá cách điều kiện vật chất xác định tư duy và niềm tin xã hội",
      color: "hsl(270,60%,60%)",
      particles: 15,
    },
    {
      icon: Users,
      title: "Ý Thức Xã Hội",
      subtitle: "Tâm lý & Văn hóa",
      description:
        "Hiểu rõ ảnh hưởng của tâm lý đám đông và truyền thống văn hóa",
      color: "hsl(220,70%,60%)",
      particles: 12,
    },
    {
      icon: Lightbulb,
      title: "Tư Duy Phản Biện",
      subtitle: "Khoa học & Lý tính",
      description:
        "Phát triển khả năng tư duy độc lập và phản biện dựa trên bằng chứng",
      color: "hsl(320,60%,65%)",
      particles: 18,
    },
    {
      icon: BookOpen,
      title: "Giáo Dục Triết Học",
      subtitle: "Nâng cao nhận thức",
      description:
        "Vai trò của giáo dục trong xây dựng xã hội tiến bộ và khai sáng",
      color: "hsl(190,80%,65%)",
      particles: 14,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveCard((prev) => (prev + 1) % showcaseItems.length);
        setIsAnimating(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [showcaseItems.length]);

  return (
    <div className="relative py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 fade-in-up">
          <div className="inline-flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-[hsl(270,60%,70%)] animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-black text-[hsl(40,20%,95%)]">
              Khám Phá Triết Học
            </h2>
            <Sparkles
              className="w-8 h-8 text-[hsl(220,70%,65%)] animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
          </div>
          <p className="text-lg text-[hsl(40,20%,95%)]/70">
            Tương tác với các khái niệm triết học cốt lõi
          </p>
        </div>

        {/* Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {showcaseItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeCard === index;

            return (
              <Card
                key={index}
                className={`
                  relative overflow-hidden cursor-pointer
                  bg-[hsl(240,45%,6%)]/40 backdrop-blur-md
                  border-2 transition-all duration-700
                  ${
                    isActive
                      ? "border-[hsl(270,60%,50%)] shadow-[0_0_50px_hsl(270,60%,50%,0.4)] scale-105"
                      : "border-[hsl(270,60%,50%)]/20 hover:border-[hsl(270,60%,50%)]/40"
                  }
                `}
                onClick={() => {
                  setIsAnimating(true);
                  setTimeout(() => {
                    setActiveCard(index);
                    setIsAnimating(false);
                  }, 300);
                }}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Animated particles background */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(item.particles)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full animate-float"
                      style={{
                        width: `${2 + Math.random() * 4}px`,
                        height: `${2 + Math.random() * 4}px`,
                        background: item.color,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        opacity: isActive
                          ? 0.4 + Math.random() * 0.3
                          : 0.1 + Math.random() * 0.2,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${5 + Math.random() * 5}s`,
                        boxShadow: `0 0 10px ${item.color}`,
                        transition: "opacity 0.7s",
                      }}
                    />
                  ))}
                </div>

                {/* Glow effect */}
                {isActive && (
                  <div
                    className="absolute inset-0 opacity-20 blur-2xl"
                    style={{
                      background: `radial-gradient(circle at center, ${item.color}, transparent)`,
                    }}
                  />
                )}

                <div className="relative p-8 space-y-4">
                  {/* Icon */}
                  <div
                    className={`
                      inline-flex p-4 rounded-2xl transition-all duration-500
                      ${
                        isActive
                          ? "bg-gradient-to-br from-[hsl(270,60%,50%)]/30 to-[hsl(220,70%,55%)]/30 scale-110"
                          : "bg-[hsl(240,45%,8%)]/60"
                      }
                    `}
                  >
                    <Icon
                      className="w-10 h-10 transition-all duration-500"
                      style={{
                        color: isActive ? item.color : "hsl(270,60%,70%)",
                        filter: isActive
                          ? `drop-shadow(0 0 10px ${item.color})`
                          : "none",
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-2xl font-bold text-[hsl(40,20%,95%)] mb-2">
                      {item.title}
                    </h3>
                    <p
                      className="text-sm font-semibold mb-3 transition-all duration-500"
                      style={{
                        color: isActive ? item.color : "hsl(270,60%,70%)",
                      }}
                    >
                      {item.subtitle}
                    </p>
                    <p className="text-[hsl(40,20%,95%)]/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Progress indicator */}
                  {isActive && (
                    <div className="pt-4">
                      <div className="h-1 w-full bg-[hsl(240,45%,8%)]/60 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full animate-progress"
                          style={{ background: item.color }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Featured Quote Section */}
        <Card className="bg-gradient-to-br from-[hsl(270,60%,50%)]/10 via-[hsl(220,70%,55%)]/8 to-[hsl(320,60%,60%)]/5 border-[hsl(270,60%,50%)]/30 backdrop-blur-md scale-in">
          <div className="p-8 md:p-12">
            <div className="flex items-start gap-6">
              <Quote className="w-12 h-12 text-[hsl(270,60%,70%)] flex-shrink-0 opacity-40" />
              <div className="flex-1 space-y-4">
                <p className="text-xl md:text-2xl text-[hsl(40,20%,95%)] leading-relaxed italic">
                  "Không phải ý thức của con người quyết định tồn tại của họ, mà
                  ngược lại, tồn tại xã hội của họ quyết định ý thức của họ."
                </p>
                <p className="text-[hsl(270,60%,75%)] font-semibold">
                  — Karl Marx
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-progress {
          animation: progress 5s linear;
        }
      `}</style>
    </div>
  );
};

export default PhilosophyShowcase;
