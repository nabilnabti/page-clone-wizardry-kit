
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ListTodo, Calendar, Check, Plus, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CleaningTaskRotation } from "./CleaningTaskRotation";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCleaningTasksByProperty, addCleaningTask, updateCleaningTask } from "@/services/cleaningService";
import { getTenantsByProperty } from "@/services/tenantService";
import { CleaningTask } from "@/types";

export function PropertyTasks({ propertyId }: { propertyId?: string }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskAssignee, setNewTaskAssignee] = useState("");

  const { data: tasks = [], isLoading: isLoadingTasks } = useQuery({
    queryKey: ['cleaningTasks', propertyId],
    queryFn: () => getCleaningTasksByProperty(propertyId || ''),
    enabled: !!propertyId
  });

  const { data: tenants = [], isLoading: isLoadingTenants } = useQuery({
    queryKey: ['tenants', propertyId],
    queryFn: () => getTenantsByProperty(propertyId || ''),
    enabled: !!propertyId
  });

  const pendingTasks = tasks.filter(task => task.status === "pending");
  const completedTasks = tasks.filter(task => task.status === "completed");

  const addTaskMutation = useMutation({
    mutationFn: (newTask: any) => addCleaningTask(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cleaningTasks', propertyId] });
      toast({
        title: "Tâche ajoutée",
        description: "La nouvelle tâche a été ajoutée avec succès."
      });
      setIsAddTaskOpen(false);
      resetForm();
    },
    onError: (error) => {
      console.error("Error adding task:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la tâche.",
        variant: "destructive"
      });
    }
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ taskId, updates }: { taskId: string; updates: any }) => 
      updateCleaningTask(taskId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cleaningTasks', propertyId] });
      toast({
        title: "Tâche terminée",
        description: "La tâche a été marquée comme terminée."
      });
    },
    onError: (error) => {
      console.error("Error updating task:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la tâche.",
        variant: "destructive"
      });
    }
  });

  const resetForm = () => {
    setNewTaskTitle("");
    setNewTaskDescription("");
    setNewTaskAssignee("");
  };

  const handleAddTask = () => {
    if (!newTaskTitle || !newTaskAssignee) {
      toast({
        title: "Champs manquants",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    const assignedTenant = tenants.find(tenant => tenant.name === newTaskAssignee);

    const newTask = {
      title: newTaskTitle,
      description: newTaskDescription,
      assignedTo: newTaskAssignee,
      assignedTenantId: assignedTenant?.id || "",
      propertyId: propertyId || "",
      date: new Date().toISOString(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: "pending" as const
    };

    addTaskMutation.mutate(newTask);
  };

  const handleMarkAsCompleted = (taskId: string) => {
    updateTaskMutation.mutate({
      taskId,
      updates: { status: "completed", completedAt: new Date().toISOString() }
    });
  };

  if (isLoadingTasks || isLoadingTenants) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-[#7FD1C7]" />
      </div>
    );
  }

  return (
    <div>
      <Tabs defaultValue="current" className="space-y-4">
        <TabsList className="bg-[#2A3544]">
          <TabsTrigger value="current" className="data-[state=active]:bg-[#7FD1C7] data-[state=active]:text-[#1A2533]">
            <ListTodo className="h-4 w-4 mr-2" />
            Tâches actuelles
          </TabsTrigger>
          <TabsTrigger value="rotation" className="data-[state=active]:bg-[#7FD1C7] data-[state=active]:text-[#1A2533]">
            <Calendar className="h-4 w-4 mr-2" />
            Rotation des tâches
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="current">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Tâches de nettoyage</h2>
            
            <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#7FD1C7] hover:bg-[#6BC0B6] text-[#1A2533]">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une tâche
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>Ajouter une nouvelle tâche</DialogTitle>
                  <DialogDescription>
                    Créez une nouvelle tâche de nettoyage pour cette propriété.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="task-name">Titre de la tâche</Label>
                    <Input
                      id="task-name"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      placeholder="Ex: Nettoyage de la cuisine"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="task-description">Description</Label>
                    <Input
                      id="task-description"
                      value={newTaskDescription}
                      onChange={(e) => setNewTaskDescription(e.target.value)}
                      placeholder="Détails sur la tâche à effectuer"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="task-assignee">Assigné à</Label>
                    <select
                      id="task-assignee"
                      value={newTaskAssignee}
                      onChange={(e) => setNewTaskAssignee(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="">Sélectionner un locataire</option>
                      {tenants.map((tenant) => (
                        <option key={tenant.id} value={tenant.name}>
                          {tenant.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button 
                    onClick={handleAddTask} 
                    className="bg-[#7FD1C7] hover:bg-[#6BC0B6] text-[#1A2533]"
                    disabled={addTaskMutation.isPending}
                  >
                    {addTaskMutation.isPending ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : null}
                    Ajouter la tâche
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-white mb-3">Tâches en attente ({pendingTasks.length})</h3>
            {pendingTasks.length === 0 ? (
              <Card className="p-4 bg-[#242E3E] border-none shadow-md">
                <div className="text-center py-6 text-gray-400">
                  <ListTodo className="mx-auto h-10 w-10 mb-2 opacity-50" />
                  <p>Aucune tâche en attente</p>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pendingTasks.map((task) => (
                  <Card key={task.id} className="p-4 bg-[#242E3E] border-none shadow-md">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium text-white">{task.title}</h4>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleMarkAsCompleted(task.id)}
                        disabled={updateTaskMutation.isPending}
                      >
                        {updateTaskMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin text-[#7FD1C7]" />
                        ) : (
                          <Check className="h-4 w-4 text-[#7FD1C7]" />
                        )}
                      </Button>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{task.description}</p>
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center text-gray-400">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(task.dueDate || task.date).toLocaleDateString()}
                      </div>
                      <span className="text-[#7FD1C7]">{task.assignedTo}</span>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
          
          {completedTasks.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-white mb-3">Tâches terminées ({completedTasks.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {completedTasks.map((task) => (
                  <Card key={task.id} className="p-4 bg-[#242E3E] border-none shadow-md opacity-70">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium text-white line-through">{task.title}</h4>
                      <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Check className="h-3 w-3 text-green-500" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{task.description}</p>
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center text-gray-400">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(task.dueDate || task.date).toLocaleDateString()}
                      </div>
                      <span className="text-gray-400">{task.assignedTo}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="rotation">
          <CleaningTaskRotation propertyId={propertyId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
