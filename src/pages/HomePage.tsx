import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Users, Zap, Plane } from "lucide-react";
import Navigation from "@/components/Navigation";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-gradient-to-r from-pilot-blue to-pilot-sky shadow-pilot animate-float">
                <Plane className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pilot-blue via-pilot-sky to-pilot-deep bg-clip-text text-transparent">
              TaskPilot
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Navigate your productivity with precision. Take control of your tasks and pilot your way to success.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-pilot-blue to-pilot-deep shadow-pilot hover:shadow-hover transition-all duration-300 text-lg px-8 py-6"
            >
              <Link to="/tasks">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-pilot-blue text-pilot-blue hover:bg-pilot-blue/10 text-lg px-8 py-6"
            >
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose TaskPilot?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built for productivity enthusiasts who demand excellence in task management
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: CheckCircle,
              title: "Smart Task Management",
              description: "Effortlessly create, edit, and organize your tasks with an intuitive interface designed for speed."
            },
            {
              icon: Zap,
              title: "Lightning Fast",
              description: "Experience instant task updates with local storage that keeps your data safe and accessible offline."
            },
            {
              icon: Users,
              title: "User-Centric Design",
              description: "Every feature is crafted with user experience in mind, making task management a joy, not a chore."
            }
          ].map((feature, index) => (
            <Card 
              key={index} 
              className="shadow-card hover:shadow-hover transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="flex justify-center">
                  <div className="p-3 rounded-full bg-gradient-to-r from-pilot-blue/10 to-pilot-sky/10">
                    <feature.icon className="h-8 w-8 text-pilot-blue" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="shadow-card bg-gradient-to-r from-pilot-blue to-pilot-deep text-white animate-slide-up">
          <CardContent className="p-12 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Take Flight?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join thousands of users who have transformed their productivity with TaskPilot. Start your journey today.
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-white text-pilot-blue hover:bg-white/90 text-lg px-8 py-6"
            >
              <Link to="/tasks">
                Start Managing Tasks
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default HomePage;