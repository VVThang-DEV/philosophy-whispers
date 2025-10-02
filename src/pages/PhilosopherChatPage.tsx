import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PhilosopherChatNew from "@/components/PhilosopherChatNew";
import { philosophers } from "@/data/philosophers";
import type { Philosopher } from "@/data/philosophers";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

const PhilosopherChatPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [philosopher, setPhilosopher] = useState<Philosopher | null>(null);

  useEffect(() => {
    const philosopherId = searchParams.get("id");

    if (philosopherId) {
      const found = philosophers.find((p) => p.id === philosopherId);

      if (found) {
        setPhilosopher(found);
      } else {
        // If philosopher not found, redirect to home
        navigate("/");
      }
    } else {
      // If no ID provided, redirect to home
      navigate("/");
    }
  }, [searchParams, navigate]);

  const handleBack = () => {
    navigate("/#sphere");
  };

  if (!philosopher) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[hsl(240,50%,3%)] via-[hsl(240,45%,6%)] to-[hsl(240,40%,10%)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[hsl(270,60%,50%)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[hsl(40,20%,95%)] text-lg">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(240,50%,3%)] via-[hsl(240,45%,6%)] to-[hsl(240,40%,10%)] relative overflow-hidden">
      {/* Starfield effect */}
      <div className="absolute inset-0 overflow-hidden opacity-40 pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-[1px] h-[1px] bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8,
              animation: `twinkle ${
                3 + Math.random() * 5
              }s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Nebula effects */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[hsl(270,60%,50%)] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[hsl(220,70%,55%)] rounded-full blur-[120px]" />
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-50 p-4 md:p-6 border-b border-[hsl(270,60%,50%)]/20 bg-[hsl(240,45%,6%)]/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between">
          <Button
            onClick={handleBack}
            variant="ghost"
            className="text-[hsl(40,20%,95%)] hover:text-[hsl(270,60%,75%)] hover:bg-[hsl(270,60%,50%)]/20 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Quay lại
          </Button>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <h1 className="text-lg pr-2 font-bold text-[hsl(40,20%,95%)]">
                Philosophy Whispers
              </h1>
              <p className="text-xs pr-9 text-[hsl(40,20%,95%)]/60">
                Trò chuyện với triết gia
              </p>
            </div>
          </div>

          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            size="icon"
            className="text-[hsl(40,20%,95%)] hover:text-[hsl(270,60%,75%)] hover:bg-[hsl(270,60%,50%)]/20 transition-all duration-300"
          >
            <Home className="w-5 h-5" />
          </Button>
        </div>
      </nav>

      {/* Chat Content */}
      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="max-w-7xl mx-auto h-[calc(100vh-140px)]">
          <div className="h-full rounded-3xl overflow-hidden border-2 border-[hsl(270,60%,50%)]/30 shadow-[0_30px_100px_hsl(240,50%,3%,0.9)] bg-[hsl(240,45%,6%)]/80 backdrop-blur-sm">
            <PhilosopherChatNew
              philosopher={philosopher}
              onClose={handleBack}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhilosopherChatPage;
