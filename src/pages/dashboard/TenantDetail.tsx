
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  User, 
  ArrowLeft, 
  CalendarDays, 
  Mail, 
  Phone, 
  Home, 
  AlertTriangle, 
  Clock, 
  CreditCard,
  Calendar,
  Bell,
  FileText,
  Key,
  UserRound 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TenantPayments } from "@/components/dashboard/TenantPayments";
import { useToast } from "@/hooks/use-toast";

const allTenants = [
  { 
    id: "1",
    name: "Thomas Martin", 
    email: "thomas@example.com",
    phone: "+33 6 12 34 56 78",
    room: "Room 1",
    property: "123 Main Street",
    propertyId: "1",
    moveInDate: "January 15, 2025",
    moveOutDate: "July 15, 2025",
    noticeGiven: true,
    noticeDate: "April 15, 2025",
    paymentFrequency: "Hebdomadaire",
    rentAmount: "€250",
    depositAmount: "€500",
    depositPaid: true,
    status: "active"
  },
  { 
    id: "2",
    name: "Sarah Johnson", 
    email: "sarah@example.com",
    phone: "+33 6 23 45 67 89",
    room: "Room 2",
    property: "123 Main Street",
    propertyId: "1",
    moveInDate: "February 1, 2025",
    moveOutDate: "",
    noticeGiven: false,
    noticeDate: "",
    paymentFrequency: "Mensuel",
    rentAmount: "€800",
    depositAmount: "€1600",
    depositPaid: true,
    status: "active"
  },
  { 
    id: "3",
    name: "Michael Brown", 
    email: "michael@example.com",
    phone: "+33 6 34 56 78 90",
    room: "Room 1",
    property: "456 Park Avenue",
    propertyId: "2",
    moveInDate: "March 10, 2025",
    moveOutDate: "",
    noticeGiven: false,
    noticeDate: "",
    paymentFrequency: "Mensuel",
    rentAmount: "€850",
    depositAmount: "€1700",
    depositPaid: true,
    status: "active"
  },
];

export default function TenantDetail() {
  const { tenantId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const tenant = allTenants.find(t => t.id === tenantId);

  if (!tenant) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <h2 className="text-2xl font-semibold text-white mb-2">Locataire non trouvé</h2>
          <Button onClick={() => navigate("/dashboard/tenants")}>
            Retour aux locataires
          </Button>
        </div>
      </div>
    );
  }

  const handleSendReminder = (type: 'payment' | 'cleaning' | 'notice') => {
    toast({
      title: "Rappel envoyé",
      description: "Le locataire recevra un email sous peu.",
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          className="mr-2 text-gray-400"
          onClick={() => navigate(`/dashboard/property/${tenant.propertyId}`)}
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
        </Button>
        <h1 className="text-2xl font-semibold text-white">{tenant.name}</h1>
        {tenant.noticeGiven && (
          <Badge variant="destructive" className="ml-3">Préavis en cours</Badge>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <UserRound className="h-5 w-5 text-[#7FD1C7] mr-2" />
              Informations personnelles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                <span>{tenant.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                <span>{tenant.phone}</span>
              </div>
              <div className="flex items-center">
                <Home className="h-4 w-4 mr-2 text-gray-400" />
                <span>{tenant.property} - {tenant.room}</span>
              </div>
              <Separator className="my-2" />
              <div>
                <p className="text-sm text-gray-500 mb-1">Documents</p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start text-sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Contrat de location
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm">
                    <Key className="h-4 w-4 mr-2" />
                    État des lieux
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <CalendarDays className="h-5 w-5 text-[#7FD1C7] mr-2" />
              Dates importantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Date d'arrivée</p>
                <p className="font-medium">{tenant.moveInDate}</p>
              </div>
              
              {tenant.moveOutDate && (
                <div>
                  <p className="text-sm text-gray-500">Date de départ prévue</p>
                  <p className="font-medium">{tenant.moveOutDate}</p>
                </div>
              )}
              
              {tenant.noticeGiven && (
                <div>
                  <p className="text-sm text-gray-500">Préavis émis le</p>
                  <p className="font-medium text-red-500">{tenant.noticeDate}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Bell className="h-5 w-5 text-[#7FD1C7] mr-2" />
              Actions rapides
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => handleSendReminder('payment')}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Rappel de paiement
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => handleSendReminder('cleaning')}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Rappel de ménage
              </Button>

              <Button 
                variant="outline" 
                className="w-full justify-start text-red-500 hover:text-red-600" 
                onClick={() => handleSendReminder('notice')}
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Envoyer un préavis
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="payments" className="space-y-4">
        <TabsList className="bg-[#2A3544]">
          <TabsTrigger value="payments" className="data-[state=active]:bg-[#7FD1C7] data-[state=active]:text-[#1A2533]">
            <CreditCard className="h-4 w-4 mr-2" />
            Paiements
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-[#7FD1C7] data-[state=active]:text-[#1A2533]">
            <Home className="h-4 w-4 mr-2" />
            Logement
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-[#7FD1C7] data-[state=active]:text-[#1A2533]">
            <Clock className="h-4 w-4 mr-2" />
            Historique
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="payments" className="mt-4">
          <TenantPayments tenantId={tenantId} />
        </TabsContent>
        
        <TabsContent value="settings" className="mt-4">
          <Card className="bg-white p-6">
            <h3 className="text-lg font-medium mb-4">Paramètres du logement</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Accès</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-100 p-4 rounded-md">
                    <p className="font-medium">Code porte d'entrée</p>
                    <p className="text-sm text-gray-500">2580</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-md">
                    <p className="font-medium">Clés remises</p>
                    <p className="text-sm text-gray-500">2 clés (Entrée, Chambre)</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-2">Services</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-100 p-4 rounded-md">
                    <p className="font-medium">Internet</p>
                    <p className="text-sm text-gray-500">Wi-Fi: HomeNetwork</p>
                    <p className="text-sm text-gray-500">Mot de passe: HomeSw33tHome</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-md">
                    <p className="font-medium">Chauffage</p>
                    <p className="text-sm text-gray-500">Électrique - Thermostat individuel</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-2">Notes</h4>
                <div className="bg-gray-100 p-4 rounded-md">
                  <p className="text-sm text-gray-600">
                    Le locataire a demandé un nouveau matelas. À prévoir pour la semaine prochaine.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <Card className="bg-white p-6">
            <h3 className="text-lg font-medium mb-4">Historique des communications</h3>
            <div className="space-y-4">
              <div className="border-l-2 border-[#7FD1C7] pl-4">
                <p className="text-sm text-gray-500">15 Avril 2025</p>
                <p className="font-medium">Rappel de paiement envoyé</p>
                <p className="text-sm text-gray-600">Email automatique pour le loyer de Mai</p>
              </div>
              
              <div className="border-l-2 border-[#7FD1C7] pl-4">
                <p className="text-sm text-gray-500">1 Avril 2025</p>
                <p className="font-medium">Tâche de ménage assignée</p>
                <p className="text-sm text-gray-600">Nettoyage des parties communes</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
