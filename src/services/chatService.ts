
import { db } from "@/lib/firebase";
import { collection, doc, setDoc, getDoc, getDocs, query, where, orderBy, limit, onSnapshot, Unsubscribe, writeBatch } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

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

export const createChat = async (participants: string[]): Promise<string> => {
  const chatId = uuidv4();
  
  const chatData = {
    id: chatId,
    participants,
    createdAt: new Date().toISOString()
  };

  await setDoc(doc(db, "chats", chatId), chatData);
  return chatId;
};

export const getChat = async (chatId: string): Promise<Chat | null> => {
  const docRef = doc(db, "chats", chatId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data() as Chat;
  } else {
    return null;
  }
};

export const getChatByParticipants = async (participant1: string, participant2: string): Promise<Chat | null> => {
  const q = query(
    collection(db, "chats"),
    where("participants", "array-contains", participant1)
  );
  
  const querySnapshot = await getDocs(q);
  let chat: Chat | null = null;
  
  querySnapshot.forEach((doc) => {
    const chatData = doc.data() as Chat;
    if (chatData.participants.includes(participant2)) {
      chat = chatData;
    }
  });
  
  return chat;
};

export const getUserChats = async (userId: string): Promise<Chat[]> => {
  const q = query(
    collection(db, "chats"),
    where("participants", "array-contains", userId),
    orderBy("lastMessageTimestamp", "desc")
  );
  
  const querySnapshot = await getDocs(q);
  
  const chats: Chat[] = [];
  querySnapshot.forEach((doc) => {
    chats.push(doc.data() as Chat);
  });
  
  return chats;
};

export const sendMessage = async (chatId: string, senderId: string, senderName: string, text: string): Promise<string> => {
  const messageId = uuidv4();
  const timestamp = new Date().toISOString();
  
  const messageData = {
    id: messageId,
    chatId,
    senderId,
    senderName,
    text,
    timestamp,
    read: false
  };

  await setDoc(doc(db, "messages", messageId), messageData);
  
  // Update the chat with the last message info
  await setDoc(doc(db, "chats", chatId), {
    lastMessage: text,
    lastMessageTimestamp: timestamp
  }, { merge: true });
  
  return messageId;
};

export const getChatMessages = async (chatId: string): Promise<Message[]> => {
  const q = query(
    collection(db, "messages"),
    where("chatId", "==", chatId),
    orderBy("timestamp", "asc")
  );
  
  const querySnapshot = await getDocs(q);
  
  const messages: Message[] = [];
  querySnapshot.forEach((doc) => {
    messages.push(doc.data() as Message);
  });
  
  return messages;
};

export const markMessagesAsRead = async (chatId: string, userId: string): Promise<void> => {
  const q = query(
    collection(db, "messages"),
    where("chatId", "==", chatId),
    where("senderId", "!=", userId),
    where("read", "==", false)
  );
  
  const querySnapshot = await getDocs(q);
  
  // Create a batch with writeBatch instead of db.batch()
  const batch = writeBatch(db);
  querySnapshot.forEach((doc) => {
    batch.update(doc.ref, { read: true });
  });
  
  await batch.commit();
};

export const subscribeToMessages = (chatId: string, callback: (messages: Message[]) => void): Unsubscribe => {
  const q = query(
    collection(db, "messages"),
    where("chatId", "==", chatId),
    orderBy("timestamp", "asc")
  );
  
  return onSnapshot(q, (querySnapshot) => {
    const messages: Message[] = [];
    querySnapshot.forEach((doc) => {
      messages.push(doc.data() as Message);
    });
    callback(messages);
  });
};

export const subscribeToChats = (userId: string, callback: (chats: Chat[]) => void): Unsubscribe => {
  const q = query(
    collection(db, "chats"),
    where("participants", "array-contains", userId),
    orderBy("lastMessageTimestamp", "desc")
  );
  
  return onSnapshot(q, (querySnapshot) => {
    const chats: Chat[] = [];
    querySnapshot.forEach((doc) => {
      chats.push(doc.data() as Chat);
    });
    callback(chats);
  });
};
