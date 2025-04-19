import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Edit, Trash, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Tenants() {
  const navigate = useNavigate();
  
  const tenants = [
    { 
      id: 1,
      name: "Thomas Martin", 
      email: "thomas@example.com",
      phone: "+33 6 12 34 56 78",
      room: "Room 1",
      moveInDate: "January 15, 2025",
      status: "active"
    },
    { 
      id: 2,
      name: "Sarah Johnson", 
      email: "sarah@example.com",
      phone: "+33 6 23 45 67 89",
      room: "Room 2",
      moveInDate: "February 1, 2025",
      status: "active"
    },
    { 
      id: 3,
      name: "Michael Brown", 
      email: "michael@example.com",
      phone: "+33 6 34 56 78 90",
      room: "Room 3",
      moveInDate: "March 10, 2025",
      status: "active"
    },
    { 
      id: 4,
      name: "Emma Wilson", 
      email: "emma@example.com",
      phone: "+33 6 45 67 89 01",
      room: "Room 4",
      moveInDate: "February 15, 2025",
      status: "active"
    },
    { 
      id: 5,
      name: "David Lee", 
      email: "david@example.com",
      phone: "+33 6 56 78 90 12",
      room: "Room 5",
      moveInDate: "April 1, 2025",
      status: "active"
    },
  ];

  const handleTenantClick = (tenantId: number) => {
    navigate(`/dashboard/tenant/${tenantId}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-white">Tenants</h1>
        <Button className="bg-[#7FD1C7] hover:bg-[#6BC0B6] text-[#1A2533]">
          Add New Tenant
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tenants.map((tenant) => (
          <Card 
            key={tenant.id} 
            className="p-4 bg-[#242E3E] border-none shadow-md hover:bg-[#2A3544] transition-colors cursor-pointer"
            onClick={() => handleTenantClick(tenant.id)}
          >
            <div className="flex items-center mb-4">
              <div className="bg-[#7FD1C7]/20 p-3 rounded-full mr-3">
                <User className="text-[#7FD1C7]" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-white">{tenant.name}</h3>
                <p className="text-sm text-[#7FD1C7]">{tenant.room}</p>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-300">
                <Mail size={16} className="mr-2" />
                <span>{tenant.email}</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Phone size={16} className="mr-2" />
                <span>{tenant.phone}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-3 mt-2 flex justify-between">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-300 hover:text-white hover:bg-[#2A3544]"
                onClick={(e) => {
                  e.stopPropagation();
                  // Edit functionality here
                }}
              >
                <Edit size={16} className="mr-1" />
                Edit
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-red-400 hover:text-red-300 hover:bg-[#2A3544]"
                onClick={(e) => {
                  e.stopPropagation();
                  // Remove functionality here
                }}
              >
                <Trash size={16} className="mr-1" />
                Remove
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
