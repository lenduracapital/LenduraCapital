import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense, useEffect } from "react";
import Home from "@/pages/home";
import ChatWidget from "@/components/chat-widget";
import CookieBanner from "@/components/CookieBanner";
import Analytics from "@/components/analytics";


// Lazy load non-critical pages for code splitting with prefetch
const Solutions = lazy(() => import(/* webpackPrefetch: true */ "@/pages/solutions"));
const QualifiedIndustries = lazy(() => import(/* webpackPrefetch: true */ "@/pages/who-we-fund"));
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
const CreditServicing = lazy(() => import("@/pages/credit-servicing"));
const SEOWebDevelopment = lazy(() => import("@/pages/seo-web-development"));
const CreditCardProcessing = lazy(() => import("@/pages/credit-card-processing"));
const CommercialRealEstateLending = lazy(() => import("@/pages/solutions/commercial-real-estate-lending"));
const MortgageFinancing = lazy(() => import("@/pages/solutions/mortgage-financing"));
const DebtConsolidationPage = lazy(() => import("@/pages/debt-consolidation"));
const TestimonialsPage = lazy(() => import("@/pages/testimonials"));
const MoreTestimonials = lazy(() => import("@/pages/more-testimonials"));
const Contact = lazy(() => import("@/pages/contact"));
const About = lazy(() => import("@/pages/about"));
const Terms = lazy(() => import("@/pages/terms"));
const Privacy = lazy(() => import("@/pages/privacy"));
const Cookies = lazy(() => import("@/pages/cookies"));
const FAQ = lazy(() => import("@/pages/faq"));
const Blog = lazy(() => import("@/pages/blog"));
const AdminDashboard = lazy(() => import("@/pages/admin"));
const NotFound = lazy(() => import("@/pages/not-found"));
const HomeServicesContracting = lazy(() => import("@/pages/industries/home-services-contracting"));
const CleaningJanitorialServices = lazy(() => import("@/pages/industries/cleaning-janitorial-services"));
const TruckingTransportation = lazy(() => import("@/pages/industries/trucking-transportation"));
const MedicalHealthcare = lazy(() => import("@/pages/industries/medical-healthcare"));
const Construction = lazy(() => import("@/pages/industries/construction"));
const RestaurantFoodService = lazy(() => import("@/pages/industries/restaurant-food-service"));
const RetailECommerce = lazy(() => import("@/pages/industries/retail-e-commerce"));
const Manufacturing = lazy(() => import("@/pages/industries/manufacturing"));
const ProfessionalServices = lazy(() => import("@/pages/industries/professional-services"));
const TechnologySoftware = lazy(() => import("@/pages/industries/technology-software"));
const AutoTransportation = lazy(() => import("@/pages/industries/auto-transportation"));
const BeautyWellness = lazy(() => import("@/pages/industries/beauty-wellness"));
const HospitalityTourism = lazy(() => import("@/pages/industries/hospitality-tourism"));
const AgricultureFarming = lazy(() => import("@/pages/industries/agriculture-farming"));
const RealEstate = lazy(() => import("@/pages/industries/real-estate"));
const EntertainmentEvents = lazy(() => import("@/pages/industries/entertainment-events"));
const EducationTraining = lazy(() => import("@/pages/industries/education-training"));
const Franchises = lazy(() => import("@/pages/industries/franchises"));

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

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ScrollToTop />
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
        <Route path="/solutions/credit-servicing" component={CreditServicing} />
        <Route path="/solutions/seo-web-development" component={SEOWebDevelopment} />
        <Route path="/solutions/credit-card-processing" component={CreditCardProcessing} />
        <Route path="/solutions/commercial-real-estate-lending" component={CommercialRealEstateLending} />
        <Route path="/solutions/mortgage-financing" component={MortgageFinancing} />
        <Route path="/solutions/merchant-cash-advance" component={MerchantCashAdvanceDetail} />
        <Route path="/qualified-industries" component={QualifiedIndustries} />
        <Route path="/merchant-cash-advance" component={MerchantCashAdvance} />
        <Route path="/term-loans" component={TermLoans} />
        <Route path="/testimonials" component={TestimonialsPage} />
        <Route path="/more-testimonials" component={MoreTestimonials} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/terms" component={Terms} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/cookies" component={Cookies} />
        <Route path="/faq" component={FAQ} />
        <Route path="/blog" component={Blog} />
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/apply" component={LoanApplication} />
        <Route path="/industries/home-services-contracting" component={HomeServicesContracting} />
        <Route path="/industries/cleaning-janitorial-services" component={CleaningJanitorialServices} />
        <Route path="/industries/trucking-transportation" component={TruckingTransportation} />
        <Route path="/industries/medical-healthcare" component={MedicalHealthcare} />
        <Route path="/industries/construction" component={Construction} />
        <Route path="/industries/restaurant-food-service" component={RestaurantFoodService} />
        <Route path="/industries/retail-e-commerce" component={RetailECommerce} />
        <Route path="/industries/manufacturing" component={Manufacturing} />
        <Route path="/industries/professional-services" component={ProfessionalServices} />
        <Route path="/industries/technology-software" component={TechnologySoftware} />
        <Route path="/industries/auto-transportation" component={AutoTransportation} />
        <Route path="/industries/beauty-wellness" component={BeautyWellness} />
        <Route path="/industries/hospitality-tourism" component={HospitalityTourism} />
        <Route path="/industries/agriculture-farming" component={AgricultureFarming} />
        <Route path="/industries/real-estate" component={RealEstate} />
        <Route path="/industries/entertainment-events" component={EntertainmentEvents} />
        <Route path="/industries/education-training" component={EducationTraining} />
        <Route path="/industries/franchises" component={Franchises} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Analytics />
        <Suspense fallback={<PageLoader />}>
          <Router />
          <ChatWidget />
          <CookieBanner />
          <Toaster />
        </Suspense>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
