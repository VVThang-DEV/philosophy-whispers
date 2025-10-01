import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Zap, TrendingUp, Brain, Sparkles } from "lucide-react";
import VillageTransformationGame from "./VillageTransformationGame";
import QuickTimelineStory from "./QuickTimelineStory";

type GameMode = "selection" | "quick" | "full";

const InteractiveMLNExperience = () => {
  const [mode, setMode] = useState<GameMode>("selection");

  if (mode === "quick") {
    return <QuickTimelineStory onBack={() => setMode("selection")} />;
  }

  if (mode === "full") {
    return <VillageTransformationGame onBack={() => setMode("selection")} />;
  }

  // Mode selection screen
  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(240,45%,6%)] to-[hsl(240,40%,8%)] p-4 sm:p-6 md:p-8 flex items-center justify-center">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 px-2">
          <div className="inline-block mb-4 sm:mb-6">
            <Brain className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-[hsl(270,60%,70%)] mx-auto mb-3 sm:mb-4 animate-pulse" />
          </div>
          <p className="text-base sm:text-lg md:text-xl text-[hsl(40,20%,95%)]/70 max-w-3xl mx-auto leading-relaxed">
            Khám phá mối quan hệ giữa{" "}
            <span className="text-[hsl(270,60%,75%)] font-semibold">
              tồn tại xã hội
            </span>{" "}
            và{" "}
            <span className="text-[hsl(220,70%,70%)] font-semibold">
              ý thức xã hội
            </span>{" "}
            qua trải nghiệm tương tác
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Quick Story Mode */}
          <Card className="bg-[hsl(240,45%,8%)]/95 backdrop-blur-xl border-[hsl(270,60%,50%)]/40 overflow-hidden hover:border-[hsl(270,60%,50%)]/60 transition-all duration-300 hover:scale-[1.02] active:scale-100 group">
            <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop"
                alt="Quick Story"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(240,45%,8%)] via-[hsl(240,45%,8%)]/80 to-transparent" />
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                <div className="bg-[hsl(270,60%,50%)]/90 backdrop-blur-sm px-2 py-0.5 sm:px-3 sm:py-1 rounded-full flex items-center gap-1.5 sm:gap-2">
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  <span className="text-white text-xs sm:text-sm font-semibold">
                    Nhanh
                  </span>
                </div>
              </div>
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                <h2 className="text-2xl sm:text-3xl font-black text-[hsl(40,20%,95%)] mb-1 sm:mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  Câu Chuyện Nhanh
                </h2>
              </div>
            </div>

            <div className="p-5 sm:p-6 md:p-8">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[hsl(270,60%,70%)]" />
                <span className="text-sm sm:text-base text-[hsl(270,60%,75%)] font-semibold">
                  5-7 phút
                </span>
              </div>

              <p className="text-sm sm:text-base text-[hsl(40,20%,95%)]/80 mb-4 sm:mb-6 leading-relaxed">
                Trải nghiệm <strong>timeline tương tác</strong> qua 30 năm lịch
                sử Việt Nam. Đưa ra 4-5 quyết định quan trọng và xem kết quả
                ngay lập tức.
              </p>

              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[hsl(270,60%,70%)] mt-1.5 sm:mt-2 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-[hsl(40,20%,95%)]/70">
                    <strong className="text-[hsl(270,60%,75%)]">
                      Linear story
                    </strong>{" "}
                    - dễ theo dõi
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[hsl(220,70%,70%)] mt-1.5 sm:mt-2 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-[hsl(40,20%,95%)]/70">
                    <strong className="text-[hsl(220,70%,70%)]">
                      Visual-heavy
                    </strong>{" "}
                    - đồ họa và animation
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[hsl(190,80%,75%)] mt-1.5 sm:mt-2 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-[hsl(40,20%,95%)]/70">
                    <strong className="text-[hsl(190,80%,75%)]">
                      Quick insights
                    </strong>{" "}
                    - giải thích ngắn gọn
                  </p>
                </div>
              </div>

              <Button
                onClick={() => setMode("quick")}
                className="w-full bg-gradient-to-r from-[hsl(270,60%,50%)] to-[hsl(220,70%,55%)] hover:from-[hsl(270,60%,60%)] hover:to-[hsl(220,70%,65%)] active:scale-95 text-white font-bold py-5 sm:py-6 text-base sm:text-lg group-hover:shadow-[0_0_30px_hsl(270,60%,50%,0.4)] transition-all"
              >
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Bắt Đầu Nhanh
              </Button>

              <p className="text-xs text-[hsl(40,20%,95%)]/50 text-center mt-2 sm:mt-3">
                ⚡ Hoàn hảo cho người bận rộn
              </p>
            </div>
          </Card>

          {/* Full Simulation Mode */}
          <Card className="bg-[hsl(240,45%,8%)]/95 backdrop-blur-xl border-[hsl(220,70%,55%)]/40 overflow-hidden hover:border-[hsl(220,70%,55%)]/60 transition-all duration-300 hover:scale-[1.02] active:scale-100 group">
            <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop"
                alt="Full Simulation"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(240,45%,8%)] via-[hsl(240,45%,8%)]/80 to-transparent" />
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                <div className="bg-[hsl(220,70%,55%)]/90 backdrop-blur-sm px-2 py-0.5 sm:px-3 sm:py-1 rounded-full flex items-center gap-1.5 sm:gap-2">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  <span className="text-white text-xs sm:text-sm font-semibold">
                    Chuyên Sâu
                  </span>
                </div>
              </div>
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                <h2 className="text-2xl sm:text-3xl font-black text-[hsl(40,20%,95%)] mb-1 sm:mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  Mô Phỏng Đầy Đủ
                </h2>
              </div>
            </div>

            <div className="p-5 sm:p-6 md:p-8">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[hsl(220,70%,70%)]" />
                <span className="text-sm sm:text-base text-[hsl(220,70%,70%)] font-semibold">
                  15-20 phút
                </span>
              </div>

              <p className="text-sm sm:text-base text-[hsl(40,20%,95%)]/80 mb-4 sm:mb-6 leading-relaxed">
                Trải nghiệm <strong>game mô phỏng xã hội</strong> qua 3 giai
                đoạn lịch sử. Quản lý ngân sách, đầu tư chiến lược và xem phân
                tích chi tiết.
              </p>

              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[hsl(220,70%,70%)] mt-1.5 sm:mt-2 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-[hsl(40,20%,95%)]/70">
                    <strong className="text-[hsl(220,70%,70%)]">
                      Strategy game
                    </strong>{" "}
                    - quản lý ngân sách
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[hsl(140,60%,60%)] mt-1.5 sm:mt-2 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-[hsl(40,20%,95%)]/70">
                    <strong className="text-[hsl(140,60%,60%)]">
                      Stats tracking
                    </strong>{" "}
                    - theo dõi 5 chỉ số
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[hsl(270,60%,70%)] mt-1.5 sm:mt-2 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-[hsl(40,20%,95%)]/70">
                    <strong className="text-[hsl(270,60%,70%)]">
                      Deep analysis
                    </strong>{" "}
                    - phân tích MLN chi tiết
                  </p>
                </div>
              </div>

              <Button
                onClick={() => setMode("full")}
                className="w-full bg-gradient-to-r from-[hsl(220,70%,55%)] to-[hsl(190,80%,60%)] hover:from-[hsl(220,70%,65%)] hover:to-[hsl(190,80%,70%)] active:scale-95 text-white font-bold py-5 sm:py-6 text-base sm:text-lg group-hover:shadow-[0_0_30px_hsl(220,70%,55%,0.4)] transition-all"
              >
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Trải Nghiệm Đầy Đủ
              </Button>

              <p className="text-xs text-[hsl(40,20%,95%)]/50 text-center mt-2 sm:mt-3">
                🎯 Dành cho người muốn hiểu sâu
              </p>
            </div>
          </Card>
        </div>

        {/* Info Footer */}
        <Card className="bg-[hsl(270,60%,50%)]/10 border-[hsl(270,60%,50%)]/30 p-4 sm:p-5 md:p-6 mt-6 sm:mt-7 md:mt-8">
          <div className="flex items-start gap-2 sm:gap-3">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[hsl(270,60%,70%)] flex-shrink-0 mt-0.5 sm:mt-1" />
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[hsl(270,60%,75%)] mb-1.5 sm:mb-2">
                Cả hai đều cung cấp kiến thức đầy đủ!
              </h3>
              <p className="text-xs sm:text-sm text-[hsl(40,20%,95%)]/70 leading-relaxed">
                Dù chọn mode nào, bạn cũng sẽ hiểu rõ về mối quan hệ giữa{" "}
                <strong>tồn tại xã hội</strong> và
                <strong> ý thức xã hội</strong>, vai trò của{" "}
                <strong>giáo dục</strong> và
                <strong> tư duy phản biện</strong>, cùng ảnh hưởng của{" "}
                <strong>tâm lý đám đông</strong>.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InteractiveMLNExperience;
