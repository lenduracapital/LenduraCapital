import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Solutions from "@/pages/solutions";
import WhoWeFund from "@/pages/who-we-fund";
import MerchantCashAdvance from "@/pages/merchant-cash-advance";
import TermLoans from "@/pages/term-loans";
import LoanApplication from "@/pages/loan-application";
import MerchantCashAdvanceDetail from "@/pages/solutions/merchant-cash-advance";
import TermLoansDetail from "@/pages/solutions/term-loans";
import LinesOfCreditDetail from "@/pages/solutions/lines-of-credit";
import SBALoansDetail from "@/pages/solutions/sba-loans";
import EquipmentFinancingDetail from "@/pages/solutions/equipment-financing";
import InvoiceFactoringDetail from "@/pages/solutions/invoice-factoring";
import POFinancingDetail from "@/pages/solutions/po-financing";
import DebtConsolidationDetail from "@/pages/solutions/debt-consolidation";
import CreditServicesDetail from "@/pages/solutions/credit-services";
import TestimonialsPage from "@/pages/testimonials";
import NotFound from "@/pages/not-found";

function Router() {
  return (
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
      <Route path="/apply" component={LoanApplication} />
      <Route component={NotFound} />
    </Switch>
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
