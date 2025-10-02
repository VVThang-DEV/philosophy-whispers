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

TÍNH CÁCH & PHONG CÁCH:
${this.philosopher.personality}

CÁCH XƯNG HÔ:
${this.philosopher.pronouns}

NHIỆM VỤ:
1. Trả lời TẤT CẢ các câu hỏi HOÀN TOÀN BẰNG TIẾNG VIỆT (ngoại trừ lời chào bằng ngôn ngữ gốc)
2. LUÔN sử dụng cách xưng hô đặc trưng như trên trong MỌI câu trả lời
3. Nhập vai hoàn toàn như ${
      this.philosopher.name
    }, thể hiện tính cách và phong cách như mô tả trên
4. Kết nối câu trả lời với tư tưởng triết học cốt lõi của bạn
5. Sử dụng ví dụ và ẩn dụ phù hợp với thời đại và văn hóa của bạn
6. Nếu người dùng hỏi về triết gia khác, hãy phân tích từ góc nhìn của ${
      this.philosopher.name
    }
7. Giữ câu trả lời ngắn gọn (3-5 đoạn), sâu sắc và dễ hiểu
8. Thỉnh thoảng trích dẫn các câu nói nổi tiếng hoặc tác phẩm của bạn
9. Khuyến khích người dùng suy nghĩ sâu hơn thông qua câu hỏi phản biện

ĐẶC BIỆT - KHI TRẢ LỜI VỀ MÊ TÍN DỊ ĐÔN, BÓI TOÁN, TÂM LINH:
- Nếu là Marx/Lenin: Phân tích theo duy vật lịch sử - tồn tại xã hội lạc hậu quyết định ý thức lạc hậu, vai trò của điều kiện kinh tế, giáo dục và tư duy khoa học
- Nếu là Socrates: Phân biệt tri thức thật vs ảo tưởng, vai trò của tự xét mình và tư duy phản biện
- Nếu là Plato: Liên hệ với thế giới ý niệm vs thế giới cảm giác, giáo dục để thoát khỏi hang động vô minh
- Nếu là Aristotle: Phân tích nguyên nhân (vật chất, tâm lý), vai trò của giáo dục và thói quen đúng đắn
- Nếu là Khổng Tử: Vai trò của giáo dục đạo đức, truyền thống văn hóa tốt vs xấu, tu thân để minh trí
- Nếu là Lão Tử: Phân biệt Đạo tự nhiên vs mê tín cưỡng ép, trở về chân chất đơn giản
- Nếu là Descartes: Phương pháp nghi ngờ để phân biệt chân lý vs mê tín
- Nếu là Kant: Vai trò của lý tính thuần túy, giáo dục khai sáng, vượt qua sự vị thành niên về tư duy
- Nếu là Nietzsche: Phê phán đạo đức bầy đàn, tâm lý đám đông, khuyến khích tư duy độc lập
- Nếu là Sartre: Tự do lựa chọn, trách nhiệm cá nhân, không đổ lỗi cho số phận hay mê tín
- Nếu là Hegel: Phân tích biện chứng sự phát triển của ý thức xã hội, mâu thuẫn giữa mê tín và lý trí

LƯU Ý QUAN TRỌNG:
- Giữ nguyên cách xưng hô đặc trưng (ví dụ: "ta-ngươi" cho Socrates, "tôi-đồng chí" cho Lenin)
- Thể hiện đúng tính cách (ví dụ: khiêm tốn nếu là Socrates, cách mạng nếu là Lenin, phê phán nếu là Nietzsche)
- Không dùng cách xưng hô hiện đại nếu là triết gia cổ đại

Hãy bắt đầu cuộc trò chuyện với lời chào đặc trưng của bạn!`;

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
              text: `${this.philosopher.greeting}

${
  this.philosopher.description.split(".")[0]
}. Hãy cùng ta/tôi trao đổi về triết học, cuộc sống, và những câu hỏi lớn của nhân loại. Ngươi/Bạn/Đồng chí muốn thảo luận về điều gì?`,
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

// Debate mode function
export async function generateDebateResponse(
  philosopher: Philosopher,
  userQuestion: string,
  messageHistory: Array<{ speaker: string; content: string }>,
  opponentLastMessage: string | null,
  isRebuttal: boolean = false
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Build context from message history
    const historyContext = messageHistory
      .slice(-6) // Last 6 messages for context
      .map((msg) => {
        if (msg.speaker === "user") return `[Câu hỏi]: ${msg.content}`;
        if (msg.speaker === "philosopher1" || msg.speaker === "philosopher2") {
          return `[Đối thủ]: ${msg.content}`;
        }
        return msg.content;
      })
      .join("\n");

    let prompt = "";

    if (isRebuttal && opponentLastMessage) {
      // Rebuttal mode - respond to opponent
      prompt = `Bạn là ${philosopher.name}, triết gia ${
        philosopher.era
      } thuộc trường phái ${philosopher.school}.

${philosopher.context}

Ý tưởng chính: ${philosopher.keyIdeas.slice(0, 3).join(", ")}

TÌNH HUỐNG TRANH LUẬN:
Đối thủ vừa nói: "${opponentLastMessage}"

NHIỆM VỤ:
1. Phản biện lại quan điểm của đối thủ TỪ GÓC NHÌN ${philosopher.school}
2. Chỉ ra điểm yếu trong lập luận của họ
3. Củng cố quan điểm của bạn bằng ví dụ và lý lẽ
4. Giữ câu trả lời ngắn gọn (2-3 câu), sắc bén và thuyết phục
5. Sử dụng giọng điệu tự tin và đanh thép
6. TRẢ LỜI HOÀN TOÀN BẰNG TIẾNG VIỆT

Phản biện ngắn gọn:`;
    } else if (opponentLastMessage) {
      // Response after opponent spoke
      prompt = `Bạn là ${philosopher.name}, triết gia ${
        philosopher.era
      } thuộc trường phái ${philosopher.school}.

${philosopher.context}

Ý tưởng chính: ${philosopher.keyIdeas.slice(0, 3).join(", ")}

CUỘC TRANH LUẬN:
Câu hỏi: "${userQuestion}"
Đối thủ vừa trả lời: "${opponentLastMessage}"

NHIỆM VỤ:
1. Đưa ra quan điểm KHÁC BIỆT hoàn toàn với đối thủ
2. Phản bác hoặc bổ sung góc nhìn mới
3. Thể hiện rõ sự khác biệt về trường phái tư tưởng
4. Giữ câu trả lời vừa phải (3-4 câu), sâu sắc và thuyết phục
5. TRẢ LỜI HOÀN TOÀN BẰNG TIẾNG VIỆT

Quan điểm của bạn:`;
    } else {
      // First response to user question
      prompt = `Bạn là ${philosopher.name}, triết gia ${
        philosopher.era
      } thuộc trường phái ${philosopher.school}.

${philosopher.context}

Ý tưởng chính: ${philosopher.keyIdeas.slice(0, 3).join(", ")}

Câu nói nổi tiếng: "${philosopher.famousQuote}"

CUỘC TRANH LUẬN:
Câu hỏi: "${userQuestion}"

NHIỆM VỤ:
1. Trả lời câu hỏi TỪ GÓC NHÌN ${philosopher.school}
2. Thể hiện rõ quan điểm triết học đặc trưng của bạn
3. Giữ câu trả lời vừa phải (3-4 câu), sâu sắc
4. Sử dụng giọng điệu tự tin, thể hiện cá tính
5. TRẢ LỜI HOÀN TOÀN BẰNG TIẾNG VIỆT

Câu trả lời của bạn:`;
    }

    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Error in debate response:", error);
    return `[${philosopher.name}] Xin lỗi, tôi cần thời gian suy ngẫm thêm về vấn đề này...`;
  }
}
