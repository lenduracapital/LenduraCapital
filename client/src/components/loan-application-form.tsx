import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface LoanApplicationData {
  // Step 1: Contact Information
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  ssn: string;
  email: string;
  mobilePhone: string;
  
  // Step 2: Business Details
  legalCompanyName: string;
  dbaName: string;
  businessAddress: string;
  city: string;
  state: string;
  zipCode: string;
  ein: string;
  businessType: string;
  timeInBusiness: string;
  monthlyRevenue: string;
  
  // Step 3: Basic Documents (we'll simulate this)
  bankStatementsUploaded: boolean;
  businessLicenseUploaded: boolean;
  
  // Step 4: Signature and Consent
  consentToCommunications: boolean;
  electronicSignature: string;
  signatureDate: string;
}

const steps = [
  "Contact Information",
  "Business Details", 
  "Basic Documents",
  "Signature"
];

export default function LoanApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<LoanApplicationData>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    ssn: "",
    email: "",
    mobilePhone: "",
    legalCompanyName: "",
    dbaName: "",
    businessAddress: "",
    city: "",
    state: "",
    zipCode: "",
    ein: "",
    businessType: "",
    timeInBusiness: "",
    monthlyRevenue: "",
    bankStatementsUploaded: false,
    businessLicenseUploaded: false,
    consentToCommunications: false,
    electronicSignature: "",
    signatureDate: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<{type: 'success' | 'error'; message: string} | null>(null);

  const handleInputChange = (field: keyof LoanApplicationData, value: string | boolean) => {
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
        if (!formData.dateOfBirth.trim()) newErrors.dateOfBirth = "Date of birth is required";
        if (!formData.ssn.trim()) newErrors.ssn = "SSN/NIN is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.mobilePhone.trim()) newErrors.mobilePhone = "Mobile phone is required";
        
        // Email validation
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Please enter a valid email address";
        }
        
        // Phone validation
        if (formData.mobilePhone && !/^[\d\s\-\+\(\)]{10,}$/.test(formData.mobilePhone.replace(/\D/g, ''))) {
          newErrors.mobilePhone = "Please enter a valid phone number";
        }
        break;

      case 1: // Business Details
        if (!formData.legalCompanyName.trim()) newErrors.legalCompanyName = "Legal company name is required";
        if (!formData.businessAddress.trim()) newErrors.businessAddress = "Business address is required";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.state.trim()) newErrors.state = "State is required";
        if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";
        if (!formData.ein.trim()) newErrors.ein = "EIN is required";
        if (!formData.businessType) newErrors.businessType = "Business type is required";
        if (!formData.timeInBusiness) newErrors.timeInBusiness = "Time in business is required";
        if (!formData.monthlyRevenue) newErrors.monthlyRevenue = "Monthly revenue is required";
        break;

      case 2: // Basic Documents
        if (!formData.bankStatementsUploaded) newErrors.bankStatementsUploaded = "Bank statements confirmation is required";
        if (!formData.businessLicenseUploaded) newErrors.businessLicenseUploaded = "Business license confirmation is required";
        break;

      case 3: // Signature
        if (!formData.consentToCommunications) newErrors.consentToCommunications = "Consent to communications is required";
        if (!formData.electronicSignature.trim()) newErrors.electronicSignature = "Electronic signature is required";
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

  const generatePDF = async () => {
    const pdf = new jsPDF();
    
    // Add Lendura Capital header
    pdf.setFontSize(20);
    pdf.setTextColor(25, 58, 89); // #193a59
    pdf.text('Lendura Capital', 20, 25);
    
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Loan Application', 20, 35);
    
    // Add current date
    const currentDate = new Date().toLocaleDateString();
    pdf.setFontSize(10);
    pdf.text(`Date: ${currentDate}`, 20, 45);
    
    // Add form data
    pdf.setFontSize(12);
    let yPosition = 60;
    
    const addSection = (title: string, fields: Array<{label: string, value: string}>) => {
      pdf.setFontSize(14);
      pdf.setTextColor(25, 58, 89);
      pdf.text(title, 20, yPosition);
      yPosition += 10;
      
      pdf.setFontSize(11);
      pdf.setTextColor(0, 0, 0);
      
      fields.forEach(field => {
        pdf.text(`${field.label}: ${field.value}`, 25, yPosition);
        yPosition += 8;
      });
      yPosition += 5;
    };

    addSection('Contact Information', [
      {label: 'Name', value: `${formData.firstName} ${formData.lastName}`},
      {label: 'Email', value: formData.email},
      {label: 'Phone', value: formData.phone}
    ]);

    addSection('Business Information', [
      {label: 'Company Name', value: formData.companyName},
      {label: 'Time in Business', value: formData.timeInBusiness},
      {label: 'Industry', value: formData.industryType},
      {label: 'Monthly Revenue', value: formData.monthlyRevenue}
    ]);

    addSection('Loan Details', [
      {label: 'Requested Amount', value: formData.requestedAmount},
      {label: 'Use of Funds', value: formData.useOfFunds}
    ]);

    addSection('Consents & Signature', [
      {label: 'Credit Check Consent', value: formData.consentToCredit ? 'Yes' : 'No'},
      {label: 'Communication Consent', value: formData.consentToCommunications ? 'Yes' : 'No'},
      {label: 'Electronic Signature', value: formData.electronicSignature},
      {label: 'Signature Date', value: currentDate}
    ]);

    return pdf;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Generate PDF
      const pdf = await generatePDF();
      const pdfBlob = pdf.output('blob');

      // Create FormData for file upload
      const submitFormData = new FormData();
      submitFormData.append('pdf', pdfBlob, `loan-application-${Date.now()}.pdf`);
      submitFormData.append('formData', JSON.stringify({
        ...formData,
        signatureDate: new Date().toISOString(),
        submissionDate: new Date().toISOString()
      }));

      const response = await fetch('/api/loan-application', {
        method: 'POST',
        body: submitFormData,
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
          dateOfBirth: "",
          ssn: "",
          email: "",
          mobilePhone: "",
          legalCompanyName: "",
          dbaName: "",
          businessAddress: "",
          city: "",
          state: "",
          zipCode: "",
          ein: "",
          businessType: "",
          timeInBusiness: "",
          monthlyRevenue: "",
          bankStatementsUploaded: false,
          businessLicenseUploaded: false,
          consentToCommunications: false,
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
        message: 'There was an error submitting your application. Please try again or contact us directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step content components
  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Contact Information
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First name *</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={errors.firstName ? 'border-red-500' : ''}
                  data-testid="input-first-name"
                />
                {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}
              </div>

              <div>
                <Label htmlFor="lastName">Last name *</Label>
                <Input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={errors.lastName ? 'border-red-500' : ''}
                  data-testid="input-last-name"
                />
                {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className={errors.dateOfBirth ? 'border-red-500' : ''}
                  data-testid="input-date-of-birth"
                />
                {errors.dateOfBirth && <span className="text-red-500 text-sm">{errors.dateOfBirth}</span>}
              </div>

              <div>
                <Label htmlFor="ssn">SSN/NIN *</Label>
                <Input
                  id="ssn"
                  type="text"
                  value={formData.ssn}
                  onChange={(e) => handleInputChange('ssn', e.target.value)}
                  placeholder="XXX-XX-XXXX"
                  className={errors.ssn ? 'border-red-500' : ''}
                  data-testid="input-ssn"
                />
                {errors.ssn && <span className="text-red-500 text-sm">{errors.ssn}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={errors.email ? 'border-red-500' : ''}
                  data-testid="input-email"
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
              </div>

              <div>
                <Label htmlFor="mobilePhone">Mobile Phone *</Label>
                <Input
                  id="mobilePhone"
                  type="tel"
                  value={formData.mobilePhone}
                  onChange={(e) => handleInputChange('mobilePhone', e.target.value)}
                  placeholder="(555) 123-4567"
                  className={errors.mobilePhone ? 'border-red-500' : ''}
                  data-testid="input-mobile-phone"
                />
                {errors.mobilePhone && <span className="text-red-500 text-sm">{errors.mobilePhone}</span>}
              </div>
            </div>
          </div>
        );

      case 1: // Business Details
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="legalCompanyName">Legal Company Name *</Label>
              <Input
                id="legalCompanyName"
                type="text"
                value={formData.legalCompanyName}
                onChange={(e) => handleInputChange('legalCompanyName', e.target.value)}
                className={errors.legalCompanyName ? 'border-red-500' : ''}
                data-testid="input-legal-company-name"
              />
              {errors.legalCompanyName && <span className="text-red-500 text-sm">{errors.legalCompanyName}</span>}
            </div>

            <div>
              <Label htmlFor="dbaName">DBA Name (if different)</Label>
              <Input
                id="dbaName"
                type="text"
                value={formData.dbaName}
                onChange={(e) => handleInputChange('dbaName', e.target.value)}
                data-testid="input-dba-name"
              />
            </div>

            <div>
              <Label htmlFor="businessAddress">Business Address *</Label>
              <Input
                id="businessAddress"
                type="text"
                value={formData.businessAddress}
                onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                className={errors.businessAddress ? 'border-red-500' : ''}
                data-testid="input-business-address"
              />
              {errors.businessAddress && <span className="text-red-500 text-sm">{errors.businessAddress}</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className={errors.city ? 'border-red-500' : ''}
                  data-testid="input-city"
                />
                {errors.city && <span className="text-red-500 text-sm">{errors.city}</span>}
              </div>

              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className={errors.state ? 'border-red-500' : ''}
                  data-testid="input-state"
                />
                {errors.state && <span className="text-red-500 text-sm">{errors.state}</span>}
              </div>

              <div>
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  className={errors.zipCode ? 'border-red-500' : ''}
                  data-testid="input-zip-code"
                />
                {errors.zipCode && <span className="text-red-500 text-sm">{errors.zipCode}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ein">EIN *</Label>
                <Input
                  id="ein"
                  type="text"
                  value={formData.ein}
                  onChange={(e) => handleInputChange('ein', e.target.value)}
                  placeholder="XX-XXXXXXX"
                  className={errors.ein ? 'border-red-500' : ''}
                  data-testid="input-ein"
                />
                {errors.ein && <span className="text-red-500 text-sm">{errors.ein}</span>}
              </div>

              <div>
                <Label htmlFor="businessType">Business Type *</Label>
                <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                  <SelectTrigger className={errors.businessType ? 'border-red-500' : ''} data-testid="select-business-type">
                    <SelectValue placeholder="Select..." />
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
                {errors.businessType && <span className="text-red-500 text-sm">{errors.businessType}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="timeInBusiness">Time in Business *</Label>
                <Select value={formData.timeInBusiness} onValueChange={(value) => handleInputChange('timeInBusiness', value)}>
                  <SelectTrigger className={errors.timeInBusiness ? 'border-red-500' : ''} data-testid="select-time-in-business">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6-12 months">6-12 months</SelectItem>
                    <SelectItem value="1-2 years">1-2 years</SelectItem>
                    <SelectItem value="2-5 years">2-5 years</SelectItem>
                    <SelectItem value="5+ years">5+ years</SelectItem>
                  </SelectContent>
                </Select>
                {errors.timeInBusiness && <span className="text-red-500 text-sm">{errors.timeInBusiness}</span>}
              </div>

              <div>
                <Label htmlFor="monthlyRevenue">Monthly Revenue *</Label>
                <Select value={formData.monthlyRevenue} onValueChange={(value) => handleInputChange('monthlyRevenue', value)}>
                  <SelectTrigger className={errors.monthlyRevenue ? 'border-red-500' : ''} data-testid="select-monthly-revenue">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="$10K - $25K">$10K - $25K</SelectItem>
                    <SelectItem value="$25K - $50K">$25K - $50K</SelectItem>
                    <SelectItem value="$50K - $100K">$50K - $100K</SelectItem>
                    <SelectItem value="$100K - $250K">$100K - $250K</SelectItem>
                    <SelectItem value="$250K+">$250K+</SelectItem>
                  </SelectContent>
                </Select>
                {errors.monthlyRevenue && <span className="text-red-500 text-sm">{errors.monthlyRevenue}</span>}
              </div>
            </div>
          </div>
        );

      case 2: // Basic Documents
        return (
          <div className="space-y-6">
            <div className="text-center text-gray-600 mb-6">
              <p>Please confirm you have the following documents ready:</p>
            </div>

            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="bankStatementsUploaded"
                    checked={formData.bankStatementsUploaded}
                    onChange={(e) => handleInputChange('bankStatementsUploaded', e.target.checked)}
                    className="mt-1 h-4 w-4 text-[#193a59] focus:ring-[#193a59] border-gray-300 rounded"
                    data-testid="checkbox-bank-statements"
                  />
                  <div>
                    <Label htmlFor="bankStatementsUploaded" className="font-medium">
                      Bank Statements (Last 3 months) *
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Business bank statements showing your monthly revenue and cash flow
                    </p>
                  </div>
                </div>
                {errors.bankStatementsUploaded && <span className="text-red-500 text-sm">{errors.bankStatementsUploaded}</span>}
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="businessLicenseUploaded"
                    checked={formData.businessLicenseUploaded}
                    onChange={(e) => handleInputChange('businessLicenseUploaded', e.target.checked)}
                    className="mt-1 h-4 w-4 text-[#193a59] focus:ring-[#193a59] border-gray-300 rounded"
                    data-testid="checkbox-business-license"
                  />
                  <div>
                    <Label htmlFor="businessLicenseUploaded" className="font-medium">
                      Business License or Articles of Incorporation *
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Valid business registration documents
                    </p>
                  </div>
                </div>
                {errors.businessLicenseUploaded && <span className="text-red-500 text-sm">{errors.businessLicenseUploaded}</span>}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                📄 <strong>Note:</strong> You can upload these documents after submitting your application. 
                Our team will contact you with secure upload instructions within 24 hours.
              </p>
            </div>
          </div>
        );

      case 3: // Signature
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 border rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Consent to Communications:</h4>
              <div className="text-sm text-gray-700 leading-relaxed space-y-2">
                <p>
                  By providing your contact information and signing below, you authorize Lendura Capital and its representatives, 
                  successors, assigns, and designees to communicate with you via phone calls, text messages, and emails, 
                  including automated technology and pre-recorded messages, for informational, marketing, or transactional purposes.
                </p>
                <p>
                  Standard message and data rates may apply. You may opt-out at any time by replying "STOP" to text messages, 
                  unsubscribing from emails, or contacting us directly.
                </p>
                <p>
                  You further authorize Lendura Capital and its designees to obtain consumer, personal, business, and investigative 
                  reports about you from consumer reporting agencies, banks, creditors, government agencies, and other third parties 
                  for purposes related to commercial loans or purchases of future receivables.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="consentToCommunications"
                checked={formData.consentToCommunications}
                onChange={(e) => handleInputChange('consentToCommunications', e.target.checked)}
                className="mt-1 h-4 w-4 text-[#193a59] focus:ring-[#193a59] border-gray-300 rounded"
                data-testid="checkbox-consent-communications"
              />
              <Label htmlFor="consentToCommunications" className="text-sm">
                I agree to the terms above and authorize Lendura Capital to proceed with my application. *
              </Label>
            </div>
            {errors.consentToCommunications && <span className="text-red-500 text-sm">{errors.consentToCommunications}</span>}

            <div>
              <Label htmlFor="electronicSignature">Electronic Signature *</Label>
              <Input
                id="electronicSignature"
                type="text"
                value={formData.electronicSignature}
                onChange={(e) => handleInputChange('electronicSignature', e.target.value)}
                placeholder="Type your full name to sign electronically"
                className={errors.electronicSignature ? 'border-red-500 text-lg' : 'text-lg'}
                data-testid="input-electronic-signature"
              />
              {errors.electronicSignature && <span className="text-red-500 text-sm">{errors.electronicSignature}</span>}
              <p className="text-xs text-gray-500 mt-1">
                By typing your name above, you agree to sign this application electronically.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
      {/* Progress Steps */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 font-semibold text-sm ${
                index <= currentStep 
                  ? 'bg-[#193a59] text-white border-[#193a59]' 
                  : 'bg-white text-gray-400 border-gray-300'
              }`}>
                {index + 1}
              </div>
              <span className={`ml-2 text-sm font-medium ${
                index <= currentStep ? 'text-[#193a59]' : 'text-gray-400'
              }`}>
                {step}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-8 h-0.5 ml-4 ${
                  index < currentStep ? 'bg-[#193a59]' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Success/Error Messages */}
      {submitStatus && (
        <div className={`mb-6 p-4 rounded-lg ${
          submitStatus.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {submitStatus.message}
        </div>
      )}

      {/* Form Content */}
      <form onSubmit={currentStep === steps.length - 1 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#193a59] mb-6">
            {steps[currentStep]}
          </h2>
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0}
            variant="outline"
            className={currentStep === 0 ? 'invisible' : ''}
          >
            Previous
          </Button>
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#193a59] hover:bg-[#2a4a6b] text-white px-8"
            data-testid="button-next-submit"
          >
            {currentStep === steps.length - 1 
              ? (isSubmitting ? 'Submitting...' : 'Submit Application')
              : 'Next'
            }
          </Button>
        </div>
      </form>

      <div className="text-center text-xs text-gray-500 mt-4">
        <p>🔒 Your information is encrypted and secure. We respect your privacy.</p>
      </div>
    </div>
  );
}