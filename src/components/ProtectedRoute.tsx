
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/context/AuthContext";
import { Loader } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#1A2533]">
        <div className="flex flex-col items-center">
          <Loader className="h-10 w-10 text-[#7FD1C7] animate-spin" />
          <p className="mt-4 text-white">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (allowedRoles && (!user.role || !allowedRoles.includes(user.role))) {
    return <Navigate to={user.role === "tenant" ? "/tenant" : "/dashboard"} replace />;
  }

  return <>{children}</>;
};
