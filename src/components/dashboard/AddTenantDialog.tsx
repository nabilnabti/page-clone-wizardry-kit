
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Copy, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addTenant } from "@/services/tenantService";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

interface AddTenantDialogProps {
  propertyId?: string;
  onTenantAdded: () => void;
}

export function AddTenantDialog({ propertyId, onTenantAdded }: AddTenantDialogProps) {
  const [email, setEmail] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentPropertyId, setCurrentPropertyId] = useState<string | null>(null);

  // Get the property ID from localStorage on component mount and when it changes
  useEffect(() => {
    const storedPropertyId = localStorage.getItem('currentPropertyId');
    setCurrentPropertyId(storedPropertyId);
  }, [propertyId]);

  // Priority: 1. Passed propertyId prop, 2. localStorage propertyId, 3. user.propertyId
  const activePropertyId = propertyId || currentPropertyId || user?.propertyId;
  const inviteLink = activePropertyId ? `https://yourapp.com/join/${activePropertyId}/${btoa(email)}` : '';

  const handleButtonClick = () => {
    if (!activePropertyId) {
      toast({
        title: "Aucune propriété sélectionnée",
        description: "Vous devez d'abord créer ou sélectionner une propriété avant d'ajouter des locataires.",
        variant: "destructive",
      });
      navigate("/dashboard/house-parameters/new");
      return;
    }
    setIsOpen(true);
  };

  const handleAddTenant = async () => {
    if (!email) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez saisir une adresse email.",
      });
      return;
    }
    
    if (!activePropertyId) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Aucune propriété sélectionnée.",
      });
      setIsOpen(false);
      navigate("/dashboard/house-parameters/new");
      return;
    }
    
    setIsLoading(true);
    try {
      const tenantData = {
        email,
        propertyId: activePropertyId,
        status: 'pending' as const,
        rent: 0,
        roomNumber: '',
        moveInDate: new Date().toISOString(),
      };
      
      await addTenant({
        ...tenantData,
        userId: '',
        name: email.split('@')[0],
      });
      
      toast({
        title: "Invitation envoyée",
        description: "Le locataire a été invité avec succès.",
      });
      
      onTenantAdded();
      setIsOpen(false);
      setEmail('');
    } catch (error) {
      console.error("Error adding tenant:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'invitation.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    toast({
      title: "Lien copié",
      description: "Le lien d'invitation a été copié dans le presse-papier.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild data-testid="add-tenant-trigger">
        <Button 
          className="bg-[#7FD1C7] hover:bg-[#6BC0B6] text-[#1A2533]"
          onClick={handleButtonClick}
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Ajouter un locataire
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#242E3E] text-white border-none">
        <DialogHeader>
          <DialogTitle className="text-white">Inviter un locataire</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email du locataire</Label>
            <div className="flex gap-2">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#1A2533] border-gray-700 text-white"
                placeholder="email@exemple.com"
              />
              <Button 
                onClick={handleAddTenant} 
                className="bg-[#7FD1C7] hover:bg-[#6BC0B6] text-[#1A2533]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 animate-spin" />
                    Envoi...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    Inviter
                  </span>
                )}
              </Button>
            </div>
          </div>

          {email && (
            <div className="space-y-2">
              <Label className="text-white">Lien d'invitation</Label>
              <div className="flex gap-2">
                <Input
                  readOnly
                  value={inviteLink}
                  className="bg-[#1A2533] border-gray-700 text-white"
                />
                <Button onClick={copyInviteLink} variant="outline" className="border-gray-700">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-400">
                Partagez ce lien avec votre locataire pour qu'il puisse rejoindre la propriété
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
