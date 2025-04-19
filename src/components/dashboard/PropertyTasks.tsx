
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ListTodo, Calendar, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CleaningTaskRotation } from "./CleaningTaskRotation";

// Mock data - in a real app this would come from an API
const tasksByProperty = {
  "1": [
    { 
      id: 1,
      title: "Nettoyage de la cuisine",
      description: "Nettoyer les équipements, les sols et les surfaces de la cuisine commune",
      assignedTo: "Thomas Martin",
      dueDate: "April 26, 2025",
      status: "pending"
    },
    { 
      id: 2,
      title: "Nettoyage des salles de bain",
      description: "Nettoyer les douches, lavabos et toilettes des salles de bain communes",
      assignedTo: "Sarah Johnson",
      dueDate: "April 28, 2025",
      status: "pending"
    },
    { 
      id: 3,
      title: "Sortir les poubelles",
      description: "Vider toutes les poubelles et les amener aux conteneurs",
      assignedTo: "Thomas Martin",
      dueDate: "April 24, 2025",
      status: "completed"
    },
  ],
  "2": [
    { 
      id: 4,
      title: "Nettoyage du salon",
      description: "Aspirer, dépoussiérer et ranger le salon commun",
      assignedTo: "Michael Brown",
      dueDate: "April 25, 2025",
      status: "pending"
    },
  ],
  "3": [
    { 
      id: 5,
      title: "Nettoyage de l'entrée",
      description: "Nettoyer le hall d'entrée et les escaliers",
      assignedTo: "Nina Garcia",
      dueDate: "April 27, 2025",
      status: "pending"
    },
    { 
      id: 6,
      title: "Nettoyage du balcon",
      description: "Nettoyer et ranger le balcon commun",
      assignedTo: "Alex Chen",
      dueDate: "April 30, 2025",
      status: "pending"
    },
    { 
      id: 7,
      title: "Entretien du jardin",
      description: "Tondre la pelouse et arroser les plantes",
      assignedTo: "Laura Smith",
      dueDate: "May 2, 2025",
      status: "pending"
    },
    { 
      id: 8,
      title: "Nettoyage machine à laver",
      description: "Nettoyer les filtres et l'intérieur des machines à laver",
      assignedTo: "Nina Garcia",
      dueDate: "April 22, 2025",
      status: "completed"
    },
  ]
};

export function PropertyTasks({ propertyId }: { propertyId: string }) {
  const tasks = tasksByProperty[propertyId] || [];
  const pendingTasks = tasks.filter(task => task.status === "pending");
  const completedTasks = tasks.filter(task => task.status === "completed");

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
            <Button className="bg-[#7FD1C7] hover:bg-[#6BC0B6] text-[#1A2533]">
              Ajouter une tâche
            </Button>
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
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Check className="h-4 w-4 text-[#7FD1C7]" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{task.description}</p>
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center text-gray-400">
                        <Calendar className="h-4 w-4 mr-1" />
                        {task.dueDate}
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
                        {task.dueDate}
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
