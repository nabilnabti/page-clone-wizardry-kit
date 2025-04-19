
import { TenantLayout } from "@/components/tenant/TenantLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPen } from "lucide-react";

export default function TenantProfile() {
  return (
    <TenantLayout title="Mon Profil" showBackButton>
      <div className="space-y-6 md:max-w-2xl">
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-8">
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>T</AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline" size="sm">
                Changer la photo
              </Button>
            </div>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input id="name" defaultValue="Thomas Durant" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="thomas@example.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input id="phone" type="tel" defaultValue="+33 6 12 34 56 78" />
            </div>

            <div className="pt-4">
              <Button className="w-full md:w-auto">
                <UserPen className="mr-2" size={20} />
                Mettre à jour le profil
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </TenantLayout>
  );
}
