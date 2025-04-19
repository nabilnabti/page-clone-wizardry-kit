
import { Building, Home, FileText, House, CreditCard, Users } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  { title: "Dashboard", icon: Home, url: "/dashboard" },
  { title: "Tenants", icon: Users, url: "/dashboard/tenants" },
  { title: "Payments", icon: CreditCard, url: "/dashboard/payments" },
  { title: "Subletting Rules", icon: FileText, url: "/dashboard/subletting-rules" },
  { title: "House Rules", icon: House, url: "/dashboard/house-rules" },
];

export function DashboardSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-[#2A3544] pb-2">
        <div className="flex items-center space-x-2 px-4">
          <Building className="h-6 w-6 text-[#7FD1C7]" />
          <span className="text-white text-xl font-semibold">Coline</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className={location.pathname === item.url ? "bg-[#2A3544] text-[#7FD1C7]" : ""}
                  >
                    <a 
                      href={item.url} 
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(item.url);
                      }}
                      className="text-gray-300 hover:text-white"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
