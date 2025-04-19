
import { Card } from "@/components/ui/card";
import { Users, Calendar, CreditCard, AlertTriangle } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

export default function DashboardHome() {
  const stats = [
    { 
      title: "Upcoming Check-Ins/", 
      value: "9", 
      icon: Calendar, 
      color: "bg-blue-100",
      iconColor: "text-blue-500",
      textColor: "text-blue-900"
    },
    { 
      title: "Total Tenants", 
      value: "15", 
      icon: Users, 
      color: "bg-green-100",
      iconColor: "text-green-500",
      textColor: "text-green-900"
    },
    { 
      title: "Payments this Month", 
      value: "$7,650", 
      icon: CreditCard, 
      color: "bg-cyan-100",
      iconColor: "text-cyan-500",
      textColor: "text-cyan-900"
    },
    { 
      title: "Pre-notices", 
      value: "4", 
      icon: AlertTriangle, 
      color: "bg-red-100",
      iconColor: "text-red-500",
      textColor: "text-red-900"
    },
  ];

  const checkInOuts = [
    { tenant: "Sarah Martin", room: "Room 2", date: "Apr 30, 2024" },
    { tenant: "James Carter", room: "Room 4", date: "May 1, 2024" },
    { tenant: "Michael Chen", room: "Room 1", date: "May 1, 2024" },
    { tenant: "Emma Davis", room: "Room 3", date: "May 2, 2024" },
    { tenant: "Jason Lee", room: "Room 6", date: "May 3, 2024" },
    { tenant: "Laura Wilson", room: "Room 7", date: "May 3, 2024" },
  ];

  const overduePayments = [
    { tenant: "Adam Brown", rent: "$850", dueDate: "April 10, 2024" },
    { tenant: "Olivia Clark", rent: "$800", dueDate: "April 10, 2024" },
    { tenant: "Daniel White", rent: "$800", dueDate: "April 10, 2024" },
    { tenant: "Sophia Hall", rent: "$800", dueDate: "April 15, 2024" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-white mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className={`p-6 ${stat.color} border-none`}>
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-sm font-medium ${stat.textColor} mb-1`}>{stat.title}</p>
                <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
              </div>
              <div className={`p-2 rounded-lg ${stat.iconColor}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white p-6">
          <h2 className="text-xl font-semibold mb-4">Check-ins/Check-outs</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {checkInOuts.map((row) => (
                  <TableRow key={row.tenant}>
                    <TableCell>{row.tenant}</TableCell>
                    <TableCell>{row.room}</TableCell>
                    <TableCell>{row.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        <Card className="bg-white p-6">
          <h2 className="text-xl font-semibold mb-4">Tenants with Overdue Payments</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Rent</TableHead>
                  <TableHead>Due Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {overduePayments.map((row) => (
                  <TableRow key={row.tenant}>
                    <TableCell>{row.tenant}</TableCell>
                    <TableCell>{row.rent}</TableCell>
                    <TableCell>{row.dueDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
}
