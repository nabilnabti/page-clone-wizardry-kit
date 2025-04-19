
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Plus } from "lucide-react";

export default function SublettingRules() {
  const rules = [
    {
      id: 1,
      title: "Prior Approval Required",
      description: "All subletting arrangements must be approved by the property owner at least 30 days in advance.",
      important: true
    },
    {
      id: 2,
      title: "Minimum Stay",
      description: "Subletting is only allowed for periods of at least 1 month.",
      important: false
    },
    {
      id: 3,
      title: "Tenant Responsibility",
      description: "The primary tenant remains responsible for rent payments and any damages caused by the subtenant.",
      important: true
    },
    {
      id: 4,
      title: "Subtenant Agreement",
      description: "A written agreement between the tenant and subtenant must be provided to the property owner.",
      important: false
    },
    {
      id: 5,
      title: "Subtenant Screening",
      description: "The property owner reserves the right to screen potential subtenants and deny approval.",
      important: false
    }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-white">Subletting Rules</h1>
        <Button className="bg-[#7FD1C7] hover:bg-[#6BC0B6] text-[#1A2533]">
          <Plus size={18} className="mr-2" />
          Add New Rule
        </Button>
      </div>
      
      <div className="space-y-4">
        {rules.map((rule) => (
          <Card key={rule.id} className={`p-5 ${rule.important ? 'border-l-4 border-l-[#7FD1C7]' : ''} bg-[#242E3E] border-y-0 border-r-0 shadow-md`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center mb-2">
                  {rule.important && (
                    <span className="bg-[#7FD1C7]/20 text-[#7FD1C7] text-xs px-2.5 py-1 rounded mr-2">
                      Important
                    </span>
                  )}
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
