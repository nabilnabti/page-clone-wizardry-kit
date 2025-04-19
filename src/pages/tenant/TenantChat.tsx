
import { useState } from "react";
import { TenantLayout } from "@/components/tenant/TenantLayout";
import { ChatList } from "@/components/tenant/ChatList";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, ArrowLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent } from "@/components/ui/sheet";

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
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const isMobile = useIsMobile();
  const messages = selectedChat ? conversationHistory[selectedChat] || [] : [];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    // In a real app, this would send the message to an API
    // For now, we'll just clear the input
    setNewMessage("");
  };

  const handleSelectChat = (chatId: string) => {
    setSelectedChat(chatId);
  };

  const handleBackToList = () => {
    setSelectedChat(null);
  };

  // On desktop, we show both the list and the conversation
  if (!isMobile) {
    return (
      <TenantLayout title="Messages" showBackButton>
        <div className="grid md:grid-cols-[350px,1fr] gap-4 h-[calc(100vh-200px)]">
          <div className="overflow-y-auto pb-4">
            <ChatList
              chats={chatList}
              onChatSelect={handleSelectChat}
              selectedChatId={selectedChat || undefined}
            />
          </div>

          <div className="flex flex-col">
            {selectedChat ? (
              <>
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
                    <Input 
                      placeholder="Écrivez un message..." 
                      className="bg-white" 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <Button className="bg-[#7FD1C7]" onClick={handleSendMessage}>
                      <Send size={18} />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-400">
                  <p>Sélectionnez une conversation pour commencer à discuter</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </TenantLayout>
    );
  }

  // On mobile, we show either the list or the conversation in a sliding sheet
  return (
    <TenantLayout title="Messages" showBackButton={false}>
      <div className="h-[calc(100vh-200px)]">
        {/* Always show the chat list on mobile as the main view */}
        <div className="overflow-y-auto pb-20">
          <ChatList
            chats={chatList}
            onChatSelect={handleSelectChat}
            selectedChatId={selectedChat || undefined}
          />
        </div>

        {/* Sheet for displaying the conversation on mobile */}
        <Sheet open={!!selectedChat} onOpenChange={(open) => !open && setSelectedChat(null)}>
          <SheetContent side="bottom" className="h-[95vh] p-0 rounded-t-xl">
            <div className="flex flex-col h-full bg-[#1A2533]">
              {/* Chat header */}
              <div className="flex items-center gap-2 p-4 border-b border-gray-700">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleBackToList}
                  className="mr-2 text-white"
                >
                  <ArrowLeft size={20} />
                </Button>
                <div className="font-medium text-white">
                  {selectedChat && chatList.find(chat => chat.id === selectedChat)?.name}
                </div>
              </div>
              
              {/* Messages container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
              
              {/* Message input */}
              <div className="sticky bottom-0 bg-[#1A2533] p-4 border-t border-gray-700">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Écrivez un message..." 
                    className="bg-white" 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <Button className="bg-[#7FD1C7]" onClick={handleSendMessage}>
                    <Send size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </TenantLayout>
  );
}
