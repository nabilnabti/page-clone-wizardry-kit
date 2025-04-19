
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddTenant = () => {
    if (!user?.propertyId) {
      toast({
        title: "Aucune propriété sélectionnée",
        description: "Vous devez d'abord créer ou sélectionner une propriété avant d'ajouter des locataires.",
        variant: "destructive",
      });
      navigate("/dashboard/house-parameters/new");
      return;
    }
    
    // Si l'utilisateur a une propriété, nous pouvons procéder normalement
    // Le bouton "Ajouter un locataire" dans la vue concernée sera cliqué normalement
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-[#1A2533]">
        <DashboardNavbar />
        <div className="flex flex-1">
          <DashboardSidebar />
          <div className="flex-1 overflow-auto pb-20 md:pb-0">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
