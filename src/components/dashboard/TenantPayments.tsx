
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, CreditCard, AlertCircle, Calendar, Receipt, FileText, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

// Ce composant sera mis à jour ultérieurement pour intégrer les paiements réels
export function TenantPayments({ tenantId }: { tenantId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  // Simulons un appel API avec useState pour le moment
  // Dans une implémentation réelle, cela viendrait de Firestore
  const [payments, setPayments] = useState<any[]>([]);
  
  const paidPayments = payments.filter(payment => payment.status === "paid");
  const pendingPayments = payments.filter(payment => payment.status === "pending");
  
  // Calculer les totaux
  const totalPaid = paidPayments.reduce((sum, payment) => 
    sum + parseFloat(payment.amount.replace('€', '')), 0);
  const totalPending = pendingPayments.reduce((sum, payment) => 
    sum + parseFloat(payment.amount.replace('€', '')), 0);

  // Simuler un chargement initial
  useState(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Receipt className="h-5 w-5 text-[#7FD1C7] mr-2" />
              Total Payé
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">€{totalPaid.toFixed(2)}</p>
            <p className="text-sm text-gray-500">{paidPayments.length} paiements</p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileText className="h-5 w-5 text-amber-500 mr-2" />
              En Attente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">€{totalPending.toFixed(2)}</p>
            <p className="text-sm text-gray-500">{pendingPayments.length} paiements</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Historique des paiements</h2>
        <Button className="bg-[#7FD1C7] hover:bg-[#6BC0B6] text-[#1A2533]">
          <CreditCard className="mr-2 h-4 w-4" />
          Enregistrer un paiement
        </Button>
      </div>
      
      {pendingPayments.length === 0 && paidPayments.length === 0 ? (
        <Card className="p-8 bg-[#242E3E] border-none shadow-md text-center">
          <CreditCard className="h-12 w-12 mx-auto mb-4 text-gray-500" />
          <h3 className="text-white text-lg font-medium mb-2">Aucun paiement</h3>
          <p className="text-gray-400 mb-6">Ce locataire n'a pas encore de paiements enregistrés.</p>
          <Button className="bg-[#7FD1C7] hover:bg-[#6BC0B6] text-[#1A2533] mx-auto">
            Ajouter un premier paiement
          </Button>
        </Card>
      ) : (
        <>
          {pendingPayments.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-white mb-3">Paiements à venir</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pendingPayments.map((payment) => (
                  <Card key={payment.id} className="bg-white overflow-hidden">
                    <div className="bg-amber-50 px-4 py-2 border-b border-amber-100 flex justify-between items-center">
                      <div className="flex items-center">
                        <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                        <span className="font-medium text-amber-800">En attente</span>
                      </div>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Échéance: {new Date(payment.dueDate).toLocaleDateString()}
                      </Badge>
                    </div>
                    <CardContent className="pt-4">
                      <div className="flex justify-between mb-2">
                        <div>
                          <p className="text-sm text-gray-500">Montant</p>
                          <p className="text-xl font-semibold">{payment.amount}</p>
                        </div>
                        <Button variant="outline" className="border-[#7FD1C7] text-[#7FD1C7] hover:bg-[#7FD1C7]/10">
                          Marquer comme payé
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {paidPayments.length > 0 ? (
            <div>
              <h3 className="text-lg font-medium text-white mb-3">Paiements effectués</h3>
              <div className="bg-white rounded-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 text-left">
                        <th className="px-4 py-3 text-sm font-medium text-gray-500">Date</th>
                        <th className="px-4 py-3 text-sm font-medium text-gray-500">Montant</th>
                        <th className="px-4 py-3 text-sm font-medium text-gray-500">Méthode</th>
                        <th className="px-4 py-3 text-sm font-medium text-gray-500">Référence</th>
                        <th className="px-4 py-3 text-sm font-medium text-gray-500">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {paidPayments.map((payment) => (
                        <tr key={payment.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">{new Date(payment.date).toLocaleDateString()}</td>
                          <td className="px-4 py-3 font-medium">{payment.amount}</td>
                          <td className="px-4 py-3">{payment.method}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">{payment.reference}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center text-green-600">
                              <Check className="h-4 w-4 mr-1" />
                              Payé
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400 mt-4">
              Aucun paiement effectué
            </div>
          )}
        </>
      )}
    </div>
  );
}
