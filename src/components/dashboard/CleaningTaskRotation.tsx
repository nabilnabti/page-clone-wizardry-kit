
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RotateCw, CalendarDays, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data - in a real app this would come from an API
const tenantsByProperty = {
  "1": [
    { id: 1, name: "Thomas Martin" },
    { id: 2, name: "Sarah Johnson" },
  ],
  "2": [
    { id: 3, name: "Michael Brown" },
    { id: 4, name: "Emma Wilson" },
    { id: 5, name: "David Lee" },
  ],
  "3": [
    { id: 6, name: "Nina Garcia" },
    { id: 7, name: "Alex Chen" },
    { id: 8, name: "Laura Smith" },
  ]
};

const taskTypes = [
  "Nettoyage de la cuisine",
  "Nettoyage des salles de bain",
  "Nettoyage du salon",
  "Sortir les poubelles",
  "Nettoyage des espaces communs",
  "Nettoyage du jardin",
];

export function CleaningTaskRotation({ propertyId }: { propertyId: string }) {
  const [rotationFrequency, setRotationFrequency] = useState<"weekly" | "monthly">("weekly");
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const { toast } = useToast();

  const tenants = tenantsByProperty[propertyId] || [];
  
  // Tâches actuelles pour cette propriété (mock)
  const currentRotation = {
    frequency: rotationFrequency,
    startDate: "April 24, 2025",
    tasks: [
      { id: 1, name: "Nettoyage de la cuisine", assignedTo: "Thomas Martin", nextRotation: "May 1, 2025" },
      { id: 2, name: "Nettoyage des salles de bain", assignedTo: "Sarah Johnson", nextRotation: "May 1, 2025" },
      { id: 3, name: "Sortir les poubelles", assignedTo: "Thomas Martin", nextRotation: "April 24, 2025" },
    ]
  };

  const handleAddTask = () => {
    if (!newTaskName) return;
    
    // Dans une application réelle, nous enverrions ces données à l'API
    toast({
      title: "Tâche ajoutée",
      description: `"${newTaskName}" a été ajoutée au roulement.`,
    });
    
    setNewTaskName("");
    setNewTaskDescription("");
    setIsTaskDialogOpen(false);
  };

  const handleRotationChange = (value: string) => {
    setRotationFrequency(value as "weekly" | "monthly");
    
    toast({
      title: "Fréquence mise à jour",
      description: `La rotation des tâches est maintenant ${value === "weekly" ? "hebdomadaire" : "mensuelle"}.`,
    });
  };

  const handleManualRotation = () => {
    toast({
      title: "Rotation effectuée",
      description: "Les tâches ont été réassignées aux locataires.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Rotation des tâches ménagères</h2>
        <div className="flex space-x-2">
          <Select value={rotationFrequency} onValueChange={handleRotationChange}>
            <SelectTrigger className="w-[180px] bg-[#242E3E] text-white border-gray-700">
              <SelectValue placeholder="Fréquence" />
            </SelectTrigger>
            <SelectContent className="bg-[#242E3E] text-white border-gray-700">
              <SelectItem value="weekly">Hebdomadaire</SelectItem>
              <SelectItem value="monthly">Mensuelle</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            className="bg-[#242E3E] text-white border-gray-700 hover:bg-[#2A3544]"
            onClick={handleManualRotation}
          >
            <RotateCw className="h-4 w-4 mr-2" />
            Rotation manuelle
          </Button>
          
          <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#7FD1C7] hover:bg-[#6BC0B6] text-[#1A2533]">
                Ajouter une tâche
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle>Ajouter une nouvelle tâche</DialogTitle>
                <DialogDescription>
                  Cette tâche sera ajoutée à la rotation pour tous les locataires.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="task-name">Nom de la tâche</Label>
                  <Select onValueChange={setNewTaskName}>
                    <SelectTrigger id="task-name">
                      <SelectValue placeholder="Sélectionner une tâche" />
                    </SelectTrigger>
                    <SelectContent>
                      {taskTypes.map((task) => (
                        <SelectItem key={task} value={task}>
                          {task}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="task-description">Description (optionnelle)</Label>
                  <Input
                    id="task-description"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    placeholder="Détails sur la tâche à effectuer"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button onClick={handleAddTask} className="bg-[#7FD1C7] hover:bg-[#6BC0B6] text-[#1A2533]">
                  Ajouter à la rotation
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Card className="bg-[#242E3E] border-none shadow-md">
        <CardContent className="pt-6">
          <div className="flex items-center mb-4 text-gray-300">
            <CalendarDays className="h-5 w-5 mr-2 text-[#7FD1C7]" />
            <span>Prochaine rotation: {rotationFrequency === "weekly" ? "Chaque dimanche" : "Le 1er du mois"}</span>
            <span className="mx-2">•</span>
            <span>Début: {currentRotation.startDate}</span>
          </div>
          
          <div className="flex items-center mb-4 text-gray-300">
            <Users className="h-5 w-5 mr-2 text-[#7FD1C7]" />
            <span>Participants: {tenants.map(t => t.name).join(", ")}</span>
          </div>
          
          <div className="space-y-4 mt-6">
            <h3 className="text-lg font-medium text-white">Assignation actuelle</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentRotation.tasks.map((task) => (
                <Card key={task.id} className="bg-[#2A3544] border-none shadow-sm">
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-white">{task.name}</h4>
                        <p className="text-sm text-gray-400 mt-1">Assigné à: <span className="text-[#7FD1C7]">{task.assignedTo}</span></p>
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <RotateCw className="h-3 w-3 mr-1" />
                        {task.nextRotation}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
