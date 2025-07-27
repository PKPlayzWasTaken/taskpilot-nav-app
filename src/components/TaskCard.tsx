import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit2, Trash2, Check, X, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

interface TaskCardProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskCard = ({ task, onUpdate, onDelete }: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const { toast } = useToast();

  const handleSave = () => {
    if (!editTitle.trim()) {
      toast({
        title: "Error",
        description: "Task title cannot be empty",
        variant: "destructive",
      });
      return;
    }

    onUpdate({
      ...task,
      title: editTitle.trim(),
      description: editDescription.trim(),
    });
    setIsEditing(false);
    toast({
      title: "Success",
      description: "Task updated successfully",
    });
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(false);
  };

  const toggleComplete = () => {
    onUpdate({ ...task, completed: !task.completed });
    toast({
      title: task.completed ? "Task marked incomplete" : "Task completed!",
      description: task.completed ? "Keep working on it" : "Great job!",
    });
  };

  const handleDelete = () => {
    onDelete(task.id);
    toast({
      title: "Task deleted",
      description: "Task has been removed successfully",
    });
  };

  return (
    <Card className={`transition-all duration-300 hover:shadow-card animate-slide-up ${
      task.completed ? "opacity-75 bg-muted/50" : "hover:shadow-hover"
    }`}>
      <CardContent className="p-4">
        {isEditing ? (
          <div className="space-y-3">
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Task title"
              className="font-medium"
            />
            <Textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Task description (optional)"
              className="min-h-[80px] resize-none"
            />
          </div>
        ) : (
          <div className="space-y-2">
            <h3 className={`font-medium text-lg ${
              task.completed ? "line-through text-muted-foreground" : ""
            }`}>
              {task.title}
            </h3>
            {task.description && (
              <p className={`text-sm ${
                task.completed ? "line-through text-muted-foreground" : "text-muted-foreground"
              }`}>
                {task.description}
              </p>
            )}
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              {new Date(task.createdAt).toLocaleDateString()}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button
          variant={task.completed ? "outline" : "default"}
          size="sm"
          onClick={toggleComplete}
          className={task.completed ? "" : "bg-gradient-to-r from-pilot-sky to-pilot-blue"}
        >
          <Check className="h-4 w-4 mr-1" />
          {task.completed ? "Undo" : "Complete"}
        </Button>

        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                onClick={handleSave}
                className="bg-gradient-to-r from-pilot-blue to-pilot-deep"
              >
                <Check className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;