
import { db, storage } from "@/lib/firebase";
import { collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

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

export const addTenant = async (tenant: Omit<Tenant, "id" | "createdAt">, imageFile?: File): Promise<string> => {
  const tenantId = uuidv4();
  let profileImageUrl = undefined;

  if (imageFile) {
    const storageRef = ref(storage, `tenants/${tenantId}/${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    profileImageUrl = await getDownloadURL(storageRef);
  }

  const tenantData = {
    ...tenant,
    id: tenantId,
    createdAt: new Date().toISOString(),
    profileImageUrl
  };

  await setDoc(doc(db, "tenants", tenantId), tenantData);
  
  // Update user document with tenant information
  if (tenant.userId) {
    await updateDoc(doc(db, "users", tenant.userId), {
      propertyId: tenant.propertyId,
      roomNumber: tenant.roomNumber
    });
  }
  
  return tenantId;
};

export const getTenant = async (tenantId: string): Promise<Tenant | null> => {
  const docRef = doc(db, "tenants", tenantId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data() as Tenant;
  } else {
    return null;
  }
};

export const getTenantByUserId = async (userId: string): Promise<Tenant | null> => {
  const q = query(collection(db, "tenants"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  
  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].data() as Tenant;
  } else {
    return null;
  }
};

export const getTenantsByProperty = async (propertyId: string): Promise<Tenant[]> => {
  const q = query(collection(db, "tenants"), where("propertyId", "==", propertyId));
  const querySnapshot = await getDocs(q);
  
  const tenants: Tenant[] = [];
  querySnapshot.forEach((doc) => {
    tenants.push(doc.data() as Tenant);
  });
  
  return tenants;
};

export const updateTenant = async (tenantId: string, tenant: Partial<Tenant>, imageFile?: File): Promise<void> => {
  let updateData = { ...tenant };
  
  if (imageFile) {
    const storageRef = ref(storage, `tenants/${tenantId}/${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    const profileImageUrl = await getDownloadURL(storageRef);
    updateData.profileImageUrl = profileImageUrl;
  }
  
  await updateDoc(doc(db, "tenants", tenantId), updateData);
  
  // Update user document with tenant information if necessary
  if (tenant.userId && (tenant.propertyId || tenant.roomNumber)) {
    const userUpdate: Record<string, any> = {};
    if (tenant.propertyId) userUpdate.propertyId = tenant.propertyId;
    if (tenant.roomNumber) userUpdate.roomNumber = tenant.roomNumber;
    
    await updateDoc(doc(db, "users", tenant.userId), userUpdate);
  }
};

export const deleteTenant = async (tenantId: string): Promise<void> => {
  const tenantDoc = await getDoc(doc(db, "tenants", tenantId));
  if (tenantDoc.exists()) {
    const tenantData = tenantDoc.data() as Tenant;
    
    // Update user document to remove tenant information
    if (tenantData.userId) {
      await updateDoc(doc(db, "users", tenantData.userId), {
        propertyId: null,
        roomNumber: null
      });
    }
  }
  
  await deleteDoc(doc(db, "tenants", tenantId));
};
