
import { Link, useLocation } from "react-router-dom";
import { Home, CreditCard, Scroll, MessageCircle, UserPen } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", path: "/tenant" },
  { icon: CreditCard, label: "Payments", path: "/tenant/payments" },
  { icon: Scroll, label: "Cleaning", path: "/tenant/cleaning" },
  { icon: MessageCircle, label: "Chat", path: "/tenant/chat" },
  { icon: UserPen, label: "Profile", path: "/tenant/profile" },
];

export function TenantNavbar() {
  const location = useLocation();

  return (
    <>
      {/* Mobile navigation bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#1A2533] border-t border-gray-700 px-6 py-2 md:hidden">
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

      {/* Desktop navigation */}
      <nav className="hidden md:block">
        <div className="flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                location.pathname === item.path 
                  ? "bg-[#7FD1C7]/10 text-[#7FD1C7]" 
                  : "text-gray-400 hover:bg-[#7FD1C7]/5 hover:text-gray-300"
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
