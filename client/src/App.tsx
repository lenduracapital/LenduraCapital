import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-white text-black">
          <ScrollToTop />
          <Switch>
            <Route path="/">
              <div className="p-8">
                <h1 className="text-3xl font-bold text-blue-600">FundTek Capital Group</h1>
                <p className="mt-4 text-gray-600">Website restored - basic routing working</p>
              </div>
            </Route>
          </Switch>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}