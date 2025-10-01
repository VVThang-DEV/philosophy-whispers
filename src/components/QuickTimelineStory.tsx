import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Book,
} from "lucide-react";

interface QuickTimelineStoryProps {
  onBack: () => void;
}

interface TimelineEvent {
  year: string;
  title: string;
  image: string;
  situation: string;
  question: string;
  options: {
    text: string;
    emoji: string;
    effect: "positive" | "negative";
  }[];
  mlnExplanation: string;
  statChange: {
    superstition: number;
    literacy: number;
  };
}

const QuickTimelineStory = ({ onBack }: QuickTimelineStoryProps) => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [totalSuperstition, setTotalSuperstition] = useState(80);
  const [totalLiteracy, setTotalLiteracy] = useState(20);
  const [isComplete, setIsComplete] = useState(false);

  const events: TimelineEvent[] = [
    {
      year: "1990",
      title: "Sau Đổi Mới - Khủng Hoảng Kinh Tế",
      image:
        "https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?w=1200&h=600&fit=crop",
      situation:
        "Làng quê nghèo khó, nhiều người thất nghiệp. Dịch bệnh lan rộng nhưng không có tiền khám bác sĩ. Một thầy bói nổi tiếng về làng, tuyên bố có thể chữa bệnh bằng bùa ngải.",
      question:
        "Bạn là cán bộ xã. Ngân sách chỉ đủ cho 1 quyết định. Bạn chọn gì?",
      options: [
        {
          text: "Mời bác sĩ về khám bệnh miễn phí",
          emoji: "🏥",
          effect: "positive",
        },
        {
          text: "Để dân tự lo, tiết kiệm ngân sách",
          emoji: "💰",
          effect: "negative",
        },
      ],
      mlnExplanation:
        "**Tồn tại xã hội quyết định ý thức xã hội**: Khi điều kiện vật chất (khả năng tiếp cận y tế) thay đổi, nhận thức về khoa học sẽ thay đổi theo. Nếu người dân được chữa khỏi bệnh bằng y học, họ sẽ tin vào khoa học hơn bùa ngải.",
      statChange: { superstition: -15, literacy: 10 },
    },
    {
      year: "2000",
      title: "Thời Kỳ Công Nghiệp Hóa Bắt Đầu",
      image:
        "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1200&h=600&fit=crop",
      situation:
        "Nhiều nhà máy mở cửa. Thanh niên muốn xin việc nhưng thiếu kỹ năng. Một số người bỏ tiền đi xem bói xem ngày tốt xấu để xin việc.",
      question: "Làng có ngân sách mới. Bạn đầu tư vào đâu?",
      options: [
        {
          text: "Mở lớp dạy nghề miễn phí cho thanh niên",
          emoji: "🏫",
          effect: "positive",
        },
        {
          text: "Xây đền thờ để thu hút du lịch",
          emoji: "🏛️",
          effect: "negative",
        },
      ],
      mlnExplanation:
        "**Vai trò của giáo dục**: Giáo dục nghề nghiệp trang bị kỹ năng thực tế, giúp người dân tự tin vào năng lực bản thân thay vì phụ thuộc vào may rủi hay bói toán. Khi có việc làm ổn định, nhu cầu 'cầu may' giảm đi.",
      statChange: { superstition: -12, literacy: 15 },
    },
    {
      year: "2010",
      title: "Internet Và Mạng Xã Hội Phổ Biến",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
      situation:
        "Facebook bùng nổ. Nhiều trang bói toán online, 'thầy' tâm linh livestream hút hàng nghìn views. Tin giả lan nhanh. Nhưng cũng có nhiều kênh khoa học phổ thông.",
      question: "Làm thế nào để chống tin giả và mê tín?",
      options: [
        {
          text: "Tổ chức workshop về tư duy phản biện",
          emoji: "🧠",
          effect: "positive",
        },
        {
          text: "Cấm mọi trang tâm linh (khó thực thi)",
          emoji: "🚫",
          effect: "negative",
        },
      ],
      mlnExplanation:
        "**Tư duy phản biện**: Dạy người dân cách phân tích thông tin, nhận diện lừa đảo hiệu quả hơn cấm đoán. Khi có khả năng tư duy độc lập, họ tự nhận ra sự phi lý của mê tín.",
      statChange: { superstition: -10, literacy: 12 },
    },
    {
      year: "2015",
      title: "Khủng Hoảng Kinh Tế - Tâm Lý Bất An",
      image:
        "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=600&fit=crop",
      situation:
        "Suy thoái kinh tế. Nhiều người thất nghiệp, lo âu về tương lai. Các trang 'năng lượng vũ trụ', 'luật hấp dẫn' bùng nổ, hứa hẹn giải pháp thần kỳ.",
      question: "Khi người dân bất an về kinh tế, cần làm gì?",
      options: [
        {
          text: "Hỗ trợ tìm việc + tư vấn tâm lý miễn phí",
          emoji: "🤝",
          effect: "positive",
        },
        {
          text: "Kêu gọi 'tự tin vào bản thân' (không hỗ trợ gì)",
          emoji: "📢",
          effect: "negative",
        },
      ],
      mlnExplanation:
        "**Ảnh hưởng của tồn tại xã hội**: Khi điều kiện kinh tế xấu đi, người ta tìm kiếm 'cứu cánh' tâm linh vì thiếu giải pháp thực tế. Giải quyết vấn đề vật chất (việc làm) mới giảm được nhu cầu tâm linh phi lý.",
      statChange: { superstition: -8, literacy: 10 },
    },
    {
      year: "2020",
      title: "Đại Dịch COVID-19",
      image:
        "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=1200&h=600&fit=crop",
      situation:
        "Đại dịch bùng phát. Sợ hãi lan rộng. Nhiều tin giả về 'thần dược chữa Covid', 'bùa hộ mệnh', 'năng lượng tích cực đẩy lùi virus'. Nhưng cũng có nhiều người theo dõi thông tin y tế chính thống.",
      question: "Trong khủng hoảng y tế, chiến lược nào hiệu quả?",
      options: [
        {
          text: "Truyền thông khoa học rõ ràng + minh bạch số liệu",
          emoji: "📊",
          effect: "positive",
        },
        {
          text: "Kiểm duyệt mọi thông tin (mất lòng tin)",
          emoji: "🔒",
          effect: "negative",
        },
      ],
      mlnExplanation:
        "**Vai trò của thông tin khoa học**: Trong khủng hoảng, người dân cần thông tin chính xác và minh bạch. Khi thấy khoa học giải thích được và có giải pháp thực tế, họ sẽ giảm tin vào giải pháp phi khoa học.",
      statChange: { superstition: -5, literacy: 8 },
    },
  ];

  const currentEvent = events[currentEventIndex];
  const isLastEvent = currentEventIndex === events.length - 1;

  const handleChoice = (choiceIndex: number) => {
    const choice = currentEvent.options[choiceIndex];

    if (choice.effect === "positive") {
      setTotalSuperstition(
        Math.max(0, totalSuperstition + currentEvent.statChange.superstition)
      );
      setTotalLiteracy(
        Math.min(100, totalLiteracy + currentEvent.statChange.literacy)
      );
    } else {
      setTotalSuperstition(
        Math.min(
          100,
          totalSuperstition - currentEvent.statChange.superstition / 2
        )
      );
      setTotalLiteracy(
        Math.max(0, totalLiteracy - currentEvent.statChange.literacy / 2)
      );
    }

    setSelectedChoices([...selectedChoices, choiceIndex]);
    setShowExplanation(true);
  };

  const handleNext = () => {
    // Smooth transition to next scene
    const card = document.querySelector(".event-card");
    if (card) {
      card.classList.add("fade-out");
      setTimeout(() => {
        if (isLastEvent) {
          setIsComplete(true);
        } else {
          setCurrentEventIndex(currentEventIndex + 1);
          setShowExplanation(false);
          card.classList.remove("fade-out");
          card.classList.add("zoom-in");
        }
      }, 300);
    } else {
      if (isLastEvent) {
        setIsComplete(true);
      } else {
        setCurrentEventIndex(currentEventIndex + 1);
        setShowExplanation(false);
      }
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[hsl(240,45%,6%)] to-[hsl(240,40%,8%)] p-3 sm:p-6 md:p-8">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-[hsl(240,45%,8%)]/95 backdrop-blur-xl border-[hsl(140,60%,50%)]/40 overflow-hidden">
            <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=600&fit=crop"
                alt="Completed"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(240,45%,8%)] via-[hsl(240,45%,8%)]/80 to-transparent flex items-center justify-center">
                <div className="text-center px-4">
                  <CheckCircle2 className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-[hsl(140,60%,60%)] mx-auto mb-3 sm:mb-4 animate-pulse" />
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[hsl(40,20%,95%)]">
                    Hoàn Thành!
                  </h1>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 md:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-[hsl(40,20%,95%)] mb-4 sm:mb-6">
                Kết Quả Của Bạn
              </h2>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <Card className="bg-[hsl(240,40%,10%)] border-[hsl(0,70%,60%)]/30 p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6 text-[hsl(0,70%,65%)]" />
                      <h3 className="text-base sm:text-xl font-bold text-[hsl(40,20%,95%)]">
                        Tỷ Lệ Mê Tín
                      </h3>
                    </div>
                    <span className="text-2xl sm:text-3xl font-black text-[hsl(0,70%,65%)]">
                      {totalSuperstition.toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-[hsl(240,40%,15%)] rounded-full h-3 sm:h-4 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[hsl(0,70%,60%)] to-[hsl(0,70%,50%)] h-full rounded-full transition-all duration-1000"
                      style={{ width: `${totalSuperstition}%` }}
                    />
                  </div>
                </Card>

                <Card className="bg-[hsl(240,40%,10%)] border-[hsl(220,70%,60%)]/30 p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-[hsl(220,70%,65%)]" />
                      <h3 className="text-base sm:text-xl font-bold text-[hsl(40,20%,95%)]">
                        Tỷ Lệ Giáo Dục
                      </h3>
                    </div>
                    <span className="text-2xl sm:text-3xl font-black text-[hsl(220,70%,65%)]">
                      {totalLiteracy.toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-[hsl(240,40%,15%)] rounded-full h-3 sm:h-4 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[hsl(220,70%,60%)] to-[hsl(220,70%,50%)] h-full rounded-full transition-all duration-1000"
                      style={{ width: `${totalLiteracy}%` }}
                    />
                  </div>
                </Card>
              </div>

              <Card className="bg-[hsl(270,60%,50%)]/10 border-[hsl(270,60%,50%)]/30 p-4 sm:p-6 mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-[hsl(270,60%,75%)] mb-3 sm:mb-4 flex items-center gap-2">
                  <Book className="w-5 h-5 sm:w-6 sm:h-6" />
                  Phân Tích Duy Vật Lịch Sử
                </h3>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-[hsl(40,20%,95%)]/80 leading-relaxed">
                  <p>
                    <strong className="text-[hsl(270,60%,75%)]">
                      1. Tồn tại xã hội quyết định ý thức xã hội:
                    </strong>{" "}
                    Qua 30 năm lịch sử, ta thấy rõ khi điều kiện vật chất được
                    cải thiện (y tế, giáo dục, việc làm), mức độ mê tín giảm
                    xuống. Đây là minh chứng cho nguyên lý cơ bản của chủ nghĩa
                    duy vật.
                  </p>
                  <p>
                    <strong className="text-[hsl(220,70%,70%)]">
                      2. Vai trò của giáo dục:
                    </strong>{" "}
                    Giáo dục không chỉ truyền đạt kiến thức mà còn hình thành tư
                    duy phản biện, giúp người dân tự phân tích và nhận diện
                    thông tin sai lệch.
                  </p>
                  <p>
                    <strong className="text-[hsl(140,60%,60%)]">
                      3. Ảnh hưởng của khủng hoảng:
                    </strong>{" "}
                    Trong thời kỳ khó khăn (1990, 2015, 2020), người dân có xu
                    hướng tìm kiếm giải pháp tâm linh khi thiếu giải pháp vật
                    chất. Đây là phản ứng tự nhiên của ý thức khi tồn tại xã hội
                    bấp bênh.
                  </p>
                  <p>
                    <strong className="text-[hsl(0,70%,65%)]">
                      4. Tâm lý đám đông:
                    </strong>{" "}
                    Mạng xã hội khuếch đại cả thông tin tốt lẫn xấu. Khi thiếu
                    tư duy phản biện, người dân dễ bị cuốn theo trào lưu mê tín
                    tập thể.
                  </p>
                </div>
              </Card>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  onClick={onBack}
                  variant="outline"
                  className="flex-1 border-[hsl(40,20%,95%)]/20 hover:bg-[hsl(40,20%,95%)]/10 py-5 sm:py-6"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Quay Lại
                </Button>
                <Button
                  onClick={() => {
                    setCurrentEventIndex(0);
                    setSelectedChoices([]);
                    setShowExplanation(false);
                    setTotalSuperstition(80);
                    setTotalLiteracy(20);
                    setIsComplete(false);
                  }}
                  className="flex-1 bg-gradient-to-r from-[hsl(270,60%,50%)] to-[hsl(220,70%,55%)] hover:from-[hsl(270,60%,60%)] hover:to-[hsl(220,70%,65%)] py-5 sm:py-6"
                >
                  Chơi Lại
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(240,45%,6%)] to-[hsl(240,40%,8%)] p-3 sm:p-6 md:p-8">
      <div className="container mx-auto max-w-5xl">
        {/* Progress Bar */}
        <div className="mb-4 sm:mb-6">
          <div className="flex justify-between items-center mb-2">
            <Button
              onClick={onBack}
              variant="outline"
              size="sm"
              className="border-[hsl(40,20%,95%)]/20 hover:bg-[hsl(40,20%,95%)]/10 text-xs sm:text-sm"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Quay Lại
            </Button>
            <span className="text-xs sm:text-sm text-[hsl(40,20%,95%)]/60">
              {currentEventIndex + 1} / {events.length}
            </span>
          </div>
          <div className="w-full bg-[hsl(240,40%,15%)] rounded-full h-1.5 sm:h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[hsl(270,60%,50%)] to-[hsl(220,70%,55%)] h-full rounded-full transition-all duration-500"
              style={{
                width: `${((currentEventIndex + 1) / events.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Main Event Card */}
        <Card className="event-card bg-[hsl(240,45%,8%)]/95 backdrop-blur-xl border-[hsl(270,60%,50%)]/40 overflow-hidden transition-all duration-300">
          {/* Hero Image */}
          <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[hsl(270,60%,50%)]/10 animate-pulse" />
            <img
              src={currentEvent.image}
              alt={currentEvent.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(240,45%,8%)] via-[hsl(240,45%,8%)]/60 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
              <div className="inline-block bg-[hsl(270,60%,50%)]/80 backdrop-blur-sm px-2 py-0.5 sm:px-3 sm:py-1 rounded-full mb-1 sm:mb-2">
                <span className="text-white text-xs sm:text-sm font-semibold">
                  {currentEvent.year}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[hsl(40,20%,95%)] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                {currentEvent.title}
              </h2>
            </div>
          </div>

          <div className="p-4 sm:p-6 md:p-8">
            {/* Stats Display */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <Card className="bg-[hsl(0,70%,60%)]/10 border-[hsl(0,70%,60%)]/30 p-3 sm:p-4">
                <div className="text-xs sm:text-sm text-[hsl(40,20%,95%)]/60 mb-1">
                  Mê Tín
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[hsl(0,70%,65%)]">
                  {totalSuperstition.toFixed(0)}%
                </div>
              </Card>
              <Card className="bg-[hsl(220,70%,60%)]/10 border-[hsl(220,70%,60%)]/30 p-3 sm:p-4">
                <div className="text-xs sm:text-sm text-[hsl(40,20%,95%)]/60 mb-1">
                  Giáo Dục
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[hsl(220,70%,65%)]">
                  {totalLiteracy.toFixed(0)}%
                </div>
              </Card>
            </div>

            {/* Situation - Always visible */}
            <Card className="bg-[hsl(240,40%,10%)] border-[hsl(270,60%,50%)]/20 p-4 sm:p-6 mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-[hsl(270,60%,75%)] mb-2 sm:mb-3">
                Tình Huống
              </h3>
              <p className="text-sm sm:text-base text-[hsl(40,20%,95%)]/80 leading-relaxed">
                {currentEvent.situation}
              </p>
            </Card>

            {/* Fixed height container for smooth transition */}
            <div className="min-h-[280px] sm:min-h-[320px] relative">
              {!showExplanation ? (
                <div className="slide-up">
                  {/* Question */}
                  <h3 className="text-xl sm:text-2xl font-bold text-[hsl(40,20%,95%)] mb-3 sm:mb-4">
                    {currentEvent.question}
                  </h3>

                  {/* Options */}
                  <div className="space-y-3 sm:space-y-4">
                    {currentEvent.options.map((option, index) => (
                      <Button
                        key={index}
                        onClick={() => handleChoice(index)}
                        style={{ animationDelay: `${index * 100}ms` }}
                        className={`w-full text-left justify-start h-auto p-4 sm:p-6 opacity-0 slide-up transition-all duration-300 ${
                          option.effect === "positive"
                            ? "bg-gradient-to-r from-[hsl(140,60%,40%)]/20 to-[hsl(140,60%,40%)]/10 border-[hsl(140,60%,50%)]/40 hover:border-[hsl(140,60%,50%)]/60 hover:shadow-[0_0_20px_hsl(140,60%,50%,0.3)] active:scale-95"
                            : "bg-gradient-to-r from-[hsl(0,70%,50%)]/20 to-[hsl(0,70%,50%)]/10 border-[hsl(0,70%,60%)]/40 hover:border-[hsl(0,70%,60%)]/60 hover:shadow-[0_0_20px_hsl(0,70%,60%,0.3)] active:scale-95"
                        }`}
                        variant="outline"
                      >
                        <span className="text-3xl sm:text-4xl mr-3 sm:mr-4 transition-transform group-hover:scale-110">
                          {option.emoji}
                        </span>
                        <span className="text-base sm:text-lg text-[hsl(40,20%,95%)]">
                          {option.text}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="zoom-in">
                  {/* Explanation */}
                  <Card className="bg-[hsl(270,60%,50%)]/10 border-[hsl(270,60%,50%)]/30 p-4 sm:p-6 mb-4 sm:mb-6 transition-all duration-300 hover:border-[hsl(270,60%,50%)]/50 hover:shadow-[0_0_30px_hsl(270,60%,50%,0.2)]">
                    <h3 className="text-lg sm:text-xl font-bold text-[hsl(270,60%,75%)] mb-2 sm:mb-3 flex items-center gap-2">
                      <Book className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                      Giải Thích MLN
                    </h3>
                    <p className="text-sm sm:text-base text-[hsl(40,20%,95%)]/80 leading-relaxed">
                      {currentEvent.mlnExplanation}
                    </p>
                  </Card>

                  {/* Next Button */}
                  <Button
                    onClick={handleNext}
                    className="w-full bg-gradient-to-r from-[hsl(270,60%,50%)] to-[hsl(220,70%,55%)] hover:from-[hsl(270,60%,60%)] hover:to-[hsl(220,70%,65%)] hover:shadow-[0_0_30px_hsl(270,60%,50%,0.4)] active:scale-95 py-5 sm:py-6 text-base sm:text-lg transition-all duration-300"
                  >
                    {isLastEvent ? "Xem Kết Quả" : "Tiếp Theo"}
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default QuickTimelineStory;
