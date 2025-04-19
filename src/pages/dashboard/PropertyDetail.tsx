
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  ListTodo, 
  ArrowLeft, 
  House, 
  Check, 
  Clock, 
  CalendarDays
} from "lucide-react";
import { PropertyTenants } from "@/components/dashboard/PropertyTenants";
import { PropertyTasks } from "@/components/dashboard/PropertyTasks";

// Mock data - in a real app this would come from an API
const properties = [
  { 
    id: "1", 
    name: "123 Main Street", 
    location: "San Francisco",
    address: "123 Main Street, San Francisco, CA 94107",
    cleaningTasksRemaining: 3,
    occupancy: "2/6",
    overduePayments: 2,
    upcomingCheckIns: 1,
    roomCount: 6
  },
  { 
    id: "2", 
    name: "456 Park Avenue", 
    location: "New York",
    address: "456 Park Avenue, New York, NY 10022",
    cleaningTasksRemaining: 1,
    occupancy: "6/6",
    overduePayments: 0,
    upcomingCheckIns: 2,
    roomCount: 6
  },
  { 
    id: "3", 
    name: "789 Beach Road", 
    location: "Los Angeles",
    address: "789 Beach Road, Los Angeles, CA 90001",
    cleaningTasksRemaining: 4,
    occupancy: "3/8",
    overduePayments: 2,
    upcomingCheckIns: 6,
    roomCount: 8
  },
];

export default function PropertyDetail() {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  
  const property = properties.find(p => p.id === propertyId);
  
  if (!property) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <h2 className="text-2xl font-semibold text-white mb-2">Propriété non trouvée</h2>
          <Button onClick={() => navigate("/dashboard")}>
            Retour au Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const occupancyData = property.occupancy.split('/');
  const currentOccupants = parseInt(occupancyData[0]);
  const totalRooms = parseInt(occupancyData[1]);
  const vacantRooms = totalRooms - currentOccupants;

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          className="mr-2 text-gray-400"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
        </Button>
        <h1 className="text-2xl font-semibold text-white">{property.name}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-2">
              <House className="h-5 w-5 text-[#7FD1C7]" />
              <h3 className="font-medium">Détails de la propriété</h3>
            </div>
            <p className="text-sm text-gray-500 mb-4">{property.address}</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-100 p-2 rounded">
                <p className="text-xs text-gray-500">Chambres</p>
                <p className="font-medium">{property.roomCount}</p>
              </div>
              <div className="bg-gray-100 p-2 rounded">
                <p className="text-xs text-gray-500">Occupées</p>
                <p className="font-medium">{property.occupancy}</p>
              </div>
              <div className="bg-gray-100 p-2 rounded">
                <p className="text-xs text-gray-500">Disponibles</p>
                <p className="font-medium">{vacantRooms}</p>
              </div>
              <div className="bg-gray-100 p-2 rounded">
                <p className="text-xs text-gray-500">Paiements</p>
                <p className="font-medium">{property.overduePayments} en retard</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-4">
              <Check className="h-5 w-5 text-green-500" />
              <h3 className="font-medium">Tâches à nettoyer</h3>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Tâches restantes</span>
                <span className="font-medium">{property.cleaningTasksRemaining}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-[#7FD1C7] h-2 rounded-full" 
                  style={{ width: `${(property.cleaningTasksRemaining / 10) * 100}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="h-5 w-5 text-blue-500" />
              <h3 className="font-medium">Activité récente</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <CalendarDays className="h-4 w-4 mr-2 text-gray-400" />
                <span>{property.upcomingCheckIns} arrivées prévues</span>
              </div>
              <div className="flex items-center text-sm">
                <Users className="h-4 w-4 mr-2 text-gray-400" />
                <span>{currentOccupants} locataires actuels</span>
              </div>
              <div className="flex items-center text-sm">
                <ListTodo className="h-4 w-4 mr-2 text-gray-400" />
                <span>{property.cleaningTasksRemaining} tâches à nettoyer</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tenants" className="space-y-4">
        <TabsList className="bg-[#2A3544]">
          <TabsTrigger value="tenants" className="data-[state=active]:bg-[#7FD1C7] data-[state=active]:text-[#1A2533]">
            <Users className="h-4 w-4 mr-2" />
            Locataires
          </TabsTrigger>
          <TabsTrigger value="tasks" className="data-[state=active]:bg-[#7FD1C7] data-[state=active]:text-[#1A2533]">
            <ListTodo className="h-4 w-4 mr-2" />
            Tâches de nettoyage
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="tenants" className="mt-4">
          <PropertyTenants propertyId={propertyId} />
        </TabsContent>
        
        <TabsContent value="tasks" className="mt-4">
          <PropertyTasks propertyId={propertyId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
