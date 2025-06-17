import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import Home from "@/pages/home";

// Lazy load non-critical pages for code splitting
const Solutions = lazy(() => import("@/pages/solutions"));
const WhoWeFund = lazy(() => import("@/pages/who-we-fund"));
const MerchantCashAdvance = lazy(() => import("@/pages/merchant-cash-advance"));
const TermLoans = lazy(() => import("@/pages/term-loans"));
const LoanApplication = lazy(() => import("@/pages/loan-application"));
const MerchantCashAdvanceDetail = lazy(() => import("@/pages/solutions/merchant-cash-advance"));
const TermLoansDetail = lazy(() => import("@/pages/solutions/term-loans"));
const LinesOfCreditDetail = lazy(() => import("@/pages/solutions/lines-of-credit"));
const SBALoansDetail = lazy(() => import("@/pages/solutions/sba-loans"));
const EquipmentFinancingDetail = lazy(() => import("@/pages/solutions/equipment-financing"));
const InvoiceFactoringDetail = lazy(() => import("@/pages/solutions/invoice-factoring"));
const POFinancingDetail = lazy(() => import("@/pages/solutions/po-financing"));
const DebtConsolidationDetail = lazy(() => import("@/pages/solutions/debt-consolidation"));
const CreditServicesDetail = lazy(() => import("@/pages/solutions/credit-services"));
const TestimonialsPage = lazy(() => import("@/pages/testimonials"));
const MoreTestimonials = lazy(() => import("@/pages/more-testimonials"));
const Contact = lazy(() => import("@/pages/contact"));
const Terms = lazy(() => import("@/pages/terms"));
const Privacy = lazy(() => import("@/pages/privacy"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: '#85abe4' }}></div>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/solutions" component={Solutions} />
        <Route path="/solutions/term-loans" component={TermLoansDetail} />
        <Route path="/solutions/lines-of-credit" component={LinesOfCreditDetail} />
        <Route path="/solutions/sba-loans" component={SBALoansDetail} />
        <Route path="/solutions/equipment-financing" component={EquipmentFinancingDetail} />
        <Route path="/solutions/invoice-factoring" component={InvoiceFactoringDetail} />
        <Route path="/solutions/po-financing" component={POFinancingDetail} />
        <Route path="/solutions/debt-consolidation" component={DebtConsolidationDetail} />
        <Route path="/solutions/credit-services" component={CreditServicesDetail} />
        <Route path="/solutions/merchant-cash-advance" component={MerchantCashAdvanceDetail} />
        <Route path="/who-we-fund" component={WhoWeFund} />
        <Route path="/merchant-cash-advance" component={MerchantCashAdvance} />
        <Route path="/term-loans" component={TermLoans} />
        <Route path="/testimonials" component={TestimonialsPage} />
        <Route path="/more-testimonials" component={MoreTestimonials} />
        <Route path="/contact" component={Contact} />
        <Route path="/terms" component={Terms} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/apply" component={LoanApplication} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
