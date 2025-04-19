import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { User, Mail, Phone } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getTenantsByProperty } from "@/services/tenantService";
import { Loader2 } from "lucide-react";
import { AddTenantDialog } from "./AddTenantDialog";

export function PropertyTenants({ propertyId }: { propertyId?: string }) {
  const { data: tenants = [], isLoading, refetch } = useQuery({
    queryKey: ['tenants', propertyId],
    queryFn: () => getTenantsByProperty(propertyId || ''),
    enabled: !!propertyId
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-[#7FD1C7]" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Locataires</h2>
        {propertyId && <AddTenantDialog propertyId={propertyId} onTenantAdded={() => refetch()} />}
      </div>
      
      {tenants.length === 0 ? (
        <Card className="p-8 bg-[#242E3E] border-none shadow-md text-center">
          <User className="h-12 w-12 mx-auto mb-4 text-gray-500" />
          <h3 className="text-white text-lg font-medium mb-2">Aucun locataire</h3>
          <p className="text-gray-400 mb-6">Vous n'avez pas encore ajouté de locataires à cette propriété.</p>
          {propertyId && <AddTenantDialog propertyId={propertyId} onTenantAdded={() => refetch()} />}
        </Card>
      ) : (
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
                    <p className="text-sm text-[#7FD1C7]">{tenant.roomNumber}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-300">
                    <Mail size={16} className="mr-2" />
                    <span>{tenant.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <Phone size={16} className="mr-2" />
                    <span>{tenant.phone || 'No phone number'}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-700 pt-3 mt-2 flex justify-between">
                  <div className="text-sm text-gray-400">
                    Depuis: {new Date(tenant.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
