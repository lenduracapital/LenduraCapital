import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface LoanApplicationData {
  // Contact Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Business Information
  companyName: string;
  timeInBusiness: string;
  industryType: string;
  monthlyRevenue: string;
  
  // Loan Details
  requestedAmount: string;
  useOfFunds: string;
  
  // Consent
  consentToCredit: boolean;
  consentToCommunications: boolean;
  electronicSignature: string;
}

export default function LoanApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<LoanApplicationData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    timeInBusiness: "",
    industryType: "",
    monthlyRevenue: "",
    requestedAmount: "",
    useOfFunds: "",
    consentToCredit: false,
    consentToCommunications: false,
    electronicSignature: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<{type: 'success' | 'error'; message: string} | null>(null);

  const handleInputChange = (field: keyof LoanApplicationData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields validation
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
    if (!formData.timeInBusiness) newErrors.timeInBusiness = "Time in business is required";
    if (!formData.industryType) newErrors.industryType = "Industry type is required";
    if (!formData.monthlyRevenue) newErrors.monthlyRevenue = "Monthly revenue is required";
    if (!formData.requestedAmount) newErrors.requestedAmount = "Requested amount is required";
    if (!formData.useOfFunds.trim()) newErrors.useOfFunds = "Use of funds is required";
    if (!formData.consentToCredit) newErrors.consentToCredit = "Credit check consent is required";
    if (!formData.electronicSignature.trim()) newErrors.electronicSignature = "Electronic signature is required";

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (formData.phone && !/^[\d\s\-\+\(\)]{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    
    if (!validateForm()) {
      setSubmitStatus({type: 'error', message: 'Please correct the errors above and try again.'});
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
          email: "",
          phone: "",
          companyName: "",
          timeInBusiness: "",
          industryType: "",
          monthlyRevenue: "",
          requestedAmount: "",
          useOfFunds: "",
          consentToCredit: false,
          consentToCommunications: false,
          electronicSignature: "",
        });
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

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-[#193a59] mb-2">Quick Application</h2>
        <p className="text-gray-600">Complete this form to get pre-approved in 24 hours</p>
      </div>

      {submitStatus && (
        <div className={`mb-6 p-4 rounded-lg ${
          submitStatus.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#193a59] border-b border-gray-200 pb-2">
            Contact Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
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
              <Label htmlFor="lastName">Last Name *</Label>
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
              <Label htmlFor="email">Email Address *</Label>
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
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={errors.phone ? 'border-red-500' : ''}
                data-testid="input-phone"
              />
              {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
            </div>
          </div>
        </div>

        {/* Business Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#193a59] border-b border-gray-200 pb-2">
            Business Information
          </h3>

          <div>
            <Label htmlFor="companyName">Company Name *</Label>
            <Input
              id="companyName"
              type="text"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              className={errors.companyName ? 'border-red-500' : ''}
              data-testid="input-company-name"
            />
            {errors.companyName && <span className="text-red-500 text-sm">{errors.companyName}</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="timeInBusiness">Time in Business *</Label>
              <Select value={formData.timeInBusiness} onValueChange={(value) => handleInputChange('timeInBusiness', value)}>
                <SelectTrigger className={errors.timeInBusiness ? 'border-red-500' : ''} data-testid="select-time-in-business">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="less-than-1-year">Less than 1 year</SelectItem>
                  <SelectItem value="1-2-years">1-2 years</SelectItem>
                  <SelectItem value="2-5-years">2-5 years</SelectItem>
                  <SelectItem value="5-10-years">5-10 years</SelectItem>
                  <SelectItem value="more-than-10-years">More than 10 years</SelectItem>
                </SelectContent>
              </Select>
              {errors.timeInBusiness && <span className="text-red-500 text-sm">{errors.timeInBusiness}</span>}
            </div>

            <div>
              <Label htmlFor="industryType">Industry Type *</Label>
              <Select value={formData.industryType} onValueChange={(value) => handleInputChange('industryType', value)}>
                <SelectTrigger className={errors.industryType ? 'border-red-500' : ''} data-testid="select-industry-type">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="restaurant">Restaurant/Food Service</SelectItem>
                  <SelectItem value="professional-services">Professional Services</SelectItem>
                  <SelectItem value="construction">Construction</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="transportation">Transportation</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.industryType && <span className="text-red-500 text-sm">{errors.industryType}</span>}
            </div>
          </div>

          <div>
            <Label htmlFor="monthlyRevenue">Average Monthly Revenue *</Label>
            <Select value={formData.monthlyRevenue} onValueChange={(value) => handleInputChange('monthlyRevenue', value)}>
              <SelectTrigger className={errors.monthlyRevenue ? 'border-red-500' : ''} data-testid="select-monthly-revenue">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="less-than-10k">Less than $10,000</SelectItem>
                <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
                <SelectItem value="more-than-500k">More than $500,000</SelectItem>
              </SelectContent>
            </Select>
            {errors.monthlyRevenue && <span className="text-red-500 text-sm">{errors.monthlyRevenue}</span>}
          </div>
        </div>

        {/* Loan Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#193a59] border-b border-gray-200 pb-2">
            Loan Details
          </h3>

          <div>
            <Label htmlFor="requestedAmount">Requested Loan Amount *</Label>
            <Select value={formData.requestedAmount} onValueChange={(value) => handleInputChange('requestedAmount', value)}>
              <SelectTrigger className={errors.requestedAmount ? 'border-red-500' : ''} data-testid="select-requested-amount">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
                <SelectItem value="500k-1m">$500,000 - $1,000,000</SelectItem>
                <SelectItem value="more-than-1m">More than $1,000,000</SelectItem>
              </SelectContent>
            </Select>
            {errors.requestedAmount && <span className="text-red-500 text-sm">{errors.requestedAmount}</span>}
          </div>

          <div>
            <Label htmlFor="useOfFunds">How will you use the funds? *</Label>
            <Textarea
              id="useOfFunds"
              value={formData.useOfFunds}
              onChange={(e) => handleInputChange('useOfFunds', e.target.value)}
              placeholder="Please describe how you plan to use the loan funds..."
              className={errors.useOfFunds ? 'border-red-500' : ''}
              rows={3}
              data-testid="textarea-use-of-funds"
            />
            {errors.useOfFunds && <span className="text-red-500 text-sm">{errors.useOfFunds}</span>}
          </div>
        </div>

        {/* Consents and Signature */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#193a59] border-b border-gray-200 pb-2">
            Consent & Signature
          </h3>

          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="consentToCredit"
                checked={formData.consentToCredit}
                onChange={(e) => handleInputChange('consentToCredit', e.target.checked)}
                className="mt-1 h-4 w-4 text-[#193a59] focus:ring-[#193a59] border-gray-300 rounded"
                data-testid="checkbox-consent-credit"
              />
              <Label htmlFor="consentToCredit" className="text-sm leading-tight">
                I authorize Lendura Capital to obtain my personal and/or business credit report(s) and verify information provided. *
              </Label>
            </div>
            {errors.consentToCredit && <span className="text-red-500 text-sm">{errors.consentToCredit}</span>}

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="consentToCommunications"
                checked={formData.consentToCommunications}
                onChange={(e) => handleInputChange('consentToCommunications', e.target.checked)}
                className="mt-1 h-4 w-4 text-[#193a59] focus:ring-[#193a59] border-gray-300 rounded"
                data-testid="checkbox-consent-communications"
              />
              <Label htmlFor="consentToCommunications" className="text-sm leading-tight">
                I agree to receive communications from Lendura Capital regarding my loan application and future offers.
              </Label>
            </div>
          </div>

          <div>
            <Label htmlFor="electronicSignature">Electronic Signature *</Label>
            <Input
              id="electronicSignature"
              type="text"
              value={formData.electronicSignature}
              onChange={(e) => handleInputChange('electronicSignature', e.target.value)}
              placeholder="Type your full name to sign electronically"
              className={errors.electronicSignature ? 'border-red-500' : ''}
              data-testid="input-electronic-signature"
            />
            {errors.electronicSignature && <span className="text-red-500 text-sm">{errors.electronicSignature}</span>}
            <p className="text-xs text-gray-500 mt-1">
              By typing your name above, you agree to sign this application electronically.
            </p>
          </div>
        </div>

        <div className="pt-6">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#193a59] hover:bg-[#2a4a6b] text-white py-3 text-lg font-semibold"
            data-testid="button-submit-application"
          >
            {isSubmitting ? 'Submitting Application...' : 'Submit Loan Application'}
          </Button>
        </div>

        <div className="text-center text-xs text-gray-500 mt-4">
          <p>🔒 Your information is encrypted and secure. We respect your privacy.</p>
        </div>
      </form>
    </div>
  );
}