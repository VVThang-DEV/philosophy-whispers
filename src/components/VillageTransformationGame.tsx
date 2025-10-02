import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  GraduationCap,
  Coins,
  Heart,
  Users,
  Sparkles,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  RotateCcw,
  Brain,
  Factory,
  Book,
  Home,
  ArrowLeft,
} from "lucide-react";

interface VillageTransformationGameProps {
  onBack?: () => void;
}

interface VillageStats {
  year: number;
  gdpPerCapita: number;
  literacyRate: number;
  healthcareAccess: number;
  superstitionRate: number;
  urbanization: number;
}

interface Decision {
  id: string;
  title: string;
  description: string;
  cost: number;
  effects: {
    gdp: number;
    literacy: number;
    healthcare: number;
    superstition: number;
    urbanization: number;
  };
  mlnExplanation: string;
}

interface Phase {
  id: number;
  year: string;
  title: string;
  description: string;
  backgroundImage: string;
  sceneryDescription: string;
  historicalContext: string;
  challenge: string;
  decisions: Decision[];
}

const VillageTransformationGame = ({
  onBack,
}: VillageTransformationGameProps = {}) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [budget, setBudget] = useState(800);
  const [villageStats, setVillageStats] = useState<VillageStats>({
    year: 1990,
    gdpPerCapita: 30,
    literacyRate: 35,
    healthcareAccess: 25,
    superstitionRate: 75,
    urbanization: 20,
  });
  const [decisionHistory, setDecisionHistory] = useState<Decision[]>([]);
  const [pendingDecisions, setPendingDecisions] = useState<Decision[]>([]);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [decisionsThisPhase, setDecisionsThisPhase] = useState(0);
  const [maxDecisionsPerPhase] = useState(2);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const phases: Phase[] = [
    {
      id: 0,
      year: "1990-2000",
      title: "Thập Kỷ Khởi Đầu",
      description:
        "Làng quê Việt Nam sau đổi mới. Dân số chủ yếu làm nông, thu nhập thấp, giáo dục hạn chế.",
      backgroundImage:
        "https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?w=1200&h=600&fit=crop",
      sceneryDescription:
        "Làng quê nghèo khó với ruộng lúa, nhà tranh, người dân làm việc chân tay",
      historicalContext:
        "Sau Đổi Mới 1986, kinh tế bắt đầu mở cửa nhưng nông thôn vẫn nghèo. Nhiều người tin vào thầy bói, xem ngày giờ, cúng bái để cầu may.",
      challenge:
        "75% dân làng tin vào mê tín dị đoan. Chọn 2 quyết định để bắt đầu chuyển đổi.",
      decisions: [
        {
          id: "edu_basic",
          title: "Xây Trường Học Cơ Bản",
          description:
            "Đầu tư vào giáo dục tiểu học, giảm học phí, tăng giáo viên",
          cost: 350,
          effects: {
            gdp: 5,
            literacy: 25,
            healthcare: 5,
            superstition: -15,
            urbanization: 5,
          },
          mlnExplanation:
            "Giáo dục nâng cao nhận thức → Con người hiểu biết khoa học → Giảm tin tưởng mù quáng vào mê tín",
        },
        {
          id: "econ_basic",
          title: "Phát Triển Kinh Tế Địa Phương",
          description: "Đầu tư vào hợp tác xã, chợ, giao thông",
          cost: 300,
          effects: {
            gdp: 20,
            literacy: 5,
            healthcare: 10,
            superstition: -8,
            urbanization: 10,
          },
          mlnExplanation:
            "Tồn tại xã hội cải thiện (thu nhập tăng) → Ít lo âu về cuộc sống → Ít cần 'tâm linh' để nương tựa",
        },
        {
          id: "health_basic",
          title: "Trạm Y Tế Làng",
          description: "Xây trạm y tế, thuốc men, y tá",
          cost: 280,
          effects: {
            gdp: 3,
            literacy: 2,
            healthcare: 30,
            superstition: -12,
            urbanization: 3,
          },
          mlnExplanation:
            "Có bác sĩ chữa bệnh → Không cần thầy bói 'giải hạn' → Thực tiễn chứng minh khoa học hiệu quả",
        },
        {
          id: "radio_station",
          title: "Đài Phát Thanh Làng",
          description: "Phát sóng tin tức, kiến thức khoa học phổ thông",
          cost: 200,
          effects: {
            gdp: 2,
            literacy: 15,
            healthcare: 0,
            superstition: -10,
            urbanization: 5,
          },
          mlnExplanation:
            "Truyền thông đại chúng → Tiếp cận thông tin nhanh → Dần thay thế truyền miệng mê tín",
        },
        {
          id: "electricity",
          title: "Lưới Điện Cho Làng",
          description: "Kéo điện về làng, thắp sáng đường làng",
          cost: 400,
          effects: {
            gdp: 10,
            literacy: 8,
            healthcare: 5,
            superstition: -7,
            urbanization: 12,
          },
          mlnExplanation:
            "Cơ sở hạ tầng hiện đại → Cuộc sống tiện nghi hơn → Tâm lý 'thế giới tối tăm' giảm",
        },
        {
          id: "ban_superstition",
          title: "Cấm Hoạt Động Mê Tín (Rủi ro cao)",
          description: "Ban hành quy định cấm bói toán, phạt vi phạm",
          cost: 150,
          effects: {
            gdp: -10,
            literacy: 0,
            healthcare: 0,
            superstition: -5,
            urbanization: 0,
          },
          mlnExplanation:
            "Biện pháp hành chính không thay đổi điều kiện vật chất → Người dân vẫn tin, chỉ che giấu → Không bền vững, có thể gây phản tác dụng",
        },
      ],
    },
    {
      id: 1,
      year: "2000-2010",
      title: "Thời Kỳ Phát Triển",
      description:
        "Kinh tế phát triển, đời sống được cải thiện, nhưng mê tín vẫn tồn tại ở một số vùng.",
      backgroundImage:
        "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1200&h=600&fit=crop",
      sceneryDescription:
        "Làng đã có nhà cấp 4, đường bê tông, một số xe máy, trường học mới",
      historicalContext:
        "Việt Nam gia nhập WTO (2007), kinh tế tăng trưởng mạnh. Nhưng chênh lệch giàu nghèo xuất hiện, nơi nào còn nghèo vẫn tin mê tín.",
      challenge:
        "Với thành quả đạt được, tiếp tục đầu tư để giảm mê tín xuống dưới 40%. Chọn 2 quyết định.",
      decisions: [
        {
          id: "edu_advanced",
          title: "Trường THPT & Đào Tạo Nghề",
          description: "Xây trường trung học, dạy nghề, học bổng",
          cost: 450,
          effects: {
            gdp: 15,
            literacy: 30,
            healthcare: 10,
            superstition: -20,
            urbanization: 15,
          },
          mlnExplanation:
            "Giáo dục cao hơn → Tư duy phản biện phát triển → Tự phân tích, không chấp nhận mù quáng",
        },
        {
          id: "industry",
          title: "Khu Công Nghiệp Nhỏ",
          description: "Thu hút doanh nghiệp, tạo việc làm",
          cost: 550,
          effects: {
            gdp: 35,
            literacy: 10,
            healthcare: 15,
            superstition: -15,
            urbanization: 30,
          },
          mlnExplanation:
            "Đô thị hóa, tiếp xúc văn hóa hiện đại → Tâm lý đám đông thay đổi → Chuẩn mực xã hội mới",
        },
        {
          id: "culture",
          title: "Trung Tâm Văn Hóa Khoa Học",
          description: "Thư viện, câu lạc bộ khoa học, workshop",
          cost: 380,
          effects: {
            gdp: 5,
            literacy: 20,
            healthcare: 5,
            superstition: -25,
            urbanization: 10,
          },
          mlnExplanation:
            "Phổ biến tri thức khoa học → Văn hóa đọc sách, học hỏi → Thay thế văn hóa mê tín cũ",
        },
        {
          id: "hospital",
          title: "Bệnh Viện Đa Khoa",
          description: "Nâng cấp y tế, thiết bị hiện đại, bác sĩ giỏi",
          cost: 500,
          effects: {
            gdp: 8,
            literacy: 5,
            healthcare: 35,
            superstition: -18,
            urbanization: 12,
          },
          mlnExplanation:
            "Y tế tốt → Người dân tin tưởng khoa học y học → Không cần thầy bói chữa bệnh",
        },
        {
          id: "internet_cafe",
          title: "Quán Internet Công Cộng",
          description: "Truy cập internet, học tin học, email",
          cost: 250,
          effects: {
            gdp: 12,
            literacy: 18,
            healthcare: 0,
            superstition: -12,
            urbanization: 15,
          },
          mlnExplanation:
            "Kết nối thế giới → Tiếp cận tri thức toàn cầu → Phá vỡ ranh giới địa phương hẹp hòi",
        },
        {
          id: "sport_center",
          title: "Trung Tâm Thể Thao",
          description: "Sân bóng, phòng gym, hoạt động cộng đồng",
          cost: 300,
          effects: {
            gdp: 6,
            literacy: 8,
            healthcare: 20,
            superstition: -10,
            urbanization: 8,
          },
          mlnExplanation:
            "Hoạt động thể thao → Tinh thần tập thể, kỷ luật → Thay thế các nghi lễ mê tín",
        },
      ],
    },
    {
      id: 2,
      year: "2010-2020",
      title: "Thời Kỳ Hiện Đại Hóa",
      description:
        "Làng trở thành thị trấn, internet phổ biến, thế hệ trẻ tiếp cận thông tin toàn cầu.",
      backgroundImage:
        "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&h=600&fit=crop",
      sceneryDescription:
        "Thị trấn hiện đại với tòa nhà cao tầng, wifi công cộng, giới trẻ dùng smartphone",
      historicalContext:
        "Smartphone phổ biến, mạng xã hội bùng nổ. Nhưng thông tin giả, mê tín online cũng xuất hiện. Thách thức mới: Làm sao để tư duy phản biện?",
      challenge:
        "Giảm mê tín xuống dưới 20% trong bối cảnh thông tin tràn lan. Chọn 2 quyết định.",
      decisions: [
        {
          id: "digital_literacy",
          title: "Chương Trình Phòng Chống Tin Giả",
          description: "Dạy phân biệt thông tin, fact-checking, media literacy",
          cost: 420,
          effects: {
            gdp: 10,
            literacy: 25,
            healthcare: 5,
            superstition: -30,
            urbanization: 5,
          },
          mlnExplanation:
            "Tư duy phản biện là chìa khóa → Không chỉ biết chữ mà còn biết phân tích → Miễn nhiễm với mê tín",
        },
        {
          id: "university",
          title: "Thành Lập Trường Đại Học",
          description: "Đào tạo đại học, nghiên cứu khoa học",
          cost: 650,
          effects: {
            gdp: 25,
            literacy: 35,
            healthcare: 20,
            superstition: -35,
            urbanization: 25,
          },
          mlnExplanation:
            "Giáo dục đại học → Tầng lớp trí thức mới → Dẫn dắt xã hội tiến bộ, lý tính",
        },
        {
          id: "tech_hub",
          title: "Khu Công Nghệ Cao",
          description: "Startup, IT, innovation center",
          cost: 750,
          effects: {
            gdp: 45,
            literacy: 20,
            healthcare: 25,
            superstition: -25,
            urbanization: 40,
          },
          mlnExplanation:
            "Nền kinh tế tri thức → Tôn trọng khoa học, logic → Văn hóa doanh nghiệp hiện đại thay thế truyền thống lạc hậu",
        },
        {
          id: "counseling",
          title: "Dịch Vụ Tâm Lý - Tư Vấn",
          description: "Psychologist thay cho thầy bói",
          cost: 330,
          effects: {
            gdp: 8,
            literacy: 10,
            healthcare: 30,
            superstition: -20,
            urbanization: 10,
          },
          mlnExplanation:
            "Giải quyết căn nguyên tâm lý khoa học → Không cần 'tâm linh' để giải tỏa lo âu",
        },
        {
          id: "science_museum",
          title: "Bảo Tàng Khoa Học Tương Tác",
          description: "Triển lãm khoa học, thí nghiệm trực quan",
          cost: 480,
          effects: {
            gdp: 12,
            literacy: 28,
            healthcare: 8,
            superstition: -28,
            urbanization: 15,
          },
          mlnExplanation:
            "Trải nghiệm khoa học trực tiếp → Kích thích tò mò, khám phá → Phá bỏ mê tín bằng hiểu biết",
        },
        {
          id: "social_media_campaign",
          title: "Chiến Dịch Mạng Xã Hội",
          description: "Influencer, content creator giáo dục khoa học",
          cost: 280,
          effects: {
            gdp: 8,
            literacy: 18,
            healthcare: 3,
            superstition: -15,
            urbanization: 10,
          },
          mlnExplanation:
            "Dùng công cụ hiện đại để lan tỏa → Tiếp cận giới trẻ hiệu quả → Tạo trend khoa học",
        },
      ],
    },
    {
      id: 3,
      year: "2015-2020",
      title: "Thời Kỳ Mạng Xã Hội & Kinh Tế Số",
      description:
        "Smartphone phổ biến, thương mại điện tử bùng nổ. Nhưng mê tín online và fake news cũng lan rộng.",
      backgroundImage:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop",
      sceneryDescription:
        "Thành phố với co-working space, startup, ship hàng online, livestream bán hàng",
      historicalContext:
        "Facebook, Zalo thống trị. Mọi người đều có smartphone. Nhưng xuất hiện 'thầy phong thủy online', 'xem bói qua mạng'. Kinh tế số phát triển nhưng văn hóa số còn yếu.",
      challenge:
        "Đối phó với mê tín online. Mục tiêu: giảm mê tín xuống dưới 15%. Chọn 2 quyết định.",
      decisions: [
        {
          id: "ai_education",
          title: "Giáo Dục AI & Tư Duy Máy Tính",
          description: "Dạy coding, logic, AI cho học sinh từ nhỏ",
          cost: 550,
          effects: {
            gdp: 30,
            literacy: 32,
            healthcare: 10,
            superstition: -32,
            urbanization: 20,
          },
          mlnExplanation:
            "Tư duy lập trình → Tư duy logic, nhân quả rõ ràng → Không tin vào 'phép màu' mê tín",
        },
        {
          id: "fact_check_platform",
          title: "Nền Tảng Fact-Checking",
          description: "Website/app kiểm chứng thông tin, báo cáo tin giả",
          cost: 380,
          effects: {
            gdp: 15,
            literacy: 25,
            healthcare: 5,
            superstition: -28,
            urbanization: 12,
          },
          mlnExplanation:
            "Công cụ kiểm chứng → Dân chúng tự verify → Giảm lan truyền mê tín online",
        },
        {
          id: "research_center",
          title: "Trung Tâm Nghiên Cứu Khoa Học",
          description: "Lab, viện nghiên cứu, công bố khoa học",
          cost: 700,
          effects: {
            gdp: 35,
            literacy: 30,
            healthcare: 35,
            superstition: -30,
            urbanization: 25,
          },
          mlnExplanation:
            "Nghiên cứu khoa học địa phương → Ứng dụng thực tế → Niềm tin vào khoa học tăng",
        },
        {
          id: "fintech",
          title: "Trung Tâm FinTech",
          description: "Ngân hàng số, ví điện tử, thanh toán không tiền mặt",
          cost: 600,
          effects: {
            gdp: 50,
            literacy: 22,
            healthcare: 15,
            superstition: -18,
            urbanization: 35,
          },
          mlnExplanation:
            "Hiện đại hóa tài chính → Minh bạch, rõ ràng → Giảm tâm lý 'may rủi' cần bùa",
        },
        {
          id: "wellness_center",
          title: "Trung Tâm Sức Khỏe Toàn Diện",
          description: "Yoga, meditation khoa học, dinh dưỡng",
          cost: 400,
          effects: {
            gdp: 18,
            literacy: 15,
            healthcare: 38,
            superstition: -22,
            urbanization: 15,
          },
          mlnExplanation:
            "Tâm linh khoa học thay tâm linh mê tín → Đáp ứng nhu cầu tinh thần bằng cách lành mạnh",
        },
        {
          id: "podcast_network",
          title: "Mạng Lưới Podcast Khoa Học",
          description: "Podcast giáo dục, phỏng vấn nhà khoa học",
          cost: 250,
          effects: {
            gdp: 8,
            literacy: 20,
            healthcare: 5,
            superstition: -20,
            urbanization: 8,
          },
          mlnExplanation:
            "Nội dung âm thanh dễ tiếp cận → Lan tỏa kiến thức trong đi làm, ăn cơm → Thay đồn thổi mê tín",
        },
      ],
    },
    {
      id: 4,
      year: "2020-2025",
      title: "Thời Kỳ AI & Xã Hội Tri Thức",
      description:
        "AI, big data, automation thay đổi công việc. Xã hội tri thức hình thành, nhưng vẫn còn sót lại mê tín ở vùng sâu.",
      backgroundImage:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop",
      sceneryDescription:
        "Thành phố thông minh: robot, xe tự lái, AI assistant, nhà thông minh",
      historicalContext:
        "ChatGPT, AI tools phổ biến. Remote work, digital nomad. Nhưng phân hóa số vẫn tồn tại - nông thôn chưa theo kịp thành thị.",
      challenge:
        "Đạt mục tiêu: giảm mê tín xuống dưới 10%, xây dựng xã hội tri thức bền vững. Chọn 2 quyết định cuối cùng.",
      decisions: [
        {
          id: "smart_city",
          title: "Đô Thị Thông Minh Toàn Diện",
          description: "IoT, AI monitoring, dữ liệu lớn cho quản lý đô thị",
          cost: 800,
          effects: {
            gdp: 55,
            literacy: 35,
            healthcare: 40,
            superstition: -35,
            urbanization: 45,
          },
          mlnExplanation:
            "Công nghệ thống trị cuộc sống → Mọi thứ dựa trên dữ liệu → Không còn chỗ cho mê tín",
        },
        {
          id: "universal_education",
          title: "Giáo Dục Phổ Cập Đại Học",
          description: "Học phí miễn phí, đại học cho tất cả mọi người",
          cost: 900,
          effects: {
            gdp: 40,
            literacy: 45,
            healthcare: 25,
            superstition: -40,
            urbanization: 30,
          },
          mlnExplanation:
            "Toàn dân có trình độ đại học → Xã hội tri thức hoàn thiện → Mê tín không còn đất sống",
        },
        {
          id: "biotech_hub",
          title: "Trung Tâm Công Nghệ Sinh Học",
          description: "Gen editing, y học cá nhân hóa, vaccine AI",
          cost: 850,
          effects: {
            gdp: 50,
            literacy: 30,
            healthcare: 50,
            superstition: -38,
            urbanization: 28,
          },
          mlnExplanation:
            "Khoa học giải quyết bệnh tật ở cấp độ gen → Sức mạnh khoa học rõ ràng → Không ai còn tin bùa chú",
        },
        {
          id: "critical_thinking",
          title: "Chương Trình Tư Duy Phản Biện Quốc Gia",
          description: "Dạy logic, triết học, khoa học trong toàn hệ thống",
          cost: 650,
          effects: {
            gdp: 25,
            literacy: 40,
            healthcare: 20,
            superstition: -42,
            urbanization: 20,
          },
          mlnExplanation:
            "Tư duy phản biện là nền tảng → Mọi người tự phân tích, đánh giá → Miễn nhiễm hoàn toàn với mê tín",
        },
        {
          id: "rural_digital",
          title: "Chuyển Đổi Số Nông Thôn",
          description: "5G, internet miễn phí, smart farming cho nông thôn",
          cost: 750,
          effects: {
            gdp: 45,
            literacy: 32,
            healthcare: 30,
            superstition: -35,
            urbanization: 25,
          },
          mlnExplanation:
            "Thu hẹp khoảng cách số → Nông thôn cũng hiện đại → Mê tín mất căn cứ cuối cùng",
        },
        {
          id: "philosophy_education",
          title: "Triết Học & Khoa Học Nhận Thức",
          description: "Dạy epistemology, scientific method cho đại chúng",
          cost: 500,
          effects: {
            gdp: 20,
            literacy: 38,
            healthcare: 15,
            superstition: -40,
            urbanization: 18,
          },
          mlnExplanation:
            "Hiểu cách con người biết → Hiểu cách mê tín hình thành → Tự bảo vệ khỏi tư duy phi lý",
        },
      ],
    },
  ];

  // Animated chart on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const drawChart = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const padding = 40;
      const chartWidth = width - padding * 2;
      const chartHeight = height - padding * 2;

      ctx.clearRect(0, 0, width, height);

      // Background
      ctx.fillStyle = "rgba(139, 92, 246, 0.05)";
      ctx.fillRect(padding, padding, chartWidth, chartHeight);

      // Grid lines
      ctx.strokeStyle = "rgba(139, 92, 246, 0.1)";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const y = padding + (chartHeight / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
      }

      // Draw superstition rate line
      const phases = [75, villageStats.superstitionRate];
      ctx.strokeStyle = "hsl(0, 70%, 60%)";
      ctx.lineWidth = 3;
      ctx.beginPath();

      phases.forEach((rate, index) => {
        const x = padding + (chartWidth / (phases.length - 1)) * index;
        const y = padding + chartHeight - (chartHeight * rate) / 100;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();

      // Draw literacy rate line
      const literacyPhases = [35, villageStats.literacyRate];
      ctx.strokeStyle = "hsl(220, 70%, 60%)";
      ctx.lineWidth = 3;
      ctx.beginPath();

      literacyPhases.forEach((rate, index) => {
        const x = padding + (chartWidth / (literacyPhases.length - 1)) * index;
        const y = padding + chartHeight - (chartHeight * rate) / 100;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();

      // Labels
      ctx.fillStyle = "hsl(40, 20%, 95%)";
      ctx.font = "12px sans-serif";
      ctx.fillText("0%", 10, height - padding + 5);
      ctx.fillText("100%", 5, padding + 5);
    };

    drawChart();
  }, [villageStats]);

  const handleDecision = (decision: Decision) => {
    // Check if already selected - if so, deselect it
    const isAlreadySelected = pendingDecisions.some(
      (d) => d.id === decision.id
    );

    if (isAlreadySelected) {
      // Deselect - remove from pending
      setPendingDecisions(pendingDecisions.filter((d) => d.id !== decision.id));
      return;
    }

    // Check budget
    const currentSpending = pendingDecisions.reduce(
      (sum, d) => sum + d.cost,
      0
    );
    if (currentSpending + decision.cost > budget) {
      alert(
        "Không đủ ngân sách! Hãy bỏ chọn quyết định khác hoặc chọn quyết định rẻ hơn."
      );
      return;
    }

    // Check max selections
    if (pendingDecisions.length >= maxDecisionsPerPhase) {
      alert(
        `Bạn chỉ có thể chọn tối đa ${maxDecisionsPerPhase} quyết định mỗi giai đoạn!`
      );
      return;
    }

    // Add to pending
    setPendingDecisions([...pendingDecisions, decision]);
  };

  const confirmDecisions = () => {
    if (pendingDecisions.length === 0) {
      alert("Bạn cần chọn ít nhất 1 quyết định!");
      return;
    }

    // Apply all pending decisions
    let newStats = { ...villageStats };
    const yearIncrement = 5;
    const totalCost = pendingDecisions.reduce((sum, d) => sum + d.cost, 0);

    pendingDecisions.forEach((decision) => {
      newStats = {
        ...newStats,
        year: newStats.year + yearIncrement,
        gdpPerCapita: Math.min(
          100,
          newStats.gdpPerCapita + decision.effects.gdp
        ),
        literacyRate: Math.min(
          100,
          newStats.literacyRate + decision.effects.literacy
        ),
        healthcareAccess: Math.min(
          100,
          newStats.healthcareAccess + decision.effects.healthcare
        ),
        superstitionRate: Math.max(
          0,
          newStats.superstitionRate + decision.effects.superstition
        ),
        urbanization: Math.min(
          100,
          newStats.urbanization + decision.effects.urbanization
        ),
      };
    });

    setVillageStats(newStats);
    setBudget(budget - totalCost);
    setDecisionHistory([...decisionHistory, ...pendingDecisions]);
    setDecisionsThisPhase(pendingDecisions.length);
    setShowAnalysis(true);
  };

  const nextPhase = () => {
    if (decisionsThisPhase === 0) {
      alert("Bạn cần chọn ít nhất 1 quyết định trước khi tiếp tục!");
      return;
    }

    if (currentPhase < phases.length - 1) {
      setCurrentPhase(currentPhase + 1);
      // Budget increases based on GDP growth - reduced amounts
      const budgetIncrease = Math.floor(500 + villageStats.gdpPerCapita * 3);
      setBudget(budget + budgetIncrease);
      setShowAnalysis(false);
      setDecisionsThisPhase(0);
      setPendingDecisions([]);
    } else {
      setGameComplete(true);
    }
  };

  const reset = () => {
    setCurrentPhase(0);
    setBudget(800);
    setVillageStats({
      year: 1990,
      gdpPerCapita: 30,
      literacyRate: 35,
      healthcareAccess: 25,
      superstitionRate: 75,
      urbanization: 20,
    });
    setDecisionHistory([]);
    setPendingDecisions([]);
    setShowAnalysis(false);
    setGameComplete(false);
    setDecisionsThisPhase(0);
  };

  const getSuperstitionFeedback = () => {
    const rate = villageStats.superstitionRate;
    if (rate < 20)
      return {
        text: "Xuất sắc! Xã hội hiện đại, duy lý",
        color: "text-green-400",
      };
    if (rate < 40)
      return { text: "Tốt! Mê tín giảm đáng kể", color: "text-blue-400" };
    if (rate < 60)
      return { text: "Khá! Vẫn còn cải thiện", color: "text-yellow-400" };
    return { text: "Cần cố gắng hơn!", color: "text-orange-400" };
  };

  if (gameComplete) {
    const feedback = getSuperstitionFeedback();
    const totalInvestment = decisionHistory.reduce((sum, d) => sum + d.cost, 0);

    return (
      <div className="h-screen bg-gradient-to-b from-[hsl(240,45%,6%)] to-[hsl(240,40%,8%)] flex flex-col">
        <div className="flex-1 flex flex-col p-8 overflow-y-auto">
          <div className="container mx-auto max-w-6xl flex flex-col">
            <Card className="bg-[hsl(240,45%,8%)]/95 backdrop-blur-xl border-[hsl(270,60%,50%)]/40 p-12 flex-1 flex flex-col">
              <div className="text-center space-y-8">
                <CheckCircle className="w-24 h-24 mx-auto text-green-500" />

                <div>
                  <h2 className="text-5xl font-black text-[hsl(40,20%,95%)] mb-4">
                    Hoàn Thành Chuyển Đổi!
                  </h2>
                  <p className="text-2xl text-[hsl(270,60%,75%)]">
                    {villageStats.year}: Từ làng nghèo đến thị trấn hiện đại
                  </p>
                </div>

                {/* Final Stats */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="bg-[hsl(0,70%,60%)]/10 border-[hsl(0,70%,60%)]/30 p-6">
                    <AlertCircle className="w-8 h-8 text-[hsl(0,70%,60%)] mb-2" />
                    <div className="text-3xl font-black text-[hsl(0,70%,60%)]">
                      {villageStats.superstitionRate}%
                    </div>
                    <div className="text-sm text-[hsl(40,20%,95%)]/70">
                      Tỷ Lệ Mê Tín
                    </div>
                    <div
                      className={`text-xs mt-2 font-semibold ${feedback.color}`}
                    >
                      {feedback.text}
                    </div>
                  </Card>

                  <Card className="bg-[hsl(220,70%,55%)]/10 border-[hsl(220,70%,55%)]/30 p-6">
                    <GraduationCap className="w-8 h-8 text-[hsl(220,70%,70%)] mb-2" />
                    <div className="text-3xl font-black text-[hsl(220,70%,70%)]">
                      {villageStats.literacyRate}%
                    </div>
                    <div className="text-sm text-[hsl(40,20%,95%)]/70">
                      Tỷ Lệ Biết Chữ
                    </div>
                  </Card>

                  <Card className="bg-[hsl(140,60%,50%)]/10 border-[hsl(140,60%,50%)]/30 p-6">
                    <Coins className="w-8 h-8 text-[hsl(140,60%,60%)] mb-2" />
                    <div className="text-3xl font-black text-[hsl(140,60%,60%)]">
                      {villageStats.gdpPerCapita}
                    </div>
                    <div className="text-sm text-[hsl(40,20%,95%)]/70">
                      GDP/người (triệu VNĐ)
                    </div>
                  </Card>

                  <Card className="bg-[hsl(270,60%,50%)]/10 border-[hsl(270,60%,50%)]/30 p-6">
                    <Home className="w-8 h-8 text-[hsl(270,60%,70%)] mb-2" />
                    <div className="text-3xl font-black text-[hsl(270,60%,70%)]">
                      {villageStats.urbanization}%
                    </div>
                    <div className="text-sm text-[hsl(40,20%,95%)]/70">
                      Đô Thị Hóa
                    </div>
                  </Card>
                </div>

                {/* MLN Analysis */}
                <Card className="bg-[hsl(270,60%,50%)]/10 border-[hsl(270,60%,50%)]/30 p-8 text-left">
                  <h3 className="text-2xl font-bold text-[hsl(270,60%,75%)] mb-6 flex items-center gap-2">
                    <Brain className="w-6 h-6" />
                    Phân Tích Duy Vật Lịch Sử
                  </h3>

                  <div className="space-y-6 text-[hsl(40,20%,95%)]/90 leading-relaxed">
                    <div>
                      <h4 className="text-xl font-bold text-[hsl(220,70%,70%)] mb-3">
                        1. Tồn Tại Xã Hội Quyết Định Ý Thức Xã Hội
                      </h4>
                      <p className="mb-2">
                        Trong mô phỏng, bạn đã thấy:{" "}
                        <strong>điều kiện vật chất lạc hậu</strong> (nghèo,
                        thiếu giáo dục) tạo môi trường cho{" "}
                        <strong>ý thức mê tín</strong> phát triển.
                      </p>
                      <p className="italic text-[hsl(270,60%,75%)]">
                        "Không phải ý thức quyết định tồn tại, mà tồn tại xã hội
                        quyết định ý thức." — Karl Marx
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-[hsl(220,70%,70%)] mb-3">
                        2. Vai Trò Của Giáo Dục Và Tư Duy Phản Biện
                      </h4>
                      <p>
                        Các quyết định đầu tư vào <strong>giáo dục</strong> mang
                        lại hiệu quả cao nhất trong việc giảm mê tín. Giáo dục
                        không chỉ truyền đạt kiến thức mà còn{" "}
                        <strong>
                          phát triển khả năng phân tích, đánh giá độc lập
                        </strong>
                        .
                      </p>
                      <ul className="list-disc list-inside mt-2 space-y-1 text-[hsl(40,20%,95%)]/70">
                        <li>
                          Giáo dục cơ bản → Biết đọc, biết tính → Ít bị lừa bói
                          toán
                        </li>
                        <li>
                          Giáo dục cao hơn → Tư duy phản biện → Tự phân tích
                          nhân quả
                        </li>
                        <li>
                          Media literacy → Phân biệt thông tin thật - giả → Miễn
                          nhiễm mê tín online
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-[hsl(220,70%,70%)] mb-3">
                        3. Ảnh Hưởng Của Tâm Lý Đám Đông Và Truyền Thống
                      </h4>
                      <p>
                        Mê tín không chỉ là niềm tin cá nhân mà còn là{" "}
                        <strong>hiện tượng xã hội</strong>. Khi cả làng tin, áp
                        lực đám đông khiến cá nhân khó từ chối.
                      </p>
                      <p className="mt-2">
                        Nhưng khi <strong>đô thị hóa</strong> tăng (qua công
                        nghiệp, công nghệ), người ta tiếp xúc văn hóa mới → Tâm
                        lý đám đông thay đổi → Chuẩn mực xã hội hiện đại thay
                        thế mê tín.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-[hsl(220,70%,70%)] mb-3">
                        4. Biện Pháp Hành Chính Không Hiệu Quả
                      </h4>
                      <p>
                        Nếu bạn chọn "Cấm hoạt động mê tín", bạn thấy hiệu quả
                        rất thấp. Vì{" "}
                        <strong>
                          cấm đoán không thay đổi điều kiện vật chất
                        </strong>{" "}
                        và tâm lý căn bản.
                      </p>
                      <p className="mt-2 text-[hsl(0,70%,70%)]">
                        → Chỉ khi <strong>thay đổi tồn tại xã hội</strong> (giáo
                        dục, kinh tế, y tế), ý thức mới thay đổi bền vững.
                      </p>
                    </div>

                    <div className="pt-6 border-t border-[hsl(270,60%,50%)]/20">
                      <h4 className="text-xl font-bold text-[hsl(190,80%,75%)] mb-3">
                        Kết Luận
                      </h4>
                      <p>
                        Hiện tượng mê tín tồn tại ngay cả khi khoa học phát
                        triển là do:
                      </p>
                      <ul className="list-decimal list-inside mt-2 space-y-2 text-[hsl(40,20%,95%)]/80">
                        <li>
                          <strong>Tồn tại xã hội lạc hậu</strong> (nghèo, thiếu
                          giáo dục, y tế kém) → Tạo nhu cầu "tâm linh" để nương
                          tựa
                        </li>
                        <li>
                          <strong>Tâm lý đám đông</strong> và{" "}
                          <strong>truyền thống văn hóa</strong>→ Duy trì niềm
                          tin qua nhiều thế hệ
                        </li>
                        <li>
                          <strong>Thiếu giáo dục và tư duy phản biện</strong>→
                          Không có khả năng phân tích, đánh giá
                        </li>
                      </ul>
                      <p className="mt-4 text-[hsl(270,60%,75%)] font-semibold">
                        Giải pháp bền vững: Cải thiện điều kiện vật chất + Phát
                        triển giáo dục + Nâng cao tư duy phản biện.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Decision History */}
                <Card className="bg-[hsl(220,70%,55%)]/10 border-[hsl(220,70%,55%)]/30 p-6 text-left">
                  <h3 className="text-xl font-bold text-[hsl(220,70%,70%)] mb-4">
                    Lịch Sử Quyết Định Của Bạn
                  </h3>
                  <div className="space-y-3">
                    {decisionHistory.map((decision, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-[hsl(240,45%,10%)]/60 rounded-lg"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <div className="font-semibold text-[hsl(40,20%,95%)]">
                            {decision.title}
                          </div>
                          <div className="text-sm text-[hsl(40,20%,95%)]/60 mt-1">
                            {decision.mlnExplanation}
                          </div>
                        </div>
                        <div className="text-sm text-[hsl(270,60%,75%)] font-semibold">
                          -{decision.cost}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-[hsl(220,70%,55%)]/20">
                    <div className="text-lg font-bold text-[hsl(40,20%,95%)]">
                      Tổng đầu tư:{" "}
                      <span className="text-[hsl(270,60%,75%)]">
                        {totalInvestment}
                      </span>{" "}
                      điểm
                    </div>
                  </div>
                </Card>

                <div className="flex gap-4">
                  {onBack && (
                    <Button
                      onClick={onBack}
                      size="lg"
                      variant="outline"
                      className="border-[hsl(40,20%,95%)]/20 hover:bg-[hsl(40,20%,95%)]/10 px-12 py-6 text-lg"
                    >
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      Quay Lại
                    </Button>
                  )}
                  <Button
                    onClick={reset}
                    size="lg"
                    className="bg-gradient-to-r from-[hsl(270,60%,50%)] to-[hsl(220,70%,55%)] hover:from-[hsl(270,60%,60%)] hover:to-[hsl(220,70%,65%)] text-white px-12 py-6 text-lg flex-1"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Chơi Lại
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const phase = phases[currentPhase];

  return (
    <div className="h-screen bg-gradient-to-b from-[hsl(240,45%,6%)] to-[hsl(240,40%,8%)] flex flex-col">
      <div className="flex-1 flex flex-col p-3 sm:p-6 md:p-8 overflow-y-auto">
        <div className="container mx-auto max-w-7xl flex flex-col space-y-4 sm:space-y-6">
          {/* Header */}
          <Card className="bg-[hsl(240,45%,8%)]/95 backdrop-blur-xl border-[hsl(270,60%,50%)]/40 p-4 sm:p-5 md:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0 sm:justify-between">
              {onBack && (
                <Button
                  onClick={onBack}
                  variant="outline"
                  size="sm"
                  className="border-[hsl(40,20%,95%)]/20 hover:bg-[hsl(40,20%,95%)]/10 text-xs sm:text-sm"
                >
                  <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Quay Lại
                </Button>
              )}
              <div className={!onBack ? "w-full" : "flex-1 sm:text-center"}>
                <h1 className="text-2xl sm:text-3xl font-black text-[hsl(40,20%,95%)] mb-1 sm:mb-2">
                  Mô Phỏng Chuyển Đổi Xã Hội
                </h1>
                <p className="text-[hsl(40,20%,95%)]/70">
                  Phân tích duy vật lịch sử về mê tín dị đoan
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-[hsl(40,20%,95%)]/60">
                  Ngân sách
                </div>
                <div className="text-3xl font-black text-[hsl(270,60%,75%)]">
                  {budget}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2">
              {phases.map((p, index) => (
                <div key={p.id} className="flex items-center flex-1">
                  <div
                    className={`flex-1 h-2 rounded-full ${
                      index <= currentPhase
                        ? "bg-gradient-to-r from-[hsl(270,60%,50%)] to-[hsl(220,70%,55%)]"
                        : "bg-[hsl(240,45%,15%)]"
                    }`}
                  />
                  {index < phases.length - 1 && (
                    <ArrowRight className="w-4 h-4 mx-2 text-[hsl(270,60%,70%)]" />
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card className="bg-[hsl(0,70%,60%)]/10 border-[hsl(0,70%,60%)]/30 p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-[hsl(0,70%,60%)]" />
                <span className="text-sm text-[hsl(40,20%,95%)]/70">
                  Mê Tín
                </span>
              </div>
              <div className="text-2xl font-black text-[hsl(0,70%,60%)]">
                {villageStats.superstitionRate}%
              </div>
              <div className="h-2 bg-[hsl(240,45%,10%)] rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-[hsl(0,70%,60%)] transition-all duration-500"
                  style={{ width: `${villageStats.superstitionRate}%` }}
                />
              </div>
            </Card>

            <Card className="bg-[hsl(220,70%,55%)]/10 border-[hsl(220,70%,55%)]/30 p-4">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="w-5 h-5 text-[hsl(220,70%,70%)]" />
                <span className="text-sm text-[hsl(40,20%,95%)]/70">
                  Giáo Dục
                </span>
              </div>
              <div className="text-2xl font-black text-[hsl(220,70%,70%)]">
                {villageStats.literacyRate}%
              </div>
              <div className="h-2 bg-[hsl(240,45%,10%)] rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-[hsl(220,70%,55%)] transition-all duration-500"
                  style={{ width: `${villageStats.literacyRate}%` }}
                />
              </div>
            </Card>

            <Card className="bg-[hsl(140,60%,50%)]/10 border-[hsl(140,60%,50%)]/30 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Coins className="w-5 h-5 text-[hsl(140,60%,60%)]" />
                <span className="text-sm text-[hsl(40,20%,95%)]/70">GDP</span>
              </div>
              <div className="text-2xl font-black text-[hsl(140,60%,60%)]">
                {villageStats.gdpPerCapita}
              </div>
              <div className="h-2 bg-[hsl(240,45%,10%)] rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-[hsl(140,60%,50%)] transition-all duration-500"
                  style={{ width: `${villageStats.gdpPerCapita}%` }}
                />
              </div>
            </Card>

            <Card className="bg-[hsl(350,80%,60%)]/10 border-[hsl(350,80%,60%)]/30 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-[hsl(350,80%,70%)]" />
                <span className="text-sm text-[hsl(40,20%,95%)]/70">Y Tế</span>
              </div>
              <div className="text-2xl font-black text-[hsl(350,80%,70%)]">
                {villageStats.healthcareAccess}%
              </div>
              <div className="h-2 bg-[hsl(240,45%,10%)] rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-[hsl(350,80%,60%)] transition-all duration-500"
                  style={{ width: `${villageStats.healthcareAccess}%` }}
                />
              </div>
            </Card>

            <Card className="bg-[hsl(270,60%,50%)]/10 border-[hsl(270,60%,50%)]/30 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Factory className="w-5 h-5 text-[hsl(270,60%,70%)]" />
                <span className="text-sm text-[hsl(40,20%,95%)]/70">
                  Đô Thị
                </span>
              </div>
              <div className="text-2xl font-black text-[hsl(270,60%,70%)]">
                {villageStats.urbanization}%
              </div>
              <div className="h-2 bg-[hsl(240,45%,10%)] rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-[hsl(270,60%,50%)] transition-all duration-500"
                  style={{ width: `${villageStats.urbanization}%` }}
                />
              </div>
            </Card>
          </div>

          {/* Phase Info */}
          {!showAnalysis && (
            <>
              {/* Hero Background Image */}
              <Card className="bg-[hsl(240,45%,8%)]/95 backdrop-blur-xl border-[hsl(270,60%,50%)]/40 overflow-hidden">
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <img
                    src={phase.backgroundImage}
                    alt={phase.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(240,45%,8%)] via-[hsl(240,45%,8%)]/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="text-sm text-[hsl(270,60%,75%)] font-semibold mb-2">
                      {phase.year}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-[hsl(40,20%,95%)] mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                      {phase.title}
                    </h2>
                    <p className="text-base text-[hsl(40,20%,95%)]/90 mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                      {phase.description}
                    </p>
                    <p className="text-sm text-[hsl(270,60%,75%)] italic drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                      🏘️ {phase.sceneryDescription}
                    </p>
                  </div>
                </div>

                <div className="p-8">
                  <div className="p-4 rounded-xl bg-[hsl(220,70%,55%)]/10 border border-[hsl(220,70%,55%)]/30 mb-6">
                    <div className="flex items-start gap-2">
                      <Book className="w-5 h-5 text-[hsl(220,70%,70%)] flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-semibold text-[hsl(220,70%,70%)] mb-1">
                          Bối cảnh lịch sử:
                        </div>
                        <p className="text-sm text-[hsl(40,20%,95%)]/70">
                          {phase.historicalContext}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[hsl(270,60%,50%)]/10 border border-[hsl(270,60%,50%)]/30 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-[hsl(270,60%,70%)]" />
                      <span className="font-bold text-[hsl(270,60%,75%)]">
                        Thách thức:
                      </span>
                    </div>
                    <p className="text-[hsl(40,20%,95%)]/80">
                      {phase.challenge}
                    </p>
                  </div>

                  <canvas
                    ref={canvasRef}
                    className="w-full h-48 mb-6 rounded-xl"
                  />

                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-[hsl(40,20%,95%)]">
                        Chọn chính sách đầu tư:
                      </h3>
                      <div className="text-sm px-3 py-1 rounded-full bg-[hsl(270,60%,50%)]/20 border border-[hsl(270,60%,50%)]/40">
                        <span className="text-[hsl(270,60%,75%)] font-semibold">
                          {pendingDecisions.length}/{maxDecisionsPerPhase} quyết
                          định đang chọn
                        </span>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {phase.decisions.map((decision) => {
                        // Dynamic icon based on decision type
                        const getDecisionIcon = (id: string) => {
                          if (id.includes("edu")) return "🏫";
                          if (
                            id.includes("econ") ||
                            id.includes("industry") ||
                            id.includes("tech")
                          )
                            return "🏭";
                          if (id.includes("health")) return "🏥";
                          if (id.includes("ban")) return "🚫";
                          if (id.includes("culture") || id.includes("digital"))
                            return "📚";
                          if (id.includes("university")) return "🎓";
                          if (id.includes("counseling")) return "🧠";
                          if (id.includes("propaganda")) return "📢";
                          return "🔧";
                        };

                        const isSelected = pendingDecisions.some(
                          (d) => d.id === decision.id
                        );

                        const currentSpending = pendingDecisions.reduce(
                          (sum, d) => sum + d.cost,
                          0
                        );
                        const canAfford =
                          currentSpending + decision.cost <= budget ||
                          isSelected;

                        return (
                          <button
                            key={decision.id}
                            onClick={() => handleDecision(decision)}
                            disabled={!canAfford && !isSelected}
                            className={`text-left p-4 sm:p-5 md:p-6 rounded-xl border-2 transition-all duration-300 ${
                              isSelected
                                ? "bg-[hsl(270,60%,50%)]/20 border-[hsl(270,60%,50%)] ring-2 ring-[hsl(270,60%,50%)]/50 cursor-pointer hover:bg-[hsl(270,60%,50%)]/30"
                                : "bg-[hsl(240,45%,10%)]/40 border-[hsl(270,60%,50%)]/30 hover:border-[hsl(270,60%,50%)]/60 hover:bg-[hsl(240,45%,10%)]/60 hover:scale-[1.02] active:scale-95"
                            } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group`}
                          >
                            <div className="flex items-start justify-between mb-2 sm:mb-3">
                              <div className="flex items-center gap-2 sm:gap-3 flex-1">
                                <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform flex-shrink-0">
                                  {getDecisionIcon(decision.id)}
                                </span>
                                <h4 className="text-base sm:text-lg font-bold text-[hsl(40,20%,95%)] group-hover:text-[hsl(270,60%,75%)] transition-colors">
                                  {decision.title}
                                  {isSelected && (
                                    <span className="ml-2 text-xs px-2 py-1 rounded-full bg-[hsl(270,60%,50%)] text-white group-hover:bg-red-500">
                                      ✓ Bỏ chọn?
                                    </span>
                                  )}
                                </h4>
                              </div>
                              <div className="text-lg sm:text-xl font-black text-[hsl(270,60%,75%)] ml-2 flex-shrink-0">
                                -{decision.cost}
                              </div>
                            </div>
                            <p className="text-xs sm:text-sm text-[hsl(40,20%,95%)]/70 mb-2 sm:mb-3">
                              {decision.description}
                            </p>
                          </button>
                        );
                      })}
                    </div>

                    {/* Confirm Button */}
                    {pendingDecisions.length > 0 && !showAnalysis && (
                      <div className="mt-6 flex flex-col items-center gap-3">
                        <div className="text-sm text-[hsl(40,20%,95%)]/70">
                          Chi phí:{" "}
                          {pendingDecisions.reduce((sum, d) => sum + d.cost, 0)}{" "}
                          / {budget}
                        </div>
                        <Button
                          onClick={confirmDecisions}
                          size="lg"
                          className="bg-gradient-to-r from-[hsl(270,60%,50%)] to-[hsl(220,70%,55%)] hover:from-[hsl(270,60%,60%)] hover:to-[hsl(220,70%,65%)] text-white px-8 py-6 text-lg font-bold"
                        >
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Xác Nhận Quyết Định ({pendingDecisions.length}/
                          {maxDecisionsPerPhase})
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </>
          )}

          {/* Analysis after decision */}
          {showAnalysis && decisionHistory.length > 0 && (
            <Card className="bg-[hsl(240,45%,8%)]/95 backdrop-blur-xl border-[hsl(270,60%,50%)]/40 p-8">
              <div className="text-center space-y-6">
                <CheckCircle className="w-16 h-16 mx-auto text-green-500" />

                <div>
                  <h3 className="text-2xl font-black text-[hsl(40,20%,95%)] mb-2">
                    Các Quyết Định Đã Thực Hiện!
                  </h3>
                  <p className="text-lg text-[hsl(270,60%,75%)]">
                    Đã chọn {decisionsThisPhase} quyết định cho giai đoạn này
                  </p>
                </div>

                {/* Show all decisions made this phase */}
                <div className="space-y-4">
                  {decisionHistory
                    .slice(-decisionsThisPhase)
                    .map((decision, idx) => (
                      <Card
                        key={idx}
                        className="bg-[hsl(270,60%,50%)]/10 border-[hsl(270,60%,50%)]/30 p-6 text-left"
                      >
                        <div className="flex items-start gap-3">
                          <Brain className="w-6 h-6 text-[hsl(270,60%,70%)] flex-shrink-0 mt-1" />
                          <div className="flex-1">
                            <div className="text-lg font-bold text-[hsl(270,60%,75%)] mb-2">
                              {decision.title}
                            </div>
                            <div className="text-sm font-semibold text-[hsl(270,60%,75%)] mb-2">
                              Phân tích theo Duy Vật Lịch Sử:
                            </div>
                            <p className="text-[hsl(40,20%,95%)]/80 leading-relaxed">
                              {decision.mlnExplanation}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      label: "Mê tín",
                      value: villageStats.superstitionRate,
                      color: "hsl(0,70%,60%)",
                      icon: TrendingDown,
                    },
                    {
                      label: "Giáo dục",
                      value: villageStats.literacyRate,
                      color: "hsl(220,70%,70%)",
                      icon: TrendingUp,
                    },
                    {
                      label: "GDP",
                      value: villageStats.gdpPerCapita,
                      color: "hsl(140,60%,60%)",
                      icon: TrendingUp,
                    },
                    {
                      label: "Y tế",
                      value: villageStats.healthcareAccess,
                      color: "hsl(350,80%,70%)",
                      icon: TrendingUp,
                    },
                  ].map((stat) => {
                    const Icon = stat.icon;
                    return (
                      <Card
                        key={stat.label}
                        className="bg-[hsl(240,45%,10%)]/60 border-[hsl(270,60%,50%)]/20 p-4"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Icon
                            className="w-4 h-4"
                            style={{ color: stat.color }}
                          />
                          <span className="text-xs text-[hsl(40,20%,95%)]/60">
                            {stat.label}
                          </span>
                        </div>
                        <div
                          className="text-2xl font-black"
                          style={{ color: stat.color }}
                        >
                          {stat.value}%
                        </div>
                      </Card>
                    );
                  })}
                </div>

                <Button
                  onClick={nextPhase}
                  size="lg"
                  className="bg-gradient-to-r from-[hsl(270,60%,50%)] to-[hsl(220,70%,55%)] hover:from-[hsl(270,60%,60%)] hover:to-[hsl(220,70%,65%)] text-white px-12 py-6 text-lg"
                >
                  {currentPhase < phases.length - 1
                    ? "Tiếp theo"
                    : "Xem kết quả"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default VillageTransformationGame;
