import { TenantLayout } from "@/components/tenant/TenantLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Check, Image } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { getTenantByUserId } from "@/services/tenantService";
import { getCleaningTasksByTenant, completeCleaningTask } from "@/services/cleaningService";
import { CleaningTask } from "@/types";

export default function TenantCleaning() {
  const [cleaningTasks, setCleaningTasks] = useState<CleaningTask[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchCleaningTasks = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        const tenant = await getTenantByUserId(user.uid);
        
        if (tenant) {
          const tasks = await getCleaningTasksByTenant(tenant.id);
          setCleaningTasks(tasks);
        } else {
          toast({
            title: "Erreur",
            description: "Impossible de trouver vos informations de locataire",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching cleaning tasks:", error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors du chargement des tâches de nettoyage",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCleaningTasks();
  }, [user, toast]);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedTaskId) {
      try {
        await completeCleaningTask(selectedTaskId, file);
        
        // Update local state
        setCleaningTasks(tasks =>
          tasks.map(task =>
            task.id === selectedTaskId
              ? { 
                  ...task, 
                  status: "completed", 
                  photoUrl: URL.createObjectURL(file),
                  completedAt: new Date().toISOString()
                }
              : task
          )
        );
        
        setIsDialogOpen(false);
        toast({
          title: "Tâche validée",
          description: "La photo a bien été enregistrée comme preuve de nettoyage.",
        });
      } catch (error) {
        console.error("Error uploading cleaning photo:", error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de l'envoi de la photo",
          variant: "destructive",
        });
      }
    }
  };

  if (isLoading) {
    return (
      <TenantLayout title="Cleaning Schedule" showBackButton>
        <div className="flex justify-center items-center h-64">
          <p className="text-white">Chargement des tâches de nettoyage...</p>
        </div>
      </TenantLayout>
    );
  }

  if (cleaningTasks.length === 0) {
    return (
      <TenantLayout title="Cleaning Schedule" showBackButton>
        <div className="flex justify-center items-center h-64">
          <p className="text-white">Aucune tâche de nettoyage n'est prévue.</p>
        </div>
      </TenantLayout>
    );
  }

  return (
    <TenantLayout title="Cleaning Schedule" showBackButton>
      <div className="space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0 md:max-w-4xl">
        {cleaningTasks.map((task) => (
          <Card key={task.id} className="p-4 bg-white rounded-xl">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 flex items-center justify-center rounded-full ${
                task.status === "completed" ? "bg-green-100" : "bg-[#7FD1C7]/10"
              }`}>
                <span className={task.status === "completed" ? "text-green-500" : "text-[#7FD1C7]"}>
                  {new Date(task.date).getDate()}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-medium">{task.task}</p>
                <p className="text-sm text-gray-500">{new Date(task.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <Dialog open={isDialogOpen && selectedTaskId === task.id} onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (!open) setSelectedTaskId(null);
              }}>
                <DialogTrigger asChild>
                  {task.status === "completed" ? (
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
                      onClick={() => setSelectedTaskId(task.id)}
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
