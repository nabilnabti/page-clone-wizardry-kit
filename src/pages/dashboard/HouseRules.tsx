
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash } from "lucide-react";

export default function HouseRules() {
  const rules = [
    {
      id: 1,
      title: "Quiet Hours",
      description: "Quiet hours are from 10:00 PM to 7:00 AM. Please be considerate of your neighbors during these hours.",
      category: "Noise"
    },
    {
      id: 2,
      title: "Common Areas",
      description: "Keep common areas clean and tidy. Remove personal belongings after use and clean up any mess you make.",
      category: "Cleanliness"
    },
    {
      id: 3,
      title: "Guests",
      description: "Guests are welcome but should not stay for more than 3 consecutive nights without prior approval.",
      category: "Visitors"
    },
    {
      id: 4,
      title: "Smoking",
      description: "Smoking is not allowed inside the property. Please use designated outdoor smoking areas.",
      category: "Health & Safety"
    },
    {
      id: 5,
      title: "Garbage & Recycling",
      description: "Sort your garbage according to local regulations. Garbage collection is on Mondays and Thursdays.",
      category: "Cleanliness"
    }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-white">House Rules</h1>
        <Button className="bg-[#7FD1C7] hover:bg-[#6BC0B6] text-[#1A2533]">
          <Plus size={18} className="mr-2" />
          Add New Rule
        </Button>
      </div>
      
      <div className="space-y-4">
        {rules.map((rule) => (
          <Card key={rule.id} className="p-5 bg-[#242E3E] border-none shadow-md">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center mb-2">
                  <span className="bg-[#7FD1C7]/20 text-[#7FD1C7] text-xs px-2.5 py-1 rounded mr-2">
                    {rule.category}
                  </span>
                  <h3 className="text-white font-medium">{rule.title}</h3>
                </div>
                <p className="text-gray-300 text-sm">{rule.description}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-[#2A3544]">
                  <Edit size={16} className="mr-1" />
                  Edit
                </Button>
                <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-[#2A3544]">
                  <Trash size={16} className="mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
