
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Check, AlertCircle } from "lucide-react";

export default function Payments() {
  const payments = [
    {
      id: 1,
      tenant: "Thomas Martin",
      room: "Room 1",
      date: "April 1, 2025",
      amount: "$750",
      status: "paid"
    },
    {
      id: 2,
      tenant: "Sarah Johnson",
      room: "Room 2",
      date: "April 1, 2025",
      amount: "$750",
      status: "paid"
    },
    {
      id: 3,
      tenant: "Michael Brown",
      room: "Room 3",
      date: "April 1, 2025",
      amount: "$750",
      status: "paid"
    },
    {
      id: 4,
      tenant: "Emma Wilson",
      room: "Room 4",
      date: "April 1, 2025",
      amount: "$750",
      status: "paid"
    },
    {
      id: 5,
      tenant: "David Lee",
      room: "Room 5",
      date: "April 1, 2025",
      amount: "$750",
      status: "pending"
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-white">Payments</h1>
        <Button className="bg-[#7FD1C7] hover:bg-[#6BC0B6] text-[#1A2533]">
          <Download size={16} className="mr-2" />
          Export
        </Button>
      </div>
      
      <Card className="p-4 bg-[#242E3E] border-none shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="p-4 bg-[#2A3544] rounded-lg">
            <p className="text-gray-400 text-sm">Total Rent</p>
            <p className="text-2xl font-bold text-white">$3,750</p>
          </div>
          <div className="p-4 bg-[#2A3544] rounded-lg">
            <p className="text-gray-400 text-sm">Collected</p>
            <p className="text-2xl font-bold text-green-400">$3,000</p>
          </div>
          <div className="p-4 bg-[#2A3544] rounded-lg">
            <p className="text-gray-400 text-sm">Pending</p>
            <p className="text-2xl font-bold text-yellow-400">$750</p>
          </div>
        </div>
      </Card>
      
      <h2 className="text-xl font-semibold text-white mb-4">April 2025</h2>
      <Card className="overflow-hidden bg-[#242E3E] border-none shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#2A3544]">
              <tr>
                <th className="text-left p-4 text-gray-400 font-medium">Tenant</th>
                <th className="text-left p-4 text-gray-400 font-medium">Room</th>
                <th className="text-left p-4 text-gray-400 font-medium">Date</th>
                <th className="text-left p-4 text-gray-400 font-medium">Amount</th>
                <th className="text-left p-4 text-gray-400 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-t border-gray-700 hover:bg-[#2A3544] transition-colors">
                  <td className="p-4 text-white">{payment.tenant}</td>
                  <td className="p-4 text-gray-300">{payment.room}</td>
                  <td className="p-4 text-gray-300">{payment.date}</td>
                  <td className="p-4 text-white font-medium">{payment.amount}</td>
                  <td className="p-4">
                    {payment.status === "paid" ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-900/30 text-green-400">
                        <Check size={14} className="mr-1" /> Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-900/30 text-yellow-400">
                        <AlertCircle size={14} className="mr-1" /> Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
