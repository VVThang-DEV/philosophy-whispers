import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  PhilosopherChatService,
  getPhilosopherGreeting,
  type ChatMessage,
} from "@/services/geminiService";
import type { Philosopher } from "@/data/philosophers";
import { Loader2, Send, Sparkles, MessageCircle } from "lucide-react";

interface PhilosopherChatProps {
  philosopher: Philosopher;
  onClose?: () => void;
}

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const service = new PhilosopherChatService(philosopher);
    setChatService(service);

    // Add greeting message
    const greeting = getPhilosopherGreeting(philosopher);
    setMessages([
      {
        role: "model",
        parts: [{ text: greeting }],
        timestamp: new Date(),
      },
    ]);

    // Focus input
    setTimeout(() => inputRef.current?.focus(), 100);

    return () => {
      service.clearHistory();
    };
  }, [philosopher]);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
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
      <div className="relative z-10 p-6 border-b border-[hsl(270,60%,50%)]/20 bg-gradient-to-r from-[hsl(270,60%,50%)]/10 via-[hsl(220,70%,55%)]/10 to-[hsl(320,60%,60%)]/10 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-[hsl(270,60%,50%)] shadow-[0_0_20px_hsl(270,60%,50%,0.5)]">
            <AvatarImage src={philosopher.avatar} alt={philosopher.name} />
            <AvatarFallback className="bg-gradient-to-br from-[hsl(270,60%,50%)] to-[hsl(220,70%,55%)] text-white text-xl font-bold">
              {philosopher.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-2xl font-black text-[hsl(40,20%,95%)] mb-1 flex items-center gap-2">
              {philosopher.name}
              <Sparkles className="w-5 h-5 text-[hsl(45,100%,65%)] animate-pulse drop-shadow-[0_0_8px_hsl(45,100%,65%)]" />
            </h2>
            <div className="flex gap-2 flex-wrap">
              <Badge
                variant="secondary"
                className="bg-[hsl(270,60%,50%)]/30 text-[hsl(270,60%,80%)] border border-[hsl(270,60%,50%)]/40 backdrop-blur-sm"
              >
                {philosopher.school}
              </Badge>
              <Badge
                variant="outline"
                className="border-[hsl(220,70%,55%)]/40 text-[hsl(220,70%,75%)] backdrop-blur-sm"
              >
                {philosopher.era}
              </Badge>
            </div>
          </div>
          {onClose && (
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-[hsl(40,20%,95%)] hover:text-white hover:bg-[hsl(270,60%,50%)]/30"
            >
              ✕
            </Button>
          )}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-6 relative z-10" ref={scrollRef}>
        <div className="space-y-6 max-w-4xl mx-auto">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500 ${
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {msg.role === "model" && (
                <Avatar className="h-10 w-10 border-2 border-[hsl(270,60%,50%)] shadow-[0_0_15px_hsl(270,60%,50%,0.4)] shrink-0">
                  <AvatarImage
                    src={philosopher.avatar}
                    alt={philosopher.name}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-[hsl(270,60%,50%)] to-[hsl(220,70%,55%)] text-white font-bold">
                    {philosopher.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              )}

              <div
                className={`rounded-2xl p-4 max-w-[85%] shadow-lg ${
                  msg.role === "user"
                    ? "bg-gradient-to-br from-[hsl(190,80%,60%)] to-[hsl(220,70%,55%)] text-white shadow-[0_0_20px_hsl(190,80%,60%,0.3)]"
                    : "bg-gradient-to-br from-[hsl(270,60%,50%)]/20 to-[hsl(320,60%,60%)]/20 text-[hsl(40,20%,95%)] border border-[hsl(270,60%,50%)]/30 backdrop-blur-md shadow-[0_0_20px_hsl(270,60%,50%,0.2)]"
                }`}
              >
                <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
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

              {msg.role === "user" && (
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[hsl(190,80%,60%)] to-[hsl(220,70%,55%)] flex items-center justify-center shadow-[0_0_15px_hsl(190,80%,60%,0.4)] shrink-0">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-4">
              <Avatar className="h-10 w-10 border-2 border-[hsl(270,60%,50%)] shadow-[0_0_15px_hsl(270,60%,50%,0.4)]">
                <AvatarImage src={philosopher.avatar} alt={philosopher.name} />
                <AvatarFallback className="bg-gradient-to-br from-[hsl(270,60%,50%)] to-[hsl(220,70%,55%)] text-white font-bold">
                  {philosopher.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="rounded-2xl p-4 bg-gradient-to-br from-[hsl(270,60%,50%)]/20 to-[hsl(320,60%,60%)]/20 border border-[hsl(270,60%,50%)]/30 backdrop-blur-md">
                <Loader2 className="w-5 h-5 text-[hsl(270,60%,70%)] animate-spin" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="relative z-10 p-4 border-t border-[hsl(270,60%,50%)]/20 bg-gradient-to-r from-[hsl(270,60%,50%)]/10 via-[hsl(220,70%,55%)]/10 to-[hsl(320,60%,60%)]/10 backdrop-blur-md">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-[hsl(240,45%,6%)]/80 border-[hsl(270,60%,50%)]/30 shadow-[0_0_30px_hsl(270,60%,50%,0.2)] backdrop-blur-sm">
            <div className="flex gap-2 p-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Đặt câu hỏi triết học của bạn..."
                disabled={isLoading}
                className="flex-1 bg-[hsl(240,50%,3%)]/50 border-[hsl(270,60%,50%)]/30 text-[hsl(40,20%,95%)] placeholder:text-[hsl(270,60%,70%)] focus-visible:ring-[hsl(270,60%,50%)] focus-visible:border-[hsl(270,60%,50%)]"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-r from-[hsl(270,60%,50%)] via-[hsl(220,70%,55%)] to-[hsl(320,60%,60%)] hover:from-[hsl(270,60%,55%)] hover:via-[hsl(220,70%,60%)] hover:to-[hsl(320,60%,65%)] text-white shadow-[0_0_20px_hsl(270,60%,50%,0.4)] hover:shadow-[0_0_30px_hsl(270,60%,50%,0.6)] disabled:opacity-50 transition-all duration-300"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>
          </Card>
          <p className="text-xs text-[hsl(270,60%,70%)] mt-3 text-center">
            💡 <span className="font-medium">Gợi ý:</span> Hỏi về tư tưởng,
            triết lý, hoặc cuộc đời của {philosopher.name.split(" ")[0]}
          </p>
        </div>
      </div>
    </div>
  );
}
