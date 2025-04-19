
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Edit, Trash, Mail, Phone, UserPlus, AlertCircle, House } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTenantsByProperty } from "@/services/tenantService";
import { useAuth } from "@/context/AuthContext";
import { AddTenantDialog } from "@/components/dashboard/AddTenantDialog";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function Tenants() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentPropertyId, setCurrentPropertyId] = useState<string | null>(null);
  
  // Get the property ID from localStorage on component mount and whenever it changes
  useEffect(() => {
    const storedPropertyId = localStorage.getItem('currentPropertyId');
    if (storedPropertyId) {
      setCurrentPropertyId(storedPropertyId);
    } else if (user?.propertyId) {
      // Fallback to user.propertyId if nothing in localStorage
      setCurrentPropertyId(user.propertyId);
      // Also save it to localStorage for consistency
      localStorage.setItem('currentPropertyId', user.propertyId);
    }
  }, [user?.propertyId]);
  
  // Vérifier que l'ID de propriété est valide
  const isPropertyIdValid = !!currentPropertyId && currentPropertyId !== "undefined" && currentPropertyId !== "null";
  
  const {
    data: tenants = [],
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['tenants', currentPropertyId],
    queryFn: () => getTenantsByProperty(currentPropertyId || ''),
    enabled: isPropertyIdValid,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    meta: {
      onError: (error: any) => {
        console.error("Error fetching tenants:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les locataires pour cette propriété",
          variant: "destructive",
        });
      }
    }
  });
  
  const handleTenantClick = (tenantId: string) => {
    navigate(`/dashboard/tenant/${tenantId}`);
  };
  
  // Handle case when no property is selected
  if (!isPropertyIdValid) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-white mb-6">Locataires</h1>
        <Card className="p-8 bg-[#242E3E] border-none shadow-md text-center">
          <House className="h-12 w-12 mx-auto mb-4 text-gray-500" />
          <h3 className="text-white text-lg font-medium mb-2">Aucune propriété sélectionnée</h3>
          <p className="text-gray-400 mb-6">Veuillez sélectionner une propriété dans le menu pour voir ses locataires.</p>
          <Button 
            onClick={() => navigate("/dashboard/house-parameters/new")} 
            className="bg-[#7FD1C7] hover:bg-[#6BC0B6] text-[#1A2533]"
          >
            Créer une propriété
          </Button>
        </Card>
      </div>
    );
  }
  
  if (isLoading) {
    return <div className="p-6">
        <h1 className="text-2xl font-semibold text-white mb-6">Locataires</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <Card key={i} className="p-4 bg-[#242E3E] border-none shadow-md animate-pulse">
              <div className="flex items-center mb-4">
                <div className="bg-[#7FD1C7]/20 p-3 rounded-full mr-3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-24"></div>
                  <div className="h-3 bg-gray-700 rounded w-16"></div>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="h-3 bg-gray-700 rounded"></div>
                <div className="h-3 bg-gray-700 rounded"></div>
              </div>
            </Card>)}
        </div>
      </div>;
  }
  
  if (isError) {
    return <div className="p-6">
        <h1 className="text-2xl font-semibold text-white mb-6">Locataires</h1>
        <Card className="p-8 bg-[#242E3E] border-none shadow-md text-center">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
          <h3 className="text-white text-lg font-medium mb-2">Erreur de chargement</h3>
          <p className="text-gray-400 mb-6">Une erreur s'est produite lors du chargement des locataires.</p>
          <Button 
            onClick={() => refetch()}
            className="bg-[#7FD1C7] hover:bg-[#6BC0B6] text-[#1A2533]"
          >
            Réessayer
          </Button>
        </Card>
      </div>;
  }
  
  return <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-white">Locataires</h1>
        <AddTenantDialog 
          propertyId={currentPropertyId} 
          onTenantAdded={() => refetch()} 
        />
      </div>
      
      {tenants.length === 0 ? <Card className="p-8 bg-[#242E3E] border-none shadow-md text-center">
          <User className="h-12 w-12 mx-auto mb-4 text-gray-500" />
          <h3 className="text-white text-lg font-medium mb-2">Aucun locataire</h3>
          <p className="text-gray-400 mb-6">Vous n'avez pas encore ajouté de locataires à cette propriété.</p>
          <Button 
            onClick={() => {
              const addTenantButton = document.querySelector("[data-testid='add-tenant-trigger']") as HTMLElement;
              if (addTenantButton) {
                addTenantButton.click();
              }
            }} 
            className="bg-[#7FD1C7] hover:bg-[#6BC0B6] text-[#1A2533]"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Ajouter un locataire
          </Button>
        </Card> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tenants.map(tenant => <Card key={tenant.id} className="p-4 bg-[#242E3E] border-none shadow-md hover:bg-[#2A3544] transition-colors cursor-pointer" onClick={() => handleTenantClick(tenant.id)}>
              <div className="flex items-center mb-4">
                <div className="bg-[#7FD1C7]/20 p-3 rounded-full mr-3">
                  <User className="text-[#7FD1C7]" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{tenant.name}</h3>
                  <p className="text-sm text-[#7FD1C7]">{tenant.roomNumber}</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-300">
                  <Mail size={16} className="mr-2" />
                  <span>{tenant.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <Phone size={16} className="mr-2" />
                  <span>{tenant.phone || 'Pas de numéro'}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-700 pt-3 mt-2 flex justify-between">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-[#2A3544]" onClick={e => {
            e.stopPropagation();
            // Edit functionality here
          }}>
                  <Edit size={16} className="mr-1" />
                  Modifier
                </Button>
                <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-[#2A3544]" onClick={e => {
            e.stopPropagation();
            // Remove functionality here
          }}>
                  <Trash size={16} className="mr-1" />
                  Supprimer
                </Button>
              </div>
            </Card>)}
        </div>}
    </div>;
}
