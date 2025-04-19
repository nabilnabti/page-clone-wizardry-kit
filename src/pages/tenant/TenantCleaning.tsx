
import { TenantLayout } from "@/components/tenant/TenantLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Check, Image } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

export default function TenantCleaning() {
  const [cleaningTasks, setCleaningTasks] = useState([
    { date: "April 26, 2025", task: "Kitchen & Common Areas", assigned: "Thomas", status: "Upcoming", photoUrl: null },
    { date: "May 10, 2025", task: "Bathroom & Hallway", assigned: "Thomas", status: "Upcoming", photoUrl: null },
    { date: "May 24, 2025", task: "Living Room & Dining", assigned: "Thomas", status: "Upcoming", photoUrl: null },
  ]);

  const [selectedTask, setSelectedTask] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate photo upload - in a real app, this would upload to a server
      const photoUrl = URL.createObjectURL(file);
      setCleaningTasks(tasks =>
        tasks.map((task, idx) =>
          idx === selectedTask
            ? { ...task, status: "Completed", photoUrl }
            : task
        )
      );
      setIsDialogOpen(false);
      toast({
        title: "Tâche validée",
        description: "La photo a bien été enregistrée comme preuve de nettoyage.",
      });
    }
  };

  return (
    <TenantLayout title="Cleaning Schedule" showBackButton>
      <div className="space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0 md:max-w-4xl">
        {cleaningTasks.map((task, index) => (
          <Card key={index} className="p-4 bg-white rounded-xl">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 flex items-center justify-center rounded-full ${
                task.status === "Completed" ? "bg-green-100" : "bg-[#7FD1C7]/10"
              }`}>
                <span className={task.status === "Completed" ? "text-green-500" : "text-[#7FD1C7]"}>
                  {task.date.split(",")[0].split(" ")[1]}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-medium">{task.task}</p>
                <p className="text-sm text-gray-500">{task.date}</p>
              </div>
              <Dialog open={isDialogOpen && selectedTask === index} onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (!open) setSelectedTask(null);
              }}>
                <DialogTrigger asChild>
                  {task.status === "Completed" ? (
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 rounded-full bg-green-100"
                    >
                      <Check className="h-4 w-4 text-green-600" />
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => setSelectedTask(index)}
                    >
                      <Camera className="h-4 w-4" />
                      Valider
                    </Button>
                  )}
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Valider le nettoyage</DialogTitle>
                    <DialogDescription>
                      Prenez une photo de la zone nettoyée pour valider la tâche.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <label 
                      htmlFor="photo-upload" 
                      className="cursor-pointer flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors"
                    >
                      <Image className="h-8 w-8 text-gray-400" />
                      <span className="text-sm text-gray-500">Cliquez pour ajouter une photo</span>
                      <Input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />
                    </label>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            {task.photoUrl && (
              <div className="mt-3">
                <img 
                  src={task.photoUrl} 
                  alt="Proof of cleaning" 
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
            )}
          </Card>
        ))}
      </div>
    </TenantLayout>
  );
}
