
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PricingPage from "./pages/PricingPage";
import BlogPage from "./pages/BlogPage";
import CommunityPage from "./pages/CommunityPage";
import ChatPage from "./pages/ChatPage";
import StorePage from "./pages/StorePage";
import ContractorsPage from "./pages/ContractorsPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/login" element={<Layout><LoginPage /></Layout>} />
          <Route path="/pricing" element={<Layout><PricingPage /></Layout>} />
          <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
          <Route path="/community" element={<Layout><CommunityPage /></Layout>} />
          <Route path="/chat" element={<Layout><ChatPage /></Layout>} />
          <Route path="/store" element={<Layout><StorePage /></Layout>} />
          <Route path="/contractors" element={<Layout><ContractorsPage /></Layout>} />
          <Route path="/admin" element={<Layout><AdminPage /></Layout>} />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
