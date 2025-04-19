
import { TenantLayout } from "@/components/tenant/TenantLayout";
import { Card } from "@/components/ui/card";

export default function TenantCleaning() {
  const cleaningTasks = [
    { date: "April 26, 2025", task: "Kitchen & Common Areas", assigned: "Thomas", status: "Upcoming" },
    { date: "May 10, 2025", task: "Bathroom & Hallway", assigned: "Thomas", status: "Upcoming" },
    { date: "May 24, 2025", task: "Living Room & Dining", assigned: "Thomas", status: "Upcoming" },
  ];

  return (
    <TenantLayout title="Cleaning Schedule" showBackButton>
      <div className="space-y-4">
        <h2 className="text-white font-medium mb-2">Your Tasks</h2>
        {cleaningTasks.map((task, index) => (
          <Card key={index} className="p-4 bg-white rounded-xl">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 flex items-center justify-center rounded-full ${
                task.status === "Completed" ? "bg-green-100" : "bg-[#7FD1C7]/10"
              }`}>
                <span className={task.status === "Completed" ? "text-green-500" : "text-[#7FD1C7]"}>
                  {task.date.split(",")[0].split(" ")[1]}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-medium">{task.task}</p>
                <p className="text-sm text-gray-500">{task.date}</p>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  task.status === "Completed" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                }`}>
                  {task.status}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </TenantLayout>
  );
}
