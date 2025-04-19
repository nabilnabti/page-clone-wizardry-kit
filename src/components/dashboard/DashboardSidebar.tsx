import { Building, Home, FileText, House, CreditCard, Users, Package, ChevronDown, Calendar } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
const menuItems = [{
  title: "Dashboard",
  icon: Home,
  url: "/dashboard"
}, {
  title: "Tenants",
  icon: Users,
  url: "/dashboard/tenants"
}, {
  title: "Payments",
  icon: CreditCard,
  url: "/dashboard/payments"
}, {
  title: "Cleaning Tasks",
  icon: Calendar,
  url: "/dashboard/cleaning-tasks"
}, {
  title: "House Parameters",
  icon: House,
  url: "/dashboard/house-parameters"
}, {
  title: "House Rules",
  icon: FileText,
  url: "/dashboard/house-rules"
}, {
  title: "Abonnement",
  icon: Package,
  url: "/dashboard/subscriptions"
}];
const properties = [{
  id: 1,
  name: "123 Main Street",
  units: 5,
  city: "San Francisco"
}, {
  id: 2,
  name: "456 Park Avenue",
  units: 3,
  city: "New York"
}, {
  id: 3,
  name: "789 Beach Road",
  units: 8,
  city: "Los Angeles"
}];
export function DashboardSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedProperty, setSelectedProperty] = useState(properties[0]);
  const handlePropertyChange = property => {
    setSelectedProperty(property);
  };
  const handleAddNewProperty = () => {
    navigate('/dashboard/house-parameters/new');
  };
  return <>
      <div className="hidden md:block">
        <Sidebar>
          <SidebarHeader className="border-b border-[#2A3544] bg-[#1A2533] pb-2">
            <div className="flex items-center space-x-2 px-4 py-3">
              <Building className="h-6 w-6 text-[#7FD1C7]" />
              <span className="text-white text-xl font-semibold">COLIVE</span>
            </div>
            
            <div className="px-4 pb-2">
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full flex items-center justify-between rounded-md bg-[#2A3544] p-2 text-white hover:bg-[#3A4554] transition-colors">
                  <div className="flex items-center">
                    <House className="h-4 w-4 mr-2 text-[#7FD1C7]" />
                    <span className="text-sm truncate">{selectedProperty.name}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                  {properties.map(property => <DropdownMenuItem key={property.id} className="flex items-center cursor-pointer" onClick={() => handlePropertyChange(property)}>
                      <House className="h-4 w-4 mr-2 text-[#7FD1C7]" />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{property.name}</span>
                        <span className="text-xs text-gray-500">{property.city} - {property.units} units</span>
                      </div>
                    </DropdownMenuItem>)}
                  <DropdownMenuItem className="text-[#7FD1C7] cursor-pointer" onClick={handleAddNewProperty}>
                    + Add New Property
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="bg-[#1A2533]">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map(item => <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild className={`
                          ${location.pathname === item.url ? "bg-[#2A3544] text-[#7FD1C7]" : "text-gray-400 hover:bg-[#2A3544] hover:text-white"}
                          flex items-center space-x-3 w-full px-4 py-2 rounded-md transition-colors
                        `}>
                        <a href={item.url} onClick={e => {
                      e.preventDefault();
                      navigate(item.url);
                    }}>
                          <item.icon className="h-5 w-5 mr-3" />
                          <span className="text-sm">{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>)}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1A2533] border-t border-[#2A3544] z-50">
        <div className="flex justify-around items-center h-16">
          {menuItems.map(item => <button key={item.title} onClick={() => navigate(item.url)} className={`flex flex-col items-center justify-center w-16 py-1
                ${location.pathname === item.url ? "text-[#7FD1C7]" : "text-gray-400"}`}>
              <item.icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.title}</span>
            </button>)}
        </div>
      </div>
    </>;
}