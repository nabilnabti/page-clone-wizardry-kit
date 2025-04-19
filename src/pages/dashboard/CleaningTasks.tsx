
import { Card } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Calendar } from "lucide-react";

// Sample data - in a real app, this would come from your backend
const cleaningTasks = [
  {
    id: 1,
    property: "123 Main Street",
    tenant: "Thomas Wilson",
    room: "Room 1",
    task: "Kitchen & Common Areas",
    date: "April 26, 2025",
    status: "Upcoming",
  },
  {
    id: 2,
    property: "456 Park Avenue",
    tenant: "Sarah Johnson",
    room: "Room 3",
    task: "Bathroom & Hallway",
    date: "May 10, 2025",
    status: "Upcoming",
  },
  {
    id: 3,
    property: "789 Beach Road",
    tenant: "Michael Brown",
    room: "Room 2",
    task: "Living Room & Dining",
    date: "May 24, 2025",
    status: "Completed",
  },
];

export default function CleaningTasks() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-white mb-6">Cleaning Tasks</h1>

      <Card className="bg-white p-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cleaningTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.property}</TableCell>
                  <TableCell>{task.tenant}</TableCell>
                  <TableCell>{task.room}</TableCell>
                  <TableCell>{task.task}</TableCell>
                  <TableCell>{task.date}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        task.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {task.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
