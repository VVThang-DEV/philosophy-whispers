# 🌌 Philosophy Whispers - Trò Chuyện với Triết Gia AI

Một ứng dụng web tương tác cho phép bạn khám phá và trò chuyện với các triết gia vĩ đại qua AI, với giao diện 3D WebGL đẹp mắt và nội dung hoàn toàn bằng tiếng Việt.

## ✨ Tính Năng Chính

### 🎨 Giao Diện 3D Tương Tác

- **Vũ trụ triết học 3D**: Hiển thị chân dung các triết gia trên một khối cầu 3D tương tác sử dụng WebGL
- **Điều khiển trực quan**: Kéo và quay để khám phá, nhấp để trò chuyện
- **Hiệu ứng hình ảnh**: Gradient động, particles bay lượn, và animations mượt mà

### 🤖 Trò Chuyện AI với Triết Gia

- **12+ Triết gia**: Marx, Lenin, Socrates, Plato, Aristotle, Khổng Tử, Lão Tử, Descartes, Kant, Nietzsche, Sartre, Hegel
- **Powered by Google Gemini**: Sử dụng Gemini Pro để tạo ra cuộc trò chuyện chân thực
- **Nhập vai hoàn hảo**: Mỗi triết gia có phong cách, giọng điệu và tri thức riêng
- **Ngôn ngữ tiếng Việt**: Tất cả nội dung và cuộc trò chuyện đều bằng tiếng Việt

### 📚 Nội Dung Phong Phú

- Thông tin chi tiết về mỗi triết gia
- Các tư tưởng và học thuyết chính
- Câu nói nổi tiếng
- Bối cảnh lịch sử và văn hóa

## 🚀 Bắt Đầu

### Yêu Cầu

- Node.js 18+
- npm hoặc yarn

### Cài Đặt

1. Clone repository:
   \`\`\`bash
   git clone https://github.com/VVThang-DEV/philosophy-whispers.git
   cd philosophy-whispers
   \`\`\`

2. Cài đặt dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Khởi chạy development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Mở trình duyệt và truy cập `http://localhost:8080`

## 🛠️ Công Nghệ Sử Dụng

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **WebGL 2** - 3D rendering
- **gl-matrix** - Ma trận toán học 3D
- **Google Gemini AI** - Conversational AI
- **shadcn/ui** - UI components

## 📁 Cấu Trúc Dự Án

\`\`\`
src/
├── components/
│ ├── SphereGallery.tsx # 3D WebGL gallery
│ ├── PhilosopherChatNew.tsx # AI chat interface
│ ├── HeroNew.tsx # Hero section
│ └── ui/ # shadcn/ui components
├── data/
│ └── philosophers.ts # Philosopher data
├── services/
│ └── geminiService.ts # Gemini AI integration
└── pages/
└── IndexNew.tsx # Main page
\`\`\`

## 🎨 Tính Năng Thiết Kế

### Màu Sắc & Gradient

- **Primary**: Purple-Pink-Cyan gradient
- **Background**: Dark slate with purple tones
- **Accents**: Neon cyan, pink, and purple

### Animations

- Floating particles
- Gradient animations
- Smooth transitions
- 3D sphere rotation
- Fade in/slide in effects

### Typography

- Font-family: System fonts for best performance
- Weights: Regular (400), Medium (500), Bold (700), Black (900)
- Vietnamese language support

## 🤝 Đóng Góp

Mọi đóng góp đều được hoan nghênh! Hãy tạo Pull Request hoặc mở Issue để thảo luận về các tính năng mới.

## 📝 License

MIT License - Xem file LICENSE để biết thêm chi tiết.

## 🙏 Credits

- Philosopher portraits from Unsplash
- Google Gemini AI for conversational capabilities
- shadcn/ui for beautiful components
- gl-matrix for 3D mathematics

## 🌟 Triết Gia Có Sẵn

1. **Karl Marx** - Chủ nghĩa Mác (1818-1883)
2. **Vladimir Lenin** - Chủ nghĩa Mác-Lênin (1870-1924)
3. **Socrates** - Triết học Hy Lạp cổ đại (470-399 TCN)
4. **Plato** - Chủ nghĩa duy tâm khách quan (428-348 TCN)
5. **Aristotle** - Chủ nghĩa hiện thực (384-322 TCN)
6. **Khổng Tử** - Nho giáo (551-479 TCN)
7. **Lão Tử** - Đạo giáo (6 thế kỷ TCN)
8. **René Descartes** - Chủ nghĩa duy lý (1596-1650)
9. **Immanuel Kant** - Chủ nghĩa duy tâm phê phán (1724-1804)
10. **Friedrich Nietzsche** - Chủ nghĩa hư vô (1844-1900)
11. **Jean-Paul Sartre** - Chủ nghĩa hiện sinh (1905-1980)
12. **Georg Hegel** - Chủ nghĩa duy tâm tuyệt đối (1770-1831)

## 💡 Gợi Ý Sử Dụng

- **Khám phá**: Kéo quanh khối cầu để xem tất cả các triết gia
- **Chọn**: Nhấp vào nút "Trò chuyện" khi triết gia bạn muốn ở giữa
- **Trò chuyện**: Hỏi về tư tưởng, triết lý, hoặc cuộc đời của họ
- **Học hỏi**: Đặt câu hỏi sâu sắc và để AI triết gia dẫn dắt suy nghĩ của bạn

---

**Được xây dựng với ❤️ và AI bởi VVThang-DEV**
