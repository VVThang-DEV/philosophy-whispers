import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import {
  Heart,
  Swords,
  Send,
  AlertCircle,
  Trophy,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import type { Philosopher } from "@/data/philosophers";
import { generateDebateResponse } from "@/services/geminiService";

interface Message {
  id: string;
  speaker: "user" | "philosopher1" | "philosopher2";
  content: string;
  timestamp: number;
  isRebuttal?: boolean;
}

interface DebateProps {
  philosopher1: Philosopher;
  philosopher2: Philosopher;
  onExit: () => void;
}

const PhilosopherDebate = ({
  philosopher1,
  philosopher2,
  onExit,
}: DebateProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [rebuttalCount, setRebuttalCount] = useState(0);
  const [waitingForUserChoice, setWaitingForUserChoice] = useState(false);
  const [philosopher1Hearts, setPhilosopher1Hearts] = useState(2);
  const [philosopher2Hearts, setPhilosopher2Hearts] = useState(2);
  const [debateOver, setDebateOver] = useState(false);
  const [winner, setWinner] = useState<"philosopher1" | "philosopher2" | null>(
    null
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Welcome message
    const welcomeMessage: Message = {
      id: `welcome-${Date.now()}`,
      speaker: "user",
      content: `🎭 Chào mừng đến với cuộc tranh luận triết học!\n\n${philosopher1.name} (${philosopher1.school}) vs ${philosopher2.name} (${philosopher2.school})\n\nMỗi triết gia có 3 trái tim ❤️. Đặt câu hỏi và chọn quan điểm bạn đồng ý hơn!`,
      timestamp: Date.now(),
    };
    setMessages([welcomeMessage]);
  }, [philosopher1, philosopher2]);

  const handleUserQuestion = async () => {
    if (!userInput.trim() || isProcessing) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      speaker: "user",
      content: userInput,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setIsProcessing(true);
    setRebuttalCount(0);

    try {
      // Get response from philosopher 1
      const response1 = await generateDebateResponse(
        philosopher1,
        userInput,
        messages,
        null
      );

      const phil1Message: Message = {
        id: `phil1-${Date.now()}`,
        speaker: "philosopher1",
        content: response1,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, phil1Message]);

      // Wait a bit for dramatic effect
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Get response from philosopher 2, with context of philosopher 1's response
      const response2 = await generateDebateResponse(
        philosopher2,
        userInput,
        messages,
        response1
      );

      const phil2Message: Message = {
        id: `phil2-${Date.now()}`,
        speaker: "philosopher2",
        content: response2,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, phil2Message]);

      // Start rebuttals
      await handleRebuttals(response1, response2);
    } catch (error) {
      console.error("Error in debate:", error);
      setIsProcessing(false);
    }
  };

  const handleRebuttals = async (
    lastResponse1: string,
    lastResponse2: string
  ) => {
    const maxRebuttals = 2 + Math.floor(Math.random() * 2); // 2-3 rebuttals

    for (let i = 0; i < maxRebuttals; i++) {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Philosopher 1 rebuts philosopher 2
      const rebuttal1 = await generateDebateResponse(
        philosopher1,
        "Phản biện lại quan điểm của đối thủ",
        messages,
        lastResponse2,
        true
      );

      const rebuttal1Message: Message = {
        id: `rebuttal1-${Date.now()}-${i}`,
        speaker: "philosopher1",
        content: rebuttal1,
        timestamp: Date.now(),
        isRebuttal: true,
      };

      setMessages((prev) => [...prev, rebuttal1Message]);
      setRebuttalCount((prev) => prev + 1);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Philosopher 2 rebuts philosopher 1
      const rebuttal2 = await generateDebateResponse(
        philosopher2,
        "Phản biện lại quan điểm của đối thủ",
        messages,
        rebuttal1,
        true
      );

      const rebuttal2Message: Message = {
        id: `rebuttal2-${Date.now()}-${i}`,
        speaker: "philosopher2",
        content: rebuttal2,
        timestamp: Date.now(),
        isRebuttal: true,
      };

      setMessages((prev) => [...prev, rebuttal2Message]);
      setRebuttalCount((prev) => prev + 1);

      lastResponse1 = rebuttal1;
      lastResponse2 = rebuttal2;
    }

    // Ask user to choose
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const choiceMessage: Message = {
      id: `choice-${Date.now()}`,
      speaker: "user",
      content: "⚖️ Bạn đồng ý với quan điểm của triết gia nào hơn?",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, choiceMessage]);
    setWaitingForUserChoice(true);
    setIsProcessing(false);
  };

  const handleChoice = async (choice: "philosopher1" | "philosopher2") => {
    setWaitingForUserChoice(false);

    const loser = choice === "philosopher1" ? "philosopher2" : "philosopher1";

    if (loser === "philosopher1") {
      setPhilosopher1Hearts((prev) => prev - 1);
      if (philosopher1Hearts - 1 <= 0) {
        setDebateOver(true);
        setWinner("philosopher2");
      }
    } else {
      setPhilosopher2Hearts((prev) => prev - 1);
      if (philosopher2Hearts - 1 <= 0) {
        setDebateOver(true);
        setWinner("philosopher1");
      }
    }

    const chosenPhil = choice === "philosopher1" ? philosopher1 : philosopher2;
    const resultMessage: Message = {
      id: `result-${Date.now()}`,
      speaker: "user",
      content: `✨ Bạn đã chọn quan điểm của ${chosenPhil.name}! ${
        loser === "philosopher1"
          ? `${philosopher1.name} mất 1 trái tim ❤️`
          : `${philosopher2.name} mất 1 trái tim ❤️`
      }`,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, resultMessage]);

    if (philosopher1Hearts - 1 <= 0 || philosopher2Hearts - 1 <= 0) {
      return;
    }

    // Continue debate
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const continueMessage: Message = {
      id: `continue-${Date.now()}`,
      speaker: "user",
      content: "💬 Cuộc tranh luận tiếp tục! Đặt câu hỏi mới...",
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, continueMessage]);
  };

  const resetDebate = () => {
    setMessages([]);
    setPhilosopher1Hearts(2);
    setPhilosopher2Hearts(2);
    setDebateOver(false);
    setWinner(null);
    setRebuttalCount(0);
    setWaitingForUserChoice(false);

    const welcomeMessage: Message = {
      id: `welcome-${Date.now()}`,
      speaker: "user",
      content: `🎭 Cuộc tranh luận mới bắt đầu!\n\n${philosopher1.name} vs ${philosopher2.name}\n\nMỗi triết gia có 3 trái tim ❤️`,
      timestamp: Date.now(),
    };
    setMessages([welcomeMessage]);
  };

  const renderHearts = (count: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(2)].map((_, i) => (
          <Heart
            key={i}
            className={`w-5 h-5 ${
              i < count
                ? "fill-red-500 text-red-500"
                : "fill-gray-600 text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  if (debateOver && winner) {
    const winningPhil = winner === "philosopher1" ? philosopher1 : philosopher2;
    const losingPhil = winner === "philosopher1" ? philosopher2 : philosopher1;

    return (
      <div className="min-h-screen bg-gradient-to-b from-[hsl(240,45%,6%)] to-[hsl(240,40%,8%)] p-8">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-[hsl(240,45%,8%)]/90 backdrop-blur-xl border-[hsl(270,60%,50%)]/40 p-12 text-center">
            <Trophy className="w-24 h-24 mx-auto mb-6 text-yellow-500 animate-bounce" />

            <h1 className="text-5xl font-black text-[hsl(40,20%,95%)] mb-4">
              Chiến Thắng!
            </h1>

            <div className="flex items-center justify-center gap-4 mb-6">
              <img
                src={winningPhil.avatar}
                alt={winningPhil.name}
                className="w-24 h-24 rounded-full border-4 border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.5)]"
              />
            </div>

            <h2 className="text-3xl font-bold text-[hsl(270,60%,75%)] mb-4">
              {winningPhil.name}
            </h2>

            <p className="text-xl text-[hsl(40,20%,95%)]/70 mb-8">
              Trường phái{" "}
              <span className="text-[hsl(270,60%,75%)] font-semibold">
                {winningPhil.school}
              </span>{" "}
              đã thuyết phục bạn hơn trong cuộc tranh luận này!
            </p>

            <div className="bg-[hsl(240,45%,6%)]/60 rounded-xl p-6 mb-8">
              <p className="text-[hsl(40,20%,95%)]/60 italic mb-2">
                "{winningPhil.famousQuote}"
              </p>
              <p className="text-[hsl(270,60%,70%)] text-sm">
                — {winningPhil.name}
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                onClick={resetDebate}
                className="bg-gradient-to-r from-[hsl(270,60%,50%)] to-[hsl(220,70%,55%)] hover:from-[hsl(270,60%,60%)] hover:to-[hsl(220,70%,65%)] text-white px-6 py-6 text-lg"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Tranh Luận Lại
              </Button>

              <Button
                onClick={onExit}
                variant="outline"
                className="border-[hsl(270,60%,50%)]/40 hover:bg-[hsl(270,60%,50%)]/20 px-6 py-6 text-lg"
              >
                Chọn Triết Gia Khác
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(240,45%,6%)] to-[hsl(240,40%,8%)] p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header with both philosophers */}
        <Card className="bg-[hsl(240,45%,8%)]/90 backdrop-blur-xl border-[hsl(270,60%,50%)]/40 mb-4 sticky top-4 z-20">
          <div className="p-4">
            <div className="flex items-center justify-between">
              {/* Philosopher 1 */}
              <div className="flex items-center gap-4 flex-1">
                <img
                  src={philosopher1.avatar}
                  alt={philosopher1.name}
                  className="w-16 h-16 rounded-full border-2 border-[hsl(270,60%,50%)]"
                />
                <div>
                  <h3 className="text-xl font-bold text-[hsl(40,20%,95%)]">
                    {philosopher1.name}
                  </h3>
                  <p className="text-sm text-[hsl(270,60%,75%)]">
                    {philosopher1.school}
                  </p>
                  {renderHearts(philosopher1Hearts)}
                </div>
              </div>

              {/* VS Badge */}
              <div className="px-6">
                <div className="relative">
                  <Swords className="w-12 h-12 text-[hsl(270,60%,70%)] animate-pulse" />
                  <Sparkles className="w-4 h-4 text-yellow-500 absolute -top-1 -right-1 animate-spin" />
                </div>
              </div>

              {/* Philosopher 2 */}
              <div className="flex items-center gap-4 flex-1 flex-row-reverse">
                <img
                  src={philosopher2.avatar}
                  alt={philosopher2.name}
                  className="w-16 h-16 rounded-full border-2 border-[hsl(220,70%,55%)]"
                />
                <div className="text-right">
                  <h3 className="text-xl font-bold text-[hsl(40,20%,95%)]">
                    {philosopher2.name}
                  </h3>
                  <p className="text-sm text-[hsl(220,70%,65%)]">
                    {philosopher2.school}
                  </p>
                  {renderHearts(philosopher2Hearts)}
                </div>
              </div>
            </div>

            {/* Exit button */}
            <div className="flex justify-center mt-4">
              <Button
                onClick={onExit}
                variant="outline"
                size="sm"
                className="border-[hsl(270,60%,50%)]/40 hover:bg-[hsl(270,60%,50%)]/20"
              >
                ← Quay lại chọn triết gia
              </Button>
            </div>
          </div>
        </Card>

        {/* Messages container */}
        <Card className="bg-[hsl(240,45%,8%)]/70 backdrop-blur-xl border-[hsl(270,60%,50%)]/30 mb-4">
          <div className="p-6 h-[60vh] overflow-y-auto space-y-4">
            {messages.map((message) => {
              if (message.speaker === "user") {
                return (
                  <div key={message.id} className="flex justify-center">
                    <div className="bg-[hsl(240,45%,10%)]/80 rounded-xl p-4 max-w-2xl border border-[hsl(270,60%,50%)]/20">
                      <p className="text-[hsl(40,20%,95%)]/90 text-center whitespace-pre-line">
                        {message.content}
                      </p>
                    </div>
                  </div>
                );
              }

              const isPhil1 = message.speaker === "philosopher1";
              const phil = isPhil1 ? philosopher1 : philosopher2;
              const color = isPhil1 ? "hsl(270,60%,60%)" : "hsl(220,70,60%)";

              return (
                <div
                  key={message.id}
                  className={`flex ${
                    isPhil1 ? "justify-start" : "justify-end"
                  } ${message.isRebuttal ? "animate-slide-in" : ""}`}
                >
                  <div
                    className={`flex gap-3 max-w-xl ${
                      isPhil1 ? "" : "flex-row-reverse"
                    }`}
                  >
                    <img
                      src={phil.avatar}
                      alt={phil.name}
                      className="w-10 h-10 rounded-full border-2"
                      style={{ borderColor: color }}
                    />

                    <div
                      className={`rounded-2xl p-4 ${
                        message.isRebuttal ? "border-2 shadow-lg" : "border"
                      }`}
                      style={{
                        backgroundColor: `${color}15`,
                        borderColor: `${color}40`,
                        boxShadow: message.isRebuttal
                          ? `0 0 20px ${color}30`
                          : "none",
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-bold text-[hsl(40,20%,95%)]">
                          {phil.name}
                        </p>
                        {message.isRebuttal && (
                          <span className="text-xs px-2 py-1 rounded-full bg-[hsl(270,60%,50%)]/30 text-[hsl(270,60%,80%)]">
                            Phản biện
                          </span>
                        )}
                      </div>
                      <p className="text-[hsl(40,20%,95%)]/90 leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {isProcessing && !waitingForUserChoice && (
              <div className="flex justify-center">
                <div className="bg-[hsl(240,45%,10%)]/80 rounded-xl p-4 border border-[hsl(270,60%,50%)]/20">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[hsl(270,60%,70%)] rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-[hsl(220,70%,65%)] rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-[hsl(320,60%,65%)] rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <span className="text-[hsl(40,20%,95%)]/70 ml-2">
                      Triết gia đang suy ngẫm...
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </Card>

        {/* Choice buttons when waiting for user */}
        {waitingForUserChoice && (
          <Card className="bg-[hsl(240,45%,8%)]/90 backdrop-blur-xl border-[hsl(270,60%,50%)]/40 mb-4">
            <div className="p-6">
              <p className="text-center text-xl text-[hsl(40,20%,95%)] mb-6 font-bold">
                ⚖️ Bạn đồng ý với quan điểm của ai hơn?
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => handleChoice("philosopher1")}
                  className="bg-gradient-to-r from-[hsl(270,60%,50%)] to-[hsl(270,60%,60%)] hover:from-[hsl(270,60%,55%)] hover:to-[hsl(270,60%,65%)] text-white px-8 py-6 text-lg"
                >
                  <img
                    src={philosopher1.avatar}
                    alt={philosopher1.name}
                    className="w-8 h-8 rounded-full mr-3 border-2 border-white"
                  />
                  {philosopher1.name}
                </Button>

                <Button
                  onClick={() => handleChoice("philosopher2")}
                  className="bg-gradient-to-r from-[hsl(220,70%,55%)] to-[hsl(220,70%,65%)] hover:from-[hsl(220,70%,60%)] hover:to-[hsl(220,70%,70%)] text-white px-8 py-6 text-lg"
                >
                  <img
                    src={philosopher2.avatar}
                    alt={philosopher2.name}
                    className="w-8 h-8 rounded-full mr-3 border-2 border-white"
                  />
                  {philosopher2.name}
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Input area */}
        {!waitingForUserChoice && !isProcessing && (
          <Card className="bg-[hsl(240,45%,8%)]/90 backdrop-blur-xl border-[hsl(270,60%,50%)]/40">
            <div className="p-4">
              <div className="flex gap-4">
                <Textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleUserQuestion();
                    }
                  }}
                  placeholder="Đặt câu hỏi để hai triết gia tranh luận..."
                  className="flex-1 bg-[hsl(240,45%,10%)]/60 border-[hsl(270,60%,50%)]/30 text-[hsl(40,20%,95%)] min-h-[100px]"
                  disabled={isProcessing}
                />

                <Button
                  onClick={handleUserQuestion}
                  disabled={!userInput.trim() || isProcessing}
                  className="bg-gradient-to-r from-[hsl(270,60%,50%)] to-[hsl(220,70%,55%)] hover:from-[hsl(270,60%,60%)] hover:to-[hsl(220,70%,65%)] text-white px-6"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>

              <p className="text-xs text-[hsl(40,20%,95%)]/50 mt-2">
                💡 Mẹo: Đặt câu hỏi về chủ đề mà hai triết gia có quan điểm khác
                nhau để cuộc tranh luận trở nên sôi nổi hơn!
              </p>
            </div>
          </Card>
        )}
      </div>

      <style>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PhilosopherDebate;
