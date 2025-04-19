
import { TenantLayout } from "@/components/tenant/TenantLayout";
import { Card } from "@/components/ui/card";

export default function TenantPayments() {
  const payments = [
    { date: "April 1, 2025", amount: "$750", status: "Paid" },
    { date: "May 1, 2025", amount: "$750", status: "Upcoming" },
    { date: "June 1, 2025", amount: "$750", status: "Upcoming" },
  ];

  return (
    <TenantLayout title="Payments" showBackButton>
      <div className="space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0 md:max-w-4xl">
        {payments.map((payment, index) => (
          <Card key={index} className="p-4 bg-white rounded-xl">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{payment.date}</p>
                <p className="text-sm text-gray-500">Monthly Rent</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{payment.amount}</p>
                <p className={`text-sm ${
                  payment.status === "Paid" ? "text-green-500" : "text-gray-500"
                }`}>
                  {payment.status}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </TenantLayout>
  );
}
