import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import WhoWeFund from "@/pages/who-we-fund";
import MerchantCashAdvance from "@/pages/merchant-cash-advance";
import TermLoans from "@/pages/term-loans";
import LoanApplication from "@/pages/loan-application";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/who-we-fund" component={WhoWeFund} />
      <Route path="/merchant-cash-advance" component={MerchantCashAdvance} />
      <Route path="/term-loans" component={TermLoans} />
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
