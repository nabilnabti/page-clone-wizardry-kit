
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Tenants from "./pages/dashboard/Tenants";
import Payments from "./pages/dashboard/Payments";
import HouseRules from "./pages/dashboard/HouseRules";
import HouseParameters from "./pages/dashboard/HouseParameters";
import Subscriptions from "./pages/dashboard/Subscriptions";
import TenantDashboard from "./pages/tenant/TenantDashboard";
import TenantPayments from "./pages/tenant/TenantPayments";
import TenantCleaning from "./pages/tenant/TenantCleaning";
import TenantChat from "./pages/tenant/TenantChat";
import TenantProfile from "./pages/tenant/TenantProfile";
import CleaningTasks from "./pages/dashboard/CleaningTasks";
import PropertyDetail from "./pages/dashboard/PropertyDetail";
import TenantDetail from "./pages/dashboard/TenantDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={["landlord"]}>
                <Dashboard />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardHome />} />
              <Route path="tenants" element={<Tenants />} />
              <Route path="payments" element={<Payments />} />
              <Route path="cleaning-tasks" element={<CleaningTasks />} />
              <Route path="house-rules" element={<HouseRules />} />
              <Route path="house-parameters" element={<HouseParameters />} />
              <Route path="house-parameters/new" element={<HouseParameters />} />
              <Route path="subscriptions" element={<Subscriptions />} />
              <Route path="property/:propertyId" element={<PropertyDetail />} />
              <Route path="tenant/:tenantId" element={<TenantDetail />} />
            </Route>
            <Route path="/tenant" element={
              <ProtectedRoute allowedRoles={["tenant"]}>
                <TenantDashboard />
              </ProtectedRoute>
            } />
            <Route path="/tenant/payments" element={
              <ProtectedRoute allowedRoles={["tenant"]}>
                <TenantPayments />
              </ProtectedRoute>
            } />
            <Route path="/tenant/cleaning" element={
              <ProtectedRoute allowedRoles={["tenant"]}>
                <TenantCleaning />
              </ProtectedRoute>
            } />
            <Route path="/tenant/chat" element={
              <ProtectedRoute allowedRoles={["tenant"]}>
                <TenantChat />
              </ProtectedRoute>
            } />
            <Route path="/tenant/profile" element={
              <ProtectedRoute allowedRoles={["tenant"]}>
                <TenantProfile />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
