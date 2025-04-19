import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  ListTodo, 
  ArrowLeft, 
  House, 
  Check, 
  Clock, 
  CalendarDays,
  Loader2,
  AlertCircle
} from "lucide-react";
import { PropertyTenants } from "@/components/dashboard/PropertyTenants";
import { PropertyTasks } from "@/components/dashboard/PropertyTasks";
import { useQuery } from "@tanstack/react-query";
import { getProperty } from "@/services/propertyService";
import { getTenantsByProperty } from "@/services/tenantService";
import { getCleaningTasksByProperty } from "@/services/cleaningService";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";

export default function PropertyDetail() {
  const { propertyId } = useParams<{ propertyId: string }>();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!propertyId) {
      toast({
        title: "Erreur",
        description: "ID de propriété non trouvé dans l'URL",
        variant: "destructive",
      });
      navigate("/dashboard");
    } else {
      localStorage.setItem('currentPropertyId', propertyId);
    }
  }, [propertyId, navigate]);
  
  const isPropertyIdValid = !!propertyId && propertyId !== "undefined" && propertyId !== "null";
  
  const { data: property, isLoading: isLoadingProperty, error: propertyError } = useQuery({
    queryKey: ['property', propertyId],
    queryFn: () => getProperty(propertyId || ''),
    enabled: isPropertyIdValid,
    retry: 1,
    meta: {
      onError: (error: any) => {
        console.error("Error fetching property:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les détails de la propriété",
          variant: "destructive",
        });
      }
    }
  });
  
  const { data: tenants = [], isLoading: isLoadingTenants } = useQuery({
    queryKey: ['tenants', propertyId],
    queryFn: () => getTenantsByProperty(propertyId || ''),
    enabled: isPropertyIdValid,
    retry: 1
  });
  
  const { data: cleaningTasks = [], isLoading: isLoadingTasks } = useQuery({
    queryKey: ['cleaningTasks', propertyId],
    queryFn: () => getCleaningTasksByProperty(propertyId || ''),
    enabled: isPropertyIdValid,
    retry: 1
  });

  const isLoading = isLoadingProperty || isLoadingTenants || isLoadingTasks;
  
  if (!isPropertyIdValid) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
          <h2 className="text-2xl font-semibold text-white mb-2">ID de propriété invalide</h2>
          <p className="text-gray-400 mb-4">L'identifiant de propriété est invalide ou manquant.</p>
          <Button onClick={() => navigate("/dashboard")}>
            Retour au Dashboard
          </Button>
        </div>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[300px]">
        <Loader2 className="h-8 w-8 animate-spin text-[#7FD1C7]" />
      </div>
    );
  }
  
  if (propertyError || !property) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
          <h2 className="text-2xl font-semibold text-white mb-2">Propriété non trouvée</h2>
          <p className="text-gray-400 mb-4">Nous n'avons pas pu trouver cette propriété.</p>
          <Button onClick={() => navigate("/dashboard")}>
            Retour au Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const currentOccupants = tenants.length;
  const totalRooms = property.rooms || 0;
  const vacantRooms = totalRooms - currentOccupants;
  const pendingTasks = cleaningTasks.filter(task => task.status === 'pending').length;
  const overduePayments = 0; // À implémenter avec les données réelles de paiement
  const upcomingCheckIns = 0; // À implémenter avec les données réelles d'arrivées

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          className="mr-2 text-gray-400"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
        </Button>
        <h1 className="text-2xl font-semibold text-white">{property.name}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-2">
              <House className="h-5 w-5 text-[#7FD1C7]" />
              <h3 className="font-medium">Détails de la propriété</h3>
            </div>
            <p className="text-sm text-gray-500 mb-4">{property.address}</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-100 p-2 rounded">
                <p className="text-xs text-gray-500">Chambres</p>
                <p className="font-medium">{totalRooms}</p>
              </div>
              <div className="bg-gray-100 p-2 rounded">
                <p className="text-xs text-gray-500">Occupées</p>
                <p className="font-medium">{currentOccupants}/{totalRooms}</p>
              </div>
              <div className="bg-gray-100 p-2 rounded">
                <p className="text-xs text-gray-500">Disponibles</p>
                <p className="font-medium">{vacantRooms}</p>
              </div>
              <div className="bg-gray-100 p-2 rounded">
                <p className="text-xs text-gray-500">Paiements</p>
                <p className="font-medium">{overduePayments} en retard</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-4">
              <Check className="h-5 w-5 text-green-500" />
              <h3 className="font-medium">Tâches à nettoyer</h3>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Tâches restantes</span>
                <span className="font-medium">{pendingTasks}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-[#7FD1C7] h-2 rounded-full" 
                  style={{ width: `${pendingTasks > 0 ? (pendingTasks / (pendingTasks + 5)) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="h-5 w-5 text-blue-500" />
              <h3 className="font-medium">Activité récente</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <CalendarDays className="h-4 w-4 mr-2 text-gray-400" />
                <span>{upcomingCheckIns} arrivées prévues</span>
              </div>
              <div className="flex items-center text-sm">
                <Users className="h-4 w-4 mr-2 text-gray-400" />
                <span>{currentOccupants} locataires actuels</span>
              </div>
              <div className="flex items-center text-sm">
                <ListTodo className="h-4 w-4 mr-2 text-gray-400" />
                <span>{pendingTasks} tâches à nettoyer</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tenants" className="space-y-4">
        <TabsList className="bg-[#2A3544]">
          <TabsTrigger value="tenants" className="data-[state=active]:bg-[#7FD1C7] data-[state=active]:text-[#1A2533]">
            <Users className="h-4 w-4 mr-2" />
            Locataires
          </TabsTrigger>
          <TabsTrigger value="tasks" className="data-[state=active]:bg-[#7FD1C7] data-[state=active]:text-[#1A2533]">
            <ListTodo className="h-4 w-4 mr-2" />
            Tâches de nettoyage
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="tenants" className="mt-4">
          <PropertyTenants propertyId={propertyId} />
        </TabsContent>
        
        <TabsContent value="tasks" className="mt-4">
          <PropertyTasks propertyId={propertyId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
