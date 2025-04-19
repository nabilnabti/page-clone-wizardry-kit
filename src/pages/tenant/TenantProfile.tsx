
import { TenantLayout } from "@/components/tenant/TenantLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPen, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getTenantByUserId, updateTenant } from "@/services/tenantService";
import { updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

export default function TenantProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tenantId, setTenantId] = useState<string | null>(null);
  
  const { user, logout } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      setEmail(user.email || "");
      setName(user.displayName || "");

      try {
        const tenant = await getTenantByUserId(user.uid);
        if (tenant) {
          setTenantId(tenant.id);
          setPhone(tenant.phone || "");
          setProfileImageUrl(tenant.profileImageUrl || "");
        }
      } catch (error) {
        console.error("Error fetching tenant data:", error);
      }
    };

    fetchUserData();
  }, [user]);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setProfileImageUrl(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      // Update Firebase Auth profile
      await updateProfile(auth.currentUser!, {
        displayName: name
      });
      
      // Update tenant data in Firestore if tenant exists
      if (tenantId) {
        await updateTenant(
          tenantId, 
          { name, phone }, 
          profileImage || undefined
        );
      }
      
      toast({
        title: "Profil mis à jour",
        description: "Votre profil a été mis à jour avec succès",
      });
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du profil",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TenantLayout title="Mon Profil" showBackButton>
      <div className="space-y-6 md:max-w-2xl">
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-8">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profileImageUrl || "https://github.com/shadcn.png"} />
              <AvatarFallback>{name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <label htmlFor="profile-image" className="cursor-pointer">
                <Button variant="outline" size="sm" type="button">
                  Changer la photo
                </Button>
                <Input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfileImageChange}
                />
              </label>
            </div>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email"

                value={email} 
                disabled
                className="bg-gray-100"
              />
              <p className="text-xs text-gray-500">L'email ne peut pas être modifié</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input 
                id="phone" 
                type="tel" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="pt-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
              <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                <UserPen className="mr-2" size={20} />
                {isLoading ? "Mise à jour..." : "Mettre à jour le profil"}
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                onClick={logout}
                className="w-full md:w-auto"
              >
                <LogOut className="mr-2" size={20} />
                Déconnexion
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </TenantLayout>
  );
}
