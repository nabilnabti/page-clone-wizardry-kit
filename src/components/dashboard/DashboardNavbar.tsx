
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function DashboardNavbar() {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A3544]">
      <div>
        <h1 className="text-xl font-semibold text-white">COLIVE</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#7FD1C7] flex items-center justify-center">
            <User className="h-4 w-4 text-[#1A2533]" />
          </div>
          <span className="text-sm text-white hidden md:inline-block">{user?.displayName || "Propriétaire"}</span>
        </div>
        
        <Button variant="ghost" size="sm" onClick={logout} className="text-gray-400">
          <LogOut className="h-4 w-4 mr-2" />
          <span className="hidden md:inline-block">Déconnexion</span>
        </Button>
      </div>
    </div>
  );
}
