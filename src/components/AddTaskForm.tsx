import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Task } from "./TaskCard";

interface AddTaskFormProps {
  onAdd: (task: Omit<Task, "id" | "createdAt">) => void;
}

const AddTaskForm = ({ onAdd }: AddTaskFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a task title",
        variant: "destructive",
      });
      return;
    }

    onAdd({
      title: title.trim(),
      description: description.trim(),
      completed: false,
    });

    setTitle("");
    setDescription("");
    setIsExpanded(false);
    
    toast({
      title: "Success",
      description: "Task added successfully!",
    });
  };

  return (
    <Card className="shadow-card hover:shadow-hover transition-all duration-300 animate-slide-up">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Plus className="h-5 w-5 text-primary" />
          <span>Add New Task</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            onFocus={() => setIsExpanded(true)}
            className="font-medium"
          />
          
          {isExpanded && (
            <div className="space-y-4 animate-slide-up">
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description (optional)"
                className="min-h-[80px] resize-none"
              />
              <div className="flex space-x-2">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-pilot-blue to-pilot-deep shadow-pilot hover:shadow-hover transition-all duration-300"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsExpanded(false);
                    setTitle("");
                    setDescription("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default AddTaskForm;