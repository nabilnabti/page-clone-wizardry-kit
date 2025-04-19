import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, ListTodo, RotateCw, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const cleaningTasks = [
  {
    id: 1,
    property: "123 Main Street",
    tenant: "Thomas Wilson",
    room: "Room 1",
    task: "Kitchen & Common Areas",
    date: "April 26, 2025",
    status: "Upcoming",
  },
  {
    id: 2,
    property: "456 Park Avenue",
    tenant: "Sarah Johnson",
    room: "Room 3",
    task: "Bathroom & Hallway",
    date: "May 10, 2025",
    status: "Upcoming",
  },
  {
    id: 3,
    property: "789 Beach Road",
    tenant: "Michael Brown",
    room: "Room 2",
    task: "Living Room & Dining",
    date: "May 24, 2025",
    status: "Completed",
  },
];

const rotationSchedules = [
  {
    id: 1,
    property: "123 Main Street",
    frequency: "Hebdomadaire",
    nextRotation: "April 29, 2025",
    tenantsCount: 2,
    tasksCount: 3,
    active: true
  },
  {
    id: 2,
    property: "456 Park Avenue",
    frequency: "Mensuelle",
    nextRotation: "May 1, 2025",
    tenantsCount: 3,
    tasksCount: 4,
    active: true
  },
  {
    id: 3,
    property: "789 Beach Road",
    frequency: "Hebdomadaire",
    nextRotation: "April 29, 2025",
    tenantsCount: 3,
    tasksCount: 5,
    active: false
  },
];

export default function CleaningTasks() {
  const [propertyFilter, setPropertyFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isNewRotationDialogOpen, setIsNewRotationDialogOpen] = useState(false);
  
  const filteredTasks = cleaningTasks.filter(task => {
    if (propertyFilter !== "all" && task.property !== propertyFilter) return false;
    if (statusFilter !== "all" && task.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-white mb-6">Gestion des tâches ménagères</h1>

      <Tabs defaultValue="tasks" className="space-y-6">
        <TabsList className="bg-[#242E3E]">
          <TabsTrigger value="tasks" className="data-[state=active]:bg-[#7FD1C7] data-[state=active]:text-[#1A2533]">
            <ListTodo className="h-4 w-4 mr-2" />
            Tâches de nettoyage
          </TabsTrigger>
          <TabsTrigger value="rotations" className="data-[state=active]:bg-[#7FD1C7] data-[state=active]:text-[#1A2533]">
            <RotateCw className="h-4 w-4 mr-2" />
            Rotations
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="tasks">
          <Card className="bg-white p-6">
            <div className="flex flex-wrap gap-4 mb-6">
              <Select value={propertyFilter} onValueChange={setPropertyFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filtrer par propriété" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les propriétés</SelectItem>
                  <SelectItem value="123 Main Street">123 Main Street</SelectItem>
                  <SelectItem value="456 Park Avenue">456 Park Avenue</SelectItem>
                  <SelectItem value="789 Beach Road">789 Beach Road</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="Upcoming">À venir</SelectItem>
                  <SelectItem value="Completed">Terminées</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Propriété</TableHead>
                    <TableHead>Locataire</TableHead>
                    <TableHead>Chambre</TableHead>
                    <TableHead>Tâche</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{task.property}</TableCell>
                      <TableCell>{task.tenant}</TableCell>
                      <TableCell>{task.room}</TableCell>
                      <TableCell>{task.task}</TableCell>
                      <TableCell>{task.date}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            task.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {task.status === "Completed" ? "Terminée" : "À venir"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="rotations">
          <Card className="bg-white p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">Systèmes de rotation</h2>
              <Dialog open={isNewRotationDialogOpen} onOpenChange={setIsNewRotationDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#7FD1C7] hover:bg-[#6BC0B6] text-[#1A2533]">
                    <Plus className="h-4 w-4 mr-2" />
                    Nouvelle rotation
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Créer une nouvelle rotation de tâches</DialogTitle>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Propriété</TableHead>
                    <TableHead>Fréquence</TableHead>
                    <TableHead>Prochaine rotation</TableHead>
                    <TableHead>Locataires</TableHead>
                    <TableHead>Tâches</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rotationSchedules.map((rotation) => (
                    <TableRow key={rotation.id}>
                      <TableCell>{rotation.property}</TableCell>
                      <TableCell>{rotation.frequency}</TableCell>
                      <TableCell>{rotation.nextRotation}</TableCell>
                      <TableCell>{rotation.tenantsCount}</TableCell>
                      <TableCell>{rotation.tasksCount}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            rotation.active
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {rotation.active ? "Actif" : "Désactivé"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <RotateCw className="h-4 w-4 mr-1" />
                          Tourner
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
