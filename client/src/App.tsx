import { Route, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "wouter";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/home"));
const Solutions = lazy(() => import("./pages/solutions"));
const About = lazy(() => import("./pages/about"));
const Contact = lazy(() => import("./pages/contact"));
const QualifiedIndustries = lazy(() => import("./pages/qualified-industries"));
const MoreTestimonials = lazy(() => import("./pages/more-testimonials"));
const TermLoans = lazy(() => import("./pages/solutions/term-loans"));
const SBALoans = lazy(() => import("./pages/solutions/sba-loans"));
const EquipmentFinancing = lazy(() => import("./pages/solutions/equipment-financing"));
const LinesOfCredit = lazy(() => import("./pages/solutions/lines-of-credit"));
const MerchantCashAdvance = lazy(() => import("./pages/solutions/merchant-cash-advance"));
const InvoiceFactoring = lazy(() => import("./pages/solutions/invoice-factoring"));
const DebtConsolidation = lazy(() => import("./pages/solutions/debt-consolidation"));
const POFinancing = lazy(() => import("./pages/solutions/po-financing"));
const CreditServices = lazy(() => import("./pages/solutions/credit-services"));
const SEOWebDevelopment = lazy(() => import("./pages/solutions/seo-web-development"));
const CreditCardProcessing = lazy(() => import("./pages/solutions/credit-card-processing"));
const CRELending = lazy(() => import("./pages/solutions/commercial-real-estate-lending"));
const MortgageLoans = lazy(() => import("./pages/solutions/mortgage-loans"));
const Terms = lazy(() => import("./pages/terms"));
const Privacy = lazy(() => import("./pages/privacy"));
const Cookies = lazy(() => import("./pages/cookies"));

// Scroll to top on route change
function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#85abe4] mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<LoadingSpinner />}>
          <Route path="/" component={Home} />
          <Route path="/solutions" component={Solutions} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/qualified-industries" component={QualifiedIndustries} />
          <Route path="/more-testimonials" component={MoreTestimonials} />
          <Route path="/solutions/term-loans" component={TermLoans} />
          <Route path="/solutions/sba-loans" component={SBALoans} />
          <Route path="/solutions/equipment-financing" component={EquipmentFinancing} />
          <Route path="/solutions/lines-of-credit" component={LinesOfCredit} />
          <Route path="/solutions/merchant-cash-advance" component={MerchantCashAdvance} />
          <Route path="/solutions/invoice-factoring" component={InvoiceFactoring} />
          <Route path="/solutions/debt-consolidation" component={DebtConsolidation} />
          <Route path="/solutions/po-financing" component={POFinancing} />
          <Route path="/solutions/credit-services" component={CreditServices} />
          <Route path="/solutions/seo-web-development" component={SEOWebDevelopment} />
          <Route path="/solutions/credit-card-processing" component={CreditCardProcessing} />
          <Route path="/solutions/commercial-real-estate-lending" component={CRELending} />
          <Route path="/solutions/mortgage-loans" component={MortgageLoans} />
          <Route path="/terms" component={Terms} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/cookies" component={Cookies} />
        </Suspense>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}