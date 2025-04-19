
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, CreditCard, AlertCircle, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data - in a real app this would come from an API
const paymentsByTenant = {
  "1": [
    {
      id: 1,
      date: "April 15, 2025",
      dueDate: "April 15, 2025",
      amount: "€250",
      status: "paid",
      method: "Virement bancaire",
      reference: "REF123456"
    },
    {
      id: 2,
      date: "April 8, 2025",
      dueDate: "April 8, 2025",
      amount: "€250",
      status: "paid",
      method: "Virement bancaire",
      reference: "REF123455"
    },
    {
      id: 3,
      date: "April 1, 2025",
      dueDate: "April 1, 2025",
      amount: "€250",
      status: "paid",
      method: "Virement bancaire",
      reference: "REF123454"
    },
    {
      id: 4,
      date: "",
      dueDate: "April 22, 2025",
      amount: "€250",
      status: "pending",
      method: "",
      reference: ""
    },
  ],
  "2": [
    {
      id: 5,
      date: "April 1, 2025",
      dueDate: "April 1, 2025",
      amount: "€800",
      status: "paid",
      method: "Carte bancaire",
      reference: "CB987654"
    },
    {
      id: 6,
      date: "March 1, 2025",
      dueDate: "March 1, 2025",
      amount: "€800",
      status: "paid",
      method: "Carte bancaire",
      reference: "CB987653"
    },
    {
      id: 7,
      date: "",
      dueDate: "May 1, 2025",
      amount: "€800",
      status: "pending",
      method: "",
      reference: ""
    },
  ],
  "3": [
    {
      id: 8,
      date: "April 1, 2025",
      dueDate: "April 1, 2025",
      amount: "€850",
      status: "paid",
      method: "Virement bancaire",
      reference: "REF567890"
    },
    {
      id: 9,
      date: "",
      dueDate: "May 1, 2025",
      amount: "€850",
      status: "pending",
      method: "",
      reference: ""
    },
  ],
};

export function TenantPayments({ tenantId }: { tenantId: string }) {
  const payments = paymentsByTenant[tenantId] || [];
  const paidPayments = payments.filter(payment => payment.status === "paid");
  const pendingPayments = payments.filter(payment => payment.status === "pending");

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Historique des paiements</h2>
        <Button className="bg-[#7FD1C7] hover:bg-[#6BC0B6] text-[#1A2533]">
          <CreditCard className="mr-2 h-4 w-4" />
          Enregistrer un paiement
        </Button>
      </div>
      
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
                    Échéance: {payment.dueDate}
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
                    <td className="px-4 py-3">{payment.date}</td>
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
    </div>
  );
}
