import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/Layout";
import { useLocation } from "wouter";
import { ArrowRight, ArrowLeft, CheckCircle, Phone, Mail, Building, DollarSign } from "lucide-react";
import SignatureCanvas from 'react-signature-canvas';

interface ApplicationFormData {
  // Step 1: Contact Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Step 2: Business Information
  businessName: string;
  dbaName: string;
  businessAddress: string;
  city: string;
  state: string;
  zipCode: string;
  ein: string;
  businessType: string;
  timeInBusiness: string;
  
  // Step 3: Financial Information
  monthlyRevenue: string;
  loanAmount: string;
  loanPurpose: string;
  creditScore: string;
  
  // Step 4: Additional Information & Consent
  bankAccount: boolean;
  consentToCommunications: boolean;
  consentToCredit: boolean;
  electronicSignature: string;
  signatureDate: string;
}

interface ApplicationFormProps {
  variant?: 'apply' | 'app' | 'applynow';
}

const steps = [
  { title: "Contact Info", icon: Phone, description: "Your personal details" },
  { title: "Business Info", icon: Building, description: "About your business" },
  { title: "Financial Info", icon: DollarSign, description: "Funding requirements" },
  { title: "Review & Sign", icon: CheckCircle, description: "Complete application" }
];

export default function ApplicationForm({ variant = 'apply' }: ApplicationFormProps) {
  const [location] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const signatureRef = useRef<SignatureCanvas>(null);
  const [formData, setFormData] = useState<ApplicationFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    businessName: "",
    dbaName: "",
    businessAddress: "",
    city: "",
    state: "",
    zipCode: "",
    ein: "",
    businessType: "",
    timeInBusiness: "",
    monthlyRevenue: "",
    loanAmount: "",
    loanPurpose: "",
    creditScore: "",
    bankAccount: false,
    consentToCommunications: false,
    consentToCredit: false,
    electronicSignature: "",
    signatureDate: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<{type: 'success' | 'error'; message: string} | null>(null);

  const handleInputChange = (field: keyof ApplicationFormData, value: string | boolean) => {
    // Apply input masks for specific fields
    if (typeof value === 'string') {
      if (field === 'phone') {
        // Phone mask: (XXX) XXX-XXXX
        const cleaned = value.replace(/\D/g, '');
        let formatted = cleaned;
        if (cleaned.length >= 3) {
          formatted = '(' + cleaned.slice(0, 3) + ')';
          if (cleaned.length >= 6) {
            formatted += ' ' + cleaned.slice(3, 6) + '-' + cleaned.slice(6, 10);
          } else if (cleaned.length > 3) {
            formatted += ' ' + cleaned.slice(3);
          }
        }
        value = formatted;
      } else if (field === 'ein') {
        // EIN mask: XX-XXXXXXX
        const cleaned = value.replace(/\D/g, '');
        let formatted = cleaned;
        if (cleaned.length >= 2) {
          formatted = cleaned.slice(0, 2) + '-' + cleaned.slice(2, 9);
        }
        value = formatted;
      }
    }

    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 0: // Contact Information
        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
        // Removed sensitive PII requirements for security compliance
        
        // Email validation
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Please enter a valid email address";
        }
        
        // Phone validation
        if (formData.phone && formData.phone.replace(/\D/g, '').length < 10) {
          newErrors.phone = "Please enter a valid phone number";
        }
        break;

      case 1: // Business Information
        if (!formData.businessName.trim()) newErrors.businessName = "Business name is required";
        if (!formData.businessAddress.trim()) newErrors.businessAddress = "Business address is required";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.state.trim()) newErrors.state = "State is required";
        if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";
        if (!formData.ein.trim()) newErrors.ein = "EIN is required";
        if (!formData.businessType) newErrors.businessType = "Business type is required";
        if (!formData.timeInBusiness) newErrors.timeInBusiness = "Time in business is required";
        break;

      case 2: // Financial Information
        if (!formData.monthlyRevenue) newErrors.monthlyRevenue = "Monthly revenue is required";
        if (!formData.loanAmount.trim()) newErrors.loanAmount = "Loan amount is required";
        if (!formData.loanPurpose.trim()) newErrors.loanPurpose = "Loan purpose is required";
        break;

      case 3: // Review & Sign
        if (!formData.consentToCommunications) newErrors.consentToCommunications = "Consent to communications is required";
        if (!formData.consentToCredit) newErrors.consentToCredit = "Consent to credit check is required";
        if (!signatureRef.current || signatureRef.current.isEmpty()) newErrors.electronicSignature = "Electronic signature is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Get signature data
      const signatureDataURL = signatureRef.current?.toDataURL() || '';
      
      // Prepare submission data to match existing API schema
      const submissionData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        businessName: formData.businessName,
        businessType: formData.businessType,
        yearsInBusiness: parseInt(formData.timeInBusiness.split('-')[0]) || 0,
        monthlyRevenue: parseInt(formData.monthlyRevenue.replace(/\D/g, '')) || 0,
        loanAmount: parseInt(formData.loanAmount.replace(/\D/g, '')) || 0,
        loanPurpose: formData.loanPurpose,
        creditScore: formData.creditScore ? parseInt(formData.creditScore) : undefined,
        status: "pending",
        // Additional data for internal tracking
        metadata: {
          businessAddress: `${formData.businessAddress}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
          ein: formData.ein,
          dbaName: formData.dbaName,
          electronicSignature: signatureDataURL,
          signatureDate: new Date().toISOString(),
          submissionSource: variant,
          submissionDate: new Date().toISOString()
        }
      };

      const response = await fetch('/api/loan-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Your loan application has been submitted successfully! We will review your application and contact you within 24 hours.'
        });
        
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          businessName: "",
          dbaName: "",
          businessAddress: "",
          city: "",
          state: "",
          zipCode: "",
          ein: "",
          businessType: "",
          timeInBusiness: "",
          monthlyRevenue: "",
          loanAmount: "",
          loanPurpose: "",
          creditScore: "",
          bankAccount: false,
          consentToCommunications: false,
          consentToCredit: false,
          electronicSignature: "",
          signatureDate: "",
        });
        setCurrentStep(0);
      } else {
        throw new Error('Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitStatus({
        type: 'error',
        message: 'There was an error submitting your application. Please try again or contact us directly at (305) 834-7168.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate proper title and description based on variant
  const getPageMeta = () => {
    switch (variant) {
      case 'apply':
        return {
          title: "Apply for Business Funding - Fast Approval | Lendura Capital",
          description: "Apply for business loans, lines of credit, and funding solutions. Get approved in 24 hours with competitive rates. Start your application today.",
          canonical: "https://lenduracapital.com/apply"
        };
      case 'app':
        return {
          title: "Business Loan Application - Quick & Easy | Lendura Capital", 
          description: "Complete your business funding application in minutes. Multiple loan options available with fast approval and competitive terms.",
          canonical: "https://lenduracapital.com/app"
        };
      case 'applynow':
        return {
          title: "Apply Now - Instant Business Funding | Lendura Capital",
          description: "Get instant access to business funding. Apply now for term loans, cash advances, and credit lines. Approved in 24 hours.",
          canonical: "https://lenduracapital.com/applynow"
        };
      default:
        return {
          title: "Business Loan Application | Lendura Capital",
          description: "Apply for business funding with Lendura Capital. Fast approval, competitive rates, multiple funding options available.",
          canonical: `https://lenduracapital.com${location}`
        };
    }
  };

  const pageMeta = getPageMeta();

  // Step content components
  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Contact Information
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Phone className="w-12 h-12 text-[#193a59] mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-[#193a59] mb-2">Contact Information</h2>
              <p className="text-gray-600">Let's start with your personal details</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName" className="text-base font-medium">First Name *</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={`mt-2 ${errors.firstName ? 'border-red-500' : ''}`}
                  data-testid="input-first-name"
                  placeholder="Enter your first name"
                />
                {errors.firstName && <span className="text-red-500 text-sm mt-1">{errors.firstName}</span>}
              </div>

              <div>
                <Label htmlFor="lastName" className="text-base font-medium">Last Name *</Label>
                <Input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={`mt-2 ${errors.lastName ? 'border-red-500' : ''}`}
                  data-testid="input-last-name"
                  placeholder="Enter your last name"
                />
                {errors.lastName && <span className="text-red-500 text-sm mt-1">{errors.lastName}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="email" className="text-base font-medium">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`mt-2 ${errors.email ? 'border-red-500' : ''}`}
                  data-testid="input-email"
                  placeholder="your@email.com"
                />
                {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
              </div>

              <div>
                <Label htmlFor="phone" className="text-base font-medium">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`mt-2 ${errors.phone ? 'border-red-500' : ''}`}
                  data-testid="input-phone"
                  placeholder="(555) 123-4567"
                />
                {errors.phone && <span className="text-red-500 text-sm mt-1">{errors.phone}</span>}
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm text-blue-800 dark:text-blue-300 mb-2 font-medium">
                📋 Additional Information
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                Additional documentation and identity verification will be requested during the approval process to ensure secure and compliant processing.
              </p>
            </div>
          </div>
        );

      case 1: // Business Information
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Building className="w-12 h-12 text-[#193a59] mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-[#193a59] mb-2">Business Information</h2>
              <p className="text-gray-600">Tell us about your business</p>
            </div>

            <div>
              <Label htmlFor="businessName" className="text-base font-medium">Legal Business Name *</Label>
              <Input
                id="businessName"
                type="text"
                value={formData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                className={`mt-2 ${errors.businessName ? 'border-red-500' : ''}`}
                data-testid="input-business-name"
                placeholder="Your Business LLC"
              />
              {errors.businessName && <span className="text-red-500 text-sm mt-1">{errors.businessName}</span>}
            </div>

            <div>
              <Label htmlFor="dbaName" className="text-base font-medium">DBA Name (if different)</Label>
              <Input
                id="dbaName"
                type="text"
                value={formData.dbaName}
                onChange={(e) => handleInputChange('dbaName', e.target.value)}
                className="mt-2"
                data-testid="input-dba-name"
                placeholder="Doing Business As"
              />
            </div>

            <div>
              <Label htmlFor="businessAddress" className="text-base font-medium">Business Address *</Label>
              <Input
                id="businessAddress"
                type="text"
                value={formData.businessAddress}
                onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                className={`mt-2 ${errors.businessAddress ? 'border-red-500' : ''}`}
                data-testid="input-business-address"
                placeholder="123 Business St"
              />
              {errors.businessAddress && <span className="text-red-500 text-sm mt-1">{errors.businessAddress}</span>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="city" className="text-base font-medium">City *</Label>
                <Input
                  id="city"
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className={`mt-2 ${errors.city ? 'border-red-500' : ''}`}
                  data-testid="input-city"
                  placeholder="New York"
                />
                {errors.city && <span className="text-red-500 text-sm mt-1">{errors.city}</span>}
              </div>

              <div>
                <Label htmlFor="state" className="text-base font-medium">State *</Label>
                <Input
                  id="state"
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className={`mt-2 ${errors.state ? 'border-red-500' : ''}`}
                  data-testid="input-state"
                  placeholder="NY"
                  maxLength={2}
                />
                {errors.state && <span className="text-red-500 text-sm mt-1">{errors.state}</span>}
              </div>

              <div>
                <Label htmlFor="zipCode" className="text-base font-medium">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  className={`mt-2 ${errors.zipCode ? 'border-red-500' : ''}`}
                  data-testid="input-zip-code"
                  placeholder="10001"
                />
                {errors.zipCode && <span className="text-red-500 text-sm mt-1">{errors.zipCode}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="ein" className="text-base font-medium">EIN (Tax ID) *</Label>
                <Input
                  id="ein"
                  type="text"
                  value={formData.ein}
                  onChange={(e) => handleInputChange('ein', e.target.value)}
                  className={`mt-2 ${errors.ein ? 'border-red-500' : ''}`}
                  data-testid="input-ein"
                  placeholder="XX-XXXXXXX"
                  maxLength={10}
                />
                {errors.ein && <span className="text-red-500 text-sm mt-1">{errors.ein}</span>}
              </div>

              <div>
                <Label htmlFor="businessType" className="text-base font-medium">Business Type *</Label>
                <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                  <SelectTrigger className={`mt-2 ${errors.businessType ? 'border-red-500' : ''}`} data-testid="select-business-type">
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LLC">LLC</SelectItem>
                    <SelectItem value="Corporation">Corporation</SelectItem>
                    <SelectItem value="Partnership">Partnership</SelectItem>
                    <SelectItem value="Sole Proprietorship">Sole Proprietorship</SelectItem>
                    <SelectItem value="S-Corp">S-Corp</SelectItem>
                    <SelectItem value="Non-Profit">Non-Profit</SelectItem>
                  </SelectContent>
                </Select>
                {errors.businessType && <span className="text-red-500 text-sm mt-1">{errors.businessType}</span>}
              </div>
            </div>

            <div>
              <Label htmlFor="timeInBusiness" className="text-base font-medium">Time in Business *</Label>
              <Select value={formData.timeInBusiness} onValueChange={(value) => handleInputChange('timeInBusiness', value)}>
                <SelectTrigger className={`mt-2 ${errors.timeInBusiness ? 'border-red-500' : ''}`} data-testid="select-time-in-business">
                  <SelectValue placeholder="Select time in business" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-6 months">0-6 months</SelectItem>
                  <SelectItem value="6-12 months">6-12 months</SelectItem>
                  <SelectItem value="1-2 years">1-2 years</SelectItem>
                  <SelectItem value="2-5 years">2-5 years</SelectItem>
                  <SelectItem value="5+ years">5+ years</SelectItem>
                </SelectContent>
              </Select>
              {errors.timeInBusiness && <span className="text-red-500 text-sm mt-1">{errors.timeInBusiness}</span>}
            </div>
          </div>
        );

      case 2: // Financial Information
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <DollarSign className="w-12 h-12 text-[#193a59] mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-[#193a59] mb-2">Financial Information</h2>
              <p className="text-gray-600">Your funding requirements and financial details</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="monthlyRevenue" className="text-base font-medium">Monthly Revenue *</Label>
                <Select value={formData.monthlyRevenue} onValueChange={(value) => handleInputChange('monthlyRevenue', value)}>
                  <SelectTrigger className={`mt-2 ${errors.monthlyRevenue ? 'border-red-500' : ''}`} data-testid="select-monthly-revenue">
                    <SelectValue placeholder="Select monthly revenue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="$10,000 - $25,000">$10,000 - $25,000</SelectItem>
                    <SelectItem value="$25,000 - $50,000">$25,000 - $50,000</SelectItem>
                    <SelectItem value="$50,000 - $100,000">$50,000 - $100,000</SelectItem>
                    <SelectItem value="$100,000 - $250,000">$100,000 - $250,000</SelectItem>
                    <SelectItem value="$250,000+">$250,000+</SelectItem>
                  </SelectContent>
                </Select>
                {errors.monthlyRevenue && <span className="text-red-500 text-sm mt-1">{errors.monthlyRevenue}</span>}
              </div>

              <div>
                <Label htmlFor="loanAmount" className="text-base font-medium">Desired Loan Amount *</Label>
                <Input
                  id="loanAmount"
                  type="text"
                  value={formData.loanAmount}
                  onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                  className={`mt-2 ${errors.loanAmount ? 'border-red-500' : ''}`}
                  data-testid="input-loan-amount"
                  placeholder="$50,000"
                />
                {errors.loanAmount && <span className="text-red-500 text-sm mt-1">{errors.loanAmount}</span>}
              </div>
            </div>

            <div>
              <Label htmlFor="loanPurpose" className="text-base font-medium">Loan Purpose *</Label>
              <Textarea
                id="loanPurpose"
                value={formData.loanPurpose}
                onChange={(e) => handleInputChange('loanPurpose', e.target.value)}
                className={`mt-2 ${errors.loanPurpose ? 'border-red-500' : ''}`}
                data-testid="input-loan-purpose"
                placeholder="Describe how you plan to use the funding (e.g., equipment purchase, working capital, expansion, etc.)"
                rows={4}
              />
              {errors.loanPurpose && <span className="text-red-500 text-sm mt-1">{errors.loanPurpose}</span>}
            </div>

            <div>
              <Label htmlFor="creditScore" className="text-base font-medium">Estimated Credit Score</Label>
              <Select value={formData.creditScore} onValueChange={(value) => handleInputChange('creditScore', value)}>
                <SelectTrigger className="mt-2" data-testid="select-credit-score">
                  <SelectValue placeholder="Select credit score range (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="750+">Excellent (750+)</SelectItem>
                  <SelectItem value="700-749">Good (700-749)</SelectItem>
                  <SelectItem value="650-699">Fair (650-699)</SelectItem>
                  <SelectItem value="600-649">Poor (600-649)</SelectItem>
                  <SelectItem value="<600">Below 600</SelectItem>
                  <SelectItem value="unknown">Don't Know</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3: // Review & Sign
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <CheckCircle className="w-12 h-12 text-[#193a59] mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-[#193a59] mb-2">Review & Sign</h2>
              <p className="text-gray-600">Review your information and complete your application</p>
            </div>

            {/* Application Summary */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold text-[#193a59] mb-4">Application Summary</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">Contact Information</p>
                  <p className="text-gray-600 dark:text-gray-400">{formData.firstName} {formData.lastName}</p>
                  <p className="text-gray-600 dark:text-gray-400">{formData.email}</p>
                  <p className="text-gray-600 dark:text-gray-400">{formData.phone}</p>
                </div>
                
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">Business Information</p>
                  <p className="text-gray-600 dark:text-gray-400">{formData.businessName}</p>
                  <p className="text-gray-600 dark:text-gray-400">{formData.businessType}</p>
                  <p className="text-gray-600 dark:text-gray-400">{formData.timeInBusiness}</p>
                </div>
                
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">Financial Information</p>
                  <p className="text-gray-600 dark:text-gray-400">Monthly Revenue: {formData.monthlyRevenue}</p>
                  <p className="text-gray-600 dark:text-gray-400">Loan Amount: {formData.loanAmount}</p>
                </div>
                
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">Loan Purpose</p>
                  <p className="text-gray-600 dark:text-gray-400">{formData.loanPurpose}</p>
                </div>
              </div>
            </div>

            {/* Consent Checkboxes */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <input
                  id="consentToCommunications"
                  type="checkbox"
                  checked={formData.consentToCommunications}
                  onChange={(e) => handleInputChange('consentToCommunications', e.target.checked)}
                  className="mt-1"
                  data-testid="checkbox-consent-communications"
                />
                <Label htmlFor="consentToCommunications" className="text-sm leading-relaxed">
                  I consent to receive communications including emails, text messages, and phone calls from Lendura Capital regarding my loan application and related services. I understand I can opt out at any time. *
                </Label>
              </div>
              {errors.consentToCommunications && <span className="text-red-500 text-sm">{errors.consentToCommunications}</span>}

              <div className="flex items-start space-x-3">
                <input
                  id="consentToCredit"
                  type="checkbox"
                  checked={formData.consentToCredit}
                  onChange={(e) => handleInputChange('consentToCredit', e.target.checked)}
                  className="mt-1"
                  data-testid="checkbox-consent-credit"
                />
                <Label htmlFor="consentToCredit" className="text-sm leading-relaxed">
                  I authorize Lendura Capital to obtain my credit report and share my information with potential lending partners for the purpose of securing funding. *
                </Label>
              </div>
              {errors.consentToCredit && <span className="text-red-500 text-sm">{errors.consentToCredit}</span>}
            </div>

            {/* Electronic Signature */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Electronic Signature *</Label>
              <div className="border-2 border-gray-300 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-4">
                  Please sign in the box below to complete your application
                </p>
                <div className="border border-gray-400 rounded" style={{ height: '200px' }}>
                  <SignatureCanvas
                    ref={signatureRef}
                    canvasProps={{
                      width: 500,
                      height: 200,
                      className: 'signature-canvas w-full h-full'
                    }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <button
                    type="button"
                    onClick={() => signatureRef.current?.clear()}
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    Clear Signature
                  </button>
                </div>
              </div>
              {errors.electronicSignature && <span className="text-red-500 text-sm">{errors.electronicSignature}</span>}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Layout
      title={pageMeta.title}
      description={pageMeta.description}
      canonical={pageMeta.canonical}
      keywords="business loan application, business funding, apply for loan, business financing, loan approval"
      openGraph={{
        title: pageMeta.title,
        description: pageMeta.description,
        type: "service"
      }}
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": pageMeta.title,
        "description": pageMeta.description,
        "url": pageMeta.canonical,
        "isPartOf": {
          "@type": "WebSite",
          "name": "Lendura Capital",
          "url": "https://lenduracapital.com"
        },
        "mainEntity": {
          "@type": "Service",
          "name": "Business Loan Application",
          "description": "Apply for business funding with fast approval and competitive rates",
          "provider": {
            "@type": "FinancialService",
            "name": "Lendura Capital"
          }
        }
      }}
      data-testid="application-form-page"
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-bold text-[#193a59] dark:text-white mb-4">
                Business Loan Application
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                Get approved in 24 hours
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                Complete your application in just a few minutes. We'll review your information and contact you with funding options tailored to your business needs.
              </p>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="bg-white dark:bg-gray-800 border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      index <= currentStep 
                        ? 'bg-[#193a59] text-white' 
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="ml-3 hidden sm:block">
                      <p className={`text-sm font-medium ${
                        index <= currentStep ? 'text-[#193a59] dark:text-white' : 'text-gray-400 dark:text-gray-500'
                      }`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{step.description}</p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`hidden sm:block w-12 h-0.5 mx-4 ${
                        index < currentStep ? 'bg-[#193a59]' : 'bg-gray-200 dark:bg-gray-600'
                      }`}></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="py-8 sm:py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {submitStatus && (
              <div className={`mb-8 p-6 rounded-lg ${
                submitStatus.type === 'success' 
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-400 border border-green-200 dark:border-green-800' 
                  : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400 border border-red-200 dark:border-red-800'
              }`}>
                <div className="flex items-center">
                  <CheckCircle className={`w-6 h-6 mr-3 ${submitStatus.type === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />
                  <div>
                    <h3 className="font-semibold mb-2">
                      {submitStatus.type === 'success' ? 'Application Submitted Successfully!' : 'Application Error'}
                    </h3>
                    <p>{submitStatus.message}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8">
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t">
                {currentStep > 0 ? (
                  <Button
                    type="button"
                    onClick={prevStep}
                    variant="outline"
                    className="flex items-center px-6 py-3"
                    data-testid="button-previous"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                ) : (
                  <div></div>
                )}

                {currentStep < steps.length - 1 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center px-6 py-3 bg-[#193a59] hover:bg-[#285d8a] text-white"
                    data-testid="button-next"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center px-8 py-3 bg-[#2AD0C5] hover:bg-[#22b8aa] text-white font-semibold"
                    data-testid="button-submit-application"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <CheckCircle className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>

            {/* Help Section */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Need help with your application?
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6">
                <a
                  href="tel:3058347168"
                  className="flex items-center text-[#193a59] dark:text-blue-400 hover:underline"
                  data-testid="link-phone-help"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call (305) 834-7168
                </a>
                <a
                  href="mailto:support@lenduracapital.com"
                  className="flex items-center text-[#193a59] dark:text-blue-400 hover:underline"
                  data-testid="link-email-help"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}