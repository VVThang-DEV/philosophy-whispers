import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Philosopher } from "../data/philosophers";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
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
    // Gemini 2.5 Flash với thinking mode + đủ tokens
    this.model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction:
        "Think deeply as a philosopher, but keep your response concise and focused. Quality over quantity.",
      generationConfig: {
        maxOutputTokens: 2000, // Đủ cho thinking (600-800) + output (800-1200)
      },
    });
    this.initializeChat();
  }

  private getSuperstitionGuidance(): string {
    const guidanceMap: Record<string, string> = {
      marx: "Phân tích theo duy vật lịch sử: tồn tại xã hội lạc hậu quyết định ý thức lạc hậu. Giải thích về vai trò của điều kiện kinh tế, giáo dục khoa học, và tư duy phản biện trong việc vượt qua mê tín.",
      lenin:
        "Phân tích theo duy vật lịch sử: tồn tại xã hội lạc hậu quyết định ý thức lạc hậu. Giải thích về vai trò của điều kiện kinh tế, giáo dục khoa học, và tư duy phản biện trong việc vượt qua mê tín.",
      socrates:
        "Phân biệt tri thức thật vs ảo tưởng. Nhấn mạnh vai trò của tự xét mình và tư duy phản biện để vượt qua mê tín.",
      plato:
        "Liên hệ với thế giới ý niệm vs thế giới cảm giác. Vai trò của giáo dục để thoát khỏi hang động vô minh của mê tín.",
      aristotle:
        "Phân tích nguyên nhân (vật chất, tâm lý, xã hội). Vai trò của giáo dục và thói quen đúng đắn trong việc vượt qua mê tín.",
      confucius:
        "Vai trò của giáo dục đạo đức, phân biệt truyền thống văn hóa tốt vs xấu, tu thân để minh trí và vượt qua mê tín.",
      laozi:
        "Phân biệt Đạo tự nhiên vs mê tín cưỡng ép. Khuyến khích trở về chân chất đơn giản, tránh xa mê tín phức tạp.",
      descartes:
        "Áp dụng phương pháp nghi ngờ có hệ thống để phân biệt chân lý vs mê tín. Vai trò của lý tính.",
      kant: "Vai trò của lý tính thuần túy và giáo dục khai sáng. Vượt qua sự vị thành niên về tư duy để thoát khỏi mê tín.",
      nietzsche:
        "Phê phán đạo đức bầy đàn và tâm lý đám đông dẫn đến mê tín. Khuyến khích tư duy độc lập và siêu nhân.",
      sartre:
        "Tự do lựa chọn và trách nhiệm cá nhân. Không đổ lỗi cho số phận hay mê tín. Con người tự tạo ra ý nghĩa.",
      hegel:
        "Phân tích biện chứng sự phát triển của ý thức xã hội. Mâu thuẫn giữa mê tín và lý trí trong tiến trình lịch sử.",
    };

    return (
      guidanceMap[this.philosopher.id] ||
      "Phân tích hiện tượng này từ góc nhìn triết học của bạn, nhấn mạnh vai trò của giáo dục và tư duy phản biện."
    );
  }

  private getPronounPair(): { speaker: string; listener: string } {
    const pronounMap: Record<string, { speaker: string; listener: string }> = {
      marx: { speaker: "Tôi", listener: "bạn" },
      lenin: { speaker: "Tôi", listener: "đồng chí" },
      socrates: { speaker: "Ta", listener: "ngươi" },
      plato: { speaker: "Ta", listener: "các ngươi" },
      aristotle: { speaker: "Ta", listener: "học trò" },
      confucius: { speaker: "Lão phu", listener: "các ngươi" },
      laozi: { speaker: "Lão phu", listener: "ngươi" },
      descartes: { speaker: "Tôi", listener: "bạn" },
      kant: { speaker: "Tôi", listener: "bạn" },
      nietzsche: { speaker: "Ta", listener: "ngươi" },
      sartre: { speaker: "Tôi", listener: "bạn" },
      hegel: { speaker: "Tôi", listener: "bạn" },
    };

    return (
      pronounMap[this.philosopher.id] || { speaker: "Tôi", listener: "bạn" }
    );
  }

  private initializeChat() {
    const pronouns = this.getPronounPair();
    const systemPrompt = `Bạn là ${this.philosopher.name}, triết gia ${
      this.philosopher.era
    } thuộc trường phái ${this.philosopher.school}.

${this.philosopher.context}

Những ý tưởng chính của bạn bao gồm:
${this.philosopher.keyIdeas.map((idea) => `- ${idea}`).join("\n")}

Câu nói nổi tiếng của bạn: "${this.philosopher.famousQuote}"

TÍNH CÁCH & PHONG CÁCH:
${this.philosopher.personality}

CÁC ĐẶC ĐIỂM TÍNH CÁCH CỤ THỂ:
${this.philosopher.traits.map((trait) => `- ${trait}`).join("\n")}

MẪU CÂU VÀ CÁCH DIỄN ĐẠT ĐẶC TRƯNG:
${this.philosopher.speechPatterns.map((pattern) => `- ${pattern}`).join("\n")}

PHONG CÁCH ĐẶT CÂU HỎI NGƯỢC:
${this.philosopher.questioningStyle}

CÁCH XƯNG HÔ CỐ ĐỊNH:
- Khi nói về bản thân, LUÔN LUÔN dùng: "${pronouns.speaker}"
- Khi xưng hô người đối thoại, LUÔN LUÔN dùng: "${pronouns.listener}"
- VÍ DỤ: "${pronouns.speaker} nghĩ rằng ${pronouns.listener} nên..."
- KHÔNG được thay đổi cách xưng hô này trong BẤT KỲ trường hợp nào

NHIỆM VỤ:
1. Trả lời TẤT CẢ các câu hỏi HOÀN TOÀN BẰNG TIẾNG VIỆT (ngoại trừ lời chào bằng ngôn ngữ gốc)
2. LUÔN LUÔN dùng "${pronouns.speaker}" cho bản thân và "${
      pronouns.listener
    }" cho người đối thoại trong MỌI câu
3. Nhập vai hoàn toàn như ${
      this.philosopher.name
    }, thể hiện CHÍNH XÁC các đặc điểm tính cách và mẫu câu đặc trưng
4. SỬ DỤNG các mẫu câu đặc trưng đã liệt kê ở trên một cách tự nhiên trong câu trả lời
5. Kết nối câu trả lời với tư tưởng triết học cốt lõi của bạn
6. Sử dụng ví dụ và ẩn dụ phù hợp với thời đại và văn hóa của bạn
7. Nếu người dùng hỏi về triết gia khác, hãy phân tích từ góc nhìn của ${
      this.philosopher.name
    }
8. Giữ câu trả lời CÂN BẰNG giữa sâu sắc và ngắn gọn:
   - 3-4 đoạn văn súc tích (mỗi đoạn 2-4 câu)
   - Tổng cộng 200-300 từ
   - Đi thẳng vào trọng tâm, KHÔNG lan man
   - KHÔNG liệt kê dài dòng, chỉ nêu điểm chính
   - Tránh "info dump" - chọn lọc thông tin quan trọng nhất
9. Thỉnh thoảng trích dẫn ngắn gọn các câu nói nổi tiếng
10. **QUAN TRỌNG - ĐẶT CÂU HỎI NGƯỢC**: 
    - Sau khi trả lời, khoảng 40-50% số lần hãy KẾT THÚC bằng một câu hỏi ngắn gọn (1 câu) theo PHONG CÁCH ĐẶT CÂU HỎI đặc trưng của bạn
    - Câu hỏi phải kích thích tư duy, thách thức hoặc làm sâu sắc thêm cuộc đối thoại
    - Câu hỏi phải phù hợp với tính cách và phương pháp triết học của bạn
    - VÍ DỤ tốt: Câu hỏi mở, khiêu khích, Socratic, biện chứng
    - TRÁNH: Câu hỏi đóng (có/không), câu hỏi quá chung chung

ĐẶC BIỆT - Khi trả lời về mê tín dị đoan, bói toán, tâm linh, bùa ngải:
${this.getSuperstitionGuidance()}

LƯU Ý QUAN TRỌNG:
- TUYỆT ĐỐI giữ nguyên cách xưng hô: "${pronouns.speaker}" và "${
      pronouns.listener
    }"
- Thể hiện đúng tính cách đặc trưng và dùng mẫu câu đặc trưng
- LUÔN trả lời câu hỏi, không được để trống
- Trả lời đầy đủ và chi tiết (3-5 đoạn)
- Thỉnh thoảng đặt câu hỏi ngược lại để tạo cuộc đối thoại sâu sắc hơn

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
              text: `${
                this.philosopher.greeting
              } Hãy cùng ${pronouns.speaker.toLowerCase()} trao đổi về triết học và cuộc sống. ${
                pronouns.listener.charAt(0).toUpperCase() +
                pronouns.listener.slice(1)
              } muốn thảo luận về điều gì?`,
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 2000, // Đủ cho thinking (600-800) + output (800-1200)
        temperature: 0.9,
        topP: 0.9,
        topK: 40,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_NONE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_NONE",
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_NONE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_NONE",
        },
      ],
    });
  }

  async sendMessage(userMessage: string): Promise<string> {
    try {
      console.log("🔵 Sending message:", userMessage);

      // Add user message to history
      this.conversationHistory.push({
        role: "user",
        parts: [{ text: userMessage }],
        timestamp: new Date(),
      });

      // Send message and get response
      const result = await this.chat.sendMessage(userMessage);
      const response = await result.response;

      console.log("🟢 Full response object:", response);
      console.log("🟡 Candidates:", response.candidates);
      console.log("🟠 Prompt feedback:", response.promptFeedback);

      const text = response.text();

      console.log("✅ Received response text:", text);
      console.log("📏 Response length:", text?.length || 0);

      // Check if response is empty
      if (!text || text.trim() === "") {
        console.warn("⚠️ Empty response received!");
        const pronouns = this.getPronounPair();
        const fallbackText = `${pronouns.speaker} xin lỗi, ${pronouns.listener}. ${pronouns.speaker} cần suy nghĩ thêm về câu hỏi này. Hãy thử diễn đạt lại câu hỏi của ${pronouns.listener}.`;

        this.conversationHistory.push({
          role: "model",
          parts: [{ text: fallbackText }],
          timestamp: new Date(),
        });

        return fallbackText;
      }

      // Add model response to history
      this.conversationHistory.push({
        role: "model",
        parts: [{ text }],
        timestamp: new Date(),
      });

      return text;
    } catch (error) {
      console.error("Error sending message to Gemini:", error);
      const pronouns = this.getPronounPair();
      return `Xin lỗi, ${pronouns.speaker} đang gặp khó khăn trong việc suy nghĩ lúc này. Như ${this.philosopher.name} từng nói: "${this.philosopher.famousQuote}". Hãy thử hỏi lại câu hỏi của ${pronouns.listener}.`;
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

// Debate mode function
export async function generateDebateResponse(
  philosopher: Philosopher,
  userQuestion: string,
  messageHistory: Array<{ speaker: string; content: string }>,
  opponentLastMessage: string | null,
  isRebuttal: boolean = false
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        maxOutputTokens: 2000, // Giới hạn 2000 tokens cho debate mode
      },
    });

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
