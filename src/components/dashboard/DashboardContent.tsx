
import { Calendar, Bell, Users, CreditCard } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

export function DashboardContent() {
  return (
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-[#EEF7FF] p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-3xl font-bold">9</p>
              <p className="text-sm text-gray-600">Upcoming Check-Ins</p>
            </div>
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>
        </Card>

        <Card className="bg-[#F0FFF4] p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-3xl font-bold">15</p>
              <p className="text-sm text-gray-600">Total Tenants</p>
            </div>
            <Users className="h-6 w-6 text-green-600" />
          </div>
        </Card>

        <Card className="bg-[#E6FFFA] p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-3xl font-bold">$7,650</p>
              <p className="text-sm text-gray-600">Payments this Month</p>
            </div>
            <CreditCard className="h-6 w-6 text-teal-600" />
          </div>
        </Card>

        <Card className="bg-[#FFF5F5] p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-3xl font-bold">4</p>
              <p className="text-sm text-gray-600">Pre-notices</p>
            </div>
            <Bell className="h-6 w-6 text-red-600" />
          </div>
        </Card>
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
                {[
                  { tenant: "Sarah Martin", room: "Room 2", date: "Apr 30, 2024" },
                  { tenant: "James Carter", room: "Room 4", date: "May 1, 2024" },
                  { tenant: "Michael Chen", room: "Room 1", date: "May 1, 2024" },
                ].map((row) => (
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
                {[
                  { tenant: "Adam Brown", rent: "$850", dueDate: "April 10, 2024" },
                  { tenant: "Olivia Clark", rent: "$800", dueDate: "April 10, 2024" },
                  { tenant: "Daniel White", rent: "$800", dueDate: "April 10, 2024" },
                ].map((row) => (
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
