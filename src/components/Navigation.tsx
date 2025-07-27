import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plane } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/tasks", label: "Tasks" },
    { path: "/about", label: "About" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="flex items-center space-x-2 p-2 rounded-lg transition-all duration-300 group-hover:bg-primary/10">
              <Plane className="h-6 w-6 text-primary group-hover:animate-float" />
              <span className="text-xl font-bold bg-gradient-to-r from-pilot-blue to-pilot-sky bg-clip-text text-transparent">
                TaskPilot
              </span>
            </div>
          </Link>

          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  asChild
                  className={`transition-all duration-300 ${
                    isActive 
                      ? "bg-gradient-to-r from-pilot-blue to-pilot-deep shadow-pilot" 
                      : "hover:bg-primary/10"
                  }`}
                >
                  <Link to={item.path}>{item.label}</Link>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;