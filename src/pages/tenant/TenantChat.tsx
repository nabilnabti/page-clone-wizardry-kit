
import { TenantLayout } from "@/components/tenant/TenantLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function TenantChat() {
  const messages = [
    { sender: "Landlord", message: "Hi Thomas, just checking if everything is okay with your room?", time: "10:30 AM" },
    { sender: "You", message: "Yes, everything is fine. Thank you for asking!", time: "10:45 AM" },
    { sender: "Landlord", message: "Great! Let me know if you need anything.", time: "11:00 AM" },
  ];

  return (
    <TenantLayout title="Chat" showBackButton>
      <div className="flex flex-col h-[calc(100vh-200px)]">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
            >
              <Card className={`p-3 max-w-[80%] ${
                msg.sender === "You" ? "bg-[#7FD1C7] text-white" : "bg-white"
              }`}>
                <div className="flex flex-col">
                  <p className="text-sm font-medium">{msg.sender}</p>
                  <p>{msg.message}</p>
                  <p className="text-xs text-right mt-1 opacity-70">{msg.time}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="sticky bottom-0 bg-[#1A2533] pt-2">
          <div className="flex gap-2">
            <Input placeholder="Type a message..." className="bg-white" />
            <Button className="bg-[#7FD1C7]">
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>
    </TenantLayout>
  );
}
