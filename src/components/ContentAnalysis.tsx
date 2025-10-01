import { Card } from "@/components/ui/card";
import { BookOpen, Brain, Users, Lightbulb } from "lucide-react";

const ContentAnalysis = () => {
  const sections = [
    {
      icon: BookOpen,
      title: "Hiện Tượng",
      content:
        "Dù xã hội phát triển và khoa học tiến bộ, nhiều người vẫn tin vào bói toán, tâm linh và bùa ngải. Trong thời kỳ khó khăn, họ dễ bị ảnh hưởng bởi những niềm tin không có cơ sở.",
    },
    {
      icon: Brain,
      title: "Chủ Nghĩa Duy Vật Lịch Sử",
      content:
        "Từ góc độ chủ nghĩa duy vật lịch sử, ý thức xã hội được quyết định bởi tồn tại xã hội. Điều kiện xã hội lạc hậu, giáo dục không đầy đủ và khó khăn kinh tế tạo nền tảng cho niềm tin mê tín.",
    },
    {
      icon: Users,
      title: "Ảnh Hưởng Xã Hội",
      content:
        "Phân tích phải xem xét: tồn tại xã hội lạc hậu, tâm lý đám đông, truyền thống văn hóa được truyền qua các thế hệ, và tư duy tập thể duy trì những niềm tin này trong cộng đồng.",
    },
    {
      icon: Lightbulb,
      title: "Giáo Dục & Tư Duy Phản Biện",
      content:
        "Vai trò của giáo dục và tư duy phản biện là tối quan trọng trong việc cải thiện nhận thức xã hội. Kiến thức khoa học, lý luận triết học và tư duy dựa trên bằng chứng giúp xã hội vượt qua mê tín.",
    },
  ];

  return (
    <section className="relative">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 space-y-4 sm:space-y-6 fade-in-up">
          <div className="inline-block">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[hsl(40,20%,95%)]">
              HIỂU BIẾT
              <br />
              <span className="bg-gradient-to-r from-[hsl(270,60%,70%)] via-[hsl(220,70%,65%)] to-[hsl(190,80%,70%)] bg-clip-text text-transparent drop-shadow-[0_0_30px_hsl(270,60%,50%,0.5)]">
                Ý THỨC XÃ HỘI
              </span>
            </h2>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-[hsl(40,20%,95%)]/70 max-w-3xl mx-auto leading-relaxed px-4">
            Một{" "}
            <span className="text-[hsl(270,60%,70%)] font-semibold">
              phân tích triết học
            </span>{" "}
            về hệ thống niềm tin và sự{" "}
            <span className="text-[hsl(220,70%,65%)] font-semibold">
              tiến hóa
            </span>{" "}
            của nhận thức xã hội.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card
                key={index}
                className="bg-[hsl(240,45%,6%)]/50 backdrop-blur-md border-[hsl(270,60%,50%)]/20 hover:border-[hsl(270,60%,50%)]/40 hover:shadow-[0_0_30px_hsl(270,60%,50%,0.2)] transition-all duration-500 group scale-in hover:scale-102 active:scale-95"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                  <div className="bg-gradient-to-br from-[hsl(270,60%,50%)]/20 to-[hsl(220,70%,55%)]/20 p-3 sm:p-4 rounded-xl group-hover:from-[hsl(270,60%,50%)]/30 group-hover:to-[hsl(220,70%,55%)]/30 transition-all duration-300 shadow-[0_0_20px_hsl(270,60%,50%,0.2)]">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[hsl(270,60%,70%)]" />
                  </div>
                  <div className="flex-1 space-y-2 sm:space-y-3">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[hsl(40,20%,95%)] group-hover:text-[hsl(270,60%,70%)] transition-colors duration-300">
                      {section.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[hsl(40,20%,95%)]/70 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}

          <Card className="bg-gradient-to-br from-[hsl(270,60%,50%)]/20 via-[hsl(220,70%,55%)]/15 to-[hsl(320,60%,60%)]/10 border-[hsl(270,60%,50%)]/40 mt-8 sm:mt-12 shadow-[0_0_40px_hsl(270,60%,50%,0.3)] backdrop-blur-md scale-in hover:scale-102 transition-transform duration-300">
            <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-center">
                <span className="bg-gradient-to-r from-[hsl(270,60%,70%)] via-[hsl(220,70%,65%)] to-[hsl(190,80%,70%)] bg-clip-text text-transparent">
                  Khung Phân Tích Phản Biện
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-6 sm:mt-8">
                <div className="space-y-3 sm:space-y-4">
                  <h4 className="text-lg sm:text-xl font-bold text-[hsl(270,60%,70%)] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[hsl(270,60%,70%)] shadow-[0_0_10px_hsl(270,60%,70%)]" />
                    Yếu Tố Chính
                  </h4>
                  <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-[hsl(40,20%,95%)]/70">
                    <li className="flex items-start gap-2">
                      <span className="text-[hsl(270,60%,70%)] mt-1 shrink-0">
                        •
                      </span>
                      <span>Điều kiện vật chất của sự tồn tại</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[hsl(270,60%,70%)] mt-1 shrink-0">
                        •
                      </span>
                      <span>Cơ sở hạ tầng giáo dục</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[hsl(270,60%,70%)] mt-1 shrink-0">
                        •
                      </span>
                      <span>Di sản văn hóa và truyền thống</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[hsl(270,60%,70%)] mt-1 shrink-0">
                        •
                      </span>
                      <span>Trình độ phát triển kinh tế</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <h4 className="text-lg sm:text-xl font-bold text-[hsl(220,70%,65%)] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[hsl(220,70%,65%)] shadow-[0_0_10px_hsl(220,70%,65%)]" />
                    Giải Pháp
                  </h4>
                  <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-[hsl(40,20%,95%)]/70">
                    <li className="flex items-start gap-2">
                      <span className="text-[hsl(220,70%,65%)] mt-1 shrink-0">
                        •
                      </span>
                      <span>Tăng cường giáo dục khoa học</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[hsl(220,70%,65%)] mt-1 shrink-0">
                        •
                      </span>
                      <span>Phát triển kỹ năng tư duy phản biện</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[hsl(220,70%,65%)] mt-1 shrink-0">
                        •
                      </span>
                      <span>Cải thiện hệ thống phúc lợi xã hội</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[hsl(220,70%,65%)] mt-1 shrink-0">
                        •
                      </span>
                      <span>Khuyến khích diễn ngôn lý trí</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContentAnalysis;
