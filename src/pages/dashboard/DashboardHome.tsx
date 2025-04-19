
import { Card } from "@/components/ui/card";
import { Users, Calendar, CreditCard, AlertTriangle, House, ArrowRight, ListTodo } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Link, useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPropertiesByLandlord } from "@/services/propertyService";
import { useAuth } from "@/context/AuthContext";

export default function DashboardHome() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const { data: properties, isLoading } = useQuery({
    queryKey: ['properties', user?.uid],
    queryFn: () => getPropertiesByLandlord(user?.uid || ''),
  });

  React.useEffect(() => {
    if (!isLoading && properties?.length === 0) {
      navigate('/dashboard/house-parameters/new');
    }
  }, [properties, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-700 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-semibold text-white mb-6">Welcome to your dashboard</h1>
        <Card className="p-6 max-w-md mx-auto">
          <House className="w-12 h-12 mx-auto mb-4 text-[#7FD1C7]" />
          <h2 className="text-xl font-medium mb-2">Add your first property</h2>
          <p className="text-gray-500 mb-4">Start managing your coliving space by adding your first property.</p>
          <Link 
            to="/dashboard/house-parameters/new"
            className="inline-block bg-[#7FD1C7] text-white px-4 py-2 rounded-md hover:bg-[#6BC1B7] transition-colors"
          >
            Add Property
          </Link>
        </Card>
      </div>
    );
  }

  const stats = [
    { 
      title: "Upcoming Check-Ins", 
      value: "0", 
      icon: Calendar, 
      color: "bg-blue-100",
      iconColor: "text-blue-500",
      textColor: "text-blue-900"
    },
    { 
      title: "Total Tenants", 
      value: "0", 
      icon: Users, 
      color: "bg-green-100",
      iconColor: "text-green-500",
      textColor: "text-green-900"
    },
    { 
      title: "Payments this Month", 
      value: "$0", 
      icon: CreditCard, 
      color: "bg-cyan-100",
      iconColor: "text-cyan-500",
      textColor: "text-cyan-900"
    },
    { 
      title: "Pre-notices", 
      value: "0", 
      icon: AlertTriangle, 
      color: "bg-red-100",
      iconColor: "text-red-500",
      textColor: "text-red-900"
    },
  ];

  const PropertyCard = ({ property }) => (
    <Card key={property.id} className="p-4 bg-white hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg">{property.name}</h3>
          <p className="text-gray-500 text-sm">{property.address}</p>
        </div>
        <House className="h-5 w-5 text-[#7FD1C7]" />
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-gray-100 p-2 rounded">
          <div className="flex items-center gap-1">
            <ListTodo className="h-4 w-4 text-gray-500" />
            <p className="text-xs text-gray-500">À nettoyer</p>
          </div>
          <p className="font-medium">0</p>
        </div>
        <div className="bg-gray-100 p-2 rounded">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-gray-500" />
            <p className="text-xs text-gray-500">Occupé</p>
          </div>
          <p className="font-medium">0/{property.rooms}</p>
        </div>
        <div className="bg-gray-100 p-2 rounded">
          <p className="text-xs text-gray-500">Retards</p>
          <p className="font-medium">0</p>
        </div>
        <div className="bg-gray-100 p-2 rounded">
          <p className="text-xs text-gray-500">Arrivées</p>
          <p className="font-medium">0</p>
        </div>
      </div>
      <Link 
        to={`/dashboard/property/${property.id}`}
        className="flex items-center text-[#7FD1C7] text-sm font-medium hover:underline"
      >
        Voir détails
        <ArrowRight className="h-4 w-4 ml-1" />
      </Link>
    </Card>
  );

  const PropertiesGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );

  const PropertiesCarousel = () => (
    <Carousel className="w-full">
      <CarouselContent>
        {properties.map((property) => (
          <CarouselItem key={property.id}>
            <PropertyCard property={property} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-white mb-6">Dashboard Overview</h1>
      
      {/* Properties Overview Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Properties Overview</h2>
        {isMobile ? <PropertiesCarousel /> : <PropertiesGrid />}
      </div>
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className={`p-6 ${stat.color} border-none`}>
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-sm font-medium ${stat.textColor} mb-1`}>{stat.title}</p>
                <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
              </div>
              <div className={`p-2 rounded-lg ${stat.iconColor}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty Tables with Message */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white p-6">
          <h2 className="text-xl font-semibold mb-4">Check-ins/Check-outs</h2>
          <div className="text-center py-8 text-gray-500">
            No upcoming check-ins or check-outs
          </div>
        </Card>

        <Card className="bg-white p-6">
          <h2 className="text-xl font-semibold mb-4">Tenants with Overdue Payments</h2>
          <div className="text-center py-8 text-gray-500">
            No overdue payments
          </div>
        </Card>
      </div>
    </div>
  );
}
