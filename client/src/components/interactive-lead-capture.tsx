import { useState } from "react";
import { Button } from "@/components/ui/button";
// Simple range input - no external slider needed
import { CheckCircle, ArrowRight, Phone, Star } from "lucide-react";

interface LeadData {
  fundingAmount: number;
  monthlyRevenue: string;
  timeInBusiness: string;
  creditScore: string;
  email: string;
  phone: string;
  firstName: string;
}

export default function InteractiveLeadCapture() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadData, setLeadData] = useState<LeadData>({
    fundingAmount: 100000,
    monthlyRevenue: "",
    timeInBusiness: "",
    creditScore: "",
    email: "",
    phone: "",
    firstName: ""
  });
  const [isQualified, setIsQualified] = useState<boolean | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const checkQualification = () => {
    // Map revenue ranges to minimum values
    const revenueMap: Record<string, number> = {
      "$10K-$25K": 10000,
      "$25K-$50K": 25000,
      "$50K-$100K": 50000,
      "$100K+": 100000
    };
    
    // Map time periods to months
    const timeMap: Record<string, number> = {
      "6 months": 6,
      "1 year": 12,
      "2+ years": 24,
      "5+ years": 60
    };
    
    // Map credit ranges to minimum scores
    const creditMap: Record<string, number> = {
      "550-600": 550,
      "600-650": 600,
      "650-700": 650,
      "700+": 700
    };
    
    const revenue = revenueMap[leadData.monthlyRevenue] || 0;
    const timeInBiz = timeMap[leadData.timeInBusiness] || 0;
    const credit = creditMap[leadData.creditScore] || 0;
    
    // Qualification logic: Monthly revenue >= $10k, 6+ months in business, credit score >= 550
    const qualified = revenue >= 10000 && timeInBiz >= 6 && credit >= 550;
    setIsQualified(qualified);
    setCurrentStep(qualified ? 4 : 5);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: leadData.firstName,
          email: leadData.email,
          phoneNumber: leadData.phone,
          fundingAmount: formatCurrency(leadData.fundingAmount),
          monthlyRevenue: leadData.monthlyRevenue,
          timeInBusiness: leadData.timeInBusiness,
          creditScore: leadData.creditScore,
          message: `Lead capture submission - ${isQualified ? 'QUALIFIED' : 'NEEDS REVIEW'} - Requested: ${formatCurrency(leadData.fundingAmount)}`
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
      }
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="relative overflow-hidden rounded-3xl shadow-2xl" style={{ background: 'linear-gradient(135deg, #193a59 0%, #285d8a 100%)' }}>
        <div className="relative z-10 p-8 md:p-12 text-center text-white">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-3xl font-bold mb-4">We're On It! 🚀</h3>
          <p className="text-xl mb-6 opacity-90">
            {isQualified 
              ? "Great news! You pre-qualify for funding. Our team will contact you within 2 hours."
              : "Thanks for your interest! Our specialists will review your application and contact you within 24 hours."
            }
          </p>
          <div className="flex items-center justify-center gap-2 text-lg">
            <Phone className="w-5 h-5" />
            <span>Questions? Call: </span>
            <a href="https://calendly.com/sam-lenduracapital/30min" className="underline hover:text-yellow-300">
              (305) 834-7168
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl shadow-2xl" style={{ background: 'linear-gradient(135deg, #193a59 0%, #285d8a 100%)' }}>
      <div className="grid lg:grid-cols-2 min-h-[600px]">
        {/* Left Content */}
        <div className="relative z-10 p-8 md:p-12 text-white flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let's see if we're a match! 🤝
            </h2>
            <p className="text-xl opacity-90">
              Quick 2-minute qualification check
            </p>
          </div>

          {/* Step 1: Funding Amount */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6">How much funding do you need?</h3>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-yellow-300 mb-2">
                      {formatCurrency(leadData.fundingAmount)}
                    </div>
                    <p className="text-sm opacity-75">Drag the slider to adjust</p>
                  </div>
                  <input
                    type="range"
                    value={leadData.fundingAmount}
                    onChange={(e) => setLeadData(prev => ({ ...prev, fundingAmount: parseInt(e.target.value) }))}
                    max={2000000}
                    min={10000}
                    step={5000}
                    className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider-thumb"
                    data-testid="slider-funding-amount"
                    style={{
                      background: `linear-gradient(to right, #22c55e 0%, #22c55e ${((leadData.fundingAmount - 10000) / (2000000 - 10000)) * 100}%, rgba(255,255,255,0.2) ${((leadData.fundingAmount - 10000) / (2000000 - 10000)) * 100}%, rgba(255,255,255,0.2) 100%)`
                    }}
                  />
                  <div className="flex justify-between text-sm mt-4 opacity-75">
                    <span>$10K</span>
                    <span>$2M+</span>
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => setCurrentStep(2)}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-4 text-lg font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                data-testid="button-step1-continue"
              >
                Continue <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}

          {/* Step 2: Business Qualification */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-6">Tell us about your business</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-lg font-medium mb-3">Monthly Revenue?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {["$10K-$25K", "$25K-$50K", "$50K-$100K", "$100K+"].map((range) => (
                      <button
                        key={range}
                        onClick={() => setLeadData(prev => ({ ...prev, monthlyRevenue: range }))}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          leadData.monthlyRevenue === range
                            ? 'border-yellow-300 bg-yellow-300/20 text-yellow-300'
                            : 'border-white/30 bg-white/5 hover:border-white/50'
                        }`}
                        data-testid={`button-revenue-${range.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-medium mb-3">Time in Business?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {["6 months", "1 year", "2+ years", "5+ years"].map((time) => (
                      <button
                        key={time}
                        onClick={() => setLeadData(prev => ({ ...prev, timeInBusiness: time }))}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          leadData.timeInBusiness === time
                            ? 'border-yellow-300 bg-yellow-300/20 text-yellow-300'
                            : 'border-white/30 bg-white/5 hover:border-white/50'
                        }`}
                        data-testid={`button-time-${time.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={() => setCurrentStep(1)}
                  variant="outline"
                  className="flex-1 py-3 border-white/30 text-white hover:bg-white/10"
                  data-testid="button-back-step1"
                >
                  Back
                </Button>
                <Button 
                  onClick={() => setCurrentStep(3)}
                  disabled={!leadData.monthlyRevenue || !leadData.timeInBusiness}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 font-semibold rounded-xl"
                  data-testid="button-step2-continue"
                >
                  Continue <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Credit Score */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-6">What's your credit score range?</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {["550-600", "600-650", "650-700", "700+"].map((range) => (
                  <button
                    key={range}
                    onClick={() => setLeadData(prev => ({ ...prev, creditScore: range }))}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      leadData.creditScore === range
                        ? 'border-yellow-300 bg-yellow-300/20 text-yellow-300'
                        : 'border-white/30 bg-white/5 hover:border-white/50'
                    }`}
                    data-testid={`button-credit-${range.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  >
                    <div className="text-lg font-semibold">{range}</div>
                  </button>
                ))}
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={() => setCurrentStep(2)}
                  variant="outline"
                  className="flex-1 py-3 border-white/30 text-white hover:bg-white/10"
                  data-testid="button-back-step2"
                >
                  Back
                </Button>
                <Button 
                  onClick={checkQualification}
                  disabled={!leadData.creditScore}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 font-semibold rounded-xl"
                  data-testid="button-check-qualification"
                >
                  Check Match <Star className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Qualified - Contact Info */}
          {currentStep === 4 && isQualified && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-300">Great! You pre-qualify! 🎉</h3>
                <p className="text-lg opacity-90 mt-2">
                  You're eligible for up to {formatCurrency(leadData.fundingAmount)} in funding
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your first name"
                    value={leadData.firstName}
                    onChange={(e) => setLeadData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="w-full p-4 rounded-xl border-2 border-white/30 bg-white/10 text-white placeholder-white/70 focus:border-yellow-300 focus:outline-none"
                    data-testid="input-first-name"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email address"
                    value={leadData.email}
                    onChange={(e) => setLeadData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full p-4 rounded-xl border-2 border-white/30 bg-white/10 text-white placeholder-white/70 focus:border-yellow-300 focus:outline-none"
                    data-testid="input-email"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={leadData.phone}
                    onChange={(e) => setLeadData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full p-4 rounded-xl border-2 border-white/30 bg-white/10 text-white placeholder-white/70 focus:border-yellow-300 focus:outline-none"
                    data-testid="input-phone"
                  />
                </div>
              </div>

              <Button 
                onClick={handleSubmit}
                disabled={!leadData.firstName || !leadData.email || !leadData.phone || isSubmitting}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-4 text-lg font-semibold rounded-xl shadow-lg"
                data-testid="button-submit-qualified"
              >
                {isSubmitting ? 'Submitting...' : 'Get My Funding Quote'}
              </Button>
            </div>
          )}

          {/* Step 5: Not Qualified */}
          {currentStep === 5 && !isQualified && (
            <div className="space-y-6 text-center">
              <h3 className="text-2xl font-semibold mb-4">Let's chat! 📞</h3>
              <p className="text-lg opacity-90 mb-6">
                While you may not fit our standard criteria, we have specialized programs that might work for you.
              </p>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                <h4 className="text-xl font-semibold mb-4">Our specialists can help with:</h4>
                <ul className="text-left space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Alternative funding options</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Business credit improvement</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Revenue growth strategies</span>
                  </li>
                </ul>
              </div>

              <Button 
                onClick={() => window.open('https://calendly.com/sam-lenduracapital/30min', '_blank')}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-4 text-lg font-semibold rounded-xl shadow-lg"
                data-testid="button-schedule-call"
              >
                <Phone className="w-5 h-5 mr-2" />
                Schedule Free Consultation
              </Button>
            </div>
          )}
        </div>

        {/* Right Image */}
        <div className="hidden lg:block relative">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#193a59]/20 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&h=600&q=80" 
            alt="Professional business owner" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Floating testimonial */}
          <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl z-20">
            <div className="flex items-center gap-2 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-gray-800 font-medium italic">
              "Got $150K approved in 3 days. Lendura made it simple and stress-free!"
            </p>
            <p className="text-gray-600 text-sm mt-2">- Sarah M., Restaurant Owner</p>
          </div>
        </div>
      </div>
    </div>
  );
}