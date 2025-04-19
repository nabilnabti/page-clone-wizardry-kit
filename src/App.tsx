
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Tenants from "./pages/dashboard/Tenants";
import Payments from "./pages/dashboard/Payments";
import HouseRules from "./pages/dashboard/HouseRules";
import SublettingRules from "./pages/dashboard/SublettingRules";
import TenantDashboard from "./pages/tenant/TenantDashboard";
import TenantPayments from "./pages/tenant/TenantPayments";
import TenantCleaning from "./pages/tenant/TenantCleaning";
import TenantChat from "./pages/tenant/TenantChat";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="tenants" element={<Tenants />} />
            <Route path="payments" element={<Payments />} />
            <Route path="house-rules" element={<HouseRules />} />
            <Route path="subletting-rules" element={<SublettingRules />} />
            <Route path="subscriptions" element={<Subscriptions />} />
          </Route>
          <Route path="/tenant" element={<TenantDashboard />} />
          <Route path="/tenant/payments" element={<TenantPayments />} />
          <Route path="/tenant/cleaning" element={<TenantCleaning />} />
          <Route path="/tenant/chat" element={<TenantChat />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
