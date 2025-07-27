import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import TaskCard, { Task } from "@/components/TaskCard";
import AddTaskForm from "@/components/AddTaskForm";
import { CheckCircle, Circle, ListTodo, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { toast } = useToast();

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("taskpilot-tasks");
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        setTasks(parsedTasks.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt)
        })));
      } catch (error) {
        console.error("Error loading tasks:", error);
        toast({
          title: "Error",
          description: "Failed to load saved tasks",
          variant: "destructive",
        });
      }
    }
  }, [toast]);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("taskpilot-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask: Omit<Task, "id" | "createdAt">) => {
    const task: Task = {
      ...newTask,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setTasks(prev => [task, ...prev]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(prev => 
      prev.map(task => task.id === updatedTask.id ? updatedTask : task)
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const clearCompleted = () => {
    const completedCount = tasks.filter(task => task.completed).length;
    setTasks(prev => prev.filter(task => !task.completed));
    toast({
      title: "Completed tasks cleared",
      description: `Removed ${completedCount} completed tasks`,
    });
  };

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pilot-blue to-pilot-sky bg-clip-text text-transparent">
            Task Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your tasks and track your progress
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-up">
          <Card className="shadow-card">
            <CardContent className="p-4 flex items-center space-x-3">
              <div className="p-2 rounded-full bg-pilot-blue/10">
                <ListTodo className="h-5 w-5 text-pilot-blue" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Tasks</p>
                <p className="text-2xl font-bold">{tasks.length}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-4 flex items-center space-x-3">
              <div className="p-2 rounded-full bg-pilot-sky/10">
                <Circle className="h-5 w-5 text-pilot-sky" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{pendingTasks.length}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-4 flex items-center space-x-3">
              <div className="p-2 rounded-full bg-green-500/10">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{completedTasks.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Task Form */}
        <div className="max-w-2xl mx-auto">
          <AddTaskForm onAdd={addTask} />
        </div>

        {/* Tasks List */}
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="all" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <TabsList className="grid w-full sm:w-auto grid-cols-3">
                <TabsTrigger value="all" className="flex items-center space-x-2">
                  <ListTodo className="h-4 w-4" />
                  <span>All</span>
                  <Badge variant="secondary" className="ml-1">{tasks.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="pending" className="flex items-center space-x-2">
                  <Circle className="h-4 w-4" />
                  <span>Pending</span>
                  <Badge variant="secondary" className="ml-1">{pendingTasks.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="completed" className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Done</span>
                  <Badge variant="secondary" className="ml-1">{completedTasks.length}</Badge>
                </TabsTrigger>
              </TabsList>

              {completedTasks.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCompleted}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Completed
                </Button>
              )}
            </div>

            <TabsContent value="all" className="space-y-4">
              {tasks.length === 0 ? (
                <Card className="shadow-card">
                  <CardContent className="p-12 text-center space-y-4">
                    <div className="flex justify-center">
                      <ListTodo className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold">No tasks yet</h3>
                    <p className="text-muted-foreground">
                      Create your first task to get started on your productivity journey!
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onUpdate={updateTask}
                      onDelete={deleteTask}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              {pendingTasks.length === 0 ? (
                <Card className="shadow-card">
                  <CardContent className="p-12 text-center space-y-4">
                    <div className="flex justify-center">
                      <CheckCircle className="h-12 w-12 text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold">All caught up!</h3>
                    <p className="text-muted-foreground">
                      No pending tasks. Great job staying on top of things!
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {pendingTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onUpdate={updateTask}
                      onDelete={deleteTask}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {completedTasks.length === 0 ? (
                <Card className="shadow-card">
                  <CardContent className="p-12 text-center space-y-4">
                    <div className="flex justify-center">
                      <Circle className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold">No completed tasks</h3>
                    <p className="text-muted-foreground">
                      Completed tasks will appear here. Start completing some tasks!
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {completedTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onUpdate={updateTask}
                      onDelete={deleteTask}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;