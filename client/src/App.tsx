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
const Terms = lazy(() => import("@/pages/terms"));
const Privacy = lazy(() => import("@/pages/privacy"));
const Cookies = lazy(() => import("@/pages/cookies"));

// Solution detail pages
const TermLoans = lazy(() => import("@/pages/solutions/term-loans"));
const SBALoans = lazy(() => import("@/pages/solutions/sba-loans"));
const EquipmentFinancing = lazy(() => import("@/pages/solutions/equipment-financing"));
const LinesOfCredit = lazy(() => import("@/pages/solutions/lines-of-credit"));
const MerchantCashAdvance = lazy(() => import("@/pages/solutions/merchant-cash-advance"));
const InvoiceFactoring = lazy(() => import("@/pages/solutions/invoice-factoring"));
const DebtConsolidation = lazy(() => import("@/pages/solutions/debt-consolidation"));
const POFinancing = lazy(() => import("@/pages/solutions/po-financing"));
const CreditServices = lazy(() => import("@/pages/solutions/credit-services"));

// Industry pages
const TechnologySoftware = lazy(() => import("@/pages/industries/technology-software"));
const Manufacturing = lazy(() => import("@/pages/industries/manufacturing"));
const Construction = lazy(() => import("@/pages/industries/construction"));
const ProfessionalServices = lazy(() => import("@/pages/industries/professional-services"));
const RealEstate = lazy(() => import("@/pages/industries/real-estate"));

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

        <Route path="/terms">
          <Suspense fallback={<PageLoader />}>
            <Terms />
          </Suspense>
        </Route>

        <Route path="/privacy">
          <Suspense fallback={<PageLoader />}>
            <Privacy />
          </Suspense>
        </Route>

        <Route path="/cookies">
          <Suspense fallback={<PageLoader />}>
            <Cookies />
          </Suspense>
        </Route>
        
        {/* Solution detail pages */}
        <Route path="/solutions/term-loans">
          <Suspense fallback={<PageLoader />}>
            <TermLoans />
          </Suspense>
        </Route>
        
        <Route path="/solutions/sba-loans">
          <Suspense fallback={<PageLoader />}>
            <SBALoans />
          </Suspense>
        </Route>
        
        <Route path="/solutions/equipment-financing">
          <Suspense fallback={<PageLoader />}>
            <EquipmentFinancing />
          </Suspense>
        </Route>
        
        <Route path="/solutions/lines-of-credit">
          <Suspense fallback={<PageLoader />}>
            <LinesOfCredit />
          </Suspense>
        </Route>
        
        <Route path="/solutions/merchant-cash-advance">
          <Suspense fallback={<PageLoader />}>
            <MerchantCashAdvance />
          </Suspense>
        </Route>
        
        <Route path="/solutions/invoice-factoring">
          <Suspense fallback={<PageLoader />}>
            <InvoiceFactoring />
          </Suspense>
        </Route>
        
        <Route path="/solutions/debt-consolidation">
          <Suspense fallback={<PageLoader />}>
            <DebtConsolidation />
          </Suspense>
        </Route>
        
        <Route path="/solutions/po-financing">
          <Suspense fallback={<PageLoader />}>
            <POFinancing />
          </Suspense>
        </Route>
        
        <Route path="/solutions/credit-services">
          <Suspense fallback={<PageLoader />}>
            <CreditServices />
          </Suspense>
        </Route>
        
        {/* Industry pages */}
        <Route path="/industries/technology-software">
          <Suspense fallback={<PageLoader />}>
            <TechnologySoftware />
          </Suspense>
        </Route>
        
        <Route path="/industries/manufacturing">
          <Suspense fallback={<PageLoader />}>
            <Manufacturing />
          </Suspense>
        </Route>
        
        <Route path="/industries/construction">
          <Suspense fallback={<PageLoader />}>
            <Construction />
          </Suspense>
        </Route>
        
        <Route path="/industries/professional-services">
          <Suspense fallback={<PageLoader />}>
            <ProfessionalServices />
          </Suspense>
        </Route>
        
        <Route path="/industries/real-estate">
          <Suspense fallback={<PageLoader />}>
            <RealEstate />
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