import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Users,
  BookOpen,
  TrendingDown,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Info,
  Lightbulb,
} from "lucide-react";

interface Choice {
  text: string;
  consequence: string;
  isCorrect: boolean;
  nextScene: number;
  impactDescription: string;
}

interface Scene {
  id: number;
  title: string;
  subtitle: string;
  leftImage: string;
  rightImage: string;
  leftCaption: string;
  rightCaption: string;
  narration: string;
  question: string;
  choices: Choice[];
  explanation?: string;
  icon: React.ComponentType<{ className?: string }>;
}

const VisualNovelAnalysis = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [userChoices, setUserChoices] = useState<number[]>([]);
  const [showConsequence, setShowConsequence] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [correctChoices, setCorrectChoices] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Visual Novel scenes
  const scenes: Scene[] = [
    {
      id: 0,
      title: "Hiện Tượng Mê Tín",
      subtitle: "Xã hội hiện đại và niềm tin phi lý",
      leftImage:
        "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&h=400&fit=crop",
      rightImage:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop",
      leftCaption: "Khoa học tiến bộ",
      rightCaption: "Mê tín dị đoan vẫn tồn tại",
      narration:
        "Trong một xã hội ngày càng phát triển, công nghệ tiên tiến, kiến thức khoa học ngày càng phổ biến... Nhưng tại sao người ta vẫn tin vào bói toán, phong thủy, bùa ngải khi gặp khó khăn?",
      question: "Theo bạn, nguyên nhân gốc rễ của hiện tượng này là gì?",
      choices: [
        {
          text: "Con người thiếu giáo dục và không thông minh",
          consequence:
            "Bạn đã đơn giản hóa vấn đề. Nhiều người có học vấn vẫn tin mê tín khi gặp khó khăn.",
          isCorrect: false,
          nextScene: 0,
          impactDescription: "Cách nhìn này bỏ qua yếu tố cấu trúc xã hội",
        },
        {
          text: "Tồn tại xã hội quyết định ý thức xã hội",
          consequence:
            "Đúng! Theo duy vật lịch sử, điều kiện vật chất và hoàn cảnh sống tạo ra ý thức và niềm tin.",
          isCorrect: true,
          nextScene: 1,
          impactDescription: "Quan điểm khoa học - phân tích từ cơ sở vật chất",
        },
        {
          text: "Đó là bản chất tâm linh tự nhiên của con người",
          consequence:
            "Quan điểm duy tâm này không giải thích được tại sao mê tín nhiều hơn ở nơi nghèo, ít giáo dục.",
          isCorrect: false,
          nextScene: 0,
          impactDescription: "Thiếu cơ sở duy vật lịch sử",
        },
      ],
      explanation:
        "Theo Marx, 'Không phải ý thức quyết định tồn tại, mà tồn tại xã hội quyết định ý thức.' Điều kiện kinh tế lạc hậu tạo môi trường cho mê tín phát triển.",
      icon: AlertCircle,
    },
    {
      id: 1,
      title: "Điều Kiện Vật Chất",
      subtitle: "Tồn tại xã hội lạc hậu",
      leftImage:
        "https://images.unsplash.com/photo-1509099863731-ef4bff19e808?w=600&h=400&fit=crop",
      rightImage:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop",
      leftCaption: "Nghèo khó, thiếu giáo dục",
      rightCaption: "Tìm kiếm hy vọng từ tâm linh",
      narration:
        "Trong khu vực nghèo, người dân thiếu việc làm, thu nhập thấp, con cái không được học hành đầy đủ. Khi bệnh tật, thất nghiệp, họ không có tiền khám bác sĩ hay học nghề mới...",
      question: "Yếu tố nào ảnh hưởng mạnh nhất đến sự lan rộng của mê tín?",
      choices: [
        {
          text: "Thiếu luật pháp cấm bói toán",
          consequence:
            "Luật pháp chỉ là biện pháp bề mặt, không giải quyết được nguyên nhân sâu xa.",
          isCorrect: false,
          nextScene: 1,
          impactDescription: "Giải pháp hình thức, không bền vững",
        },
        {
          text: "Điều kiện kinh tế lạc hậu và thiếu giáo dục",
          consequence:
            "Chính xác! Nghèo đói và thiếu giáo dục tạo môi trường màu mỡ cho mê tín.",
          isCorrect: true,
          nextScene: 2,
          impactDescription: "Nguyên nhân cấu trúc - cần thay đổi hệ thống",
        },
        {
          text: "Truyền thống văn hóa cổ xưa",
          consequence:
            "Văn hóa là yếu tố nhưng không phải nguyên nhân gốc rễ theo DVLS.",
          isCorrect: false,
          nextScene: 1,
          impactDescription: "Chỉ là yếu tố thứ cấp",
        },
      ],
      explanation:
        "Tồn tại xã hội (điều kiện vật chất) là cơ sở. Khi người dân có cuộc sống ổn định, giáo dục tốt, họ ít tin mê tín hơn.",
      icon: TrendingDown,
    },
    {
      id: 2,
      title: "Tâm Lý Đám Đông",
      subtitle: "Áp lực xã hội và văn hóa tập thể",
      leftImage:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop",
      rightImage:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop",
      leftCaption: "Áp lực từ cộng đồng",
      rightCaption: "Truyền thống được duy trì",
      narration:
        "Trong làng, mọi người đều đi xem bói đầu năm. Nếu bạn không đi, người ta sẽ nghĩ bạn kiêu căng, không tôn trọng truyền thống. Ông bà, cha mẹ đều làm vậy từ đời này sang đời khác...",
      question: "Làm thế nào để vượt qua tâm lý đám đông này?",
      choices: [
        {
          text: "Cấm hoàn toàn các hoạt động tâm linh",
          consequence:
            "Cấm đoán không giải quyết được niềm tin bên trong, thậm chí còn gây phản ứng ngược.",
          isCorrect: false,
          nextScene: 2,
          impactDescription: "Biện pháp hành chính - không bền vững",
        },
        {
          text: "Giáo dục và phát triển tư duy phản biện",
          consequence:
            "Đúng! Giáo dục giúp mọi người tự nhận thức và vượt qua áp lực đám đông.",
          isCorrect: true,
          nextScene: 3,
          impactDescription: "Giải pháp căn bản - thay đổi nhận thức",
        },
        {
          text: "Để tự nhiên, thời gian sẽ thay đổi",
          consequence:
            "Thụ động không hiệu quả. Cần can thiệp tích cực thông qua giáo dục.",
          isCorrect: false,
          nextScene: 2,
          impactDescription: "Không chủ động, không có kế hoạch",
        },
      ],
      explanation:
        "Tâm lý đám đông là sản phẩm của điều kiện xã hội. Chỉ khi nâng cao nhận thức cá nhân qua giáo dục, người ta mới có thể tư duy độc lập.",
      icon: Users,
    },
    {
      id: 3,
      title: "Giải Pháp Bền Vững",
      subtitle: "Giáo dục và nâng cao nhận thức",
      leftImage:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop",
      rightImage:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
      leftCaption: "Giáo dục khoa học",
      rightCaption: "Tư duy phản biện phát triển",
      narration:
        "Sau khi có trường học tốt, việc làm ổn định, người dân bắt đầu hiểu về khoa học, biết phân tích nguyên nhân-kết quả. Họ không còn tin mê tín một cách mù quáng như trước...",
      question: "Vai trò quan trọng nhất của giáo dục trong việc này là gì?",
      choices: [
        {
          text: "Chỉ truyền đạt kiến thức khoa học",
          consequence:
            "Kiến thức chỉ là một phần. Quan trọng hơn là phát triển năng lực tư duy.",
          isCorrect: false,
          nextScene: 3,
          impactDescription: "Giáo dục một chiều - thiếu tư duy",
        },
        {
          text: "Phát triển tư duy phản biện và nhận thức khoa học",
          consequence:
            "Chính xác! Giáo dục phải giúp người học tự tư duy, phân tích, đánh giá.",
          isCorrect: true,
          nextScene: -1,
          impactDescription: "Giáo dục toàn diện - thay đổi căn bản",
        },
        {
          text: "Loại bỏ mọi truyền thống văn hóa",
          consequence:
            "Không cần loại bỏ văn hóa, mà cần phân biệt tinh hoa và mê tín.",
          isCorrect: false,
          nextScene: 3,
          impactDescription: "Cực đoan - phủ nhận văn hóa dân tộc",
        },
      ],
      explanation:
        "Giáo dục không chỉ truyền đạt tri thức mà còn phát triển tư duy phản biện, giúp con người tự đánh giá và ra quyết định có cơ sở khoa học.",
      icon: TrendingUp,
    },
  ];

  // Canvas animation for background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }> = [];

    const colors = [
      "rgba(139, 92, 246, 0.3)", // purple
      "rgba(59, 130, 246, 0.3)", // blue
      "rgba(236, 72, 153, 0.3)", // pink
    ];

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > canvas.offsetWidth) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.offsetHeight) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [currentScene]);

  const handleChoice = (choice: Choice, choiceIndex: number) => {
    setSelectedChoice(choice);
    setShowConsequence(true);

    const newChoices = [...userChoices];
    newChoices[currentScene] = choiceIndex;
    setUserChoices(newChoices);

    if (choice.isCorrect) {
      setCorrectChoices((prev) => prev + 1);
    }
  };

  const handleContinue = () => {
    if (selectedChoice) {
      if (selectedChoice.nextScene === -1) {
        setGameOver(true);
      } else {
        setCurrentScene(selectedChoice.nextScene);
        setShowConsequence(false);
        setSelectedChoice(null);
      }
    }
  };

  const resetGame = () => {
    setCurrentScene(0);
    setUserChoices([]);
    setShowConsequence(false);
    setSelectedChoice(null);
    setGameOver(false);
    setCorrectChoices(0);
  };

  if (gameOver) {
    const totalScenes = scenes.length;
    const percentage = Math.round((correctChoices / totalScenes) * 100);

    return (
      <div className="relative min-h-[800px]">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        <div className="relative z-10 flex items-center justify-center min-h-[800px] p-8">
          <Card className="bg-[hsl(240,45%,6%)]/95 backdrop-blur-xl border-[hsl(270,60%,50%)]/40 max-w-3xl w-full">
            <div className="p-12 space-y-8">
              <div className="text-center">
                <CheckCircle className="w-24 h-24 mx-auto mb-6 text-green-500" />
                <h2 className="text-4xl font-black text-[hsl(40,20%,95%)] mb-4">
                  Hoàn Thành Phân Tích!
                </h2>
                <div className="text-6xl font-black text-[hsl(270,60%,75%)] mb-2">
                  {correctChoices}/{totalScenes}
                </div>
                <p className="text-xl text-[hsl(40,20%,95%)]/70">
                  Câu trả lời đúng ({percentage}%)
                </p>
              </div>

              <Card className="bg-[hsl(240,45%,8%)]/60 border-[hsl(270,60%,50%)]/30 p-6">
                <h3 className="text-2xl font-bold text-[hsl(270,60%,75%)] mb-4 flex items-center gap-2">
                  <Brain className="w-6 h-6" />
                  Kết Luận Tổng Hợp
                </h3>
                <div className="space-y-4 text-[hsl(40,20%,95%)]/80 leading-relaxed">
                  <p>
                    <strong className="text-[hsl(270,60%,75%)]">
                      1. Nguyên nhân:
                    </strong>{" "}
                    Hiện tượng mê tín dị đoan xuất phát từ{" "}
                    <strong>tồn tại xã hội lạc hậu</strong> - nghèo đói, thiếu
                    giáo dục, điều kiện vật chất kém.
                  </p>
                  <p>
                    <strong className="text-[hsl(220,70%,70%)]">
                      2. Ảnh hưởng:
                    </strong>{" "}
                    Tâm lý đám đông, áp lực xã hội, và truyền thống văn hóa{" "}
                    <strong>củng cố</strong> các niềm tin này qua nhiều thế hệ.
                  </p>
                  <p>
                    <strong className="text-[hsl(190,80%,75%)]">
                      3. Giải pháp:
                    </strong>{" "}
                    Phát triển <strong>giáo dục</strong>
                    và <strong>tư duy phản biện</strong>, đồng thời cải thiện
                    điều kiện kinh tế - xã hội.
                  </p>
                  <p className="pt-4 border-t border-[hsl(270,60%,50%)]/20 text-[hsl(270,60%,75%)] italic">
                    "Không phải ý thức của con người quyết định tồn tại của họ,
                    mà ngược lại, tồn tại xã hội của họ quyết định ý thức của
                    họ." — Karl Marx
                  </p>
                </div>
              </Card>

              <div className="flex gap-4 justify-center">
                <Button
                  onClick={resetGame}
                  className="bg-gradient-to-r from-[hsl(270,60%,50%)] to-[hsl(220,70%,55%)] hover:from-[hsl(270,60%,60%)] hover:to-[hsl(220,70%,65%)] text-white px-8 py-6 text-lg"
                >
                  Phân Tích Lại
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const scene = scenes[currentScene];
  const SceneIcon = scene.icon;

  return (
    <div className="relative min-h-[900px]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 p-8 max-w-7xl mx-auto">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[hsl(40,20%,95%)]/70">
              Chương {currentScene + 1} / {scenes.length}
            </span>
            <span className="text-sm text-[hsl(270,60%,75%)]">
              {correctChoices} câu đúng
            </span>
          </div>
          <div className="h-2 bg-[hsl(240,45%,8%)]/60 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-gradient-to-r from-[hsl(270,60%,50%)] to-[hsl(220,70%,55%)] transition-all duration-500"
              style={{
                width: `${((currentScene + 1) / scenes.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {!showConsequence ? (
          <>
            {/* Visual Novel Style Layout */}
            <Card className="bg-[hsl(240,45%,8%)]/90 backdrop-blur-xl border-[hsl(270,60%,50%)]/40 mb-6 overflow-hidden">
              {/* Title */}
              <div className="p-6 border-b border-[hsl(270,60%,50%)]/20">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-[hsl(270,60%,50%)]/20 to-[hsl(220,70%,55%)]/20">
                    <SceneIcon className="w-8 h-8 text-[hsl(270,60%,70%)]" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-[hsl(40,20%,95%)]">
                      {scene.title}
                    </h2>
                    <p className="text-[hsl(270,60%,75%)]">{scene.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Dual Images */}
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative group overflow-hidden">
                  <img
                    src={scene.leftImage}
                    alt={scene.leftCaption}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                    <p className="p-4 text-white font-semibold text-lg">
                      {scene.leftCaption}
                    </p>
                  </div>
                </div>

                <div className="relative group overflow-hidden">
                  <img
                    src={scene.rightImage}
                    alt={scene.rightCaption}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                    <p className="p-4 text-white font-semibold text-lg">
                      {scene.rightCaption}
                    </p>
                  </div>
                </div>
              </div>

              {/* Narration */}
              <div className="p-6 bg-[hsl(240,45%,10%)]/60">
                <p className="text-[hsl(40,20%,95%)]/90 text-lg leading-relaxed italic">
                  {scene.narration}
                </p>
              </div>
            </Card>

            {/* Question and Choices */}
            <Card className="bg-[hsl(240,45%,8%)]/90 backdrop-blur-xl border-[hsl(270,60%,50%)]/40">
              <div className="p-8">
                <div className="mb-6">
                  <div className="flex items-start gap-3 mb-4">
                    <Lightbulb className="w-6 h-6 text-[hsl(270,60%,70%)] flex-shrink-0 mt-1" />
                    <p className="text-xl font-bold text-[hsl(40,20%,95%)]">
                      {scene.question}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {scene.choices.map((choice, index) => (
                    <button
                      key={index}
                      onClick={() => handleChoice(choice, index)}
                      className="w-full text-left p-6 rounded-xl border-2 transition-all duration-300 bg-[hsl(240,45%,10%)]/40 border-[hsl(270,60%,50%)]/30 hover:border-[hsl(270,60%,50%)]/60 hover:bg-[hsl(240,45%,10%)]/60 hover:scale-[1.02] hover:shadow-[0_0_30px_hsl(270,60%,50%,0.2)] group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full border-2 border-[hsl(270,60%,50%)]/50 flex items-center justify-center flex-shrink-0 group-hover:border-[hsl(270,60%,70%)] group-hover:bg-[hsl(270,60%,50%)]/20 transition-all">
                          <span className="text-[hsl(270,60%,70%)] font-bold">
                            {String.fromCharCode(65 + index)}
                          </span>
                        </div>

                        <div className="flex-1">
                          <p className="text-[hsl(40,20%,95%)] font-medium text-lg mb-2">
                            {choice.text}
                          </p>
                          <p className="text-[hsl(40,20%,95%)]/60 text-sm">
                            {choice.impactDescription}
                          </p>
                        </div>

                        <ArrowRight className="w-5 h-5 text-[hsl(270,60%,70%)] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  ))}
                </div>

                {scene.explanation && (
                  <div className="mt-6 p-4 rounded-xl bg-[hsl(220,70%,55%)]/10 border border-[hsl(220,70%,55%)]/30">
                    <div className="flex items-start gap-2">
                      <Info className="w-5 h-5 text-[hsl(220,70%,70%)] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-[hsl(40,20%,95%)]/70">
                        <strong className="text-[hsl(220,70%,70%)]">
                          Lý thuyết:
                        </strong>{" "}
                        {scene.explanation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </>
        ) : (
          /* Consequence Screen */
          <Card className="bg-[hsl(240,45%,8%)]/95 backdrop-blur-xl border-[hsl(270,60%,50%)]/40">
            <div className="p-12 text-center space-y-6">
              {selectedChoice?.isCorrect ? (
                <CheckCircle className="w-20 h-20 mx-auto text-green-500 animate-bounce" />
              ) : (
                <AlertCircle className="w-20 h-20 mx-auto text-orange-500 animate-pulse" />
              )}

              <div>
                <h3
                  className={`text-3xl font-black mb-4 ${
                    selectedChoice?.isCorrect
                      ? "text-green-400"
                      : "text-orange-400"
                  }`}
                >
                  {selectedChoice?.isCorrect
                    ? "Chính xác!"
                    : "Cần suy nghĩ thêm"}
                </h3>

                <div className="max-w-2xl mx-auto space-y-4">
                  <div className="p-6 rounded-xl bg-[hsl(240,45%,10%)]/60 border border-[hsl(270,60%,50%)]/20">
                    <p className="text-xl text-[hsl(40,20%,95%)]/90 leading-relaxed">
                      {selectedChoice?.consequence}
                    </p>
                  </div>

                  {scene.explanation && selectedChoice?.isCorrect && (
                    <div className="p-6 rounded-xl bg-[hsl(270,60%,50%)]/10 border border-[hsl(270,60%,50%)]/30">
                      <p className="text-[hsl(40,20%,95%)]/80 leading-relaxed">
                        <strong className="text-[hsl(270,60%,75%)]">
                          Giải thích:
                        </strong>{" "}
                        {scene.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <Button
                onClick={handleContinue}
                className="bg-gradient-to-r from-[hsl(270,60%,50%)] to-[hsl(220,70%,55%)] hover:from-[hsl(270,60%,60%)] hover:to-[hsl(220,70%,65%)] text-white px-12 py-6 text-xl"
              >
                {selectedChoice?.nextScene === -1 ? "Xem Kết Quả" : "Tiếp Tục"}
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VisualNovelAnalysis;
