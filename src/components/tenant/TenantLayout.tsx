
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarHeader } from "@/components/ui/sidebar"
import { TenantNavbar } from "./TenantNavbar";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

interface TenantLayoutProps {
  children: React.ReactNode;
  title: string;
  showBackButton?: boolean;
}

export function TenantLayout({ children, title, showBackButton }: TenantLayoutProps) {
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#1A2533]">
        <div className="hidden md:block">
          <Sidebar variant="inset" collapsible="icon">
            <SidebarContent>
              <SidebarHeader className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#7FD1C7] flex items-center justify-center text-white font-semibold">
                    C
                  </div>
                  <span className="text-white font-semibold text-lg">COLIVE</span>
                </div>
              </SidebarHeader>
              <SidebarGroup>
                <TenantNavbar />
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        </div>

        <main className="flex-1 pb-20 md:pb-6 px-4 md:px-8">
          <header className="flex items-center h-16 mb-6">
            {showBackButton && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate(-1)}
                className="mr-4 text-white hover:text-gray-300"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            )}
            <h1 className="text-xl text-white font-semibold md:text-2xl">{title}</h1>
          </header>
          
          <div className="md:max-w-5xl mx-auto">
            {children}
          </div>
        </main>

        {/* Mobile navigation bar */}
        <div className="md:hidden">
          <TenantNavbar />
        </div>
      </div>
    </SidebarProvider>
  );
}

