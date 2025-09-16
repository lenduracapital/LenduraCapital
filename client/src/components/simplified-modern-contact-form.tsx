import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Shield, Clock, Phone } from "lucide-react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  fundingAmount: string;
  timeline: string;
  businessType: string;
  monthlyRevenue: string;
  fundingPurpose: string;
}

export default function SimplifiedModernContactForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{type: 'success' | 'error'; message: string} | null>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    fundingAmount: "",
    timeline: "",
    businessType: "",
    monthlyRevenue: "",
    fundingPurpose: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep1 = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.fundingAmount) newErrors.fundingAmount = "Please select funding amount";
    if (!formData.timeline) newErrors.timeline = "Please select timeline";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.company.trim()) newErrors.company = "Company name is required";
    if (!formData.businessType) newErrors.businessType = "Please select business type";
    if (!formData.monthlyRevenue) newErrors.monthlyRevenue = "Please select monthly revenue";
    if (!formData.fundingPurpose.trim()) newErrors.fundingPurpose = "Please describe funding purpose";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! We\'ll contact you within 24 hours to discuss your funding options.'
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          fundingAmount: "",
          timeline: "",
          businessType: "",
          monthlyRevenue: "",
          fundingPurpose: "",
        });
        setCurrentStep(1);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Something went wrong. Please call us at (305) 834-7168 or try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus?.type === 'success') {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Received!</h3>
          <p className="text-gray-600 mb-6">{submitStatus.message}</p>
          <Button 
            onClick={() => setSubmitStatus(null)}
            className="bg-[#193a59] hover:bg-[#285d8a] text-white px-6 py-3 rounded-lg font-semibold"
          >
            Submit Another Application
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
      {/* Header with Progress */}
      <div className="bg-gradient-to-r from-[#193a59] to-[#285d8a] p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold">Get Your Funding Quote</h3>
          <div className="text-sm bg-white/20 px-3 py-1 rounded-full">
            Step {currentStep} of 2
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-300" 
            style={{ width: currentStep === 1 ? '50%' : '100%' }}
          />
        </div>
      </div>

      {/* Form Content */}
      <div className="p-8">
        {currentStep === 1 ? (
          <form onSubmit={handleStep1Submit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  data-testid="input-first-name"
                  className={errors.firstName ? 'border-red-500' : ''}
                />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  placeholder="Smith"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  data-testid="input-last-name"
                  className={errors.lastName ? 'border-red-500' : ''}
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@company.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                data-testid="input-email"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                data-testid="input-phone"
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Funding Amount Needed *</Label>
                <Select value={formData.fundingAmount} onValueChange={(value) => handleInputChange('fundingAmount', value)}>
                  <SelectTrigger data-testid="select-funding-amount" className={errors.fundingAmount ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select amount" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10k-50k">$10K - $50K</SelectItem>
                    <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                    <SelectItem value="100k-250k">$100K - $250K</SelectItem>
                    <SelectItem value="250k-500k">$250K - $500K</SelectItem>
                    <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                    <SelectItem value="1m+">$1M+</SelectItem>
                  </SelectContent>
                </Select>
                {errors.fundingAmount && <p className="text-red-500 text-sm">{errors.fundingAmount}</p>}
              </div>

              <div className="space-y-2">
                <Label>When do you need funding? *</Label>
                <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                  <SelectTrigger data-testid="select-timeline" className={errors.timeline ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediately">Immediately</SelectItem>
                    <SelectItem value="1-week">Within 1 week</SelectItem>
                    <SelectItem value="1-month">Within 1 month</SelectItem>
                    <SelectItem value="3-months">Within 3 months</SelectItem>
                    <SelectItem value="exploring">Just exploring options</SelectItem>
                  </SelectContent>
                </Select>
                {errors.timeline && <p className="text-red-500 text-sm">{errors.timeline}</p>}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#193a59] hover:bg-[#285d8a] text-white py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              data-testid="button-step1-continue"
            >
              Continue to Step 2 →
            </Button>
          </form>
        ) : (
          <form onSubmit={handleStep2Submit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="company">Company Name *</Label>
              <Input
                id="company"
                placeholder="Your Company LLC"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                data-testid="input-company"
                className={errors.company ? 'border-red-500' : ''}
              />
              {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Business Type *</Label>
                <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                  <SelectTrigger data-testid="select-business-type" className={errors.businessType ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="construction">Construction</SelectItem>
                    <SelectItem value="transportation">Transportation</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="professional-services">Professional Services</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.businessType && <p className="text-red-500 text-sm">{errors.businessType}</p>}
              </div>

              <div className="space-y-2">
                <Label>Monthly Revenue *</Label>
                <Select value={formData.monthlyRevenue} onValueChange={(value) => handleInputChange('monthlyRevenue', value)}>
                  <SelectTrigger data-testid="select-monthly-revenue" className={errors.monthlyRevenue ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select monthly revenue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="less-than-10k">Less than $10K</SelectItem>
                    <SelectItem value="10k-25k">$10K - $25K</SelectItem>
                    <SelectItem value="25k-50k">$25K - $50K</SelectItem>
                    <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                    <SelectItem value="100k-250k">$100K - $250K</SelectItem>
                    <SelectItem value="250k-plus">$250K+</SelectItem>
                  </SelectContent>
                </Select>
                {errors.monthlyRevenue && <p className="text-red-500 text-sm">{errors.monthlyRevenue}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fundingPurpose">What will you use the funding for? *</Label>
              <Textarea 
                id="fundingPurpose"
                placeholder="Equipment purchase, inventory, marketing, working capital, etc."
                className={`min-h-[100px] ${errors.fundingPurpose ? 'border-red-500' : ''}`}
                value={formData.fundingPurpose}
                onChange={(e) => handleInputChange('fundingPurpose', e.target.value)}
                data-testid="textarea-funding-purpose"
              />
              {errors.fundingPurpose && <p className="text-red-500 text-sm">{errors.fundingPurpose}</p>}
            </div>

            {submitStatus?.type === 'error' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">{submitStatus.message}</p>
              </div>
            )}

            <div className="flex gap-4">
              <Button 
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(1)}
                className="flex-1 py-4 text-lg font-semibold"
                data-testid="button-back-step1"
              >
                ← Back
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-1 bg-[#193a59] hover:bg-[#285d8a] text-white py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                data-testid="button-submit-application"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Trust indicators */}
      <div className="bg-gray-50 p-6 border-t">
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Shield className="w-5 h-5 text-[#193a59]" />
            <span className="text-sm text-gray-600">Secure & Private</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-5 h-5 text-[#193a59]" />
            <span className="text-sm text-gray-600">24hr Decision</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Phone className="w-5 h-5 text-[#193a59]" />
            <span className="text-sm text-gray-600">
              <a href="https://calendly.com/sam-lenduracapital/30min" className="hover:underline">
                (305) 834-7168
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}