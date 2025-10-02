import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexNew from "./pages/IndexNew";
import PhilosopherChatPage from "./pages/PhilosopherChatPage";
import DebateModePage from "./pages/DebateModePage";
import VillageTransformationPage from "./pages/VillageTransformationPage";
import QuickTimelinePage from "./pages/QuickTimelinePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexNew />} />
          <Route path="/chat" element={<PhilosopherChatPage />} />
          <Route path="/debate" element={<DebateModePage />} />
          <Route path="/village-game" element={<VillageTransformationPage />} />
          <Route path="/quick-timeline" element={<QuickTimelinePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
