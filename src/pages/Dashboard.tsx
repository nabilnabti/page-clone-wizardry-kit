
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#1A2533]">
        <DashboardSidebar />
        <DashboardContent />
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
