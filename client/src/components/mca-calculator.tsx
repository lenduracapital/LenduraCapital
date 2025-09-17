import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Calculator, DollarSign, TrendingUp, Clock, AlertCircle } from "lucide-react";

interface CalculatorInputs {
  monthlyRevenue: string;
  creditScore: string;
  timeInBusiness: string;
  advanceAmount: number;
}

interface CalculationResults {
  factorRate: number;
  totalPayback: number;
  dailyPayment: number;
  weeklyPayment: number;
  biWeeklyPayment: number;
  monthlyPayment: number;
  termLengthMonths: number;
  aprEquivalent: number;
  paymentFrequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
  qualifiesForFlexible: boolean;
  riskCategory: 'excellent' | 'good' | 'fair' | 'poor';
}

const monthlyRevenueOptions = [
  { value: "10k-25k", label: "$10,000 - $25,000", min: 10000, max: 25000 },
  { value: "25k-50k", label: "$25,000 - $50,000", min: 25000, max: 50000 },
  { value: "50k-100k", label: "$50,000 - $100,000", min: 50000, max: 100000 },
  { value: "100k+", label: "$100,000+", min: 100000, max: 500000 }
];

const creditScoreOptions = [
  { value: "500-550", label: "500 - 550", min: 500, max: 550 },
  { value: "550-600", label: "550 - 600", min: 550, max: 600 },
  { value: "600-650", label: "600 - 650", min: 600, max: 650 },
  { value: "650-700", label: "650 - 700", min: 650, max: 700 },
  { value: "700+", label: "700+", min: 700, max: 850 }
];

const timeInBusinessOptions = [
  { value: "6-12", label: "6 - 12 months", months: 9 },
  { value: "1-2", label: "1 - 2 years", months: 18 },
  { value: "2-5", label: "2 - 5 years", months: 42 },
  { value: "5+", label: "5+ years", months: 72 }
];

export default function MCACalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    monthlyRevenue: "",
    creditScore: "",
    timeInBusiness: "",
    advanceAmount: 25000
  });
  
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!inputs.monthlyRevenue) {
      newErrors.monthlyRevenue = "Monthly revenue is required";
    }
    
    if (!inputs.creditScore) {
      newErrors.creditScore = "Credit score is required";
    }
    
    if (!inputs.timeInBusiness) {
      newErrors.timeInBusiness = "Time in business is required";
    }
    
    if (inputs.advanceAmount < 5000 || inputs.advanceAmount > 500000) {
      newErrors.advanceAmount = "Advance amount must be between $5,000 and $500,000";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateMCA = (): CalculationResults | null => {
    if (!validateInputs()) return null;

    // Get numeric values from selections
    const revenueOption = monthlyRevenueOptions.find(opt => opt.value === inputs.monthlyRevenue);
    const creditOption = creditScoreOptions.find(opt => opt.value === inputs.creditScore);
    const timeOption = timeInBusinessOptions.find(opt => opt.value === inputs.timeInBusiness);
    
    if (!revenueOption || !creditOption || !timeOption) return null;

    // Calculate average values for scoring
    const avgRevenue = (revenueOption.min + revenueOption.max) / 2;
    const avgCredit = (creditOption.min + creditOption.max) / 2;
    const timeInBusinessMonths = timeOption.months;

    // Determine risk category and base factor rate
    let riskCategory: 'excellent' | 'good' | 'fair' | 'poor';
    let factorRate: number;
    
    // Excellent: 700+ credit, $100K+ revenue, 5+ years
    if (avgCredit >= 700 && avgRevenue >= 100000 && timeInBusinessMonths >= 60) {
      riskCategory = 'excellent';
      factorRate = 1.10 + (Math.random() * 0.10); // 1.10-1.20
    }
    // Good: 650-700 credit, $50K+ revenue, 2+ years
    else if (avgCredit >= 650 && avgRevenue >= 50000 && timeInBusinessMonths >= 24) {
      riskCategory = 'good';
      factorRate = 1.20 + (Math.random() * 0.10); // 1.20-1.30
    }
    // Fair: 600-650 credit, $25K+ revenue, 1+ years
    else if (avgCredit >= 600 && avgRevenue >= 25000 && timeInBusinessMonths >= 12) {
      riskCategory = 'fair';
      factorRate = 1.25 + (Math.random() * 0.10); // 1.25-1.35
    }
    // Poor: Below thresholds
    else {
      riskCategory = 'poor';
      factorRate = 1.30 + (Math.random() * 0.10); // 1.30-1.40
    }

    // Determine if qualifies for flexible payment terms (A-tier businesses)
    const qualifiesForFlexible = avgCredit >= 750 && avgRevenue >= 100000 && timeInBusinessMonths >= 36;
    
    // Adjust factor rate for payment frequency
    let adjustedFactorRate = factorRate;
    let paymentFrequency: 'daily' | 'weekly' | 'biweekly' | 'monthly' = 'daily';
    
    if (qualifiesForFlexible) {
      // A-tier businesses can choose more flexible terms with better rates
      adjustedFactorRate = factorRate * 0.95; // 5% discount for flexible terms
      paymentFrequency = avgRevenue >= 200000 ? 'monthly' : 'biweekly';
    } else {
      // Standard businesses get daily/weekly payments
      paymentFrequency = avgRevenue >= 50000 ? 'weekly' : 'daily';
    }

    // Calculate total payback
    const totalPayback = inputs.advanceAmount * adjustedFactorRate;
    
    // Determine term length based on advance amount and risk
    let termLengthMonths: number;
    if (inputs.advanceAmount <= 25000) {
      termLengthMonths = riskCategory === 'excellent' ? 6 : riskCategory === 'good' ? 8 : 10;
    } else if (inputs.advanceAmount <= 100000) {
      termLengthMonths = riskCategory === 'excellent' ? 9 : riskCategory === 'good' ? 12 : 15;
    } else {
      termLengthMonths = riskCategory === 'excellent' ? 12 : riskCategory === 'good' ? 15 : 18;
    }

    // Calculate payment amounts
    const totalPayments = paymentFrequency === 'daily' ? (termLengthMonths * 22) : // 22 business days per month
                         paymentFrequency === 'weekly' ? (termLengthMonths * 4.33) : // ~4.33 weeks per month
                         paymentFrequency === 'biweekly' ? (termLengthMonths * 2.17) : // ~2.17 bi-weekly periods per month
                         termLengthMonths; // monthly
    
    const basePayment = totalPayback / totalPayments;
    
    // Calculate different payment frequencies
    const dailyPayment = paymentFrequency === 'daily' ? basePayment : basePayment / 22;
    const weeklyPayment = paymentFrequency === 'weekly' ? basePayment : basePayment * 4.33;
    const biWeeklyPayment = paymentFrequency === 'biweekly' ? basePayment : basePayment * 2.17;
    const monthlyPayment = paymentFrequency === 'monthly' ? basePayment : basePayment * 22;

    // Calculate APR equivalent (rough estimate)
    const totalInterest = totalPayback - inputs.advanceAmount;
    const aprEquivalent = (totalInterest / inputs.advanceAmount) * (12 / termLengthMonths) * 100;

    return {
      factorRate: Math.round(adjustedFactorRate * 100) / 100,
      totalPayback: Math.round(totalPayback),
      dailyPayment: Math.round(dailyPayment),
      weeklyPayment: Math.round(weeklyPayment),
      biWeeklyPayment: Math.round(biWeeklyPayment),
      monthlyPayment: Math.round(monthlyPayment),
      termLengthMonths,
      aprEquivalent: Math.round(aprEquivalent),
      paymentFrequency,
      qualifiesForFlexible,
      riskCategory
    };
  };

  const handleCalculate = () => {
    const calculationResults = calculateMCA();
    setResults(calculationResults);
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getRiskCategoryColor = (category: string) => {
    switch (category) {
      case 'excellent': return 'text-green-600 bg-green-50';
      case 'good': return 'text-blue-600 bg-blue-50';
      case 'fair': return 'text-yellow-600 bg-yellow-50';
      case 'poor': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPaymentFrequencyDisplay = (frequency: string) => {
    switch (frequency) {
      case 'daily': return 'Daily (Mon-Fri)';
      case 'weekly': return 'Weekly';
      case 'biweekly': return 'Bi-Weekly';
      case 'monthly': return 'Monthly';
      default: return frequency;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Calculator className="h-8 w-8 text-[#193a59]" />
          <h1 className="text-3xl font-bold text-[#193a59]">MCA Calculator</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get an instant estimate for your Merchant Cash Advance. Enter your business information below 
          to see potential advance amounts, factor rates, and payment terms.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-[#193a59] mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Business Information
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Revenue
              </label>
              <Select 
                value={inputs.monthlyRevenue} 
                onValueChange={(value) => setInputs({...inputs, monthlyRevenue: value})}
              >
                <SelectTrigger data-testid="select-monthly-revenue">
                  <SelectValue placeholder="Select monthly revenue range" />
                </SelectTrigger>
                <SelectContent>
                  {monthlyRevenueOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.monthlyRevenue && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.monthlyRevenue}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Credit Score
              </label>
              <Select 
                value={inputs.creditScore} 
                onValueChange={(value) => setInputs({...inputs, creditScore: value})}
              >
                <SelectTrigger data-testid="select-credit-score">
                  <SelectValue placeholder="Select credit score range" />
                </SelectTrigger>
                <SelectContent>
                  {creditScoreOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.creditScore && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.creditScore}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time in Business
              </label>
              <Select 
                value={inputs.timeInBusiness} 
                onValueChange={(value) => setInputs({...inputs, timeInBusiness: value})}
              >
                <SelectTrigger data-testid="select-time-in-business">
                  <SelectValue placeholder="Select time in business" />
                </SelectTrigger>
                <SelectContent>
                  {timeInBusinessOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.timeInBusiness && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.timeInBusiness}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Advance Amount Requested
              </label>
              <div className="space-y-2">
                <Input
                  type="range"
                  min={5000}
                  max={500000}
                  step={5000}
                  value={inputs.advanceAmount}
                  onChange={(e) => setInputs({...inputs, advanceAmount: parseInt(e.target.value)})}
                  className="slider-thumb"
                  data-testid="slider-advance-amount"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>$5K</span>
                  <span className="font-semibold text-[#193a59]">
                    {formatCurrency(inputs.advanceAmount)}
                  </span>
                  <span>$500K</span>
                </div>
                <Input
                  type="number"
                  min={5000}
                  max={500000}
                  value={inputs.advanceAmount}
                  onChange={(e) => setInputs({...inputs, advanceAmount: parseInt(e.target.value) || 0})}
                  className="mt-2"
                  placeholder="Or enter amount directly"
                  data-testid="input-advance-amount"
                />
              </div>
              {errors.advanceAmount && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.advanceAmount}
                </p>
              )}
            </div>

            <Button 
              onClick={handleCalculate}
              className="w-full bg-[#193a59] hover:bg-[#142a42] text-white"
              data-testid="button-calculate"
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculate MCA Terms
            </Button>
          </div>
        </Card>

        {/* Results Display */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-[#193a59] mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Your MCA Estimate
          </h2>

          {results ? (
            <div className="space-y-4">
              {/* Risk Category Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-gray-600">Risk Category:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getRiskCategoryColor(results.riskCategory)}`}>
                  {results.riskCategory}
                </span>
                {results.qualifiesForFlexible && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Flexible Terms Available
                  </span>
                )}
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Advance Amount</p>
                  <p className="text-lg font-semibold text-[#193a59]" data-testid="result-advance-amount">
                    {formatCurrency(inputs.advanceAmount)}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Total Payback</p>
                  <p className="text-lg font-semibold text-[#193a59]" data-testid="result-total-payback">
                    {formatCurrency(results.totalPayback)}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Factor Rate</p>
                  <p className="text-lg font-semibold text-[#193a59]" data-testid="result-factor-rate">
                    {results.factorRate}x
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Term Length</p>
                  <p className="text-lg font-semibold text-[#193a59]" data-testid="result-term-length">
                    {results.termLengthMonths} months
                  </p>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-[#193a59]" />
                  <h3 className="font-semibold text-[#193a59]">Payment Schedule</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Recommended payment frequency: <strong>{getPaymentFrequencyDisplay(results.paymentFrequency)}</strong>
                </p>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Daily:</span>
                    <span className="font-medium ml-1" data-testid="result-daily-payment">
                      {formatCurrency(results.dailyPayment)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Weekly:</span>
                    <span className="font-medium ml-1" data-testid="result-weekly-payment">
                      {formatCurrency(results.weeklyPayment)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Bi-Weekly:</span>
                    <span className="font-medium ml-1" data-testid="result-biweekly-payment">
                      {formatCurrency(results.biWeeklyPayment)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Monthly:</span>
                    <span className="font-medium ml-1" data-testid="result-monthly-payment">
                      {formatCurrency(results.monthlyPayment)}
                    </span>
                  </div>
                </div>
              </div>

              {/* APR Information */}
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>APR Equivalent:</strong> <span data-testid="result-apr">{results.aprEquivalent}%</span>
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  *This is an estimated APR equivalent. MCA products are not traditional loans and 
                  actual costs may vary based on your business performance and payment schedule.
                </p>
              </div>

              {/* CTA */}
              <div className="bg-[#193a59] text-white p-4 rounded-lg text-center">
                <h3 className="font-semibold mb-2">Ready to Apply?</h3>
                <p className="text-sm mb-3">
                  Get pre-approved in minutes with our simple online application.
                </p>
                <Button 
                  className="w-full bg-white text-[#193a59] hover:bg-gray-100"
                  data-testid="button-apply-now"
                >
                  Apply Now - Get Pre-Approved
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Enter your business information and click "Calculate MCA Terms" to see your estimate.</p>
            </div>
          )}
        </Card>
      </div>

      {/* Disclaimer */}
      <div className="text-center text-xs text-gray-500 max-w-3xl mx-auto">
        <p>
          *This calculator provides estimates only. Actual terms, rates, and approval amounts may vary based on 
          complete underwriting review, business performance, credit history, and other factors. 
          Merchant Cash Advances are not loans and should be carefully considered as a funding option.
        </p>
      </div>
    </div>
  );
}