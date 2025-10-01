import { Card } from "@/components/ui/card";
import { BookOpen, Brain, Users, Lightbulb } from "lucide-react";

const ContentAnalysis = () => {
  const sections = [
    {
      icon: BookOpen,
      title: "The Phenomenon",
      content: "Despite social development and scientific progress, many people still believe in fortune-telling, spirituality, and charms. In difficult times, they are easily influenced by unfounded beliefs."
    },
    {
      icon: Brain,
      title: "Historical Materialism",
      content: "From the perspective of historical materialism, social consciousness is determined by social existence. Backward social conditions, inadequate education, and economic hardship create fertile ground for superstitious beliefs."
    },
    {
      icon: Users,
      title: "Social Influences",
      content: "The analysis must consider: backward social existence, crowd psychology, cultural traditions passed through generations, and the collective mindset that perpetuates such beliefs across communities."
    },
    {
      icon: Lightbulb,
      title: "Education & Critical Thinking",
      content: "The role of education and critical thinking is paramount in improving social awareness. Scientific literacy, philosophical reasoning, and evidence-based thinking help society progress beyond superstition."
    }
  ];

  return (
    <section className="cosmic-bg min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-bold">
            UNDERSTANDING
            <br />
            <span className="text-emphasis glow-text">SOCIAL CONSCIOUSNESS</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A <span className="text-emphasis">philosophical analysis</span> of belief systems and 
            the <span className="text-emphasis">evolution</span> of social awareness.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card
                key={index}
                className="bg-card/50 backdrop-blur-sm border-border hover:border-accent transition-all duration-300 group"
              >
                <div className="p-8 flex flex-col md:flex-row gap-6 items-start">
                  <div className="bg-accent/10 p-4 rounded-lg group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <h3 className="text-2xl font-bold group-hover:text-accent transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}

          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/50 mt-12">
            <div className="p-8 space-y-4">
              <h3 className="text-3xl font-bold text-center">
                <span className="text-emphasis">Critical Analysis Framework</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-accent">Key Factors</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Material conditions of existence</li>
                    <li>• Educational infrastructure</li>
                    <li>• Cultural heritage and traditions</li>
                    <li>• Economic development level</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-accent">Solutions</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Strengthen scientific education</li>
                    <li>• Promote critical thinking skills</li>
                    <li>• Improve social welfare systems</li>
                    <li>• Foster rational discourse</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContentAnalysis;
