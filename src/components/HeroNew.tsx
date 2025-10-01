import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles, Brain, BookOpen, Quote } from "lucide-react";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContent = () => {
    setIsTransitioning(true);

    // Animate out each text element with stagger
    setTimeout(() => {
      window.scrollTo({ top: window.innerHeight * 1.8, behavior: "smooth" });
      setTimeout(() => setIsTransitioning(false), 1500);
    }, 1200);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[hsl(240,50%,3%)] via-[hsl(240,45%,6%)] to-[hsl(240,40%,10%)]">
      {/* Starfield effect */}
      <div className="absolute inset-0 overflow-hidden opacity-70">
        {[...Array(150)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-[1px] h-[1px] bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.9,
              animation: `twinkle ${
                3 + Math.random() * 5
              }s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              boxShadow: `0 0 ${Math.random() * 3}px rgba(255,255,255,${
                Math.random() * 0.5
              })`,
            }}
          />
        ))}
      </div>

      {/* Nebula effects - Cosmic glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-[hsl(270,60%,50%)]/15 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[hsl(220,70%,55%)]/12 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "1.5s", animationDuration: "5s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-[500px] h-[500px] bg-[hsl(320,60%,60%)]/10 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "0.8s", animationDuration: "6s" }}
        />
        <div
          className="absolute bottom-1/3 left-1/3 w-[400px] h-[400px] bg-[hsl(190,80%,60%)]/8 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "2s", animationDuration: "7s" }}
        />
      </div>

      {/* Floating cosmic particles */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full animate-float"
            style={{
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              background: `hsl(${
                [270, 220, 320, 190][Math.floor(Math.random() * 4)]
              }, ${60 + Math.random() * 20}%, ${50 + Math.random() * 30}%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 15}s`,
              opacity: 0.3 + Math.random() * 0.4,
              boxShadow: `0 0 ${5 + Math.random() * 10}px currentColor`,
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div
        className="relative z-20 flex items-center justify-center min-h-[180vh] px-4 py-20"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <div className="container mx-auto text-center max-w-6xl">
          <div className="space-y-12">
            {/* Main Title */}
            <div className="space-y-6">
              <h1
                className={`text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight transition-all duration-700 ${
                  isTransitioning
                    ? "opacity-0 translate-y-[-100px] scale-90"
                    : "opacity-100 translate-y-0 scale-100"
                }`}
              >
                <span
                  className={`block text-[hsl(40,20%,95%)] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] transition-all duration-500 ${
                    isTransitioning ? "translate-x-[-200px] opacity-0" : ""
                  }`}
                >
                  KHÁM PHÁ
                </span>
                <span
                  className={`block bg-gradient-to-r from-[hsl(270,60%,70%)] via-[hsl(220,70%,65%)] to-[hsl(190,80%,70%)] bg-clip-text text-transparent animate-gradient drop-shadow-[0_0_50px_hsl(270,60%,50%,0.5)] transition-all duration-700 delay-100 ${
                    isTransitioning ? "scale-150 opacity-0" : ""
                  }`}
                >
                  TRIẾT HỌC
                </span>
                <span
                  className={`block text-[hsl(40,20%,95%)] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] transition-all duration-500 delay-200 ${
                    isTransitioning ? "translate-x-[200px] opacity-0" : ""
                  }`}
                >
                  VĨNH CỬU
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <div
              className={`transition-all duration-700 delay-300 ${
                isTransitioning
                  ? "opacity-0 translate-y-[50px]"
                  : "opacity-100 translate-y-0"
              }`}
            >
              <p className="text-lg md:text-2xl text-[hsl(40,20%,95%)]/80 max-w-4xl mx-auto leading-relaxed">
                Khám phá{" "}
                <span className="text-[hsl(270,60%,75%)] font-semibold drop-shadow-[0_0_15px_hsl(270,60%,50%,0.5)]">
                  trí tuệ vượt thời gian
                </span>{" "}
                từ các nhà triết học vĩ đại, trò chuyện với{" "}
                <span className="text-[hsl(220,70%,70%)] font-semibold drop-shadow-[0_0_15px_hsl(220,70%,55%,0.4)]">
                  những bộ óc lỗi lạc
                </span>
                , và tìm hiểu sâu sắc về{" "}
                <span className="text-[hsl(190,80%,75%)] font-semibold drop-shadow-[0_0_15px_hsl(190,80%,60%,0.3)]">
                  ý thức nhân loại
                </span>
                .
              </p>
            </div>

            {/* Expanded Content - Philosophy Description */}
            <div
              className={`max-w-5xl mx-auto space-y-8 pt-8 transition-all duration-700 delay-400 ${
                isTransitioning
                  ? "opacity-0 translate-y-[50px]"
                  : "opacity-100 translate-y-0"
              }`}
            >
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[hsl(270,60%,50%)]/10 to-[hsl(270,60%,50%)]/5 border border-[hsl(270,60%,50%)]/20 backdrop-blur-sm hover:border-[hsl(270,60%,50%)]/40 transition-all duration-300 hover:shadow-[0_0_30px_hsl(270,60%,50%,0.2)]">
                  <Brain className="w-10 h-10 text-[hsl(270,60%,70%)] mb-4 drop-shadow-[0_0_10px_hsl(270,60%,50%)]" />
                  <h3 className="text-xl font-bold text-[hsl(40,20%,95%)] mb-3">
                    Trò Chuyện Trực Tiếp
                  </h3>
                  <p className="text-[hsl(40,20%,95%)]/70 text-sm leading-relaxed">
                    Đối thoại với các triết gia qua AI, trải nghiệm tư duy sâu
                    sắc như thể họ vẫn còn sống
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-[hsl(220,70%,55%)]/10 to-[hsl(220,70%,55%)]/5 border border-[hsl(220,70%,55%)]/20 backdrop-blur-sm hover:border-[hsl(220,70%,55%)]/40 transition-all duration-300 hover:shadow-[0_0_30px_hsl(220,70%,55%,0.2)]">
                  <BookOpen className="w-10 h-10 text-[hsl(220,70%,70%)] mb-4 drop-shadow-[0_0_10px_hsl(220,70%,55%)]" />
                  <h3 className="text-xl font-bold text-[hsl(40,20%,95%)] mb-3">
                    Vũ Trụ 3D
                  </h3>
                  <p className="text-[hsl(40,20%,95%)]/70 text-sm leading-relaxed">
                    Khám phá không gian triết học tương tác với hiệu ứng 3D đẹp
                    mắt và trực quan
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-[hsl(190,80%,60%)]/10 to-[hsl(190,80%,60%)]/5 border border-[hsl(190,80%,60%)]/20 backdrop-blur-sm hover:border-[hsl(190,80%,60%)]/40 transition-all duration-300 hover:shadow-[0_0_30px_hsl(190,80%,60%,0.2)]">
                  <Sparkles className="w-10 h-10 text-[hsl(190,80%,75%)] mb-4 drop-shadow-[0_0_10px_hsl(190,80%,60%)]" />
                  <h3 className="text-xl font-bold text-[hsl(40,20%,95%)] mb-3">
                    Phân Tích Sâu
                  </h3>
                  <p className="text-[hsl(40,20%,95%)]/70 text-sm leading-relaxed">
                    Tìm hiểu chi tiết về tư tưởng, học thuyết và đóng góp của
                    từng triết gia
                  </p>
                </div>
              </div>
            </div>

            {/* Philosopher Preview */}
            <div
              className={`max-w-4xl mx-auto pt-12 transition-all duration-700 delay-500 ${
                isTransitioning
                  ? "opacity-0 translate-y-[50px]"
                  : "opacity-100 translate-y-0"
              }`}
            >
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[hsl(270,60%,50%)]/50 to-transparent"></div>
                <Quote className="w-6 h-6 text-[hsl(270,60%,70%)]" />
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[hsl(270,60%,50%)]/50 to-transparent"></div>
              </div>

              <div className="space-y-6">
                <div className="p-8 rounded-2xl bg-gradient-to-br from-[hsl(270,60%,50%)]/10 to-[hsl(220,70%,55%)]/10 backdrop-blur-md border border-[hsl(270,60%,50%)]/20 shadow-[0_0_30px_hsl(270,60%,50%,0.2)]">
                  <p className="text-lg md:text-xl text-[hsl(40,20%,95%)] italic leading-relaxed mb-4">
                    "Cuộc sống không được suy xét không đáng sống."
                  </p>
                  <p className="text-base text-[hsl(270,60%,75%)] font-medium">
                    — Socrates
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="p-4 rounded-xl bg-[hsl(240,45%,6%)]/50 border border-[hsl(270,60%,50%)]/10 backdrop-blur-sm">
                    <span className="text-[hsl(270,60%,70%)] font-semibold">
                      12+ Triết Gia
                    </span>
                    <p className="text-[hsl(40,20%,95%)]/60 mt-1">
                      Từ phương Đông đến phương Tây
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[hsl(240,45%,6%)]/50 border border-[hsl(220,70%,55%)]/10 backdrop-blur-sm">
                    <span className="text-[hsl(220,70%,70%)] font-semibold">
                      Đa Trường Phái
                    </span>
                    <p className="text-[hsl(40,20%,95%)]/60 mt-1">
                      Duy vật, duy tâm, hiện sinh, và nhiều hơn
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div
              className={`pt-12 transition-all duration-700 delay-600 ${
                isTransitioning
                  ? "opacity-0 scale-75 translate-y-[100px]"
                  : "opacity-100 scale-100 translate-y-0"
              }`}
            >
              <Button
                onClick={scrollToContent}
                disabled={isTransitioning}
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-[hsl(270,60%,50%)] via-[hsl(220,70%,55%)] to-[hsl(190,80%,60%)] hover:from-[hsl(270,60%,55%)] hover:via-[hsl(220,70%,60%)] hover:to-[hsl(190,80%,65%)] text-white font-bold text-lg px-12 py-8 rounded-full shadow-[0_0_40px_hsl(270,60%,50%,0.5)] hover:shadow-[0_0_60px_hsl(270,60%,50%,0.7)] transition-all duration-500 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Bắt Đầu Hành Trình
                  <ChevronDown className="w-6 h-6 animate-bounce" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[hsl(190,80%,60%)] via-[hsl(270,60%,50%)] to-[hsl(220,70%,55%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Button>
              <p className="text-[hsl(40,20%,95%)]/50 text-sm mt-6">
                Nhấp để bắt đầu khám phá vũ trụ triết học
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-30 animate-bounce transition-all duration-700 ${
          isTransitioning
            ? "opacity-0 translate-y-[50px]"
            : "opacity-100 translate-y-0"
        }`}
      >
        <div
          className="flex flex-col items-center gap-2 text-[hsl(40,20%,95%)]/60 hover:text-[hsl(270,60%,70%)] transition-all duration-300 cursor-pointer hover:drop-shadow-[0_0_15px_hsl(270,60%,50%)]"
          onClick={scrollToContent}
        >
          <span className="text-xs uppercase tracking-widest font-medium">
            Cuộn xuống
          </span>
          <ChevronDown className="w-6 h-6" />
        </div>
      </div>

      {/* Bottom gradient transition */}
      <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-b from-transparent via-[hsl(240,40%,10%)]/50 to-[hsl(240,40%,10%)] pointer-events-none z-20" />
    </section>
  );
};

export default Hero;
