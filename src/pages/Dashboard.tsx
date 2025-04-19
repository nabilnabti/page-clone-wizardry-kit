
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Loader } from "lucide-react";

const Dashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // This ensures the sidebar is fully loaded before showing content
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1A2533]">
        <Loader className="h-8 w-8 text-[#7FD1C7] animate-spin" />
      </div>
    );
  }

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
