import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense, useEffect } from "react";
import Home from "@/pages/home";
import ChatWidget from "@/components/chat-widget";
import CookieBanner from "@/components/CookieBanner";
import Analytics from "@/components/analytics";

// Essential pages only
const Solutions = lazy(() => import("@/pages/solutions"));
const LoanApplication = lazy(() => import("@/pages/loan-application"));
const Contact = lazy(() => import("@/pages/contact"));
const About = lazy(() => import("@/pages/about"));
const Testimonials = lazy(() => import("@/pages/testimonials"));
const AdminDashboard = lazy(() => import("@/pages/admin"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: '#85abe4' }}></div>
    </div>
  );
}

// Component to handle scroll-to-top on route changes
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
      <Analytics />
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/solutions" component={Solutions} />
          <Route path="/apply" component={LoanApplication} />
          <Route path="/contact" component={Contact} />
          <Route path="/about" component={About} />
          <Route path="/testimonials" component={Testimonials} />
          <Route path="/admin" component={AdminDashboard} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
      <ChatWidget />
      <CookieBanner />
    </QueryClientProvider>
  );
}