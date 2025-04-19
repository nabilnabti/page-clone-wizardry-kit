
export interface User {
  id: string;
  email: string;
  name: string;
  role: "tenant" | "landlord";
  createdAt: string;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  rooms: number;
  landlordId: string;
  createdAt: string;
  imageUrl?: string;
}

export interface Tenant {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  propertyId: string;
  roomNumber: string;
  moveInDate: string;
  moveOutDate?: string;
  rent: number;
  status: "active" | "inactive";
  profileImageUrl?: string;
  createdAt: string;
}

export interface CleaningTask {
  id: string;
  propertyId: string;
  task: string;
  date: string;
  assignedTenantId: string;
  status: "upcoming" | "completed";
  photoUrl?: string;
  completedAt?: string;
  createdAt: string;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Chat {
  id: string;
  participants: string[];
  lastMessage?: string;
  lastMessageTimestamp?: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  tenantId: string;
  propertyId: string;
  amount: number;
  status: "pending" | "paid" | "late";
  dueDate: string;
  paidDate?: string;
  description: string;
  createdAt: string;
}

export interface HouseRule {
  id: string;
  propertyId: string;
  title: string;
  description: string;
  createdAt: string;
}
