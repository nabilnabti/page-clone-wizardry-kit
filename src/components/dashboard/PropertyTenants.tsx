
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { User, Edit, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data - in a real app this would come from an API
const tenantsByProperty = {
  "1": [
    { 
      id: 1,
      name: "Thomas Martin", 
      email: "thomas@example.com",
      phone: "+33 6 12 34 56 78",
      room: "Room 1",
      moveInDate: "January 15, 2025",
      moveOutDate: "July 15, 2025",
      status: "active"
    },
    { 
      id: 2,
      name: "Sarah Johnson", 
      email: "sarah@example.com",
      phone: "+33 6 23 45 67 89",
      room: "Room 2",
      moveInDate: "February 1, 2025",
      moveOutDate: "",
      status: "active"
    },
  ],
  "2": [
    { 
      id: 3,
      name: "Michael Brown", 
      email: "michael@example.com",
      phone: "+33 6 34 56 78 90",
      room: "Room 1",
      moveInDate: "March 10, 2025",
      moveOutDate: "",
      status: "active"
    },
    { 
      id: 4,
      name: "Emma Wilson", 
      email: "emma@example.com",
      phone: "+33 6 45 67 89 01",
      room: "Room 2",
      moveInDate: "February 15, 2025",
      moveOutDate: "August 15, 2025",
      status: "active"
    },
    { 
      id: 5,
      name: "David Lee", 
      email: "david@example.com",
      phone: "+33 6 56 78 90 12",
      room: "Room 3",
      moveInDate: "April 1, 2025",
      moveOutDate: "",
      status: "active"
    },
  ],
  "3": [
    { 
      id: 6,
      name: "Nina Garcia", 
      email: "nina@example.com",
      phone: "+33 6 67 89 01 23",
      room: "Room 1",
      moveInDate: "January 20, 2025",
      moveOutDate: "",
      status: "active"
    },
    { 
      id: 7,
      name: "Alex Chen", 
      email: "alex@example.com",
      phone: "+33 6 78 90 12 34",
      room: "Room 2",
      moveInDate: "March 5, 2025",
      moveOutDate: "September 5, 2025",
      status: "active"
    },
    { 
      id: 8,
      name: "Laura Smith", 
      email: "laura@example.com",
      phone: "+33 6 89 01 23 45",
      room: "Room 3",
      moveInDate: "February 10, 2025",
      moveOutDate: "",
      status: "active"
    },
  ]
};

export function PropertyTenants({ propertyId }: { propertyId: string }) {
  const tenants = tenantsByProperty[propertyId] || [];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Locataires</h2>
        <Button className="bg-[#7FD1C7] hover:bg-[#6BC0B6] text-[#1A2533]">
          Ajouter un locataire
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tenants.map((tenant) => (
          <Link to={`/dashboard/tenant/${tenant.id}`} key={tenant.id}>
            <Card className="p-4 bg-[#242E3E] border-none shadow-md hover:bg-[#2A3544] transition-colors">
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
                <div className="text-sm text-gray-400">
                  Depuis: {tenant.moveInDate}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
