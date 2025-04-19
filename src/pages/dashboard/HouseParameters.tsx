
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface HouseParametersForm {
  name: string;
  address: string;
  price: number;
  maxOccupants: number;
  deposit: number;
  paymentFrequency: "monthly" | "quarterly" | "yearly";
}

export default function HouseParameters() {
  const form = useForm<HouseParametersForm>({
    defaultValues: {
      name: "",
      address: "",
      price: 0,
      maxOccupants: 1,
      deposit: 0,
      paymentFrequency: "monthly"
    }
  });

  const onSubmit = (data: HouseParametersForm) => {
    console.log(data);
    toast.success("Paramètres sauvegardés avec succès");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-white">Paramètres de la Maison</h1>
      </div>
      
      <Card className="p-6 bg-[#242E3E]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Adresse</FormLabel>
                    <FormControl>
                      <Input placeholder="123 rue de la Paix" {...field} className="bg-[#1A2533] text-white border-[#2A3544]" />
                    </FormControl>
                  </FormItem>
                )}
              />

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
                name="maxOccupants"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Nombre max d'occupants</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} className="bg-[#1A2533] text-white border-[#2A3544]" />
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

            <Button type="submit" className="w-full md:w-auto bg-[#7FD1C7] hover:bg-[#6BC0B6] text-[#1A2533]">
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder les paramètres
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
