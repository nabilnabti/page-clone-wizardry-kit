import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Wifi, Key, Bed, House, Image, Plus } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { addProperty } from "@/services/propertyService";
import { useState } from "react";

interface HouseParametersForm {
  // Basic Information
  name: string;
  description: string;
  address: string;
  price: number;
  maxOccupants: number;
  deposit: number;
  paymentFrequency: "monthly" | "quarterly" | "yearly";
  
  // Property Details
  totalRooms: number;
  bathrooms: number;
  bedrooms: number;
  propertyType: string;
  floorNumber: number;
  totalFloors: number;
  surfaceArea: number;
  
  // Access Information
  wifiNetwork: string;
  wifiPassword: string;
  buildingCode: string;
  
  // Facilities and Amenities
  facilities: {
    hasParking: boolean;
    hasElevator: boolean;
    hasAirConditioning: boolean;
    hasHeating: boolean;
    hasWasher: boolean;
    hasDryer: boolean;
    hasInternet: boolean;
    hasTv: boolean;
    hasKitchen: boolean;
    hasWorkspace: boolean;
  };
  
  // House Rules
  smokingAllowed: boolean;
  petsAllowed: boolean;
  partiesAllowed: boolean;
  
  // Photos
  photos: string[];
}

export default function HouseParameters() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isNewProperty = location.pathname.includes('/new');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<HouseParametersForm>({
    defaultValues: {
      name: "",
      description: "",
      address: "",
      price: 0,
      maxOccupants: 1,
      deposit: 0,
      paymentFrequency: "monthly",
      totalRooms: 1,
      bathrooms: 1,
      bedrooms: 1,
      propertyType: "apartment",
      floorNumber: 0,
      totalFloors: 1,
      surfaceArea: 0,
      wifiNetwork: "",
      wifiPassword: "",
      buildingCode: "",
      facilities: {
        hasParking: false,
        hasElevator: false,
        hasAirConditioning: false,
        hasHeating: false,
        hasWasher: false,
        hasDryer: false,
        hasInternet: false,
        hasTv: false,
        hasKitchen: false,
        hasWorkspace: false,
      },
      smokingAllowed: false,
      petsAllowed: false,
      partiesAllowed: false,
      photos: [],
    }
  });

  const onSubmit = async (data: HouseParametersForm) => {
    try {
      setIsSubmitting(true);
      if (!user?.uid) {
        toast.error("Utilisateur non authentifié");
        setIsSubmitting(false);
        return;
      }

      console.log("Ajout de propriété en cours...", data);
      
      // Create the property
      const propertyData = {
        name: data.name,
        address: data.address,
        rooms: data.totalRooms,
        landlordId: user.uid,
      };

      console.log("Données de propriété à envoyer:", propertyData);
      
      const propertyId = await addProperty(propertyData);
      console.log("Propriété ajoutée avec succès, ID:", propertyId);
      
      toast.success("Propriété ajoutée avec succès");
      navigate(`/dashboard/property/${propertyId}`);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la propriété:", error);
      toast.error("Erreur lors de l'ajout de la propriété");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFacilityChange = (key: keyof HouseParametersForm['facilities'], checked: boolean) => {
    const updatedFacilities = { ...form.getValues('facilities'), [key]: checked };
    form.setValue('facilities', updatedFacilities, { shouldValidate: true });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-white">
          {isNewProperty ? "Ajouter un logement" : "Paramètres de la Maison"}
        </h1>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="p-6 bg-[#242E3E]">
            <h2 className="text-xl font-semibold text-white mb-4">Informations Générales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Nom de la propriété</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: Villa Méditerranée" {...field} className="bg-[#1A2533] text-white border-[#2A3544]" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel className="text-white">Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Décrivez votre propriété..." 
                        {...field} 
                        className="bg-[#1A2533] text-white border-[#2A3544] min-h-[100px]" 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel className="text-white">Adresse</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="123 rue de la Paix" 
                        {...field} 
                        className="bg-[#1A2533] text-white border-[#2A3544]" 
                        required
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </Card>

          <Card className="p-6 bg-[#242E3E]">
            <h2 className="text-xl font-semibold text-white mb-4">Détails de la Propriété</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="bedrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      <div className="flex items-center gap-2">
                        <Bed className="w-4 h-4 text-[#7FD1C7]" />
                        Chambres
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} className="bg-[#1A2533] text-white border-[#2A3544]" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bathrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Salles de bain</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} className="bg-[#1A2533] text-white border-[#2A3544]" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="surfaceArea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Surface (m²)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} className="bg-[#1A2533] text-white border-[#2A3544]" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </Card>

          <Card className="p-6 bg-[#242E3E]">
            <h2 className="text-xl font-semibold text-white mb-4">Informations d'Accès</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="wifiNetwork"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      <div className="flex items-center gap-2">
                        <Wifi className="w-4 h-4 text-[#7FD1C7]" />
                        Nom du réseau WiFi
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-[#1A2533] text-white border-[#2A3544]" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="wifiPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      <div className="flex items-center gap-2">
                        <Key className="w-4 h-4 text-[#7FD1C7]" />
                        Mot de passe WiFi
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input type="password" {...field} className="bg-[#1A2533] text-white border-[#2A3544]" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="buildingCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Code d'accès au bâtiment</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-[#1A2533] text-white border-[#2A3544]" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </Card>

          <Card className="p-6 bg-[#242E3E]">
            <h2 className="text-xl font-semibold text-white mb-4">Équipements et Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(form.watch("facilities")).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={value}
                    onCheckedChange={(checked) => 
                      handleFacilityChange(key as keyof HouseParametersForm['facilities'], !!checked)
                    }
                    className="w-4 h-4 text-[#7FD1C7] bg-[#1A2533] border-[#2A3544] rounded"
                  />
                  <label htmlFor={key} className="text-white cursor-pointer">
                    {key.replace('has', '').replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-[#242E3E]">
            <h2 className="text-xl font-semibold text-white mb-4">Photos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((index) => (
                <div key={index} className="relative group">
                  <AspectRatio ratio={4/3} className="bg-[#1A2533] border-2 border-dashed border-[#2A3544] rounded-lg overflow-hidden">
                    <div className="flex flex-col items-center justify-center h-full">
                      <Image className="w-8 h-8 text-[#7FD1C7] mb-2" />
                      <span className="text-sm text-gray-400">Ajouter une photo</span>
                    </div>
                  </AspectRatio>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-[#242E3E]">
            <h2 className="text-xl font-semibold text-white mb-4">Conditions Financières</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Prix du loyer (€)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} className="bg-[#1A2533] text-white border-[#2A3544]" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deposit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Montant de la caution (€)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} className="bg-[#1A2533] text-white border-[#2A3544]" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Fréquence des paiements</FormLabel>
                    <FormControl>
                      <select 
                        {...field} 
                        className="w-full h-10 rounded-md border border-[#2A3544] bg-[#1A2533] text-white px-3"
                      >
                        <option value="monthly">Mensuel</option>
                        <option value="quarterly">Trimestriel</option>
                        <option value="yearly">Annuel</option>
                      </select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </Card>

          <Button 
            type="submit" 
            className="w-full md:w-auto bg-[#7FD1C7] hover:bg-[#6BC0B6] text-[#1A2533]"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#1A2533]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Traitement en cours...
              </span>
            ) : (
              <>
                {isNewProperty ? (
                  <><Plus className="w-4 h-4 mr-2" />Ajouter mon logement</>
                ) : (
                  <><House className="w-4 h-4 mr-2" />Sauvegarder les paramètres</>
                )}
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
