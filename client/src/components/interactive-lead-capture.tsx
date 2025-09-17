import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone } from "lucide-react";

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
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Check qualification
      const revenueMap: Record<string, number> = {
        "$10K-$25K": 10000,
        "$25K-$50K": 25000,
        "$50K-$100K": 50000,
        "$100K+": 100000
      };
      
      const timeMap: Record<string, number> = {
        "6 months": 6,
        "1 year": 12,
        "2+ years": 24,
        "5+ years": 60
      };
      
      const creditMap: Record<string, number> = {
        "550-600": 550,
        "600-650": 600,
        "650-700": 650,
        "700+": 700
      };
      
      const revenue = revenueMap[leadData.monthlyRevenue] || 0;
      const timeInBiz = timeMap[leadData.timeInBusiness] || 0;
      const credit = creditMap[leadData.creditScore] || 0;
      
      const qualified = revenue >= 10000 && timeInBiz >= 6 && credit >= 550;

      const response = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: leadData.firstName,
          email: leadData.email,
          phone: leadData.phone,
          phoneNumber: leadData.phone, // Keep both for compatibility
          fundingAmount: formatCurrency(leadData.fundingAmount),
          monthlyRevenue: leadData.monthlyRevenue,
          timeInBusiness: leadData.timeInBusiness,
          creditScore: leadData.creditScore,
          message: `Lead capture submission - ${qualified ? 'QUALIFIED' : 'NEEDS REVIEW'} - Requested: ${formatCurrency(leadData.fundingAmount)}`
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
      <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-[#d9d9d9] border-2 border-[#193a59]">
        <div className="relative z-10 p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-[#193a59] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-3xl font-bold mb-4 text-[#193a59]">We're On It! 🚀</h3>
          <p className="text-xl mb-6 text-black">
            Thanks for your interest! Our specialists will review your application and contact you within 24 hours.
          </p>
          <div className="flex items-center justify-center gap-2 text-lg text-black">
            <Phone className="w-5 h-5 text-[#193a59]" />
            <span>Questions? Call: </span>
            <a href="tel:+13058347168" className="underline hover:text-[#193a59] font-semibold text-[#193a59]">
              (305) 834-7168
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-[#d9d9d9] border-2 border-[#193a59]">
      <div className="grid lg:grid-cols-2 min-h-[600px]">
        {/* Left Content */}
        <div className="relative z-10 p-8 md:p-12 text-[#193a59] flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#193a59]">
              Let's see if we're a match! 🤝
            </h2>
            <p className="text-xl text-black">
              Quick 2-minute qualification check
            </p>
          </div>

          <div className="space-y-6">
            {/* Funding Amount */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#193a59]">How much funding do you need?</h3>
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 mb-4 border border-[#193a59]/20">
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-[#193a59] mb-2">
                    {formatCurrency(leadData.fundingAmount)}
                  </div>
                </div>
                <input
                  type="range"
                  value={leadData.fundingAmount}
                  onChange={(e) => setLeadData(prev => ({ ...prev, fundingAmount: parseInt(e.target.value) }))}
                  max={2000000}
                  min={10000}
                  step={5000}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                  data-testid="slider-funding-amount"
                  style={{
                    background: `linear-gradient(to right, #193a59 0%, #193a59 ${((leadData.fundingAmount - 10000) / (2000000 - 10000)) * 100}%, #d9d9d9 ${((leadData.fundingAmount - 10000) / (2000000 - 10000)) * 100}%, #d9d9d9 100%)`
                  }}
                />
                <div className="flex justify-between text-sm mt-2 text-black/70">
                  <span>$10K</span>
                  <span>$2M+</span>
                </div>
              </div>
            </div>

            {/* Business Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-[#193a59]">Monthly Revenue</label>
                <select
                  value={leadData.monthlyRevenue}
                  onChange={(e) => setLeadData(prev => ({ ...prev, monthlyRevenue: e.target.value }))}
                  className="w-full p-3 rounded-xl border-2 border-gray-300 bg-white text-black focus:border-[#193a59] focus:outline-none"
                  data-testid="select-revenue"
                >
                  <option value="">Select range</option>
                  <option value="$10K-$25K">$10K-$25K</option>
                  <option value="$25K-$50K">$25K-$50K</option>
                  <option value="$50K-$100K">$50K-$100K</option>
                  <option value="$100K+">$100K+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-[#193a59]">Time in Business</label>
                <select
                  value={leadData.timeInBusiness}
                  onChange={(e) => setLeadData(prev => ({ ...prev, timeInBusiness: e.target.value }))}
                  className="w-full p-3 rounded-xl border-2 border-gray-300 bg-white text-black focus:border-[#193a59] focus:outline-none"
                  data-testid="select-time-in-business"
                >
                  <option value="">Select period</option>
                  <option value="6 months">6 months</option>
                  <option value="1 year">1 year</option>
                  <option value="2+ years">2+ years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-[#193a59]">Credit Score Range</label>
              <select
                value={leadData.creditScore}
                onChange={(e) => setLeadData(prev => ({ ...prev, creditScore: e.target.value }))}
                className="w-full p-3 rounded-xl border-2 border-gray-300 bg-white text-black focus:border-[#193a59] focus:outline-none"
                data-testid="select-credit-score"
              >
                <option value="">Select range</option>
                <option value="550-600">550-600</option>
                <option value="600-650">600-650</option>
                <option value="650-700">650-700</option>
                <option value="700+">700+</option>
              </select>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#193a59]">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={leadData.firstName}
                  onChange={(e) => setLeadData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full p-3 rounded-xl border-2 border-gray-300 bg-white text-black placeholder-gray-500 focus:border-[#193a59] focus:outline-none"
                  data-testid="input-first-name"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={leadData.phone}
                  onChange={(e) => setLeadData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full p-3 rounded-xl border-2 border-gray-300 bg-white text-black placeholder-gray-500 focus:border-[#193a59] focus:outline-none"
                  data-testid="input-phone"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                value={leadData.email}
                onChange={(e) => setLeadData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full p-3 rounded-xl border-2 border-gray-300 bg-white text-black placeholder-gray-500 focus:border-[#193a59] focus:outline-none"
                data-testid="input-email"
              />
            </div>

            <Button 
              onClick={handleSubmit}
              disabled={!leadData.firstName || !leadData.email || !leadData.phone || !leadData.monthlyRevenue || !leadData.timeInBusiness || !leadData.creditScore || isSubmitting}
              className="w-full bg-[#193a59] hover:bg-[#193a59]/90 text-white py-4 text-lg font-semibold rounded-xl shadow-lg"
              data-testid="button-submit"
            >
              {isSubmitting ? 'Submitting...' : 'Get My Funding Quote'}
            </Button>
          </div>
        </div>

        {/* Right Image */}
        <div className="hidden lg:block relative">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#193a59]/20 z-10"></div>
          <img 
            src="/attached_assets/generated_images/Professional_businesswoman_headshot_cb14e1cc.png" 
            alt="Professional business consultant" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}