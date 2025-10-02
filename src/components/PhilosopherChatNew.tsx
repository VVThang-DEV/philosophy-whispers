import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  PhilosopherChatService,
  type ChatMessage,
} from "@/services/geminiService";
import type { Philosopher } from "@/data/philosophers";
import { Loader2, Send, Sparkles, MessageCircle, Info } from "lucide-react";

interface PhilosopherChatProps {
  philosopher: Philosopher;
  onClose?: () => void;
}

// Helper function to get pronoun pair for each philosopher
const getPronounPair = (
  philosopherId: string
): { speaker: string; listener: string } => {
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
  return pronounMap[philosopherId] || { speaker: "Tôi", listener: "bạn" };
};

export default function PhilosopherChatNew({
  philosopher,
  onClose,
}: PhilosopherChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatService, setChatService] = useState<PhilosopherChatService | null>(
    null
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const service = new PhilosopherChatService(philosopher);
    setChatService(service);

    // Get fixed pronouns for this philosopher
    const pronouns = getPronounPair(philosopher.id);

    // Add simple greeting message with fixed pronouns
    const greeting = `${
      philosopher.greeting
    } Hãy cùng ${pronouns.speaker.toLowerCase()} trao đổi về triết học và cuộc sống. ${
      pronouns.listener.charAt(0).toUpperCase() + pronouns.listener.slice(1)
    } muốn thảo luận về điều gì?`;
    setMessages([
      {
        role: "model",
        parts: [{ text: greeting }],
        timestamp: new Date(),
      },
    ]);

    // Scroll to top and focus input
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      inputRef.current?.focus();
    }, 100);

    return () => {
      service.clearHistory();
    };
  }, [philosopher]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chatService || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        parts: [{ text: userMessage }],
        timestamp: new Date(),
      },
    ]);

    try {
      const response = await chatService.sendMessage(userMessage);

      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          parts: [{ text: response }],
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          parts: [
            {
              text: "Xin lỗi, tôi gặp khó khăn trong việc suy nghĩ. Hãy thử lại.",
            },
          ],
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-[hsl(240,50%,3%)] via-[hsl(240,45%,6%)] to-[hsl(240,40%,10%)] relative overflow-hidden">
      {/* Cosmic background effects */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[hsl(270,60%,50%)] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[hsl(220,70%,55%)] rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <div className="relative z-10 p-3 sm:p-4 md:p-6 border-b border-[hsl(270,60%,50%)]/20 bg-gradient-to-r from-[hsl(270,60%,50%)]/10 via-[hsl(220,70%,55%)]/10 to-[hsl(320,60%,60%)]/10 backdrop-blur-md">
        <div className="flex items-center gap-3 sm:gap-4">
          <Avatar className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 border-2 border-[hsl(270,60%,50%)] shadow-[0_0_20px_hsl(270,60%,50%,0.5)]">
            <AvatarImage src={philosopher.avatar} alt={philosopher.name} />
            <AvatarFallback className="bg-gradient-to-br from-[hsl(270,60%,50%)] to-[hsl(220,70%,55%)] text-white text-lg sm:text-xl font-bold">
              {philosopher.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg sm:text-xl md:text-2xl font-black text-[hsl(40,20%,95%)] flex items-center gap-2 truncate">
                {philosopher.name}
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[hsl(45,100%,65%)] animate-pulse shrink-0" />
              </h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-[hsl(270,60%,70%)] hover:text-[hsl(270,60%,90%)] hover:bg-[hsl(270,60%,50%)]/20 shrink-0"
                  >
                    <Info className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[hsl(240,45%,6%)] border-[hsl(270,60%,50%)]/30 text-[hsl(40,20%,95%)] max-w-2xl max-h-[80vh] overflow-y-auto [&>button]:text-[hsl(270,60%,75%)] [&>button]:hover:text-[hsl(270,60%,85%)] [&>button]:hover:bg-transparent [&>button]:focus:ring-0 [&>button]:focus:ring-offset-0 [&>button]:focus:outline-none">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-[hsl(270,60%,90%)] flex items-center gap-2">
                      {philosopher.name}
                      <Badge
                        variant="secondary"
                        className="bg-[hsl(270,60%,50%)]/30 text-[hsl(270,60%,80%)]"
                      >
                        {philosopher.school}
                      </Badge>
                    </DialogTitle>
                    <DialogDescription className="text-[hsl(270,60%,70%)]">
                      {philosopher.era}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[hsl(270,60%,85%)] mb-2">
                        📖 Giới thiệu
                      </h3>
                      <p className="text-[hsl(40,20%,85%)] leading-relaxed">
                        {philosopher.description}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[hsl(270,60%,85%)] mb-2">
                        🎯 Ý tưởng chính
                      </h3>
                      <ul className="space-y-2">
                        {philosopher.keyIdeas.map((idea, idx) => (
                          <li
                            key={idx}
                            className="text-[hsl(40,20%,85%)] flex gap-2"
                          >
                            <span className="text-[hsl(270,60%,70%)]">•</span>
                            <span>{idea}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[hsl(270,60%,85%)] mb-2">
                        💬 Câu nói nổi tiếng
                      </h3>
                      <blockquote className="border-l-4 border-[hsl(270,60%,50%)] pl-4 italic text-[hsl(40,20%,85%)]">
                        "{philosopher.famousQuote}"
                      </blockquote>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[hsl(270,60%,85%)] mb-2">
                        🗣️ Phong cách giao tiếp
                      </h3>
                      <p className="text-[hsl(40,20%,85%)]">
                        <strong>Lời chào:</strong> {philosopher.greeting}
                      </p>
                      <p className="text-[hsl(40,20%,85%)] mt-1">
                        <strong>Cách xưng hô:</strong> {philosopher.pronouns}
                      </p>
                      <p className="text-[hsl(40,20%,85%)] mt-2">
                        {philosopher.personality}
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex gap-1.5 sm:gap-2 flex-wrap">
              <Badge
                variant="secondary"
                className="bg-[hsl(270,60%,50%)]/30 text-[hsl(270,60%,80%)] border border-[hsl(270,60%,50%)]/40 backdrop-blur-sm text-xs px-2 py-0.5"
              >
                {philosopher.school}
              </Badge>
              <Badge
                variant="outline"
                className="border-[hsl(220,70%,55%)]/40 text-[hsl(220,70%,75%)] backdrop-blur-sm text-xs px-2 py-0.5"
              >
                {philosopher.era}
              </Badge>
            </div>
          </div>
          {onClose && (
            <Button
              variant="ghost"
              onClick={onClose}
              size="sm"
              className="text-[hsl(40,20%,95%)] hover:text-white hover:bg-[hsl(270,60%,50%)]/30 active:scale-95 shrink-0 h-8 w-8 sm:h-10 sm:w-10 p-0"
            >
              ✕
            </Button>
          )}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-3 sm:p-4 md:p-6 relative z-10">
        <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-2 sm:gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500 ${
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {msg.role === "model" ? (
                <Avatar className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 border-2 border-[hsl(270,60%,50%)] shadow-[0_0_15px_hsl(270,60%,50%,0.4)] shrink-0">
                  <AvatarImage
                    src={philosopher.avatar}
                    alt={philosopher.name}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-[hsl(270,60%,50%)] to-[hsl(220,70%,55%)] text-white font-bold text-sm">
                    {philosopher.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-gradient-to-br from-[hsl(190,80%,60%)] to-[hsl(220,70%,55%)] flex items-center justify-center shadow-[0_0_15px_hsl(190,80%,60%,0.4)] shrink-0">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
              )}

              <div
                className={`rounded-2xl p-3 sm:p-4 max-w-[85%] sm:max-w-[80%] shadow-lg ${
                  msg.role === "user"
                    ? "bg-gradient-to-br from-[hsl(190,80%,60%)] to-[hsl(220,70%,55%)] text-white shadow-[0_0_20px_hsl(190,80%,60%,0.3)]"
                    : "bg-gradient-to-br from-[hsl(270,60%,50%)]/20 to-[hsl(320,60%,60%)]/20 text-[hsl(40,20%,95%)] border border-[hsl(270,60%,50%)]/30 backdrop-blur-md shadow-[0_0_20px_hsl(270,60%,50%,0.2)]"
                }`}
              >
                <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">
                  {msg.parts[0]?.text || ""}
                </p>
                <p
                  className={`text-xs mt-2 opacity-70 ${
                    msg.role === "user"
                      ? "text-white"
                      : "text-[hsl(270,60%,80%)]"
                  }`}
                >
                  {msg.timestamp.toLocaleTimeString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-2 sm:gap-3 animate-in fade-in slide-in-from-bottom-4">
              <Avatar className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 border-2 border-[hsl(270,60%,50%)] shadow-[0_0_15px_hsl(270,60%,50%,0.4)]">
                <AvatarImage src={philosopher.avatar} alt={philosopher.name} />
                <AvatarFallback className="bg-gradient-to-br from-[hsl(270,60%,50%)] to-[hsl(220,70%,55%)] text-white font-bold text-sm">
                  {philosopher.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="rounded-2xl p-3 sm:p-4 bg-gradient-to-br from-[hsl(270,60%,50%)]/20 to-[hsl(320,60%,60%)]/20 border border-[hsl(270,60%,50%)]/30 backdrop-blur-md">
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-[hsl(270,60%,70%)] animate-spin" />
              </div>
            </div>
          )}
          {/* Invisible div to scroll to */}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="relative z-10 p-3 sm:p-4 border-t border-[hsl(270,60%,50%)]/20 bg-gradient-to-r from-[hsl(270,60%,50%)]/10 via-[hsl(220,70%,55%)]/10 to-[hsl(320,60%,60%)]/10 backdrop-blur-md">
        <div className="max-w-4xl mx-auto space-y-3">
          {/* Suggested Questions - only show when no messages yet */}
          {messages.length <= 1 && philosopher.suggestedQuestions && (
            <div className="space-y-2">
              <p className="text-xs sm:text-sm text-[hsl(270,60%,80%)] font-medium px-2">
                💬 Câu hỏi gợi ý:
              </p>
              <div className="grid gap-2">
                {philosopher.suggestedQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInput(question);
                      inputRef.current?.focus();
                    }}
                    className="text-left p-3 rounded-xl bg-gradient-to-br from-[hsl(270,60%,50%)]/10 to-[hsl(320,60%,60%)]/10 border border-[hsl(270,60%,50%)]/30 hover:border-[hsl(270,60%,50%)]/50 text-[hsl(40,20%,95%)] text-xs sm:text-sm transition-all duration-200 hover:shadow-[0_0_15px_hsl(270,60%,50%,0.2)] active:scale-[0.98]"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          <Card className="bg-[hsl(240,45%,6%)]/80 border-[hsl(270,60%,50%)]/30 shadow-[0_0_30px_hsl(270,60%,50%,0.2)] backdrop-blur-sm">
            <div className="flex gap-2 p-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Đặt câu hỏi triết học..."
                disabled={isLoading}
                className="flex-1 bg-[hsl(240,50%,3%)]/50 border-[hsl(270,60%,50%)]/30 text-[hsl(40,20%,95%)] placeholder:text-[hsl(270,60%,70%)] focus-visible:ring-[hsl(270,60%,50%)] focus-visible:border-[hsl(270,60%,50%)] text-sm sm:text-base min-h-[44px]"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="bg-gradient-to-r from-[hsl(270,60%,50%)] via-[hsl(220,70%,55%)] to-[hsl(320,60%,60%)] hover:from-[hsl(270,60%,55%)] hover:via-[hsl(220,70%,60%)] hover:to-[hsl(320,60%,65%)] text-white shadow-[0_0_20px_hsl(270,60%,50%,0.4)] hover:shadow-[0_0_30px_hsl(270,60%,50%,0.6)] disabled:opacity-50 transition-all duration-300 active:scale-95 shrink-0 min-h-[44px] min-w-[44px]"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                ) : (
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </Button>
            </div>
          </Card>
          <p className="text-xs sm:text-sm text-[hsl(270,60%,70%)] mt-2 sm:mt-3 text-center px-2">
            💡 <span className="font-medium">Mẹo:</span> Nhấn vào câu hỏi gợi ý
            hoặc tự đặt câu hỏi của bạn
          </p>
        </div>
      </div>
    </div>
  );
}
