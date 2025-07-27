import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { 
  Plane, 
  Target, 
  Zap, 
  Shield, 
  Users, 
  Code, 
  Smartphone,
  Cloud
} from "lucide-react";

const AboutPage = () => {
  const features = [
    {
      icon: Target,
      title: "Focused Design",
      description: "Clean, distraction-free interface that helps you focus on what matters most."
    },
    {
      icon: Zap,
      title: "Lightning Performance",
      description: "Built with modern web technologies for instant responsiveness and smooth interactions."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data stays on your device with local storage. No servers, no tracking, complete privacy."
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description: "Works seamlessly across all devices - desktop, tablet, and mobile."
    }
  ];

  const technologies = [
    { name: "React", description: "Modern UI framework" },
    { name: "TypeScript", description: "Type-safe development" },
    { name: "Tailwind CSS", description: "Utility-first styling" },
    { name: "LocalStorage", description: "Client-side persistence" },
    { name: "Vite", description: "Fast build tooling" },
    { name: "Lucide Icons", description: "Beautiful iconography" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6 animate-fade-in">
          <div className="flex justify-center">
            <div className="p-6 rounded-full bg-gradient-to-r from-pilot-blue to-pilot-sky shadow-pilot animate-float">
              <Plane className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pilot-blue to-pilot-sky bg-clip-text text-transparent">
            About TaskPilot
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            TaskPilot is more than just a task manager—it's your productivity co-pilot. 
            Designed with aviation-inspired precision and elegance, TaskPilot helps you 
            navigate through your daily tasks with confidence and style.
          </p>
        </section>

        {/* Mission Section */}
        <section className="max-w-4xl mx-auto">
          <Card className="shadow-card animate-slide-up">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl flex items-center justify-center space-x-2">
                <Target className="h-6 w-6 text-pilot-blue" />
                <span>Our Mission</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe productivity should be elegant, not overwhelming. TaskPilot strips away 
                the complexity of traditional task management tools, offering a clean, intuitive 
                experience that adapts to your workflow rather than forcing you to adapt to it.
              </p>
              <div className="flex flex-wrap justify-center gap-2 pt-4">
                <Badge variant="secondary" className="text-sm">Simplicity</Badge>
                <Badge variant="secondary" className="text-sm">Performance</Badge>
                <Badge variant="secondary" className="text-sm">Privacy</Badge>
                <Badge variant="secondary" className="text-sm">Accessibility</Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Features Grid */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Why TaskPilot?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built with attention to detail and user experience in mind
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="shadow-card hover:shadow-hover transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-full bg-gradient-to-r from-pilot-blue/10 to-pilot-sky/10">
                      <feature.icon className="h-6 w-6 text-pilot-blue" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Technology Stack */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Built with Modern Technology</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Leveraging cutting-edge web technologies for optimal performance
            </p>
          </div>
          
          <Card className="shadow-card max-w-4xl mx-auto animate-slide-up">
            <CardHeader className="text-center pb-4">
              <CardTitle className="flex items-center justify-center space-x-2">
                <Code className="h-5 w-5 text-pilot-blue" />
                <span>Technology Stack</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {technologies.map((tech, index) => (
                  <div 
                    key={index} 
                    className="p-4 rounded-lg border bg-gradient-card hover:shadow-card transition-all duration-300"
                  >
                    <h4 className="font-semibold text-pilot-blue">{tech.name}</h4>
                    <p className="text-sm text-muted-foreground">{tech.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Privacy & Data */}
        <section className="max-w-4xl mx-auto">
          <Card className="shadow-card bg-gradient-to-r from-pilot-blue/5 to-pilot-sky/5 animate-slide-up">
            <CardContent className="p-8 text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-gradient-to-r from-pilot-blue to-pilot-sky shadow-pilot">
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold">Privacy First</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                TaskPilot respects your privacy. All your tasks are stored locally on your device using 
                browser localStorage. No data is sent to external servers, no accounts required, 
                and no tracking. Your productivity data remains completely private and under your control.
              </p>
              <div className="flex justify-center space-x-6 pt-4">
                <div className="flex items-center space-x-2 text-green-600">
                  <Shield className="h-5 w-5" />
                  <span className="font-medium">Local Storage</span>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <Users className="h-5 w-5" />
                  <span className="font-medium">No Account Required</span>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <Cloud className="h-5 w-5" />
                  <span className="font-medium">Offline Capable</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;