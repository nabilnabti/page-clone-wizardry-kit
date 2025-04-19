
import { Card } from "@/components/ui/card";
import { Users, Home, CreditCard } from "lucide-react";

export default function DashboardHome() {
  const stats = [
    { 
      title: "Total Tenants", 
      value: "5", 
      icon: Users, 
      color: "bg-blue-500",
      change: "+1 this month" 
    },
    { 
      title: "Properties", 
      value: "2", 
      icon: Home, 
      color: "bg-green-500",
      change: "All occupied" 
    },
    { 
      title: "Monthly Revenue", 
      value: "$3,750", 
      icon: CreditCard, 
      color: "bg-purple-500",
      change: "All payments on time" 
    },
  ];

  const recentActivities = [
    { date: "April 19, 2025", description: "Thomas uploaded cleaning evidence", type: "cleaning" },
    { date: "April 15, 2025", description: "Sarah paid rent for May", type: "payment" },
    { date: "April 12, 2025", description: "New house rule added", type: "rule" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-white mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 bg-[#242E3E] border-none shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-400 mt-2">{stat.change}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
      <Card className="p-4 bg-[#242E3E] border-none shadow-md">
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center p-2 hover:bg-[#2A3544] rounded-lg transition-colors">
              <div className="mr-4 w-12 text-sm text-gray-400">{activity.date}</div>
              <div className="flex-1 text-white">{activity.description}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
