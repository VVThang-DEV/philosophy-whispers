import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { philosophers } from "@/data/philosophers";
import type { Philosopher } from "@/data/philosophers";
import PhilosopherDebate from "@/components/PhilosopherDebate";
import { ArrowLeft, Swords, Sparkles, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DebateModePage = () => {
  const navigate = useNavigate();
  const [selectedPhilosopher1, setSelectedPhilosopher1] =
    useState<Philosopher | null>(null);
  const [selectedPhilosopher2, setSelectedPhilosopher2] =
    useState<Philosopher | null>(null);
  const [debateStarted, setDebateStarted] = useState(false);
  const [showTipModal, setShowTipModal] = useState(false);

  useEffect(() => {
    // Show tip modal on first visit
    const hasSeenTip = localStorage.getItem("debate-mode-tip-seen");
    if (!hasSeenTip) {
      setShowTipModal(true);
      localStorage.setItem("debate-mode-tip-seen", "true");
    }
  }, []);

  const handleStartDebate = () => {
    if (selectedPhilosopher1 && selectedPhilosopher2) {
      setDebateStarted(true);
    }
  };

  const handleExitDebate = () => {
    setDebateStarted(false);
    setSelectedPhilosopher1(null);
    setSelectedPhilosopher2(null);
  };

  if (debateStarted && selectedPhilosopher1 && selectedPhilosopher2) {
    return (
      <PhilosopherDebate
        philosopher1={selectedPhilosopher1}
        philosopher2={selectedPhilosopher2}
        onExit={handleExitDebate}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(240,50%,3%)] via-[hsl(240,45%,6%)] to-[hsl(240,40%,10%)] p-8">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[hsl(270,60%,50%)] rounded-full blur-[100px] animate-pulse" />
        <div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[hsl(220,70%,55%)] rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            className="mb-6 text-[hsl(270,60%,75%)] hover:text-[hsl(270,60%,85%)] hover:bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại trang chủ
          </Button>

          <div className="flex items-center justify-center gap-4 mb-6">
            <Swords className="w-16 h-16 text-[hsl(270,60%,70%)] animate-pulse" />
            <h1 className="text-5xl md:text-7xl font-black text-[hsl(40,20%,95%)]">
              Debate Mode
            </h1>
            <Button
              onClick={() => setShowTipModal(true)}
              variant="ghost"
              size="sm"
              className="text-[hsl(270,60%,75%)] hover:text-[hsl(270,60%,85%)] hover:bg-[hsl(270,60%,50%)]/10"
            >
              <Info className="w-4 h-4" />
            </Button>
            <Sparkles
              className="w-12 h-12 text-[hsl(220,70%,65%)] animate-spin"
              style={{ animationDuration: "3s" }}
            />
          </div>

          <p className="text-xl text-[hsl(40,20%,95%)]/70 mb-4">
            Chọn hai triết gia để bắt đầu cuộc tranh luận!
          </p>

          <div className="inline-block bg-[hsl(240,45%,8%)]/60 backdrop-blur-md border border-[hsl(270,60%,50%)]/30 rounded-xl p-4">
            <p className="text-sm text-[hsl(270,60%,75%)]">
              🎭 Mỗi triết gia có 2 trái tim ❤️ • 💬 Họ sẽ tranh luận 2-3 lượt •
              ⚖️ Bạn quyết định người chiến thắng!
            </p>
          </div>
        </div>

        {/* Selection Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Philosopher 1 Selection */}
          <Card className="bg-[hsl(240,45%,8%)]/70 backdrop-blur-xl border-[hsl(270,60%,50%)]/40 p-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(270,60%,50%)]/20 border border-[hsl(270,60%,50%)]/40 mb-4">
                <div className="w-3 h-3 rounded-full bg-[hsl(270,60%,60%)] animate-pulse" />
                <span className="text-[hsl(270,60%,80%)] font-bold">
                  Triết Gia 1
                </span>
              </div>

              {selectedPhilosopher1 ? (
                <div className="space-y-4">
                  <img
                    src={selectedPhilosopher1.avatar}
                    alt={selectedPhilosopher1.name}
                    className="w-32 h-32 rounded-full mx-auto border-4 border-[hsl(270,60%,50%)] shadow-[0_0_30px_hsl(270,60%,50%,0.5)]"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-[hsl(40,20%,95%)]">
                      {selectedPhilosopher1.name}
                    </h3>
                    <p className="text-[hsl(270,60%,75%)]">
                      {selectedPhilosopher1.school}
                    </p>
                    <p className="text-sm text-[hsl(40,20%,95%)]/60 mt-2">
                      {selectedPhilosopher1.era}
                    </p>
                  </div>
                  <Button
                    onClick={() => setSelectedPhilosopher1(null)}
                    variant="outline"
                    className="border-[hsl(270,60%,50%)]/40 hover:bg-[hsl(270,60%,50%)]/20 hover:text-[hsl(40,20%,95%)] hover:border-[hsl(270,60%,50%)]/60"
                  >
                    Chọn lại
                  </Button>
                </div>
              ) : (
                <div className="text-[hsl(40,20%,95%)]/50">
                  <div className="w-32 h-32 rounded-full mx-auto border-4 border-dashed border-[hsl(270,60%,50%)]/30 flex items-center justify-center mb-4">
                    <Swords className="w-12 h-12 text-[hsl(270,60%,50%)]/50" />
                  </div>
                  <p>Chưa chọn triết gia</p>
                </div>
              )}
            </div>
          </Card>

          {/* Philosopher 2 Selection */}
          <Card className="bg-[hsl(240,45%,8%)]/70 backdrop-blur-xl border-[hsl(220,70%,55%)]/40 p-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(220,70%,55%)]/20 border border-[hsl(220,70%,55%)]/40 mb-4">
                <div className="w-3 h-3 rounded-full bg-[hsl(220,70%,60%)] animate-pulse" />
                <span className="text-[hsl(220,70%,80%)] font-bold">
                  Triết Gia 2
                </span>
              </div>

              {selectedPhilosopher2 ? (
                <div className="space-y-4">
                  <img
                    src={selectedPhilosopher2.avatar}
                    alt={selectedPhilosopher2.name}
                    className="w-32 h-32 rounded-full mx-auto border-4 border-[hsl(220,70%,55%)] shadow-[0_0_30px_hsl(220,70%,55%,0.5)]"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-[hsl(40,20%,95%)]">
                      {selectedPhilosopher2.name}
                    </h3>
                    <p className="text-[hsl(220,70%,75%)]">
                      {selectedPhilosopher2.school}
                    </p>
                    <p className="text-sm text-[hsl(40,20%,95%)]/60 mt-2">
                      {selectedPhilosopher2.era}
                    </p>
                  </div>
                  <Button
                    onClick={() => setSelectedPhilosopher2(null)}
                    variant="outline"
                    className="border-[hsl(220,70%,55%)]/40 hover:bg-[hsl(220,70%,55%)]/20 hover:text-[hsl(40,20%,95%)] hover:border-[hsl(220,70%,55%)]/60"
                  >
                    Chọn lại
                  </Button>
                </div>
              ) : (
                <div className="text-[hsl(40,20%,95%)]/50">
                  <div className="w-32 h-32 rounded-full mx-auto border-4 border-dashed border-[hsl(220,70%,55%)]/30 flex items-center justify-center mb-4">
                    <Swords className="w-12 h-12 text-[hsl(220,70%,55%)]/50" />
                  </div>
                  <p>Chưa chọn triết gia</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Philosopher Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {philosophers.map((phil) => {
            const isSelected =
              selectedPhilosopher1?.id === phil.id ||
              selectedPhilosopher2?.id === phil.id;
            const isPhil1 = selectedPhilosopher1?.id === phil.id;
            const isPhil2 = selectedPhilosopher2?.id === phil.id;

            return (
              <Card
                key={phil.id}
                onClick={() => {
                  if (isSelected) return;
                  if (!selectedPhilosopher1) {
                    setSelectedPhilosopher1(phil);
                  } else if (
                    !selectedPhilosopher2 &&
                    phil.id !== selectedPhilosopher1.id
                  ) {
                    setSelectedPhilosopher2(phil);
                  }
                }}
                className={`
                  cursor-pointer transition-all duration-300
                  ${
                    isSelected
                      ? isPhil1
                        ? "bg-[hsl(270,60%,50%)]/20 border-[hsl(270,60%,50%)] border-2 scale-95 opacity-50"
                        : "bg-[hsl(220,70%,55%)]/20 border-[hsl(220,70%,55%)] border-2 scale-95 opacity-50"
                      : "bg-[hsl(240,45%,8%)]/60 border-[hsl(270,60%,50%)]/20 hover:border-[hsl(270,60%,50%)]/60 hover:scale-105"
                  }
                  backdrop-blur-md
                `}
              >
                <div className="p-4 text-center">
                  <img
                    src={phil.avatar}
                    alt={phil.name}
                    className={`w-20 h-20 rounded-full mx-auto mb-3 ${
                      isSelected
                        ? "border-2"
                        : "border border-[hsl(270,60%,50%)]/30"
                    }`}
                    style={
                      isSelected
                        ? {
                            borderColor: isPhil1
                              ? "hsl(270,60%,50%)"
                              : "hsl(220,70%,55%)",
                          }
                        : {}
                    }
                  />
                  <h4 className="font-bold text-[hsl(40,20%,95%)] text-sm mb-1">
                    {phil.name}
                  </h4>
                  <p className="text-xs text-[hsl(40,20%,95%)]/60">
                    {phil.school}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Start Button */}
        {selectedPhilosopher1 && selectedPhilosopher2 && (
          <div className="text-center animate-fade-in">
            <Button
              onClick={handleStartDebate}
              className="bg-gradient-to-r from-[hsl(270,60%,50%)] via-[hsl(245,65%,55%)] to-[hsl(220,70%,55%)] hover:from-[hsl(270,60%,60%)] hover:via-[hsl(245,65%,65%)] hover:to-[hsl(220,70%,65%)] text-white px-12 py-8 text-2xl font-bold shadow-[0_0_50px_hsl(270,60%,50%,0.5)] animate-pulse"
            >
              <Swords className="w-8 h-8 mr-3" />
              Bắt Đầu Tranh Luận!
              <Sparkles className="w-6 h-6 ml-3" />
            </Button>
          </div>
        )}
      </div>

      {/* Tip Modal */}
      <Dialog open={showTipModal} onOpenChange={setShowTipModal}>
        <DialogContent className="bg-[hsl(240,45%,6%)] border-[hsl(270,60%,50%)]/30 text-[hsl(40,20%,95%)] max-w-2xl [&>button]:text-[hsl(270,60%,75%)] [&>button]:hover:text-[hsl(270,60%,85%)] [&>button]:hover:bg-transparent [&>button]:focus:ring-0 [&>button]:focus:ring-offset-0 [&>button]:focus:outline-none">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[hsl(270,60%,90%)] flex items-center gap-2">
              <Info className="w-6 h-6" />
              Hướng Dẫn Debate Mode
            </DialogTitle>
            <DialogDescription className="text-[hsl(270,60%,70%)]">
              Tìm hiểu cách chơi chế độ tranh luận triết học!
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 text-[hsl(40,20%,95%)]">
            <div className="bg-[hsl(240,45%,8%)]/60 rounded-lg p-4 border border-[hsl(270,60%,50%)]/20">
              <h3 className="font-bold text-[hsl(270,60%,80%)] mb-2">
                🎭 Cách Chơi:
              </h3>
              <ul className="space-y-2 text-sm">
                <li>• Chọn 2 triết gia khác nhau để tranh luận</li>
                <li>• Đặt câu hỏi để họ bắt đầu cuộc tranh luận</li>
                <li>• Mỗi triết gia có 2 trái tim ❤️</li>
                <li>• Họ sẽ tranh luận 2-3 lượt qua lại</li>
                <li>
                  • Bạn quyết định ai thắng bằng cách chọn quan điểm bạn đồng ý
                  hơn
                </li>
              </ul>
            </div>

            <div className="bg-[hsl(240,45%,8%)]/60 rounded-lg p-4 border border-[hsl(270,60%,50%)]/20">
              <h3 className="font-bold text-[hsl(270,60%,80%)] mb-2">
                ⚖️ Quy Tắc:
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  • Mỗi triết gia sẽ đưa ra quan điểm từ góc nhìn triết học của
                  họ
                </li>
                <li>• Họ có thể phản biện lại lập luận của đối thủ</li>
                <li>
                  • Cuộc tranh luận kết thúc khi một bên hết trái tim hoặc đạt
                  giới hạn lượt
                </li>
                <li>• Người chiến thắng là triết gia bạn chọn</li>
              </ul>
            </div>

            <div className="bg-[hsl(240,45%,8%)]/60 rounded-lg p-4 border border-[hsl(270,60%,50%)]/20">
              <h3 className="font-bold text-[hsl(270,60%,80%)] mb-2">
                💡 Mẹo:
              </h3>
              <ul className="space-y-2 text-sm">
                <li>• Chọn câu hỏi sâu sắc để có cuộc tranh luận thú vị</li>
                <li>
                  • Chọn triết gia từ các trường phái khác nhau để tăng tính đối
                  lập
                </li>
                <li>• Lắng nghe cả hai quan điểm trước khi quyết định</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={() => setShowTipModal(false)}
              className="bg-[hsl(270,60%,50%)] hover:bg-[hsl(270,60%,60%)] text-white"
            >
              Bắt Đầu!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DebateModePage;
