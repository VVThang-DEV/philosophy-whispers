import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles, Brain, BookOpen, Quote } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Hero = () => {
  const scrollToContent = () => {
    // Scroll to the middle of the chat section (SphereGallery)
    window.scrollTo({ top: window.innerHeight * 1.9, behavior: "smooth" });
  };

  // Scroll animation hooks for hero elements
  const titleAnim = useScrollAnimation(0.3);
  const subtitleAnim = useScrollAnimation(0.3);
  const cardsAnim = useScrollAnimation(0.2);
  const ctaAnim = useScrollAnimation(0.2);
  const quoteAnim = useScrollAnimation(0.3);

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
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 py-16 sm:py-20">
        <div className="container mx-auto text-center max-w-6xl">
          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            {/* Main Title */}
            <div
              ref={titleAnim.ref}
              className={`space-y-4 sm:space-y-6 transition-all duration-1000 ${
                titleAnim.isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight">
                <span className="block text-[hsl(40,20%,95%)] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] slide-down">
                  KHÁM PHÁ
                </span>
                <span className="block bg-gradient-to-r from-[hsl(270,60%,70%)] via-[hsl(220,70%,65%)] to-[hsl(190,80%,70%)] bg-clip-text text-transparent animate-gradient duration-500 drop-shadow-[0_0_50px_hsl(270,60%,50%,0.5)] zoom-in">
                  TRIẾT HỌC
                </span>
                <span className="block text-[hsl(40,20%,95%)] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] slide-up">
                  VĨNH CỬU
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <div
              ref={subtitleAnim.ref}
              className={`transition-all duration-1000 delay-300 ${
                subtitleAnim.isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-base sm:text-lg md:text-2xl text-[hsl(40,20%,95%)]/80 max-w-4xl mx-auto leading-relaxed px-2">
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
              ref={cardsAnim.ref}
              className={`max-w-5xl mx-auto space-y-6 sm:space-y-8 pt-6 sm:pt-8 px-2 transition-all duration-1000 delay-500 ${
                cardsAnim.isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {/* Cosmic Orb Card - Trò Chuyện Trực Tiếp */}
                <div className="relative group">
                  {/* Floating particles */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-[hsl(270,60%,70%)] rounded-full animate-float opacity-100"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                          animationDelay: `${i * 0.5}s`,
                          animationDuration: `${3 + Math.random() * 2}s`,
                          boxShadow: `0 0 6px hsl(270,60%,70%)`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Main orb */}
                  <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[hsl(270,60%,50%)]/20 via-[hsl(270,60%,40%)]/10 to-[hsl(220,70%,55%)]/20 border border-[hsl(270,60%,50%)]/30 backdrop-blur-sm hover:border-[hsl(270,60%,50%)]/50 transition-all duration-500 hover:scale-105 active:scale-95 cursor-pointer group-hover:shadow-[0_0_40px_hsl(270,60%,50%,0.3)] flex flex-col min-h-[250px]">
                    {/* Inner glow */}
                    <div className="absolute inset-2 rounded-2xl bg-gradient-to-br from-[hsl(270,60%,50%)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 text-center flex-1 flex flex-col justify-center">
                      {/* Icon with orbit effect */}
                      <div className="relative inline-block mb-4 sm:mb-6">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[hsl(270,60%,50%)] to-[hsl(220,70%,55%)] flex items-center justify-center mx-auto shadow-[0_0_20px_hsl(270,60%,50%,0.5)] group-hover:shadow-[0_0_30px_hsl(270,60%,50%,0.7)] transition-all duration-300">
                          <Brain className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                        </div>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-[hsl(40,20%,95%)] mb-2 sm:mb-3 group-hover:text-[hsl(270,60%,80%)] transition-colors duration-300">
                        Trò Chuyện Trực Tiếp
                      </h3>
                      <p className="text-[hsl(40,20%,95%)]/70 text-xs sm:text-sm leading-relaxed">
                        Đối thoại với các triết gia qua AI, trải nghiệm tư duy
                        sâu sắc như thể họ vẫn còn sống
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hexagonal Tech Card - Vũ Trụ 3D */}
                <div className="relative group">
                  {/* Hexagonal background pattern */}
                  <div className="absolute inset-1 opacity-70 blur-[2px]">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <defs>
                        <pattern
                          id="hexagons"
                          x="0"
                          y="0"
                          width="20"
                          height="17.32"
                          patternUnits="userSpaceOnUse"
                        >
                          <polygon
                            points="10,0 20,5.77 20,11.55 10,17.32 0,11.55 0,5.77"
                            fill="none"
                            stroke="hsl(220,70%,70%)"
                            strokeWidth="1.5"
                          />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#hexagons)" />
                    </svg>
                  </div>

                  <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[hsl(220,70%,55%)]/20 via-[hsl(220,70%,45%)]/10 to-[hsl(190,80%,60%)]/20 border border-[hsl(220,70%,55%)]/30 backdrop-blur-sm hover:border-[hsl(220,70%,55%)]/50 transition-all duration-500 hover:scale-105 active:scale-95 cursor-pointer group-hover:shadow-[0_0_40px_hsl(220,70%,55%,0.3)] flex flex-col min-h-[250px]">
                    {/* Inner glow */}
                    <div className="absolute inset-2 rounded-xl bg-gradient-to-br from-[hsl(220,70%,55%)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {/* Circuit lines */}
                    <div className="absolute inset-0 opacity-40">
                      <div className="absolute top-2 left-2 w-12 h-0.5 bg-gradient-to-r from-transparent via-[hsl(220,70%,70%)] to-transparent blur-[0.5px]" />
                      <div className="absolute top-6 right-4 w-8 h-0.5 bg-gradient-to-l from-transparent via-[hsl(220,70%,70%)] to-transparent blur-[0.5px]" />
                      <div className="absolute top-12 left-6 w-10 h-0.5 bg-gradient-to-r from-transparent via-[hsl(220,70%,70%)] to-transparent blur-[0.5px]" />
                      <div className="absolute top-16 right-8 w-6 h-0.5 bg-gradient-to-l from-transparent via-[hsl(220,70%,70%)] to-transparent blur-[0.5px]" />
                      <div className="absolute bottom-8 left-4 w-14 h-0.5 bg-gradient-to-r from-transparent via-[hsl(220,70%,70%)] to-transparent blur-[0.5px]" />
                      <div className="absolute bottom-4 right-6 w-9 h-0.5 bg-gradient-to-l from-transparent via-[hsl(220,70%,70%)] to-transparent blur-[0.5px]" />
                      <div className="absolute top-10 left-12 w-0.5 h-8 bg-gradient-to-b from-transparent via-[hsl(220,70%,70%)] to-transparent blur-[0.5px]" />
                      <div className="absolute top-4 right-12 w-0.5 h-6 bg-gradient-to-t from-transparent via-[hsl(220,70%,70%)] to-transparent blur-[0.5px]" />
                      <div className="absolute bottom-12 left-16 w-0.5 h-10 bg-gradient-to-b from-transparent via-[hsl(220,70%,70%)] to-transparent blur-[0.5px]" />
                      <div className="absolute top-20 left-8 w-16 h-0.5 bg-gradient-to-r from-transparent via-[hsl(220,70%,70%)] to-transparent blur-[0.5px]" />
                      <div className="absolute top-24 right-10 w-12 h-0.5 bg-gradient-to-l from-transparent via-[hsl(220,70%,70%)] to-transparent blur-[0.5px]" />
                      <div className="absolute bottom-16 left-10 w-0.5 h-12 bg-gradient-to-b from-transparent via-[hsl(220,70%,70%)] to-transparent blur-[0.5px]" />
                      <div className="absolute top-14 right-16 w-0.5 h-8 bg-gradient-to-t from-transparent via-[hsl(220,70%,70%)] to-transparent blur-[0.5px]" />
                      <div className="absolute bottom-20 right-12 w-0.5 h-6 bg-gradient-to-b from-transparent via-[hsl(220,70%,70%)] to-transparent blur-[0.5px]" />
                      <div className="absolute top-18 left-14 w-8 h-0.5 bg-gradient-to-r from-transparent via-[hsl(220,70%,70%)] to-transparent blur-[0.5px]" />
                    </div>

                    <div className="relative z-10 flex-1 flex flex-col justify-center">
                      {/* Icon with data flow effect */}
                      <div className="relative inline-block mb-4 sm:mb-6">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-[hsl(220,70%,55%)] to-[hsl(190,80%,60%)] flex items-center justify-center mx-auto shadow-[0_0_20px_hsl(220,70%,55%,0.5)] group-hover:shadow-[0_0_30px_hsl(220,70%,55%,0.7)] transition-all duration-300">
                          <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                        </div>
                        {/* Data flow dots */}
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-[hsl(190,80%,70%)] rounded-full animate-pulse" />
                        <div
                          className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-[hsl(220,70%,70%)] rounded-full animate-pulse"
                          style={{ animationDelay: "0.5s" }}
                        />
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-[hsl(40,20%,95%)] mb-2 sm:mb-3 group-hover:text-[hsl(220,70%,80%)] transition-colors duration-300">
                        Vũ Trụ 3D
                      </h3>
                      <p className="text-[hsl(40,20%,95%)]/70 text-xs sm:text-sm leading-relaxed">
                        Khám phá không gian triết học tương tác với hiệu ứng 3D
                        đẹp mắt và trực quan
                      </p>
                    </div>
                  </div>
                </div>

                {/* Organic Flow Card - Phân Tích Sâu */}
                <div className="relative group sm:col-span-2 md:col-span-1">
                  {/* Organic flowing background with smooth curves */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-[hsl(190,80%,60%)]/40 via-[hsl(220,70%,55%)]/35 to-[hsl(190,80%,60%)]/40 rounded-3xl" />
                    {/* Flowing curves */}
                    <svg
                      className="absolute inset-0 w-full h-full opacity-60"
                      viewBox="0 0 300 200"
                    >
                      <path
                        d="M50,100 Q100,50 150,100 T250,100 Q280,120 250,140 T150,140 Q100,180 50,140 T0,100"
                        fill="none"
                        stroke="hsl(190,80%,70%)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M30,80 Q80,30 130,80 T230,80 Q260,100 230,120 T130,120 Q80,160 30,120 T-10,80"
                        fill="none"
                        stroke="hsl(220,70%,70%)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        opacity="0.6"
                      />
                    </svg>
                  </div>

                  <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[hsl(190,80%,60%)]/20 via-[hsl(190,80%,50%)]/10 to-[hsl(220,70%,55%)]/20 border border-[hsl(190,80%,60%)]/30 backdrop-blur-sm hover:border-[hsl(190,80%,60%)]/50 transition-all duration-500 hover:scale-105 active:scale-95 cursor-pointer group-hover:shadow-[0_0_40px_hsl(190,80%,60%,0.3)] flex flex-col min-h-[253px]">
                    {/* Subtle flowing particles */}
                    <div className="absolute inset-0 overflow-hidden rounded-3xl">
                      <div
                        className="absolute top-8 right-8 w-1 h-1 bg-[hsl(190,80%,70%)] rounded-full animate-float opacity-40"
                        style={{ animationDuration: "4s" }}
                      />
                      <div
                        className="absolute bottom-12 left-12 w-1.5 h-1.5 bg-[hsl(220,70%,70%)] rounded-full animate-float opacity-30"
                        style={{
                          animationDuration: "6s",
                          animationDelay: "1s",
                        }}
                      />
                      <div
                        className="absolute top-16 left-8 w-0.5 h-0.5 bg-[hsl(190,80%,80%)] rounded-full animate-float opacity-50"
                        style={{
                          animationDuration: "5s",
                          animationDelay: "2s",
                        }}
                      />
                    </div>

                    <div className="relative z-10 flex-1 flex flex-col justify-center">
                      {/* Icon with gentle pulse */}
                      <div className="relative inline-block mb-4 sm:mb-6">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-[hsl(190,80%,60%)] to-[hsl(220,70%,55%)] flex items-center justify-center mx-auto shadow-[0_0_20px_hsl(190,80%,60%,0.5)] group-hover:shadow-[0_0_30px_hsl(190,80%,60%,0.7)] transition-all duration-300">
                          <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                        </div>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-[hsl(40,20%,95%)] mb-2 sm:mb-3 group-hover:text-[hsl(190,80%,80%)] transition-colors duration-300">
                        Phân Tích Sâu
                      </h3>
                      <p className="text-[hsl(40,20%,95%)]/70 text-xs sm:text-sm leading-relaxed">
                        Tìm hiểu chi tiết về tư tưởng, học thuyết và đóng góp
                        của từng triết gia
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Philosopher Preview */}
            <div
              ref={quoteAnim.ref}
              className={`max-w-5xl mx-auto pt-8 sm:pt-12 transition-all duration-1000 delay-300 ${
                quoteAnim.isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex justify-center">
                <div className="w-full max-w-2xl mx-auto">
                  <div className="flex items-center justify-start gap-2 sm:gap-3 mb-6 sm:mb-8">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[hsl(270,60%,50%)]/50 to-transparent"></div>
                    <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-[hsl(270,60%,70%)]" />
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[hsl(270,60%,50%)]/50 to-transparent"></div>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    <div className="p-5 sm:p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[hsl(270,60%,50%)]/10 to-[hsl(220,70%,55%)]/10 backdrop-blur-md border border-[hsl(270,60%,50%)]/20 shadow-[0_0_30px_hsl(270,60%,50%,0.2)] hover:scale-102 transition-transform duration-300">
                      <p className="text-base sm:text-lg md:text-xl text-[hsl(40,20%,95%)] italic leading-relaxed mb-3 sm:mb-4">
                        "Cuộc sống không được suy xét không đáng sống."
                      </p>
                      <p className="text-sm sm:text-base text-[hsl(270,60%,75%)] font-medium">
                        — Socrates
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                      <div className="p-3 sm:p-4 rounded-xl bg-[hsl(240,45%,6%)]/50 border border-[hsl(270,60%,50%)]/10 backdrop-blur-sm hover:border-[hsl(270,60%,50%)]/30 transition-colors duration-300">
                        <span className="text-[hsl(270,60%,70%)] font-semibold">
                          12+ Triết Gia
                        </span>
                        <p className="text-[hsl(40,20%,95%)]/60 mt-1">
                          Từ phương Đông đến phương Tây
                        </p>
                      </div>
                      <div className="p-3 sm:p-4 rounded-xl bg-[hsl(240,45%,6%)]/50 border border-[hsl(220,70%,55%)]/10 backdrop-blur-sm hover:border-[hsl(220,70%,55%)]/30 transition-colors duration-300">
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
              </div>

              {/* CTA Buttons */}
              <div
                ref={ctaAnim.ref}
                className={`pt-8 sm:pt-12 transition-all duration-1000 delay-700 ${
                  ctaAnim.isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-center">
                  <Button
                    onClick={scrollToContent}
                    size="lg"
                    className="w-full sm:w-auto group relative overflow-hidden bg-gradient-to-r from-[hsl(270,60%,50%)] via-[hsl(220,70%,55%)] to-[hsl(190,80%,60%)] hover:from-[hsl(270,60%,55%)] hover:via-[hsl(220,70%,60%)] hover:to-[hsl(190,80%,65%)] text-white font-bold text-base sm:text-lg px-8 sm:px-10 md:px-12 py-5 sm:py-6 md:py-8 rounded-full shadow-[0_0_40px_hsl(270,60%,50%,0.5)] hover:shadow-[0_0_60px_hsl(270,60%,50%,0.7)] transition-all duration-500 hover:scale-105 sm:hover:scale-110 active:scale-95"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                      Bắt Đầu Hành Trình
                      <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[hsl(190,80%,60%)] via-[hsl(270,60%,50%)] to-[hsl(220,70%,55%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Button>

                  <Button
                    onClick={() => (window.location.href = "/debate")}
                    size="lg"
                    className="w-full sm:w-auto group relative overflow-hidden bg-gradient-to-r from-[hsl(320,60%,60%)] via-[hsl(270,60%,55%)] to-[hsl(220,70%,55%)] hover:from-[hsl(320,60%,65%)] hover:via-[hsl(270,60%,60%)] hover:to-[hsl(220,70%,60%)] text-white font-bold text-base sm:text-lg px-8 sm:px-10 md:px-12 py-5 sm:py-6 md:py-8 rounded-full shadow-[0_0_40px_hsl(320,60%,60%,0.5)] hover:shadow-[0_0_60px_hsl(320,60%,60%,0.7)] transition-all duration-500 hover:scale-105 sm:hover:scale-110 active:scale-95 border-2 border-[hsl(320,60%,70%)]/50"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                      Debate Mode
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220,70%,55%)] via-[hsl(320,60%,60%)] to-[hsl(270,60%,55%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Button>
                </div>
                <p className="text-center text-[hsl(40,20%,95%)]/50 text-xs sm:text-sm mt-4 sm:mt-6 px-4">
                  Khám phá vũ trụ triết học hoặc xem các triết gia tranh luận
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient transition */}
      <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-b from-transparent via-[hsl(240,40%,10%)]/50 to-[hsl(240,40%,10%)] pointer-events-none z-20" />
    </section>
  );
};

export default Hero;
