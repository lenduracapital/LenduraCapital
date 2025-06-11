import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Phone, CheckCircle, DollarSign, Clock, Shield } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function TermLoans() {
  const [, setLocation] = useLocation();

  const handleBackToHome = () => {
    setLocation("/");
  };

  const handleContactUs = () => {
    alert("Calling (877) 763-6196...");
  };

  const features = [
    "Loan amounts from $10,000 to $5,000,000",
    "Terms from 12 to 60 months",
    "Fixed or variable interest rates available", 
    "No prepayment penalties on most loans",
    "Funds can be used for any business purpose"
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "Competitive Rates",
      description: "Access competitive interest rates with transparent terms and no hidden fees"
    },
    {
      icon: Clock,
      title: "Fast Funding",
      description: "Get approved in as little as 24 hours and receive funds within 2-3 business days"
    },
    {
      icon: Shield,
      title: "Flexible Terms",
      description: "Choose repayment terms that work for your business cash flow and growth plans"
    }
  ];

  return (
    <div className="min-h-screen bg-[--bg-primary] text-[--text-primary]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-blue-600 to-blue-800">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop')"
          }}
        >
          <div className="absolute inset-0 bg-blue-900 bg-opacity-80"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Term Loans
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Traditional business financing with predictable payments
            </p>
            <p className="text-lg text-blue-200 mb-8">
              Term loans provide a lump sum of capital upfront that is repaid over a fixed period with regular monthly payments. Perfect for major business investments, expansion projects, equipment purchases, or working capital needs.
            </p>
            <Button 
              onClick={handleContactUs}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
            >
              Apply Now
            </Button>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <div className="bg-green-500 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Phone className="text-white mr-3" />
            <span className="text-white text-lg font-semibold">
              Contact us to learn more about Term Loans
            </span>
            <Button 
              onClick={handleContactUs}
              className="ml-4 bg-white text-green-500 hover:bg-gray-100 px-6 py-2 rounded font-semibold"
            >
              Call us at (877) 763-6196 to speak to a loan specialist today.
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
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-3xl font-bold text-[--text-primary]">
                Reliable funding with fixed monthly payments
              </h2>
              
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

              <div className="bg-[--bg-secondary] rounded-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[--text-primary]">How term loans work</h3>
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

            <div className="space-y-8">
              <Card className="bg-[--bg-secondary] border border-[--bg-tertiary]/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[--text-primary] mb-4">Quick Facts</h3>
                  <ul className="space-y-3 text-[--text-secondary]">
                    <li><strong>Amount:</strong> $10K - $5M</li>
                    <li><strong>Terms:</strong> 12-60 months</li>
                    <li><strong>Approval:</strong> 24-48 hours</li>
                    <li><strong>Funding:</strong> 2-3 business days</li>
                  </ul>
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