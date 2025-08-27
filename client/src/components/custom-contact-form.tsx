import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  businessType: string;
  timeInBusiness: string;
  monthlyRevenue: string;
  creditScore: string;
  fundingAmount: string;
  fundingPurpose: string;
  timeline: string;
  message: string;
}

export default function CustomContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    businessType: "",
    timeInBusiness: "",
    monthlyRevenue: "",
    creditScore: "",
    fundingAmount: "",
    fundingPurpose: "",
    timeline: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitStatus, setSubmitStatus] = useState<{type: 'success' | 'error'; message: string} | null>(null);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = "Please enter a valid phone number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch('/api/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: result.message || "Thank you! Your submission has been sent successfully. We'll contact you within 24 hours."
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          businessType: "",
          timeInBusiness: "",
          monthlyRevenue: "",
          creditScore: "",
          fundingAmount: "",
          fundingPurpose: "",
          timeline: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || "Failed to submit form. Please try again."
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: "Network error. Please check your connection and try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Status Messages */}
        {submitStatus && (
          <div className={`p-4 rounded-lg ${
            submitStatus.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {submitStatus.message}
          </div>
        )}

        {/* Personal Information */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="text-gray-700 font-medium">First Name *</Label>
            <Input 
              id="firstName"
              placeholder="John" 
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={`mt-1 border-gray-300 focus:border-[#193a59] focus:ring-[#193a59] ${errors.firstName ? 'border-red-500' : ''}`}
              data-testid="input-firstName"
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>

          <div>
            <Label htmlFor="lastName" className="text-gray-700 font-medium">Last Name *</Label>
            <Input 
              id="lastName"
              placeholder="Smith" 
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={`mt-1 border-gray-300 focus:border-[#193a59] focus:ring-[#193a59] ${errors.lastName ? 'border-red-500' : ''}`}
              data-testid="input-lastName"
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email" className="text-gray-700 font-medium">Email Address *</Label>
            <Input 
              id="email"
              type="email"
              placeholder="john@company.com" 
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`mt-1 border-gray-300 focus:border-[#193a59] focus:ring-[#193a59] ${errors.email ? 'border-red-500' : ''}`}
              data-testid="input-email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <Label htmlFor="phone" className="text-gray-700 font-medium">Phone Number *</Label>
            <Input 
              id="phone"
              type="tel"
              placeholder="(555) 123-4567" 
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={`mt-1 border-gray-300 focus:border-[#193a59] focus:ring-[#193a59] ${errors.phone ? 'border-red-500' : ''}`}
              data-testid="input-phone"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
        </div>

        {/* Business Information */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h3>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="company" className="text-gray-700 font-medium">Company Name</Label>
              <Input 
                id="company"
                placeholder="Your Company LLC" 
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className="mt-1 border-gray-300 focus:border-[#193a59] focus:ring-[#193a59]"
                data-testid="input-company"
              />
            </div>

            <div>
              <Label htmlFor="businessType" className="text-gray-700 font-medium">Business Type</Label>
              <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                <SelectTrigger className="mt-1 border-gray-300 focus:border-[#193a59] focus:ring-[#193a59]" data-testid="select-businessType">
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="restaurant">Restaurant & Food Service</SelectItem>
                  <SelectItem value="retail">Retail & E-commerce</SelectItem>
                  <SelectItem value="healthcare">Medical & Healthcare</SelectItem>
                  <SelectItem value="construction">Construction</SelectItem>
                  <SelectItem value="trucking">Trucking & Transportation</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="professional">Professional Services</SelectItem>
                  <SelectItem value="technology">Technology & Software</SelectItem>
                  <SelectItem value="beauty">Beauty & Wellness</SelectItem>
                  <SelectItem value="auto">Auto & Transportation</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="timeInBusiness" className="text-gray-700 font-medium">Time in Business</Label>
              <Select value={formData.timeInBusiness} onValueChange={(value) => handleInputChange('timeInBusiness', value)}>
                <SelectTrigger className="mt-1 border-gray-300 focus:border-[#193a59] focus:ring-[#193a59]" data-testid="select-timeInBusiness">
                  <SelectValue placeholder="Select time in business" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6-12months">6-12 months</SelectItem>
                  <SelectItem value="1-2years">1-2 years</SelectItem>
                  <SelectItem value="2-5years">2-5 years</SelectItem>
                  <SelectItem value="5+years">5+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="monthlyRevenue" className="text-gray-700 font-medium">Monthly Revenue</Label>
              <Select value={formData.monthlyRevenue} onValueChange={(value) => handleInputChange('monthlyRevenue', value)}>
                <SelectTrigger className="mt-1 border-gray-300 focus:border-[#193a59] focus:ring-[#193a59]" data-testid="select-monthlyRevenue">
                  <SelectValue placeholder="Select monthly revenue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10k-25k">$10K - $25K</SelectItem>
                  <SelectItem value="25k-50k">$25K - $50K</SelectItem>
                  <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                  <SelectItem value="100k-250k">$100K - $250K</SelectItem>
                  <SelectItem value="250k+">$250K+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Funding Information */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Funding Details</h3>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="fundingAmount" className="text-gray-700 font-medium">Funding Amount Needed</Label>
              <Select value={formData.fundingAmount} onValueChange={(value) => handleInputChange('fundingAmount', value)}>
                <SelectTrigger className="mt-1 border-gray-300 focus:border-[#193a59] focus:ring-[#193a59]" data-testid="select-fundingAmount">
                  <SelectValue placeholder="Select amount needed" />
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
            </div>

            <div>
              <Label htmlFor="timeline" className="text-gray-700 font-medium">When do you need funding?</Label>
              <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                <SelectTrigger className="mt-1 border-gray-300 focus:border-[#193a59] focus:ring-[#193a59]" data-testid="select-timeline">
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediately">Immediately</SelectItem>
                  <SelectItem value="1-2weeks">1-2 weeks</SelectItem>
                  <SelectItem value="1month">Within 1 month</SelectItem>
                  <SelectItem value="2-3months">2-3 months</SelectItem>
                  <SelectItem value="exploring">Just exploring options</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="fundingPurpose" className="text-gray-700 font-medium">What will you use the funding for?</Label>
            <Select value={formData.fundingPurpose} onValueChange={(value) => handleInputChange('fundingPurpose', value)}>
              <SelectTrigger className="mt-1 border-gray-300 focus:border-[#193a59] focus:ring-[#193a59]" data-testid="select-fundingPurpose">
                <SelectValue placeholder="Select funding purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="working-capital">Working Capital</SelectItem>
                <SelectItem value="equipment">Equipment Purchase</SelectItem>
                <SelectItem value="inventory">Inventory</SelectItem>
                <SelectItem value="expansion">Business Expansion</SelectItem>
                <SelectItem value="marketing">Marketing & Advertising</SelectItem>
                <SelectItem value="renovation">Renovation/Improvements</SelectItem>
                <SelectItem value="debt-consolidation">Debt Consolidation</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Message */}
        <div>
          <Label htmlFor="message" className="text-gray-700 font-medium">Additional Details (Optional)</Label>
          <Textarea 
            id="message"
            placeholder="Tell us more about your business and funding needs..."
            rows={4}
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            className="mt-1 border-gray-300 focus:border-[#193a59] focus:ring-[#193a59] resize-none"
            data-testid="textarea-message"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 text-lg font-semibold bg-[#193a59] hover:bg-[#285d8a] text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="button-submit"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              "Get Your Funding Quote"
            )}
          </Button>
          
          <p className="text-sm text-gray-500 text-center mt-3">
            * Required fields. We'll contact you within 24 hours.
          </p>
        </div>
      </form>
    </div>
  );
}