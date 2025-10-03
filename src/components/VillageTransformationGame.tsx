import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
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

interface RandomEvent {
  id: string;
  title: string;
  description: string;
  icon: string;
  effects: {
    gdp: number;
    literacy: number;
    healthcare: number;
    superstition: number;
    urbanization: number;
    budgetChange: number;
  };
  explanation: string;
  isPositive: boolean;
}

const VillageTransformationGame = ({
  onBack,
}: VillageTransformationGameProps = {}) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [budget, setBudget] = useState(600); // Reduced starting budget for more challenge
  const [villageStats, setVillageStats] = useState<VillageStats>({
    year: 1990,
    gdpPerCapita: 30,
    literacyRate: 35,
    healthcareAccess: 25,
    superstitionRate: 50,
    urbanization: 20,
  });
  const [gameFailure, setGameFailure] = useState<string | null>(null);
  const [decisionHistory, setDecisionHistory] = useState<Decision[]>([]);
  const [pendingDecisions, setPendingDecisions] = useState<Decision[]>([]);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [decisionsThisPhase, setDecisionsThisPhase] = useState(0);
  const [maxDecisionsPerPhase] = useState(2);
  const [randomEvent, setRandomEvent] = useState<RandomEvent | null>(null);
  const [showRandomEvent, setShowRandomEvent] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const randomEvents: RandomEvent[] = [
    // Positive events
    {
      id: "tech_donor",
      title: "Nhà Tài Trợ Công Nghệ",
      description:
        "Một tập đoàn công nghệ quyết định tài trợ thiết bị máy tính và internet miễn phí cho trường học trong làng.",
      icon: "🎁",
      effects: {
        gdp: 8,
        literacy: 15,
        healthcare: 0,
        superstition: -12,
        urbanization: 10,
        budgetChange: 200,
      },
      explanation:
        "Tiếp cận công nghệ → Giáo dục hiện đại hóa → Giảm mê tín qua tri thức",
      isPositive: true,
    },
    {
      id: "successful_graduate",
      title: "Con Em Làng Thành Công",
      description:
        "Một người con làng học giỏi, trở về mở doanh nghiệp, tạo việc làm và truyền cảm hứng cho thế hệ trẻ.",
      icon: "🎓",
      effects: {
        gdp: 12,
        literacy: 18,
        healthcare: 5,
        superstition: -15,
        urbanization: 8,
        budgetChange: 150,
      },
      explanation:
        "Tấm gương thành công → Niềm tin vào giáo dục → Thay đổi tâm lý đám đông",
      isPositive: true,
    },
    {
      id: "medical_miracle",
      title: "Ca Chữa Bệnh Thần Kỳ",
      description:
        "Bác sĩ địa phương chữa khỏi một căn bệnh mà dân làng từng tin chỉ thầy bói mới giải được. Câu chuyện lan rộng.",
      icon: "⚕️",
      effects: {
        gdp: 5,
        literacy: 10,
        healthcare: 20,
        superstition: -25,
        urbanization: 5,
        budgetChange: 100,
      },
      explanation:
        "Thực tiễn chứng minh sức mạnh y học → Niềm tin vào khoa học tăng mạnh",
      isPositive: true,
    },
    {
      id: "cultural_exchange",
      title: "Chương Trình Trao Đổi Văn Hóa",
      description:
        "Giới trẻ làng được tham gia chương trình trao đổi với các thành phố lớn, mở mang tầm nhìn.",
      icon: "🌍",
      effects: {
        gdp: 10,
        literacy: 20,
        healthcare: 8,
        superstition: -18,
        urbanization: 15,
        budgetChange: 180,
      },
      explanation:
        "Tiếp xúc văn hóa đô thị → Tư duy hiện đại → Giảm ảnh hưởng truyền thống lạc hậu",
      isPositive: true,
    },
    {
      id: "journalist_expose",
      title: "Phóng Viên Vạch Trần Lừa Đảo",
      description:
        "Phóng viên điều tra và phanh phui một vụ thầy bói lừa đảo tiền của dân. Vụ việc được truyền thông rộng rãi.",
      icon: "📰",
      effects: {
        gdp: 0,
        literacy: 12,
        healthcare: 0,
        superstition: -20,
        urbanization: 5,
        budgetChange: 0,
      },
      explanation:
        "Vạch trần sự thật → Dân chúng tỉnh ngộ → Mê tín bị nghi ngờ",
      isPositive: true,
    },
    // Negative events
    {
      id: "fake_prophet",
      title: "Thầy Bói Nổi Tiếng Xuất Hiện",
      description:
        "Một 'thầy bói' tự xưng có phép màu đến làng, thu hút đông đảo người tin. Truyền thông xã hội lan tỏa nhanh chóng.",
      icon: "🔮",
      effects: {
        gdp: -8,
        literacy: -10,
        healthcare: -5,
        superstition: 30,
        urbanization: -5,
        budgetChange: -150,
      },
      explanation:
        "Mê tín lan truyền viral → Dân chúng bỏ công việc đi theo → Kinh tế suy giảm",
      isPositive: false,
    },
    {
      id: "economic_crisis",
      title: "Khủng Hoảng Kinh Tế",
      description:
        "Suy thoái kinh tế khu vực ảnh hưởng đến làng. Nhiều người mất việc, tâm lý bất an gia tăng.",
      icon: "📉",
      effects: {
        gdp: -15,
        literacy: -5,
        healthcare: -8,
        superstition: 20,
        urbanization: -10,
        budgetChange: -200,
      },
      explanation:
        "Khủng hoảng kinh tế → Lo âu tăng cao → Tìm đến mê tín để nương tựa",
      isPositive: false,
    },
    {
      id: "epidemic_scare",
      title: "Tin Đồn Dịch Bệnh",
      description:
        "Tin đồn về dịch bệnh lan truyền. Nhiều người tin vào các phương pháp 'truyền thống' thay vì y học hiện đại.",
      icon: "😷",
      effects: {
        gdp: -10,
        literacy: 0,
        healthcare: -15,
        superstition: 25,
        urbanization: -8,
        budgetChange: -100,
      },
      explanation:
        "Hoảng loạn → Lý trí giảm sút → Mê tín về 'bùa hộ mệnh' bùng phát",
      isPositive: false,
    },
    {
      id: "natural_disaster",
      title: "Thiên Tai",
      description:
        "Lũ lụt/hạn hán ảnh hưởng mùa màng. Người già trong làng cho rằng đây là 'thiên tai' do làng không cúng bái đúng cách.",
      icon: "⛈️",
      effects: {
        gdp: -12,
        literacy: -8,
        healthcare: -10,
        superstition: 28,
        urbanization: -12,
        budgetChange: -180,
      },
      explanation:
        "Thiên tai → Tâm lý sợ hãi → Giải thích mê tín thay khoa học",
      isPositive: false,
    },
    {
      id: "corrupt_official",
      title: "Tham Nhũng Bị Phát Hiện",
      description:
        "Một quan chức địa phương tham ô ngân sách phát triển. Dân chúng mất niềm tin vào chính quyền và tiến bộ.",
      icon: "💰",
      effects: {
        gdp: -18,
        literacy: -12,
        healthcare: -12,
        superstition: 22,
        urbanization: -15,
        budgetChange: -250,
      },
      explanation:
        "Tham nhũng → Mất niềm tin nhà nước → Dân chúng quay về mê tín truyền thống",
      isPositive: false,
    },
    {
      id: "social_media_hoax",
      title: "Tin Giả Lan Truyền",
      description:
        "Video 'phép màu' giả mạo lan viral trên mạng xã hội, thu hút hàng triệu lượt xem. Nhiều người tin là thật.",
      icon: "📱",
      effects: {
        gdp: -5,
        literacy: -15,
        healthcare: 0,
        superstition: 32,
        urbanization: 5,
        budgetChange: -80,
      },
      explanation:
        "Công nghệ phổ biến nhưng thiếu tư duy phản biện → Tin giả lan nhanh → Mê tín online bùng nổ",
      isPositive: false,
    },
    {
      id: "brain_drain",
      title: "Chảy Máu Chất Xám",
      description:
        "Nhiều người trẻ có học thức rời làng đi thành phố lớn. Làng mất đi lực lượng trẻ có tư duy hiện đại.",
      icon: "✈️",
      effects: {
        gdp: -10,
        literacy: -18,
        healthcare: -5,
        superstition: 18,
        urbanization: -20,
        budgetChange: -120,
      },
      explanation:
        "Người trẻ di cư → Làng thiếu tri thức → Người già giữ truyền thống mê tín",
      isPositive: false,
    },
  ];

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
        "50% dân làng tin vào mê tín dị đoan. Chọn 2 quyết định để bắt đầu chuyển đổi.",
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
          title: "Cấm Hoạt Động Mê Tín",
          description:
            "Ban hành quy định cấm bói toán, phạt nặng người vi phạm. Giải pháp nhanh chóng và quyết liệt.",
          cost: 150,
          effects: {
            gdp: -15,
            literacy: -5,
            healthcare: -10,
            superstition: 10,
            urbanization: -8,
          },
          mlnExplanation:
            "THẤT BẠI NGHIÊM TRỌNG: Cấm đoán không có cơ sở vật chất → Dân chúng nổi loạn, chống đối → Mê tín gia tăng do tâm lý phản kháng → Kinh tế suy thoái vì bất ổn xã hội",
        },
        {
          id: "corruption_path",
          title: "Đối Tác Với Thầy Bói",
          description:
            "Thỏa thuận với thầy bói địa phương để thu phí 'quản lý', tạo nguồn thu cho ngân sách phát triển",
          cost: -200,
          effects: {
            gdp: 8,
            literacy: -15,
            healthcare: -8,
            superstition: 25,
            urbanization: -5,
          },
          mlnExplanation:
            "THẤT BẠI ĐẠO ĐỨC: Tham nhũng tạo lợi ích ngắn hạn nhưng hủy hoại niềm tin → Mê tín được chính quyền bảo vệ → Dân chúng mất niềm tin vào nhà nước → Xã hội thoái hóa",
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
        {
          id: "casino_investment",
          title: "Khu Giải Trí & Casino Du Lịch",
          description:
            "Xây dựng casino thu hút du khách quốc tế, tạo việc làm và doanh thu cao cho địa phương",
          cost: 400,
          effects: {
            gdp: 25,
            literacy: -20,
            healthcare: -15,
            superstition: 40,
            urbanization: 15,
          },
          mlnExplanation:
            "THẢM HỌA TOÀN DIỆN: Casino tạo văn hóa cờ bạc → Mê tín về 'may mắn' bùng nổ → Gia đình tan vỡ, tệ nạn xã hội → GDP tăng nhưng xã hội suy đồi nghiêm trọng",
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
        {
          id: "fake_miracle_propaganda",
          title: "Tuyên Truyền Khoa Học Đại Chúng",
          description:
            "Sử dụng hiệu ứng hình ảnh ấn tượng để minh họa 'sức mạnh khoa học', làm cho dân chúng tin tưởng",
          cost: 200,
          effects: {
            gdp: -5,
            literacy: -25,
            healthcare: -10,
            superstition: 35,
            urbanization: 5,
          },
          mlnExplanation:
            "THẤT BẠI TƯ TƯỞNG: Khoa học giả tạo niềm tin sai lệch → Khi vạch trần, dân chúng mất niềm tin hoàn toàn → Mê tín bùng nổ mạnh hơn trước → Uy tín khoa học bị phá hoại",
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
        {
          id: "surveillance_dystopia",
          title: "Hệ Thống Giám Sát AI Thông Minh",
          description:
            "Triển khai AI giám sát và phát hiện hoạt động mê tín, tự động can thiệp và giáo dục",
          cost: 600,
          effects: {
            gdp: -20,
            literacy: -15,
            healthcare: -25,
            superstition: -10,
            urbanization: -30,
          },
          mlnExplanation:
            "THẢM HỌA ĐỘC TÀI: Giám sát toàn diện tạo xã hội 1984 → Dân chúng sợ hãi, mất tự do tư duy → Kinh tế suy thoái do thiếu sáng tạo → Mê tín chỉ giảm qua áp bức, không bền vững",
        },
        {
          id: "genetic_discrimination",
          title: "Phân Tích Gen & Giáo Dục Cá Nhân Hóa",
          description:
            "Sử dụng công nghệ gen để xác định xu hướng tư duy, điều chỉnh chương trình giáo dục phù hợp",
          cost: 800,
          effects: {
            gdp: 10,
            literacy: -30,
            healthcare: -40,
            superstition: 15,
            urbanization: -20,
          },
          mlnExplanation:
            "THẤT BẠI NHÂN VĂN: Phân biệt chủng tộc mới dựa trên gen → Tạo tầng lớp bị áp bức → Xã hội chia rẽ nghiêm trọng → Mê tín gia tăng do bất công xã hội → Phủ định bản chất con người",
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
      const phases = [50, villageStats.superstitionRate];
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
        gdpPerCapita: Math.max(
          0,
          Math.min(100, newStats.gdpPerCapita + decision.effects.gdp)
        ),
        literacyRate: Math.max(
          0,
          Math.min(100, newStats.literacyRate + decision.effects.literacy)
        ),
        healthcareAccess: Math.max(
          0,
          Math.min(100, newStats.healthcareAccess + decision.effects.healthcare)
        ),
        superstitionRate: Math.max(
          0,
          Math.min(
            100,
            newStats.superstitionRate + decision.effects.superstition
          )
        ),
        urbanization: Math.max(
          0,
          Math.min(100, newStats.urbanization + decision.effects.urbanization)
        ),
      };
    });

    // Check for game failure conditions
    if (newStats.superstitionRate >= 95) {
      setGameFailure(
        "Mê tín dị đoan đã chiếm ưu thế tuyệt đối! Xã hội sụp đổ vào hỗn loạn và mù quáng. Dân chúng hoàn toàn từ chối khoa học và lý tính."
      );
    } else if (newStats.gdpPerCapita <= 5 && newStats.literacyRate <= 10) {
      setGameFailure(
        "Xã hội suy thoái hoàn toàn! Kinh tế sụp đổ, giáo dục tan rã. Người dân trở về thời kỳ đen tối, hoàn toàn phụ thuộc vào mê tín để sống còn."
      );
    } else if (
      newStats.healthcareAccess <= 5 &&
      newStats.superstitionRate >= 85
    ) {
      setGameFailure(
        "Y tế sụp đổ kết hợp với mê tín bùng nổ! Dân chúng hoàn toàn từ bỏ y học hiện đại, chỉ tin vào thầy lang và bùa chú. Dịch bệnh lan rộng không kiểm soát được."
      );
    }

    setVillageStats(newStats);
    setBudget(budget - totalCost);
    setDecisionHistory([...decisionHistory, ...pendingDecisions]);
    setDecisionsThisPhase(pendingDecisions.length);
    setShowAnalysis(true);
  };

  const triggerRandomEvent = () => {
    // 30% chance to trigger a random event
    if (Math.random() < 0.3) {
      const availableEvents = randomEvents.filter((event) => {
        // Filter events based on current phase/conditions
        if (event.id === "social_media_hoax" && currentPhase < 2) return false;
        if (event.id === "tech_donor" && currentPhase > 3) return false;
        return true;
      });

      const randomIndex = Math.floor(Math.random() * availableEvents.length);
      const selectedEvent = availableEvents[randomIndex];
      setRandomEvent(selectedEvent);
      setShowRandomEvent(true);
    } else {
      // No event, proceed normally
      proceedToNextPhase();
    }
  };

  const applyRandomEvent = () => {
    if (!randomEvent) return;

    const newStats = {
      ...villageStats,
      gdpPerCapita: Math.max(
        0,
        Math.min(100, villageStats.gdpPerCapita + randomEvent.effects.gdp)
      ),
      literacyRate: Math.max(
        0,
        Math.min(100, villageStats.literacyRate + randomEvent.effects.literacy)
      ),
      healthcareAccess: Math.max(
        0,
        Math.min(
          100,
          villageStats.healthcareAccess + randomEvent.effects.healthcare
        )
      ),
      superstitionRate: Math.max(
        0,
        Math.min(
          100,
          villageStats.superstitionRate + randomEvent.effects.superstition
        )
      ),
      urbanization: Math.max(
        0,
        Math.min(
          100,
          villageStats.urbanization + randomEvent.effects.urbanization
        )
      ),
    };

    setVillageStats(newStats);
    setBudget(Math.max(0, budget + randomEvent.effects.budgetChange));
    setShowRandomEvent(false);
    setRandomEvent(null);

    // Check for failure after event
    if (newStats.superstitionRate >= 95) {
      setGameFailure(
        "Mê tín dị đoan đã chiếm ưu thế tuyệt đối! Xã hội sụp đổ vào hỗn loạn và mù quáng. Dân chúng hoàn toàn từ chối khoa học và lý tính."
      );
    } else if (newStats.gdpPerCapita <= 5 && newStats.literacyRate <= 10) {
      setGameFailure(
        "Xã hội suy thoái hoàn toàn! Kinh tế sụp đổ, giáo dục tan rã. Người dân trở về thời kỳ đen tối, hoàn toàn phụ thuộc vào mê tín để sống còn."
      );
    }

    proceedToNextPhase();
  };

  const proceedToNextPhase = () => {
    if (currentPhase < phases.length - 1) {
      setCurrentPhase(currentPhase + 1);
      // Budget increases based on GDP growth - more challenging
      const budgetIncrease = Math.floor(300 + villageStats.gdpPerCapita * 2);
      setBudget(budget + budgetIncrease);
      setShowAnalysis(false);
      setDecisionsThisPhase(0);
      setPendingDecisions([]);
    } else {
      setGameComplete(true);
    }
  };

  const nextPhase = () => {
    if (decisionsThisPhase === 0) {
      alert("Bạn cần chọn ít nhất 1 quyết định trước khi tiếp tục!");
      return;
    }

    triggerRandomEvent();
  };

  const reset = () => {
    setCurrentPhase(0);
    setBudget(600);
    setVillageStats({
      year: 1990,
      gdpPerCapita: 30,
      literacyRate: 35,
      healthcareAccess: 25,
      superstitionRate: 50,
      urbanization: 20,
    });
    setDecisionHistory([]);
    setPendingDecisions([]);
    setShowAnalysis(false);
    setGameComplete(false);
    setDecisionsThisPhase(0);
    setGameFailure(null);
  };

  const getGameEnding = () => {
    const superstition = villageStats.superstitionRate;
    const literacy = villageStats.literacyRate;
    const gdp = villageStats.gdpPerCapita;
    const healthcare = villageStats.healthcareAccess;

    // Calculate overall development score
    const developmentScore = (literacy + gdp + healthcare - superstition) / 4;

    // Analyze player's decision patterns
    const analyzeDecisions = () => {
      const educationDecisions = decisionHistory.filter(
        (d) =>
          d.id.includes("edu") ||
          d.id.includes("literacy") ||
          d.id.includes("university") ||
          d.id.includes("digital_literacy") ||
          d.id.includes("ai_education") ||
          d.id.includes("critical_thinking") ||
          d.id.includes("philosophy_education")
      );

      const economicDecisions = decisionHistory.filter(
        (d) =>
          d.id.includes("econ") ||
          d.id.includes("industry") ||
          d.id.includes("tech") ||
          d.id.includes("fintech") ||
          d.id.includes("smart_city") ||
          d.id.includes("biotech")
      );

      const healthDecisions = decisionHistory.filter(
        (d) =>
          d.id.includes("health") ||
          d.id.includes("hospital") ||
          d.id.includes("counseling") ||
          d.id.includes("wellness") ||
          d.id.includes("biotech")
      );

      const authoritarianDecisions = decisionHistory.filter(
        (d) =>
          d.id.includes("ban_superstition") ||
          d.id.includes("surveillance") ||
          d.id.includes("genetic_discrimination")
      );

      const corruptDecisions = decisionHistory.filter(
        (d) =>
          d.id.includes("corruption") ||
          d.id.includes("casino") ||
          d.id.includes("fake_miracle")
      );

      const culturalDecisions = decisionHistory.filter(
        (d) =>
          d.id.includes("culture") ||
          d.id.includes("museum") ||
          d.id.includes("podcast") ||
          d.id.includes("social_media") ||
          d.id.includes("radio")
      );

      return {
        educationDecisions,
        economicDecisions,
        healthDecisions,
        authoritarianDecisions,
        corruptDecisions,
        culturalDecisions,
        totalDecisions: decisionHistory.length,
      };
    };

    const decisionAnalysis = analyzeDecisions();

    // Check for catastrophic failure
    if (superstition > 80 || developmentScore < 20) {
      let analysis = "Đây là hậu quả của việc áp dụng các biện pháp ";

      if (decisionAnalysis.corruptDecisions.length > 0) {
        analysis += `tham nhũng như ${decisionAnalysis.corruptDecisions
          .map((d) => d.title)
          .join(", ")}, `;
      }
      if (decisionAnalysis.authoritarianDecisions.length > 0) {
        analysis += `cưỡng bức như ${decisionAnalysis.authoritarianDecisions
          .map((d) => d.title)
          .join(", ")}, `;
      }
      if (
        decisionAnalysis.economicDecisions.length === 0 &&
        decisionAnalysis.educationDecisions.length === 0
      ) {
        analysis += "thiếu đầu tư vào kinh tế và giáo dục, ";
      }

      analysis +=
        "hoặc những chính sách không dựa trên cơ sở khoa học. Duy vật lịch sử chứng minh: không thể thay đổi ý thức mà không thay đổi điều kiện vật chất một cách đúng đắn.";

      return {
        title: "KẾT THÚC THẢm HỌA: Xã Hội Suy Đồi",
        description:
          "Những quyết định sai lầm đã dẫn đến thảm họa xã hội. Mê tín dị đoan bùng nổ, dân chúng mất niềm tin vào khoa học và nhà nước.",
        color: "text-red-500",
        bgColor: "bg-red-500/10 border-red-500/30",
        analysis: analysis,
      };
    }

    // Check for authoritarian ending
    if (villageStats.urbanization < 30 && superstition < 30) {
      let analysis =
        "Thành công về mặt kỹ thuật nhưng thất bại về mặt nhân văn. ";

      if (decisionAnalysis.authoritarianDecisions.length > 0) {
        analysis += `Bạn đã chọn biện pháp cưỡng bức như ${decisionAnalysis.authoritarianDecisions
          .map((d) => d.title)
          .join(", ")}, `;
      }
      if (decisionAnalysis.educationDecisions.length === 0) {
        analysis += "thiếu đầu tư vào giáo dục để phát triển tư duy tự do, ";
      }

      analysis +=
        "Sự thay đổi ý thức chỉ bền vững khi dựa trên giáo dục và phát triển, không phải áp bức.";

      return {
        title: "KẾT THÚC CHUYÊN CHẾ: Trật Tự Qua Áp Bức",
        description:
          "Mê tín được kiểm soát nhưng bằng biện pháp cưỡng bức. Xã hội thiếu tự do và sáng tạo.",
        color: "text-orange-500",
        bgColor: "bg-orange-500/10 border-orange-500/30",
        analysis: analysis,
      };
    }

    // Perfect ending
    if (superstition < 15 && literacy > 80 && developmentScore > 70) {
      let analysis = "Thành công tuyệt đối! ";

      if (decisionAnalysis.educationDecisions.length > 0) {
        analysis += `Bạn đã đầu tư mạnh vào giáo dục với ${decisionAnalysis.educationDecisions
          .map((d) => d.title)
          .join(", ")}, `;
      }
      if (decisionAnalysis.economicDecisions.length > 0) {
        analysis += `kết hợp với phát triển kinh tế qua ${decisionAnalysis.economicDecisions
          .map((d) => d.title)
          .join(", ")}, `;
      }
      if (decisionAnalysis.healthDecisions.length > 0) {
        analysis += `và chăm sóc sức khỏe bằng ${decisionAnalysis.healthDecisions
          .map((d) => d.title)
          .join(", ")}. `;
      }

      analysis +=
        "Bạn đã áp dụng đúng nguyên lý duy vật lịch sử: thay đổi tồn tại xã hội (giáo dục, kinh tế, y tế) để thay đổi ý thức xã hội một cách bền vững.";

      return {
        title: "KẾT THÚC HOÀN HẢO: Xã Hội Tri Thức",
        description:
          "Bạn đã xây dựng thành công một xã hội hiện đại, duy lý và nhân văn. Mê tín dị đoan gần như biến mất nhờ giáo dục và phát triển toàn diện.",
        color: "text-green-400",
        bgColor: "bg-green-500/10 border-green-500/30",
        analysis: analysis,
      };
    }

    // Good ending
    if (superstition < 25 && literacy > 60 && developmentScore > 50) {
      let analysis = "Thành công đáng kể! ";

      if (
        decisionAnalysis.educationDecisions.length > 0 &&
        decisionAnalysis.economicDecisions.length > 0
      ) {
        analysis += `Bạn đã cân bằng tốt giữa giáo dục (${decisionAnalysis.educationDecisions
          .map((d) => d.title)
          .join(
            ", "
          )}) và phát triển kinh tế (${decisionAnalysis.economicDecisions
          .map((d) => d.title)
          .join(", ")}). `;
      } else if (
        decisionAnalysis.educationDecisions.length >
        decisionAnalysis.economicDecisions.length
      ) {
        analysis += `Bạn tập trung vào giáo dục với ${decisionAnalysis.educationDecisions
          .map((d) => d.title)
          .join(", ")}, mang lại kết quả bền vững. `;
      } else {
        analysis += `Bạn ưu tiên phát triển kinh tế với ${decisionAnalysis.economicDecisions
          .map((d) => d.title)
          .join(", ")}, tạo nền tảng cho sự thay đổi. `;
      }

      analysis +=
        "Mê tín giảm một cách tự nhiên khi điều kiện sống được cải thiện.";

      return {
        title: "KẾT THÚC TỐT: Xã Hội Phát Triển",
        description:
          "Làng đã phát triển thành thị trấn hiện đại. Mê tín giảm mạnh nhờ giáo dục và y tế được cải thiện.",
        color: "text-blue-400",
        bgColor: "bg-blue-500/10 border-blue-500/30",
        analysis: analysis,
      };
    }

    // Mixed ending
    if (superstition < 45) {
      let analysis = "Tiến bộ nhưng chưa toàn diện. ";

      if (decisionAnalysis.educationDecisions.length === 0) {
        analysis += "Bạn thiếu đầu tư vào giáo dục, ";
      }
      if (decisionAnalysis.economicDecisions.length === 0) {
        analysis += "thiếu phát triển kinh tế đồng đều, ";
      }
      if (decisionAnalysis.healthDecisions.length === 0) {
        analysis += "chăm sóc sức khỏe chưa đầy đủ, ";
      }

      analysis +=
        "Cần đầu tư nhiều hơn vào giáo dục và giảm bất bình đẳng để hoàn thành mục tiêu.";

      return {
        title: "KẾT THÚC HỖN HỢP: Tiến Bộ Từng Bước",
        description:
          "Có tiến bộ nhưng chưa đạt mục tiêu. Mê tín vẫn tồn tại ở một số khu vực, đặc biệt nơi phát triển chậm.",
        color: "text-yellow-400",
        bgColor: "bg-yellow-500/10 border-yellow-500/30",
        analysis: analysis,
      };
    }

    // Failure ending
    let analysis = "Chiến lược phát triển chưa hiệu quả. ";

    if (decisionAnalysis.educationDecisions.length === 0) {
      analysis +=
        "Thiếu tập trung vào giáo dục khiến dân chúng không có công cụ để chống lại mê tín. ";
    }
    if (decisionAnalysis.economicDecisions.length === 0) {
      analysis +=
        "Không phát triển kinh tế khiến điều kiện sống không cải thiện. ";
    }
    if (decisionAnalysis.corruptDecisions.length > 0) {
      analysis += `Các quyết định như ${decisionAnalysis.corruptDecisions
        .map((d) => d.title)
        .join(", ")} đã làm suy yếu niềm tin vào chính quyền. `;
    }

    analysis +=
      "Có thể do thiếu tập trung vào giáo dục hoặc chọn những biện pháp không phù hợp với điều kiện địa phương.";

    return {
      title: "KẾT THÚC THẤT BẠI: Mê Tín Vẫn Thống Trị",
      description:
        "Mặc dù có một số cải thiện, mê tín dị đoan vẫn chiếm ưu thế. Cần xem xét lại chiến lược phát triển.",
      color: "text-red-400",
      bgColor: "bg-red-500/10 border-red-500/30",
      analysis: analysis,
    };
  };

  // Game failure screen
  if (gameFailure) {
    return (
      <div className="h-screen bg-gradient-to-b from-[hsl(0,45%,8%)] to-[hsl(0,40%,6%)] flex flex-col">
        <ScrollArea className="flex-1 p-8">
          <div className="container mx-auto max-w-6xl flex flex-col">
            <Card className="bg-[hsl(0,45%,8%)]/95 backdrop-blur-xl border-[hsl(0,60%,50%)]/40 p-12 flex-1 flex flex-col">
              <div className="text-center space-y-8">
                <div className="w-32 h-32 mx-auto rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                  <AlertCircle className="w-20 h-20 text-red-500" />
                </div>

                <div>
                  <h2 className="text-5xl font-black text-red-500 mb-4">
                    THẤT BẠI THẢM HẠI!
                  </h2>
                  <p className="text-xl text-[hsl(0,60%,75%)] mb-6">
                    {villageStats.year}: Xã hội sụp đổ
                  </p>

                  <Card className="bg-red-500/10 border-red-500/30 p-8 text-left">
                    <h3 className="text-2xl font-bold text-red-400 mb-4">
                      💀 Tình Hình Thảm Khốc:
                    </h3>
                    <p className="text-[hsl(40,20%,95%)]/90 text-lg leading-relaxed mb-6">
                      {gameFailure}
                    </p>

                    <div className="border-t border-red-500/20 pt-6">
                      <h4 className="text-lg font-bold text-red-400 mb-3">
                        📚 Bài Học Duy Vật Lịch Sử:
                      </h4>
                      <div className="space-y-3 text-[hsl(40,20%,95%)]/80">
                        <p>
                          • <strong>Biện pháp cưỡng bức</strong> không thể thay
                          đổi bền vững ý thức xã hội
                        </p>
                        <p>
                          • <strong>Tham nhũng và lừa dối</strong> phá hủy niềm
                          tin vào tiến bộ
                        </p>
                        <p>
                          • <strong>Bỏ qua giáo dục</strong> khiến dân chúng dễ
                          tin mê tín
                        </p>
                        <p>
                          • <strong>Thiếu cân bằng</strong> giữa các yếu tố phát
                          triển gây suy thoái toàn diện
                        </p>
                      </div>

                      <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                        <p className="text-yellow-400 font-semibold">
                          💡 <strong>Nguyên lý cốt lõi:</strong> "Tồn tại xã hội
                          quyết định ý thức xã hội" - Marx
                        </p>
                        <p className="text-[hsl(40,20%,95%)]/70 text-sm mt-2">
                          Chỉ khi cải thiện điều kiện vật chất (giáo dục, kinh
                          tế, y tế) một cách đúng đắn, ý thức mới thay đổi theo
                          hướng tích cực.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="bg-red-500/20 border-red-500/40 p-6">
                    <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
                    <div className="text-3xl font-black text-red-500">
                      {villageStats.superstitionRate}%
                    </div>
                    <div className="text-sm text-[hsl(40,20%,95%)]/70">
                      Tỷ Lệ Mê Tín
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

                  <Card className="bg-[hsl(350,80%,60%)]/10 border-[hsl(350,80%,60%)]/30 p-6">
                    <Heart className="w-8 h-8 text-[hsl(350,80%,70%)] mb-2" />
                    <div className="text-3xl font-black text-[hsl(350,80%,70%)]">
                      {villageStats.healthcareAccess}%
                    </div>
                    <div className="text-sm text-[hsl(40,20%,95%)]/70">
                      Chăm Sóc Y Tế
                    </div>
                  </Card>
                </div>

                <div className="flex gap-4">
                  {onBack && (
                    <Button
                      onClick={onBack}
                      size="lg"
                      variant="outline"
                      className="border-[hsl(40,20%,95%)]/50 hover:bg-[hsl(270,60%,50%)]/30 hover:text-white px-12 py-6 text-lg text-[hsl(40,20%,95%)]"
                    >
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      Quay Lại
                    </Button>
                  )}
                  <Button
                    onClick={reset}
                    size="lg"
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-12 py-6 text-lg flex-1"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Thử Lại Từ Đầu
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </ScrollArea>
      </div>
    );
  }

  if (gameComplete) {
    const ending = getGameEnding();
    const totalInvestment = decisionHistory.reduce((sum, d) => sum + d.cost, 0);

    return (
      <div className="h-screen bg-gradient-to-b from-[hsl(240,45%,6%)] to-[hsl(240,40%,8%)] flex flex-col">
        <ScrollArea className="flex-1 p-8">
          <div className="container mx-auto max-w-6xl flex flex-col">
            <Card className="bg-[hsl(240,45%,8%)]/95 backdrop-blur-xl border-[hsl(270,60%,50%)]/40 p-12 flex-1 flex flex-col">
              <div className="text-center space-y-8">
                <div
                  className={`w-24 h-24 mx-auto rounded-full ${ending.bgColor} flex items-center justify-center`}
                >
                  {ending.color.includes("red") ? (
                    <AlertCircle className={`w-16 h-16 ${ending.color}`} />
                  ) : ending.color.includes("orange") ? (
                    <AlertCircle className={`w-16 h-16 ${ending.color}`} />
                  ) : (
                    <CheckCircle className={`w-16 h-16 ${ending.color}`} />
                  )}
                </div>

                <div>
                  <h2 className={`text-4xl font-black mb-4 ${ending.color}`}>
                    {ending.title}
                  </h2>
                  <p className="text-xl text-[hsl(270,60%,75%)] mb-4">
                    {villageStats.year}: {ending.description}
                  </p>
                  <Card className={`${ending.bgColor} p-6 text-left`}>
                    <h3 className="text-lg font-bold text-[hsl(270,60%,75%)] mb-3">
                      📊 Phân Tích Kết Quả:
                    </h3>
                    <p className="text-[hsl(40,20%,95%)]/90 leading-relaxed">
                      {ending.analysis}
                    </p>
                  </Card>
                </div>

                {/* Final Stats */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="bg-[hsl(0,70%,60%)]/10 border-[hsl(0,70%,60%)]/30 p-6">
                    <AlertCircle className="w-8 h-8 text-[hsl(0,70%,60%)] mb-2" />
                    <div className="text-3xl font-black text-[hsl(0,70%,60%)]">
                      {villageStats.superstitionRate}%
                    </div>
                    <div className="text-sm text-[hsl(40,20%,95%)]/70">
                      Tỷ Lệ Mê Tín Cuối Cùng
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

                {/* Decision History with Detailed Analysis */}
                <Card className="bg-[hsl(220,70%,55%)]/10 border-[hsl(220,70%,55%)]/30 p-6 text-left">
                  <h3 className="text-xl font-bold text-[hsl(220,70%,70%)] mb-4 flex items-center gap-2">
                    📜 Hành Trình Quyết Định Của Bạn
                  </h3>
                  <p className="text-sm text-[hsl(40,20%,95%)]/70 mb-4">
                    Phân tích chi tiết từng quyết định và tác động của chúng
                  </p>
                  <div className="space-y-4">
                    {decisionHistory.map((decision, index) => {
                      const isGoodDecision =
                        decision.effects.superstition < 0 &&
                        (decision.effects.literacy > 0 ||
                          decision.effects.healthcare > 0);
                      const isBadDecision =
                        decision.effects.superstition > 15 ||
                        (decision.effects.gdp < 0 &&
                          decision.effects.literacy < 0);

                      return (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border-2 ${
                            isBadDecision
                              ? "bg-red-500/5 border-red-500/30"
                              : isGoodDecision
                              ? "bg-green-500/5 border-green-500/30"
                              : "bg-[hsl(240,45%,10%)]/60 border-[hsl(270,60%,50%)]/20"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[hsl(270,60%,50%)]/20 flex items-center justify-center font-bold text-[hsl(270,60%,75%)]">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-3 mb-2">
                                <div>
                                  <div className="font-bold text-lg text-[hsl(40,20%,95%)]">
                                    {decision.title}
                                  </div>
                                  {isBadDecision && (
                                    <div className="text-xs text-red-400 mt-1">
                                      ⚠️ Quyết định có hậu quả tiêu cực
                                    </div>
                                  )}
                                  {isGoodDecision && (
                                    <div className="text-xs text-green-400 mt-1">
                                      ✓ Quyết định hiệu quả
                                    </div>
                                  )}
                                </div>
                                <div className="text-right flex-shrink-0">
                                  <div className="text-sm text-[hsl(270,60%,75%)] font-semibold">
                                    Chi phí:{" "}
                                    {decision.cost >= 0
                                      ? decision.cost
                                      : `+${Math.abs(decision.cost)}`}
                                  </div>
                                </div>
                              </div>

                              <div className="text-sm text-[hsl(40,20%,95%)]/70 mb-3 italic">
                                💡 {decision.mlnExplanation}
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                                <div
                                  className={`flex items-center gap-1 ${
                                    decision.effects.gdp >= 0
                                      ? "text-green-400"
                                      : "text-red-400"
                                  }`}
                                >
                                  <Coins className="w-3 h-3" />
                                  <span>
                                    GDP +{Math.abs(decision.effects.gdp)}
                                  </span>
                                </div>
                                <div
                                  className={`flex items-center gap-1 ${
                                    decision.effects.literacy >= 0
                                      ? "text-green-400"
                                      : "text-red-400"
                                  }`}
                                >
                                  <GraduationCap className="w-3 h-3" />
                                  <span>
                                    Giáo dục +
                                    {Math.abs(decision.effects.literacy)}
                                  </span>
                                </div>
                                <div
                                  className={`flex items-center gap-1 ${
                                    decision.effects.healthcare >= 0
                                      ? "text-green-400"
                                      : "text-red-400"
                                  }`}
                                >
                                  <Heart className="w-3 h-3" />
                                  <span>
                                    Y tế +
                                    {Math.abs(decision.effects.healthcare)}
                                  </span>
                                </div>
                                <div
                                  className={`flex items-center gap-1 ${
                                    decision.effects.superstition <= 0
                                      ? "text-green-400"
                                      : "text-red-400"
                                  }`}
                                >
                                  <AlertCircle className="w-3 h-3" />
                                  <span>
                                    Mê tín +
                                    {Math.abs(decision.effects.superstition)}
                                  </span>
                                </div>
                                <div
                                  className={`flex items-center gap-1 ${
                                    decision.effects.urbanization >= 0
                                      ? "text-green-400"
                                      : "text-red-400"
                                  }`}
                                >
                                  <Factory className="w-3 h-3" />
                                  <span>
                                    Đô thị +
                                    {Math.abs(decision.effects.urbanization)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-6 pt-4 border-t border-[hsl(220,70%,55%)]/20">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-[hsl(40,20%,95%)]/60 mb-1">
                          Tổng đầu tư
                        </div>
                        <div className="text-2xl font-bold text-[hsl(270,60%,75%)]">
                          {totalInvestment} điểm
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-[hsl(40,20%,95%)]/60 mb-1">
                          Số quyết định
                        </div>
                        <div className="text-2xl font-bold text-[hsl(270,60%,75%)]">
                          {decisionHistory.length}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="flex gap-4">
                  {onBack && (
                    <Button
                      onClick={onBack}
                      size="lg"
                      variant="outline"
                      className="border-[hsl(40,20%,95%)]/50 hover:bg-[hsl(270,60%,50%)]/30 hover:text-white px-12 py-6 text-lg text-[hsl(40,20%,95%)]"
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
        </ScrollArea>
      </div>
    );
  }

  // Random event screen
  if (showRandomEvent && randomEvent) {
    return (
      <div className="h-screen bg-gradient-to-b from-[hsl(240,45%,6%)] to-[hsl(240,40%,8%)] flex flex-col">
        <ScrollArea className="flex-1 p-8">
          <div className="container mx-auto max-w-4xl flex flex-col items-center justify-center min-h-full">
            <Card
              className={`${
                randomEvent.isPositive
                  ? "bg-[hsl(220,70%,8%)]/95 border-[hsl(220,70%,50%)]/40"
                  : "bg-[hsl(0,45%,8%)]/95 border-[hsl(0,60%,50%)]/40"
              } backdrop-blur-xl p-12 w-full`}
            >
              <div className="text-center space-y-6">
                <div className={`text-8xl mb-4 animate-bounce`}>
                  {randomEvent.icon}
                </div>

                <div>
                  <div className="text-sm text-[hsl(270,60%,75%)] font-semibold mb-2 uppercase tracking-wider">
                    ⚡ Sự Kiện Ngẫu Nhiên
                  </div>
                  <h2
                    className={`text-4xl font-black mb-4 ${
                      randomEvent.isPositive
                        ? "text-[hsl(220,70%,70%)]"
                        : "text-[hsl(0,70%,70%)]"
                    }`}
                  >
                    {randomEvent.title}
                  </h2>
                  <p className="text-lg text-[hsl(40,20%,95%)]/80 leading-relaxed mb-6">
                    {randomEvent.description}
                  </p>
                </div>

                <Card
                  className={`${
                    randomEvent.isPositive
                      ? "bg-green-500/10 border-green-500/30"
                      : "bg-red-500/10 border-red-500/30"
                  } p-6 text-left`}
                >
                  <h3
                    className={`text-lg font-bold mb-3 ${
                      randomEvent.isPositive ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    📊 Tác Động:
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {randomEvent.effects.gdp !== 0 && (
                      <div className="flex items-center gap-2">
                        <Coins className="w-4 h-4" />
                        <span className="text-sm">
                          GDP:{" "}
                          <strong
                            className={
                              randomEvent.effects.gdp > 0
                                ? "text-green-400"
                                : "text-red-400"
                            }
                          >
                            {randomEvent.effects.gdp > 0 ? "+" : ""}
                            {randomEvent.effects.gdp}
                          </strong>
                        </span>
                      </div>
                    )}
                    {randomEvent.effects.literacy !== 0 && (
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4" />
                        <span className="text-sm">
                          Giáo dục:{" "}
                          <strong
                            className={
                              randomEvent.effects.literacy > 0
                                ? "text-green-400"
                                : "text-red-400"
                            }
                          >
                            {randomEvent.effects.literacy > 0 ? "+" : ""}
                            {randomEvent.effects.literacy}
                          </strong>
                        </span>
                      </div>
                    )}
                    {randomEvent.effects.healthcare !== 0 && (
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">
                          Y tế:{" "}
                          <strong
                            className={
                              randomEvent.effects.healthcare > 0
                                ? "text-green-400"
                                : "text-red-400"
                            }
                          >
                            {randomEvent.effects.healthcare > 0 ? "+" : ""}
                            {randomEvent.effects.healthcare}
                          </strong>
                        </span>
                      </div>
                    )}
                    {randomEvent.effects.superstition !== 0 && (
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm">
                          Mê tín:{" "}
                          <strong
                            className={
                              randomEvent.effects.superstition < 0
                                ? "text-green-400"
                                : "text-red-400"
                            }
                          >
                            {randomEvent.effects.superstition > 0 ? "+" : ""}
                            {randomEvent.effects.superstition}
                          </strong>
                        </span>
                      </div>
                    )}
                    {randomEvent.effects.urbanization !== 0 && (
                      <div className="flex items-center gap-2">
                        <Factory className="w-4 h-4" />
                        <span className="text-sm">
                          Đô thị:{" "}
                          <strong
                            className={
                              randomEvent.effects.urbanization > 0
                                ? "text-green-400"
                                : "text-red-400"
                            }
                          >
                            {randomEvent.effects.urbanization > 0 ? "+" : ""}
                            {randomEvent.effects.urbanization}
                          </strong>
                        </span>
                      </div>
                    )}
                    {randomEvent.effects.budgetChange !== 0 && (
                      <div className="flex items-center gap-2">
                        <Coins className="w-4 h-4" />
                        <span className="text-sm">
                          Ngân sách:{" "}
                          <strong
                            className={
                              randomEvent.effects.budgetChange > 0
                                ? "text-green-400"
                                : "text-red-400"
                            }
                          >
                            {randomEvent.effects.budgetChange > 0 ? "+" : ""}
                            {randomEvent.effects.budgetChange}
                          </strong>
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="pt-4 border-t border-[hsl(270,60%,50%)]/20">
                    <div className="flex items-start gap-2">
                      <Brain className="w-5 h-5 text-[hsl(270,60%,70%)] flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-semibold text-[hsl(270,60%,75%)] mb-1">
                          Phân tích duy vật lịch sử:
                        </div>
                        <p className="text-sm text-[hsl(40,20%,95%)]/80">
                          {randomEvent.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Button
                  onClick={applyRandomEvent}
                  size="lg"
                  className="bg-gradient-to-r from-[hsl(270,60%,50%)] to-[hsl(220,70%,55%)] hover:from-[hsl(270,60%,60%)] hover:to-[hsl(220,70%,65%)] text-white px-12 py-6 text-lg"
                >
                  Tiếp Tục
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </Card>
          </div>
        </ScrollArea>
      </div>
    );
  }

  const phase = phases[currentPhase];

  return (
    <div className="h-screen bg-gradient-to-b from-[hsl(240,45%,6%)] to-[hsl(240,40%,8%)] flex flex-col">
      <ScrollArea className="flex-1 p-3 sm:p-6 md:p-8">
        <div className="container mx-auto max-w-7xl flex flex-col space-y-4 sm:space-y-6">
          {/* Header */}
          <Card className="bg-[hsl(240,45%,8%)]/95 backdrop-blur-xl border-[hsl(270,60%,50%)]/40 p-4 sm:p-5 md:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0 sm:justify-between">
              {onBack && (
                <Button
                  onClick={onBack}
                  variant="outline"
                  size="sm"
                  className="border-[hsl(40,20%,95%)]/50 hover:bg-[hsl(270,60%,50%)]/30 hover:text-white text-xs sm:text-sm text-[hsl(40,20%,95%)]"
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
                          if (id.includes("culture") || id.includes("digital"))
                            return "📚";
                          if (id.includes("university")) return "🎓";
                          if (id.includes("counseling")) return "🧠";
                          if (id.includes("ban")) return "�";
                          if (id.includes("casino")) return "🎰";
                          if (id.includes("corruption")) return "🤝";
                          if (id.includes("surveillance")) return "👁️";
                          if (id.includes("genetic")) return "🧬";
                          if (id.includes("fake") || id.includes("propaganda"))
                            return "📢";
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
      </ScrollArea>
    </div>
  );
};

export default VillageTransformationGame;
