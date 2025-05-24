
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "./hooks/useAuth";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import SubscriptionPage from "./pages/SubscriptionPage";
import PricingPage from "./pages/PricingPage";
import BlogPage from "./pages/BlogPage";
import CommunityPage from "./pages/CommunityPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import ChatPage from "./pages/ChatPage";
import StorePage from "./pages/StorePage";
import ContractorsPage from "./pages/ContractorsPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout><HomePage /></Layout>} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/profile" element={<Layout><ProtectedRoute><ProfilePage /></ProtectedRoute></Layout>} />
              <Route path="/subscription" element={<Layout><ProtectedRoute><SubscriptionPage /></ProtectedRoute></Layout>} />
              <Route path="/pricing" element={<Layout><PricingPage /></Layout>} />
              <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
              <Route path="/community" element={<Layout><CommunityPage /></Layout>} />
              <Route path="/create-project" element={<Layout><ProtectedRoute><CreateProjectPage /></ProtectedRoute></Layout>} />
              <Route path="/contractors" element={<Layout><ContractorsPage /></Layout>} />
              <Route path="/store" element={<Layout><StorePage /></Layout>} />
              <Route path="/chat" element={<Layout><ProtectedRoute><ChatPage /></ProtectedRoute></Layout>} />
              <Route path="/admin" element={<Layout><ProtectedRoute><AdminPage /></ProtectedRoute></Layout>} />
              <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
