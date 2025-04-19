
import { useState } from "react";
import { TenantLayout } from "@/components/tenant/TenantLayout";
import { ChatList } from "@/components/tenant/ChatList";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

// Mock data - in a real app this would come from an API
const chatList = [
  {
    id: "landlord",
    name: "John Smith (Propriétaire)",
    lastMessage: "Great! Let me know if you need anything.",
    time: "11:00",
    isLandlord: true,
  },
  {
    id: "emma",
    name: "Emma Wilson",
    lastMessage: "Perfect, thanks!",
    time: "10:30",
    unread: 2,
  },
  {
    id: "michael",
    name: "Michael Brown",
    lastMessage: "See you tomorrow then!",
    time: "Hier",
  },
];

const conversationHistory = {
  landlord: [
    { sender: "Landlord", message: "Hi Thomas, just checking if everything is okay with your room?", time: "10:30" },
    { sender: "You", message: "Yes, everything is fine. Thank you for asking!", time: "10:45" },
    { sender: "Landlord", message: "Great! Let me know if you need anything.", time: "11:00" },
  ],
  emma: [
    { sender: "Emma", message: "Hey, are you free this evening?", time: "10:00" },
    { sender: "You", message: "Yes, what's up?", time: "10:15" },
    { sender: "Emma", message: "We're planning a movie night!", time: "10:20" },
    { sender: "You", message: "Sounds good!", time: "10:25" },
    { sender: "Emma", message: "Perfect, thanks!", time: "10:30" },
  ],
  michael: [
    { sender: "Michael", message: "Don't forget about the cleaning schedule tomorrow", time: "Hier" },
    { sender: "You", message: "Thanks for the reminder!", time: "Hier" },
    { sender: "Michael", message: "See you tomorrow then!", time: "Hier" },
  ],
};

export default function TenantChat() {
  const [selectedChat, setSelectedChat] = useState("landlord");
  const messages = conversationHistory[selectedChat] || [];

  return (
    <TenantLayout title="Messages" showBackButton>
      <div className="grid md:grid-cols-[350px,1fr] gap-4 h-[calc(100vh-200px)]">
        <div className="hidden md:block overflow-y-auto pb-4">
          <ChatList
            chats={chatList}
            onChatSelect={setSelectedChat}
            selectedChatId={selectedChat}
          />
        </div>

        <div className="flex flex-col">
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
              <Input placeholder="Écrivez un message..." className="bg-white" />
              <Button className="bg-[#7FD1C7]">
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </TenantLayout>
  );
}
