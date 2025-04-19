
import { db, storage } from "@/lib/firebase";
import { collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { CleaningTask } from "@/types";

export const addCleaningTask = async (task: Omit<CleaningTask, "id" | "createdAt">): Promise<string> => {
  const taskId = uuidv4();
  
  const taskData = {
    ...task,
    id: taskId,
    createdAt: new Date().toISOString()
  };

  await setDoc(doc(db, "cleaningTasks", taskId), taskData);
  return taskId;
};

export const getCleaningTask = async (taskId: string): Promise<CleaningTask | null> => {
  const docRef = doc(db, "cleaningTasks", taskId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data() as CleaningTask;
  } else {
    return null;
  }
};

export const getCleaningTasksByProperty = async (propertyId: string): Promise<CleaningTask[]> => {
  const q = query(collection(db, "cleaningTasks"), where("propertyId", "==", propertyId));
  const querySnapshot = await getDocs(q);
  
  const tasks: CleaningTask[] = [];
  querySnapshot.forEach((doc) => {
    tasks.push(doc.data() as CleaningTask);
  });
  
  return tasks;
};

export const getCleaningTasksByTenant = async (tenantId: string): Promise<CleaningTask[]> => {
  const q = query(collection(db, "cleaningTasks"), where("assignedTenantId", "==", tenantId));
  const querySnapshot = await getDocs(q);
  
  const tasks: CleaningTask[] = [];
  querySnapshot.forEach((doc) => {
    tasks.push(doc.data() as CleaningTask);
  });
  
  return tasks.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const completeCleaningTask = async (taskId: string, photoFile: File): Promise<void> => {
  const storageRef = ref(storage, `cleaningTasks/${taskId}/${photoFile.name}`);
  await uploadBytes(storageRef, photoFile);
  const photoUrl = await getDownloadURL(storageRef);
  
  await updateDoc(doc(db, "cleaningTasks", taskId), {
    status: "completed",
    photoUrl,
    completedAt: new Date().toISOString()
  });
};

export const updateCleaningTask = async (taskId: string, task: Partial<CleaningTask>): Promise<void> => {
  await updateDoc(doc(db, "cleaningTasks", taskId), task);
};

export const deleteCleaningTask = async (taskId: string): Promise<void> => {
  await deleteDoc(doc(db, "cleaningTasks", taskId));
};
