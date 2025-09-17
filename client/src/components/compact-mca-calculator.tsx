import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator } from "lucide-react";
import { useLocation } from "wouter";

interface CompactCalculatorInputs {
  monthlyRevenue: string;
  advanceAmount: number;
  creditScore: string;
}

const monthlyRevenueOptions = [
  { value: "25k-50k", label: "$25K - $50K", factorRate: 1.30, riskLevel: "higher", paymentFreq: "daily" },
  { value: "50k-150k", label: "$50K - $150K", factorRate: 1.22, riskLevel: "moderate", paymentFreq: "weekly" },
  { value: "150k-500k", label: "$150K - $500K", factorRate: 1.18, riskLevel: "lower", paymentFreq: "bi-weekly" },
  { value: "500k-1m", label: "$500K - $1M", factorRate: 1.15, riskLevel: "lowest", paymentFreq: "monthly" },
  { value: "1m+", label: "$1M+", factorRate: 1.12, riskLevel: "premium", paymentFreq: "monthly" }
];

const creditScoreOptions = [
  { value: "below-600", label: "Below 600", adjustment: 0.05 },
  { value: "600-650", label: "600-650", adjustment: 0.02 },
  { value: "650-700", label: "650-700", adjustment: 0 },
  { value: "700-750", label: "700-750", adjustment: -0.02 },
  { value: "750+", label: "750+", adjustment: -0.04 }
];

export default function CompactMCACalculator() {
  const [, setLocation] = useLocation();
  const [inputs, setInputs] = useState<CompactCalculatorInputs>({
    monthlyRevenue: "",
    advanceAmount: 50000,
    creditScore: ""
  });
  
  const [showEstimate, setShowEstimate] = useState(false);

  const calculateQuickEstimate = () => {
    if (!inputs.monthlyRevenue) return null;
    
    const revenueOption = monthlyRevenueOptions.find(opt => opt.value === inputs.monthlyRevenue);
    if (!revenueOption) return null;

    // Use deterministic factor rate based on revenue tier
    let factorRate = revenueOption.factorRate;
    
    // Adjust factor rate based on credit score
    if (inputs.creditScore) {
      const creditOption = creditScoreOptions.find(opt => opt.value === inputs.creditScore);
      if (creditOption) {
        factorRate += creditOption.adjustment;
      }
    }
    
    // Adjust factor rate slightly based on advance amount (higher amounts get slightly better rates)
    const advanceAdjustment = inputs.advanceAmount >= 100000 ? -0.03 : 
                             inputs.advanceAmount >= 50000 ? -0.02 : 
                             inputs.advanceAmount >= 25000 ? -0.01 : 0;
    const adjustedFactorRate = Math.max(1.10, factorRate + advanceAdjustment);
    
    const totalPayback = inputs.advanceAmount * adjustedFactorRate;
    
    // Calculate term length based on advance amount and revenue tier
    const baseTermMonths = revenueOption.riskLevel === "premium" ? 8 :
                          revenueOption.riskLevel === "lowest" ? 10 : 
                          revenueOption.riskLevel === "lower" ? 11 :
                          revenueOption.riskLevel === "moderate" ? 12 : 13;
    
    // Calculate payment based on frequency
    let payment;
    let paymentLabel;
    
    switch (revenueOption.paymentFreq) {
      case "daily":
        payment = Math.round(totalPayback / (baseTermMonths * 22)); // 22 business days per month
        paymentLabel = "Daily Payment";
        break;
      case "weekly":
        payment = Math.round(totalPayback / (baseTermMonths * 4.33)); // ~4.33 weeks per month
        paymentLabel = "Weekly Payment";
        break;
      case "bi-weekly":
        payment = Math.round(totalPayback / (baseTermMonths * 2.17)); // ~2.17 bi-weekly periods per month
        paymentLabel = "Bi-Weekly Payment";
        break;
      case "monthly":
        payment = Math.round(totalPayback / baseTermMonths);
        paymentLabel = "Monthly Payment";
        break;
      default:
        payment = Math.round(totalPayback / (baseTermMonths * 22));
        paymentLabel = "Daily Payment";
    }

    return {
      factorRate: Math.round(adjustedFactorRate * 100) / 100,
      totalPayback: Math.round(totalPayback),
      payment,
      paymentLabel,
      paymentFrequency: revenueOption.paymentFreq,
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
      <div className="mb-4">
        <button 
          onClick={() => setLocation('/solutions/merchant-cash-advance')}
          className="font-bold text-gray-900 text-lg hover:text-[#193a59] transition-colors cursor-pointer"
          data-testid="footer-calculator-title"
        >
          Merchant Cash Advance Calculator
        </button>
      </div>
      
      <div className="space-y-3">
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
              Credit Score
            </label>
            <Select 
              value={inputs.creditScore} 
              onValueChange={(value) => {
                setInputs({...inputs, creditScore: value});
                if (inputs.monthlyRevenue) setShowEstimate(true); // Update estimate if revenue is already selected
              }}
            >
              <SelectTrigger className="h-8 text-sm" data-testid="footer-select-credit-score">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                {creditScoreOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-3">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Advance Amount: {formatCurrency(inputs.advanceAmount)}
          </label>
          <Input
            type="range"
            min={10000}
            max={500000}
            step={10000}
            value={inputs.advanceAmount}
            onChange={(e) => {
              setInputs({...inputs, advanceAmount: parseInt(e.target.value)});
              if (inputs.monthlyRevenue) setShowEstimate(true); // Update estimate if revenue is already selected
            }}
            className="h-2"
            data-testid="footer-slider-advance-amount"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>$10K</span>
            <span>$500K</span>
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
                <span className="text-gray-600 text-xs">{estimate.paymentLabel}:</span>
                <div className="font-semibold text-[#193a59]" data-testid="footer-result-payment">
                  {formatCurrency(estimate.payment)}
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-600 mb-2">
              Factor Rate: <strong>{estimate.factorRate}x</strong> • Est. {estimate.termMonths}-month term • {estimate.paymentFrequency.charAt(0).toUpperCase() + estimate.paymentFrequency.slice(1)} payments
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