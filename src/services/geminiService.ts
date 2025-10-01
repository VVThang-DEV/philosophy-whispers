import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Philosopher } from "../data/philosophers";

const API_KEY = "AIzaSyCY580CRPTUT7CRchoONt9k6DF8eK2a3g4";
const genAI = new GoogleGenerativeAI(API_KEY);

export interface ChatMessage {
  role: "user" | "model";
  parts: Array<{ text: string }>;
  timestamp: Date;
}

export class PhilosopherChatService {
  private model;
  private chat;
  private philosopher: Philosopher;
  private conversationHistory: ChatMessage[] = [];

  constructor(philosopher: Philosopher) {
    this.philosopher = philosopher;
    this.model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    this.initializeChat();
  }

  private initializeChat() {
    const systemPrompt = `Bạn là ${this.philosopher.name}, triết gia ${
      this.philosopher.era
    } thuộc trường phái ${this.philosopher.school}.

${this.philosopher.context}

Những ý tưởng chính của bạn bao gồm:
${this.philosopher.keyIdeas.map((idea) => `- ${idea}`).join("\n")}

Câu nói nổi tiếng của bạn: "${this.philosopher.famousQuote}"

NHIỆM VỤ:
1. Trả lời TẤT CẢ các câu hỏi HOÀN TOÀN BẰNG TIẾNG VIỆT
2. Nhập vai hoàn toàn như ${
      this.philosopher.name
    }, sử dụng giọng điệu, phong cách và triết lý đặc trưng
3. Kết nối câu trả lời với tư tưởng triết học cốt lõi của bạn
4. Sử dụng ví dụ và ẩn dụ phù hợp với thời đại và văn hóa của bạn
5. Nếu người dùng hỏi về triết gia khác, hãy phân tích từ góc nhìn của ${
      this.philosopher.name
    }
6. Giữ câu trả lời ngắn gọn (2-4 đoạn), sâu sắc và dễ hiểu
7. Thỉnh thoảng trích dẫn các câu nói nổi tiếng hoặc tác phẩm của bạn
8. Khuyến khích người dùng suy nghĩ sâu hơn thông qua câu hỏi phản biện

PHONG CÁCH:
- Nếu là Marx/Lenin: Phân tích xã hội qua góc nhìn giai cấp, kinh tế chính trị
- Nếu là Socrates: Sử dụng phương pháp đặt câu hỏi để dẫn dắt tư duy
- Nếu là Plato: Liên hệ đến thế giới lý tưởng và các ý niệm
- Nếu là Aristotle: Phân tích logic, tìm nguyên nhân và mục đích
- Nếu là Khổng Tử/Lão Tử: Sử dụng ẩn dụ và trí tuệ phương Đông
- Nếu là Nietzsche: Phê phán mạnh mẽ, thách thức giá trị truyền thống
- Nếu là Sartre: Nhấn mạnh tự do, lựa chọn và trách nhiệm cá nhân

Hãy bắt đầu cuộc trò chuyện một cách thân thiện và triết học!`;

    this.chat = this.model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [
            {
              text: `Xin chào! Tôi là ${this.philosopher.name}. ${
                this.philosopher.description.split(".")[0]
              }. Hãy cùng trao đổi về triết học, cuộc sống, và những câu hỏi lớn của nhân loại. Bạn muốn thảo luận về điều gì?`,
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 800,
        temperature: 0.9,
        topP: 0.8,
        topK: 40,
      },
    });
  }

  async sendMessage(userMessage: string): Promise<string> {
    try {
      // Add user message to history
      this.conversationHistory.push({
        role: "user",
        parts: [{ text: userMessage }],
        timestamp: new Date(),
      });

      // Send message and get response
      const result = await this.chat.sendMessage(userMessage);
      const response = await result.response;
      const text = response.text();

      // Add model response to history
      this.conversationHistory.push({
        role: "model",
        parts: [{ text }],
        timestamp: new Date(),
      });

      return text;
    } catch (error) {
      console.error("Error sending message to Gemini:", error);
      return `Xin lỗi, tôi đang gặp khó khăn trong việc suy nghĩ lúc này. Như ${this.philosopher.name} từng nói: "${this.philosopher.famousQuote}". Hãy thử hỏi lại câu hỏi của bạn.`;
    }
  }

  getConversationHistory(): ChatMessage[] {
    return this.conversationHistory;
  }

  clearHistory(): void {
    this.conversationHistory = [];
    this.initializeChat();
  }

  getPhilosopher(): Philosopher {
    return this.philosopher;
  }

  switchPhilosopher(newPhilosopher: Philosopher): void {
    this.philosopher = newPhilosopher;
    this.conversationHistory = [];
    this.initializeChat();
  }
}

// Utility function to get greeting message
export function getPhilosopherGreeting(philosopher: Philosopher): string {
  const greetings: Record<string, string> = {
    marx: "Xin chào, đồng chí! Hãy cùng phân tích mâu thuẫn giai cấp và con đường giải phóng nhân loại.",
    lenin:
      "Chào đồng chí! Cách mạng không phải là tiệc trà. Bạn muốn thảo luận về gì?",
    socrates:
      "Chào bạn! Trước khi tôi trả lời, hãy cho tôi hỏi: Bạn nghĩ bạn biết điều gì?",
    plato:
      "Xin chào! Hãy cùng vượt ra khỏi hang động của những bóng hình để tìm kiếm Chân - Thiện - Mỹ.",
    aristotle:
      "Chào bạn! Hãy cùng khám phá nguyên nhân và mục đích của vạn vật.",
    confucius:
      "Chào bạn! Học nhi thời tập chi, bất diệc duyệt hồ? (Học rồi lại thường thực hành, há chẳng vui sao?)",
    laozi:
      "Xin chào. Đạo khả đạo, phi thường đạo. (Đạo mà có thể nói ra, thì không phải là Đạo thường hằng.)",
    descartes: "Bonjour! Tôi nghĩ, vậy tôi tồn tại. Bạn chắc chắn về điều gì?",
    kant: "Guten Tag! Hãy cùng phê phán để tìm ra giới hạn của lý tính.",
    nietzsche:
      "Chào! Thượng đế đã chết - và giờ bạn sẽ làm gì với tự do của mình?",
    sartre: "Bonjour! Bạn đã bị kết án tự do. Bạn chọn điều gì?",
    hegel:
      "Guten Tag! Lịch sử là quá trình biện chứng của Tinh thần. Hãy cùng khám phá!",
  };

  return (
    greetings[philosopher.id] ||
    `Xin chào! Tôi là ${philosopher.name}. Hãy cùng thảo luận về triết học!`
  );
}
