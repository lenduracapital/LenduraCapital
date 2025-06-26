import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense, useEffect } from "react";
import Home from "@/pages/home";
import ChatWidget from "@/components/chat-widget";
import CookieBanner from "@/components/CookieBanner";

// Lazy load pages for performance
const Solutions = lazy(() => import("@/pages/solutions"));
const QualifiedIndustries = lazy(() => import("@/pages/who-we-fund"));
const Contact = lazy(() => import("@/pages/contact"));
const About = lazy(() => import("@/pages/about"));
const MoreTestimonials = lazy(() => import("@/pages/more-testimonials"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        
        <Route path="/solutions">
          <Suspense fallback={<PageLoader />}>
            <Solutions />
          </Suspense>
        </Route>
        
        <Route path="/qualified-industries">
          <Suspense fallback={<PageLoader />}>
            <QualifiedIndustries />
          </Suspense>
        </Route>
        
        <Route path="/contact">
          <Suspense fallback={<PageLoader />}>
            <Contact />
          </Suspense>
        </Route>
        
        <Route path="/about">
          <Suspense fallback={<PageLoader />}>
            <About />
          </Suspense>
        </Route>
        
        <Route path="/more-testimonials">
          <Suspense fallback={<PageLoader />}>
            <MoreTestimonials />
          </Suspense>
        </Route>
      </Switch>
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <ChatWidget />
        <CookieBanner />
      </TooltipProvider>
    </QueryClientProvider>
  );
}