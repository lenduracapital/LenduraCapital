import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator } from "lucide-react";
import { useLocation } from "wouter";

interface CompactCalculatorInputs {
  monthlyRevenue: string;
  advanceAmount: number;
}

const monthlyRevenueOptions = [
  { value: "10k-25k", label: "$10K - $25K", factorRate: 1.32, riskLevel: "higher" },
  { value: "25k-50k", label: "$25K - $50K", factorRate: 1.25, riskLevel: "moderate" },
  { value: "50k-100k", label: "$50K - $100K", factorRate: 1.20, riskLevel: "lower" },
  { value: "100k+", label: "$100K+", factorRate: 1.16, riskLevel: "lowest" }
];

export default function CompactMCACalculator() {
  const [, setLocation] = useLocation();
  const [inputs, setInputs] = useState<CompactCalculatorInputs>({
    monthlyRevenue: "",
    advanceAmount: 25000
  });
  
  const [showEstimate, setShowEstimate] = useState(false);

  const calculateQuickEstimate = () => {
    if (!inputs.monthlyRevenue) return null;
    
    const revenueOption = monthlyRevenueOptions.find(opt => opt.value === inputs.monthlyRevenue);
    if (!revenueOption) return null;

    // Use deterministic factor rate based on revenue tier
    const factorRate = revenueOption.factorRate;
    
    // Adjust factor rate slightly based on advance amount (higher amounts get slightly better rates)
    const advanceAdjustment = inputs.advanceAmount >= 50000 ? -0.02 : 
                             inputs.advanceAmount >= 25000 ? -0.01 : 0;
    const adjustedFactorRate = Math.max(1.12, factorRate + advanceAdjustment);
    
    const totalPayback = inputs.advanceAmount * adjustedFactorRate;
    
    // Calculate term length based on advance amount and revenue tier
    const baseTermMonths = revenueOption.riskLevel === "lowest" ? 10 : 
                          revenueOption.riskLevel === "lower" ? 11 :
                          revenueOption.riskLevel === "moderate" ? 12 : 13;
    
    const dailyPayment = Math.round(totalPayback / (baseTermMonths * 22)); // 22 business days per month

    return {
      factorRate: Math.round(adjustedFactorRate * 100) / 100,
      totalPayback: Math.round(totalPayback),
      dailyPayment,
      termMonths: baseTermMonths
    };
  };

  const estimate = calculateQuickEstimate();

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleGetDetailedQuote = () => {
    // Navigate to full calculator page or apply page
    setLocation('/apply-now');
  };

  const handleQuickCalculate = () => {
    if (inputs.monthlyRevenue) {
      setShowEstimate(true);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <Calculator className="h-5 w-5 text-[#193a59]" />
        <button 
          onClick={() => setLocation('/solutions/merchant-cash-advance')}
          className="font-bold text-gray-900 text-lg hover:text-[#193a59] transition-colors cursor-pointer"
          data-testid="footer-calculator-title"
        >
          Merchant Cash Advance Calculator
        </button>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Monthly Revenue
          </label>
          <Select 
            value={inputs.monthlyRevenue} 
            onValueChange={(value) => {
              setInputs({...inputs, monthlyRevenue: value});
              setShowEstimate(true); // Auto-show estimate when revenue is selected
            }}
          >
            <SelectTrigger className="h-8 text-sm" data-testid="footer-select-monthly-revenue">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              {monthlyRevenueOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Advance Amount: {formatCurrency(inputs.advanceAmount)}
          </label>
          <Input
            type="range"
            min={5000}
            max={100000}
            step={5000}
            value={inputs.advanceAmount}
            onChange={(e) => {
              setInputs({...inputs, advanceAmount: parseInt(e.target.value)});
              if (inputs.monthlyRevenue) setShowEstimate(true); // Update estimate if revenue is already selected
            }}
            className="h-2"
            data-testid="footer-slider-advance-amount"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>$5K</span>
            <span>$100K</span>
          </div>
        </div>

        <Button 
          onClick={handleQuickCalculate}
          className="w-full bg-[#193a59] hover:bg-[#142a42] text-white h-8 text-sm"
          disabled={!inputs.monthlyRevenue}
          data-testid="footer-button-quick-calculate"
        >
          <Calculator className="h-3 w-3 mr-1" />
          Quick Estimate
        </Button>

        {showEstimate && estimate && (
          <div className="bg-blue-50 p-3 rounded-lg text-sm space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-gray-600 text-xs">Total Payback:</span>
                <div className="font-semibold text-[#193a59]" data-testid="footer-result-total-payback">
                  {formatCurrency(estimate.totalPayback)}
                </div>
              </div>
              <div>
                <span className="text-gray-600 text-xs">Daily Payment:</span>
                <div className="font-semibold text-[#193a59]" data-testid="footer-result-daily-payment">
                  {formatCurrency(estimate.dailyPayment)}
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-600 mb-2">
              Factor Rate: <strong>{estimate.factorRate}x</strong> • Est. {estimate.termMonths}-month term
            </div>
          </div>
        )}

        {/* CTA Section - Maintain the original footer CTA */}
        <div className="bg-[#193a59] rounded-lg p-3 text-center text-white mt-4">
          <p className="text-xs mb-2">Ready to Get Funded?</p>
          <Button
            onClick={handleGetDetailedQuote}
            className="bg-white text-[#193a59] hover:bg-gray-100 font-bold text-xs px-3 py-1.5 rounded mb-2 w-full transition-all duration-300"
            data-testid="footer-cta-apply"
          >
            Get Detailed Quote
          </Button>
          <a 
            href="tel:3058347168"
            className="text-white font-bold text-xs hover:underline block"
            data-testid="footer-phone-link"
          >
            (305) 834-7168
          </a>
          <p className="text-xs text-gray-300 mt-1">Mon-Fri 9AM-6PM EST</p>
        </div>

        {/* Quick links section */}
        <div className="pt-2 border-t border-gray-200">
          <ul className="space-y-1">
            <li>
              <button 
                onClick={() => setLocation("/about")} 
                className="text-gray-600 hover:text-[#193a59] text-xs transition-colors"
                data-testid="footer-link-about"
              >
                About Lendura
              </button>
            </li>
            <li>
              <button 
                onClick={() => setLocation("/more-testimonials")} 
                className="text-gray-600 hover:text-[#193a59] text-xs transition-colors"
                data-testid="footer-link-testimonials"
              >
                Success Stories
              </button>
            </li>
            <li>
              <button 
                onClick={() => setLocation("/contact")} 
                className="text-gray-600 hover:text-[#193a59] text-xs transition-colors"
                data-testid="footer-link-contact"
              >
                Contact Us
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}