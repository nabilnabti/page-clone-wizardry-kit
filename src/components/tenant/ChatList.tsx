
import { Card } from "@/components/ui/card";
import { UserRound } from "lucide-react";

interface ChatPreview {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread?: number;
  isLandlord?: boolean;
}

interface ChatListProps {
  chats: ChatPreview[];
  onChatSelect: (chatId: string) => void;
  selectedChatId?: string;
}

export function ChatList({ chats, onChatSelect, selectedChatId }: ChatListProps) {
  return (
    <div className="space-y-2">
      {chats.map((chat) => (
        <Card
          key={chat.id}
          className={`p-3 hover:bg-[#2A3544] cursor-pointer transition-colors ${
            selectedChatId === chat.id ? "bg-[#2A3544]" : "bg-[#242E3E]"
          }`}
          onClick={() => onChatSelect(chat.id)}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${
              chat.isLandlord ? "bg-[#7FD1C7]/20" : "bg-blue-500/20"
            }`}>
              <UserRound className={`h-5 w-5 ${
                chat.isLandlord ? "text-[#7FD1C7]" : "text-blue-500"
              }`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <p className="font-medium text-white truncate">{chat.name}</p>
                <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{chat.time}</span>
              </div>
              <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
            </div>
            {chat.unread && (
              <div className="bg-[#7FD1C7] text-[#1A2533] text-xs font-medium px-2 py-1 rounded-full">
                {chat.unread}
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
