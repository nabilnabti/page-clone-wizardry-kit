
import { db, storage } from "@/lib/firebase";
import { collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export interface Property {
  id: string;
  name: string;
  address: string;
  rooms: number;
  landlordId: string;
  createdAt: string;
  imageUrl?: string;
}

export const addProperty = async (property: Omit<Property, "id" | "createdAt">, imageFile?: File): Promise<string> => {
  const propertyId = uuidv4();
  let imageUrl = undefined;

  if (imageFile) {
    const storageRef = ref(storage, `properties/${propertyId}/${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    imageUrl = await getDownloadURL(storageRef);
  }

  const propertyData = {
    ...property,
    id: propertyId,
    createdAt: new Date().toISOString(),
    imageUrl
  };

  await setDoc(doc(db, "properties", propertyId), propertyData);
  return propertyId;
};

export const getProperty = async (propertyId: string): Promise<Property | null> => {
  const docRef = doc(db, "properties", propertyId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data() as Property;
  } else {
    return null;
  }
};

export const getPropertiesByLandlord = async (landlordId: string): Promise<Property[]> => {
  const q = query(collection(db, "properties"), where("landlordId", "==", landlordId));
  const querySnapshot = await getDocs(q);
  
  const properties: Property[] = [];
  querySnapshot.forEach((doc) => {
    properties.push(doc.data() as Property);
  });
  
  return properties;
};

export const updateProperty = async (propertyId: string, property: Partial<Property>, imageFile?: File): Promise<void> => {
  let updateData = { ...property };
  
  if (imageFile) {
    const storageRef = ref(storage, `properties/${propertyId}/${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    const imageUrl = await getDownloadURL(storageRef);
    updateData.imageUrl = imageUrl;
  }
  
  await updateDoc(doc(db, "properties", propertyId), updateData);
};

export const deleteProperty = async (propertyId: string): Promise<void> => {
  await deleteDoc(doc(db, "properties", propertyId));
};
