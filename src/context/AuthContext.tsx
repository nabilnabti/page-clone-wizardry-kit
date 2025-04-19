import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export type UserRole = "tenant" | "landlord";

export interface AuthUser extends User {
  role?: UserRole;
  propertyId?: string;
  roomNumber?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setIsLoading(true);
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              ...currentUser,
              role: userData.role,
              propertyId: userData.propertyId,
              roomNumber: userData.roomNumber,
            });
          } else {
            setUser(currentUser as AuthUser);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(currentUser as AuthUser);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const register = async (email: string, password: string, name: string, role: UserRole) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await updateProfile(user, {
        displayName: name,
      });

      // Store additional user information in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email,
        name,
        role,
        createdAt: new Date().toISOString(),
      });

      toast({
        title: "Compte créé",
        description: "Votre compte a été créé avec succès",
      });

      // If landlord and first time registration, redirect to new property page
      if (role === "landlord") {
        navigate("/dashboard/house-parameters/new");
      } else {
        navigate(role === "tenant" ? "/tenant" : "/dashboard");
      }
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Erreur d'inscription",
        description: error.message || "Une erreur est survenue lors de l'inscription",
        variant: "destructive",
      });
      throw error; // Re-throw to allow UI to handle loading state
    }
  };

  const login = async (email: string, password: string, role: UserRole) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Check if user role matches
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role !== role) {
          await signOut(auth);
          toast({
            title: "Erreur de connexion",
            description: "Type de compte incorrect",
            variant: "destructive",
          });
          throw new Error("Type de compte incorrect");
        }
      }

      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté",
      });
      
      navigate(role === "tenant" ? "/tenant" : "/dashboard");
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Erreur de connexion",
        description: error.message || "Une erreur est survenue lors de la connexion",
        variant: "destructive",
      });
      throw error; // Re-throw to allow UI to handle loading state
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès",
      });
      navigate("/auth");
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Erreur de déconnexion",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
