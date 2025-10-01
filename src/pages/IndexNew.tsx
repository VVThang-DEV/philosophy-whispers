import HeroNew from "@/components/HeroNew";
import SphereGallery from "@/components/SphereGallery";
import ContentAnalysis from "@/components/ContentAnalysis";
import { philosophers } from "@/data/philosophers";
import type { Philosopher } from "@/data/philosophers";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handlePhilosopherSelect = (philosopher: Philosopher) => {
    navigate(`/chat?id=${philosopher.id}`);
  };

  return (
    <div className="min-h-screen bg-[hsl(240,40%,10%)]">
      {/* Hero Section */}
      <HeroNew />

      {/* 3D Sphere Gallery Section with smooth transition */}
      <section className="min-h-screen py-24 relative bg-gradient-to-b from-[hsl(240,40%,10%)] via-[hsl(240,45%,6%)] to-[hsl(240,40%,8%)]">
        {/* Nebula background effects */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[hsl(270,60%,50%)] rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[hsl(220,70%,55%)] rounded-full blur-[100px]" />
        </div>

        {/* Top gradient overlay for seamless transition */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[hsl(240,40%,10%)] to-transparent pointer-events-none z-10" />

        <div className="container mx-auto text-center mb-16 px-4 relative z-20 fade-in-up">
          <div className="inline-block mb-6">
            <div className="text-6xl mb-4 animate-pulse drop-shadow-[0_0_20px_hsl(270,60%,50%,0.5)]">
              🌌
            </div>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[hsl(40,20%,95%)] mb-6 drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
            Vũ Trụ Triết Học
          </h2>
          <p className="text-lg md:text-xl text-[hsl(40,20%,95%)]/70 max-w-3xl mx-auto leading-relaxed">
            Khám phá và trò chuyện với{" "}
            <span className="text-[hsl(270,60%,75%)] font-semibold drop-shadow-[0_0_10px_hsl(270,60%,50%)]">
              12+ triết gia vĩ đại
            </span>{" "}
            từ mọi thời đại và nền văn hóa
          </p>
        </div>

        <div className="w-full relative z-20 scale-in">
          <div className="h-[80vh] w-full overflow-hidden">
            <SphereGallery
              philosophers={philosophers}
              onPhilosopherSelect={handlePhilosopherSelect}
            />
          </div>
        </div>

        {/* Bottom gradient transition */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[hsl(240,40%,8%)] pointer-events-none z-10" />
      </section>

      {/* Content Analysis Section with smooth transition */}
      <section className="py-24 px-4 relative bg-gradient-to-b from-[hsl(240,40%,8%)] via-[hsl(240,45%,6%)] to-[hsl(240,50%,4%)]">
        {/* Nebula background effects */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[hsl(320,60%,60%)] rounded-full blur-[120px]" />
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-[hsl(190,80%,60%)] rounded-full blur-[120px]" />
        </div>

        {/* Top gradient overlay */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[hsl(240,40%,8%)] to-transparent pointer-events-none z-10" />

        <div className="container mx-auto relative z-20">
          <div className="text-center mb-16 fade-in-up">
            <div className="inline-block mb-6">
              <div className="text-6xl mb-4 drop-shadow-[0_0_20px_hsl(220,70%,55%,0.5)]">
                📚
              </div>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-[hsl(40,20%,95%)] mb-6 drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
              Phân Tích Nội Dung
            </h2>
            <p className="text-lg md:text-xl text-[hsl(40,20%,95%)]/70 max-w-3xl mx-auto leading-relaxed">
              Tìm hiểu sâu về các{" "}
              <span className="text-[hsl(220,70%,70%)] font-semibold drop-shadow-[0_0_10px_hsl(220,70%,55%)]">
                khái niệm triết học
              </span>{" "}
              quan trọng
            </p>
          </div>
          <div className="scale-in">
            <ContentAnalysis />
          </div>
        </div>

        {/* Bottom gradient transition */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[hsl(240,50%,4%)] pointer-events-none z-10" />
      </section>

      {/* Footer with smooth transition */}
      <footer className="relative py-16 px-4 bg-gradient-to-b from-[hsl(240,50%,4%)] to-[hsl(240,50%,3%)] border-t border-[hsl(270,60%,50%)]/15">
        {/* Subtle nebula glow */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[hsl(270,60%,50%)] rounded-full blur-[100px]" />
        </div>

        {/* Top gradient overlay */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[hsl(240,50%,4%)] to-transparent pointer-events-none" />

        <div className="container mx-auto text-center relative z-10">
          <div className="mb-6">
            <div className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-[hsl(270,60%,50%)]/15 to-[hsl(220,70%,55%)]/15 border border-[hsl(270,60%,50%)]/25 backdrop-blur-md shadow-[0_0_20px_hsl(270,60%,50%,0.2)]">
              <p className="text-[hsl(40,20%,95%)]/80 text-sm font-medium">
                © 2025 Philosophy Whispers
              </p>
            </div>
          </div>
          <p className="text-[hsl(270,60%,75%)] text-sm mb-2 drop-shadow-[0_0_10px_hsl(270,60%,50%,0.3)]">
            Một hành trình khám phá triết học
          </p>
          <p className="text-[hsl(40,20%,95%)]/60 text-xs max-w-md mx-auto">
            Khám phá trí tuệ vượt thời gian từ các nhà triết học vĩ đại
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
