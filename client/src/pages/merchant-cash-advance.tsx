import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Phone, CheckCircle, DollarSign, Clock, Shield } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function ClientCashAdvance() {
  const [, setLocation] = useLocation();

  const handleBackToHome = () => {
    setLocation("/");
  };

  const handleContactUs = () => {
    alert("Calling (877) 763-6196...");
  };

  const features = [
    "Factor rate range: 15% - 49%, the advance is at a fixed rate, not an APR",
    "Repayment can be made on either a Daily, Weekly, Bi-Weekly, or Monthly payment",
    "Repayment terms range from 30 days up to 24 months",
    "Repayment can be made through ACH Debits or Credit Card Processing Holdbacks"
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "Unsecured working capital",
      description: "Even if your credit score is low or your business is less than one year old, there are still MCA options available"
    },
    {
      icon: Clock,
      title: "Fast approval process",
      description: "Get approved quickly with minimal paperwork and receive funding in as little as 24-48 hours"
    },
    {
      icon: Shield,
      title: "Flexible repayment",
      description: "Repayments are based on your daily sales, so you pay more when business is good and less when it's slow"
    }
  ];

  const otherServices = [
    "Credit Servicing",
    "HR/Payroll Services", 
    "Credit Card Processing",
    "SEO"
  ];

  return (
    <div className="min-h-screen bg-[--bg-primary] text-[--text-primary]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-teal-600 to-teal-800">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop')"
          }}
        >
          <div className="absolute inset-0 bg-teal-900 bg-opacity-20"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Client Cash Advance
            </h1>
            <p className="text-xl text-teal-100 mb-8">
              Alternative to lengthy approval processes and strict credit requirements for traditional term loans
            </p>
            <p className="text-lg text-teal-200 mb-8">
              A client cash advance (CCA) provides unsecured capital to small business owners on future credit card sales, providing small businesses an alternative to traditional bank loans. CCA quickly provides cash for businesses, allowing you to borrow against future earnings to access that capital today.
            </p>
            <Button 
              onClick={handleContactUs}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
            >
              Apply Now
              <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
            </Button>
          </div>
          
          {/* Welcome Sign */}
          <div className="absolute bottom-0 right-0 hidden lg:block">
            <div className="bg-amber-100 p-4 rounded-lg shadow-lg transform rotate-3">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-amber-900 mb-2">WELCOME</h3>
                <p className="text-lg text-amber-800">WE ARE</p>
                <p className="text-3xl font-bold text-amber-900">OPEN</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <div className="bg-green-500 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Phone className="text-white mr-3" />
            <span className="text-white text-lg font-semibold">
              Contact us to learn more about MCA
            </span>
            <Button 
              onClick={handleContactUs}
              className="ml-4 bg-white text-green-500 hover:bg-gray-100 px-6 py-2 rounded font-semibold"
            >
              <a href="https://calendly.com/admin-fundtekcapitalgroup/30min" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Schedule a consultation</a> with our financing specialists today.
            </Button>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="py-6 bg-[--bg-secondary]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button 
            variant="ghost"
            onClick={handleBackToHome}
            className="text-[--text-secondary] hover:text-[--text-primary]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to the home page
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 bg-[--bg-primary]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-3xl font-bold text-[--text-primary]">
                Unsecured working capital when your business needs it
              </h2>
              
              {/* Benefits Cards */}
              <div className="space-y-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <Card key={index} className="bg-[--bg-secondary] border border-[--bg-tertiary]/30">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-[--primary] rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-[--text-primary] mb-2">{benefit.title}</h3>
                            <p className="text-[--text-secondary]">{benefit.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* How Funding Works */}
              <div className="bg-[--bg-secondary] rounded-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[--text-primary]">How funding works</h3>
                </div>
                
                <ul className="space-y-4">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-[--text-secondary]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              {/* Other Services */}
              <Card className="bg-[--bg-secondary] border border-[--bg-tertiary]/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[--text-primary] mb-4">Other Services</h3>
                  <ul className="space-y-2">
                    {otherServices.map((service, index) => (
                      <li key={index}>
                        <a href="#" className="text-green-500 hover:text-green-400 transition-colors">
                          {service}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Line of Credit Promo */}
              <Card className="bg-[--bg-secondary] border border-[--bg-tertiary]/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[--text-primary] mb-4">Line of Credit</h3>
                  <p className="text-[--text-secondary] mb-4">
                    A fast approval process requiring minimal paperwork to provide you with a flexible loan.
                  </p>
                  <div className="bg-black h-32 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-white">Video Placeholder</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}