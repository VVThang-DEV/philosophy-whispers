import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles } from "lucide-react";

interface Philosopher {
  id: string;
  name: string;
  era: string;
  description: string;
  avatar: string;
}

const philosophers: Philosopher[] = [
  {
    id: "socrates",
    name: "Socrates",
    era: "470-399 BCE",
    description: "The father of Western philosophy, master of dialogue and questioning.",
    avatar: "🧙‍♂️"
  },
  {
    id: "nietzsche",
    name: "Friedrich Nietzsche",
    era: "1844-1900",
    description: "Champion of individual will, critic of morality and religion.",
    avatar: "🦅"
  },
  {
    id: "confucius",
    name: "Confucius",
    era: "551-479 BCE",
    description: "Chinese philosopher emphasizing morality, family, and social harmony.",
    avatar: "🏮"
  },
  {
    id: "simone",
    name: "Simone de Beauvoir",
    era: "1908-1986",
    description: "Existentialist philosopher and pioneer of feminist philosophy.",
    avatar: "🌹"
  },
];

interface Message {
  role: "user" | "assistant";
  content: string;
}

const PhilosopherChat = () => {
  const [selectedPhilosopher, setSelectedPhilosopher] = useState<Philosopher | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectPhilosopher = (philosopher: Philosopher) => {
    setSelectedPhilosopher(philosopher);
    setMessages([
      {
        role: "assistant",
        content: `Greetings. I am ${philosopher.name}. What philosophical questions weigh upon your mind?`
      }
    ]);
  };

  const handleSend = async () => {
    if (!input.trim() || !selectedPhilosopher) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response (in real implementation, this would call your AI API)
    setTimeout(() => {
      const responses: Record<string, string[]> = {
        socrates: [
          "Tell me, what do you know about this matter? Let us examine it together through questioning.",
          "I know that I know nothing. But perhaps through dialogue, we can uncover truth.",
          "Rather than giving answers, let me ask you: What is the essence of what you seek?"
        ],
        nietzsche: [
          "One must have chaos within oneself to give birth to a dancing star.",
          "That which does not kill us makes us stronger. How does this apply to your question?",
          "God is dead, and we must become our own creators of values."
        ],
        confucius: [
          "The superior person understands what is right; the inferior person understands what will sell.",
          "It does not matter how slowly you go, as long as you do not stop.",
          "When we see persons of worth, we should think of equaling them."
        ],
        simone: [
          "One is not born, but rather becomes, a woman. How does this relate to your question?",
          "To be free is not merely to cast off one's chains, but to live in a way that respects and enhances the freedom of others.",
          "The fact that we are human beings is infinitely more important than all the peculiarities that distinguish humans from one another."
        ]
      };

      const philosopherResponses = responses[selectedPhilosopher.id] || ["Interesting question. Let us ponder this together."];
      const randomResponse = philosopherResponses[Math.floor(Math.random() * philosopherResponses.length)];

      setMessages(prev => [...prev, { role: "assistant", content: randomResponse }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="cosmic-bg min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-bold">
            CONVERSE WITH
            <br />
            <span className="text-emphasis glow-text">THE MASTERS</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose a philosopher and engage in <span className="text-emphasis">meaningful dialogue</span> powered by AI.
          </p>
        </div>

        {!selectedPhilosopher ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {philosophers.map((philosopher) => (
              <Card
                key={philosopher.id}
                className="bg-card/50 backdrop-blur-sm border-border hover:border-accent transition-all duration-300 cursor-pointer group overflow-hidden"
                onClick={() => handleSelectPhilosopher(philosopher)}
              >
                <div className="p-6 space-y-4">
                  <div className="text-6xl text-center group-hover:scale-110 transition-transform duration-300">
                    {philosopher.avatar}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-center group-hover:text-accent transition-colors">
                      {philosopher.name}
                    </h3>
                    <p className="text-sm text-muted-foreground text-center">{philosopher.era}</p>
                    <p className="text-sm text-center">{philosopher.description}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Begin Dialogue
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <Card className="bg-card/80 backdrop-blur-sm border-accent/50">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{selectedPhilosopher.avatar}</div>
                  <div>
                    <h3 className="text-2xl font-bold">{selectedPhilosopher.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedPhilosopher.era}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedPhilosopher(null);
                    setMessages([]);
                  }}
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                >
                  Change Philosopher
                </Button>
              </div>

              <ScrollArea className="h-[500px] p-6">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-4 rounded-lg ${
                          message.role === "user"
                            ? "bg-accent text-accent-foreground"
                            : "bg-secondary text-secondary-foreground"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-secondary text-secondary-foreground p-4 rounded-lg">
                        <span className="animate-pulse">Contemplating...</span>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="p-6 border-t border-border">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Ask your philosophical question..."
                    className="bg-background border-border"
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default PhilosopherChat;
