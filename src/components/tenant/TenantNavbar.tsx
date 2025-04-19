
import { Link, useLocation } from "react-router-dom";
import { Home, CreditCard, Scroll, MessageCircle, UserPen } from "lucide-react";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

const navItems = [
  { icon: Home, label: "Home", path: "/tenant" },
  { icon: CreditCard, label: "Payments", path: "/tenant/payments" },
  { icon: Scroll, label: "Cleaning", path: "/tenant/cleaning" },
  { icon: MessageCircle, label: "Chat", path: "/tenant/chat" },
  { icon: UserPen, label: "Profile", path: "/tenant/profile" },
];

export function TenantNavbar() {
  const location = useLocation();
  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-[#1A2533] border-t border-gray-700 px-6 py-2">
        <div className="flex justify-between items-center max-w-md mx-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center p-2 ${
                location.pathname === item.path ? "text-[#7FD1C7]" : "text-gray-400"
              }`}
            >
              <item.icon size={24} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    );
  }

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.path}>
          <SidebarMenuButton
            asChild
            isActive={location.pathname === item.path}
            tooltip={item.label}
            className={`
              ${location.pathname === item.path 
                ? "bg-[#2A3544] text-[#7FD1C7]" 
                : "text-gray-400 hover:bg-[#2A3544] hover:text-white"}
              flex items-center space-x-3 w-full px-4 py-2 rounded-md transition-colors
            `}
          >
            <Link to={item.path}>
              <item.icon className="shrink-0" />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

