import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface LoanApplicationData {
  // Personal Information
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  ssn: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Business Information
  legalCompanyName: string;
  dbaName: string;
  businessAddress: string;
  businessCity: string;
  businessState: string;
  businessZip: string;
  ein: string;
  businessType: string;
  industryType: string;
  timeInBusiness: string;
  employeeCount: string;
  businessDescription: string;
  
  // Financial Information
  monthlyRevenue: string;
  requestedAmount: string;
  useOfFunds: string;
  creditScore: string;
  bankAccountType: string;
  bankName: string;
  hasCollateral: string;
  collateralDescription: string;
  
  // Additional Information
  currentLoans: string;
  monthlyDebt: string;
  businessOwnership: string;
  hasPartners: string;
  partnerDetails: string;
  
  // Consent and Signature
  consentToCredit: boolean;
  consentToCommunications: boolean;
  electronicSignature: string;
  signatureDate: string;
}

const steps = [
  "Personal Information",
  "Business Details", 
  "Financial Information",
  "Additional Details",
  "Review & Submit"
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
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    legalCompanyName: "",
    dbaName: "",
    businessAddress: "",
    businessCity: "",
    businessState: "",
    businessZip: "",
    ein: "",
    businessType: "",
    industryType: "",
    timeInBusiness: "",
    employeeCount: "",
    businessDescription: "",
    monthlyRevenue: "",
    requestedAmount: "",
    useOfFunds: "",
    creditScore: "",
    bankAccountType: "",
    bankName: "",
    hasCollateral: "",
    collateralDescription: "",
    currentLoans: "",
    monthlyDebt: "",
    businessOwnership: "",
    hasPartners: "",
    partnerDetails: "",
    consentToCredit: false,
    consentToCommunications: false,
    electronicSignature: "",
    signatureDate: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<{type: 'success' | 'error'; message: string} | null>(null);

  const handleInputChange = (field: keyof LoanApplicationData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      // Personal Information
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.phone) newErrors.phone = "Phone is required";
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
      if (!formData.ssn) newErrors.ssn = "SSN is required";
    } else if (step === 1) {
      // Business Details
      if (!formData.legalCompanyName) newErrors.legalCompanyName = "Legal company name is required";
      if (!formData.ein) newErrors.ein = "EIN is required";
      if (!formData.businessType) newErrors.businessType = "Business type is required";
      if (!formData.timeInBusiness) newErrors.timeInBusiness = "Time in business is required";
    } else if (step === 2) {
      // Financial Information
      if (!formData.monthlyRevenue) newErrors.monthlyRevenue = "Monthly revenue is required";
      if (!formData.requestedAmount) newErrors.requestedAmount = "Requested amount is required";
      if (!formData.useOfFunds) newErrors.useOfFunds = "Use of funds is required";
    } else if (step === 4) {
      // Review & Submit
      if (!formData.consentToCredit) newErrors.consentToCredit = "Credit check consent is required";
      if (!formData.consentToCommunications) newErrors.consentToCommunications = "Communication consent is required";
      if (!formData.electronicSignature) newErrors.electronicSignature = "Electronic signature is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generatePDF = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Add header with logo space and company info
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('LOAN APPLICATION', pageWidth / 2, 30, { align: 'center' });
    
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Lendura Capital', pageWidth / 2, 40, { align: 'center' });
    pdf.text('Professional SBA Loan Solutions', pageWidth / 2, 48, { align: 'center' });
    
    // Add date and application ID
    const today = new Date().toLocaleDateString();
    const appId = `LC-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    pdf.setFontSize(10);
    pdf.text(`Application Date: ${today}`, 20, 60);
    pdf.text(`Application ID: ${appId}`, 20, 68);
    
    let yPosition = 80;
    
    // Personal Information Section
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('PERSONAL INFORMATION', 20, yPosition);
    yPosition += 10;
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const personalInfo = [
      [`Name:`, `${formData.firstName} ${formData.lastName}`],
      [`Date of Birth:`, formData.dateOfBirth],
      [`SSN:`, formData.ssn ? `***-**-${formData.ssn.slice(-4)}` : ''],
      [`Email:`, formData.email],
      [`Phone:`, formData.phone],
      [`Address:`, `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`],
    ];
    
    personalInfo.forEach(([label, value]) => {
      if (value) {
        pdf.text(label, 20, yPosition);
        pdf.text(value, 60, yPosition);
        yPosition += 8;
      }
    });
    
    yPosition += 10;
    
    // Business Information Section
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('BUSINESS INFORMATION', 20, yPosition);
    yPosition += 10;
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const businessInfo = [
      [`Legal Company Name:`, formData.legalCompanyName],
      [`DBA Name:`, formData.dbaName],
      [`Business Address:`, `${formData.businessAddress}, ${formData.businessCity}, ${formData.businessState} ${formData.businessZip}`],
      [`EIN:`, formData.ein],
      [`Business Type:`, formData.businessType],
      [`Industry:`, formData.industryType],
      [`Time in Business:`, formData.timeInBusiness],
      [`Employee Count:`, formData.employeeCount],
      [`Business Description:`, formData.businessDescription],
    ];
    
    businessInfo.forEach(([label, value]) => {
      if (value) {
        pdf.text(label, 20, yPosition);
        if (label === 'Business Description:' && value.length > 50) {
          const lines = pdf.splitTextToSize(value, pageWidth - 80);
          pdf.text(lines, 60, yPosition);
          yPosition += lines.length * 8;
        } else {
          pdf.text(value, 60, yPosition);
          yPosition += 8;
        }
      }
    });
    
    // Check if we need a new page
    if (yPosition > pageHeight - 60) {
      pdf.addPage();
      yPosition = 30;
    }
    
    yPosition += 10;
    
    // Financial Information Section
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('FINANCIAL INFORMATION', 20, yPosition);
    yPosition += 10;
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const financialInfo = [
      [`Monthly Revenue:`, formData.monthlyRevenue],
      [`Requested Amount:`, formData.requestedAmount],
      [`Use of Funds:`, formData.useOfFunds],
      [`Credit Score Range:`, formData.creditScore],
      [`Bank Name:`, formData.bankName],
      [`Account Type:`, formData.bankAccountType],
      [`Has Collateral:`, formData.hasCollateral],
      [`Collateral Description:`, formData.collateralDescription],
      [`Current Loans:`, formData.currentLoans],
      [`Monthly Debt:`, formData.monthlyDebt],
    ];
    
    financialInfo.forEach(([label, value]) => {
      if (value) {
        pdf.text(label, 20, yPosition);
        if ((label === 'Use of Funds:' || label === 'Collateral Description:') && value.length > 50) {
          const lines = pdf.splitTextToSize(value, pageWidth - 80);
          pdf.text(lines, 60, yPosition);
          yPosition += lines.length * 8;
        } else {
          pdf.text(value, 60, yPosition);
          yPosition += 8;
        }
      }
    });
    
    // Check if we need a new page for signature
    if (yPosition > pageHeight - 100) {
      pdf.addPage();
      yPosition = 30;
    }
    
    yPosition += 20;
    
    // Signature Section
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('ELECTRONIC SIGNATURE & CONSENT', 20, yPosition);
    yPosition += 15;
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text('By signing below, I/we acknowledge that:', 20, yPosition);
    yPosition += 8;
    
    const consent = [
      '• I consent to credit checks and background verification',
      '• I consent to communications via phone, email, and text',
      '• All information provided is true and accurate to the best of my knowledge',
      '• I understand this is a loan application and not a guarantee of approval'
    ];
    
    consent.forEach(line => {
      pdf.text(line, 25, yPosition);
      yPosition += 8;
    });
    
    yPosition += 15;
    
    // Signature lines
    pdf.text('Electronic Signature:', 20, yPosition);
    pdf.text(`${formData.electronicSignature}`, 70, yPosition);
    pdf.line(70, yPosition + 2, 150, yPosition + 2);
    
    yPosition += 15;
    pdf.text('Date:', 20, yPosition);
    pdf.text(formData.signatureDate || today, 70, yPosition);
    pdf.line(70, yPosition + 2, 120, yPosition + 2);
    
    // Footer
    pdf.setFontSize(8);
    pdf.text('This application was submitted electronically to Lendura Capital', pageWidth / 2, pageHeight - 20, { align: 'center' });
    pdf.text('For questions, contact us at (305) 765-7168 or Sam@lenduracapital.com', pageWidth / 2, pageHeight - 12, { align: 'center' });
    
    return pdf;
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    
    setIsSubmitting(true);
    
    try {
      // Set signature date
      const signatureDate = new Date().toLocaleDateString();
      const updatedFormData = { ...formData, signatureDate };
      setFormData(updatedFormData);
      
      // Generate PDF
      const pdf = await generatePDF();
      const pdfBlob = pdf.output('blob');
      
      // Create FormData for submission
      const submitData = new FormData();
      submitData.append('applicationData', JSON.stringify(updatedFormData));
      submitData.append('pdf', pdfBlob, `loan-application-${Date.now()}.pdf`);
      
      const response = await fetch('/api/loan-application', {
        method: 'POST',
        body: submitData,
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Your loan application has been submitted successfully! We will review your application and contact you within 24 hours.'
        });
        
        // Download PDF for user
        pdf.save(`Lendura-Capital-Application-${Date.now()}.pdf`);
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Failed to submit application. Please try again.'
        });
      }
    } catch (error) {
      console.error('Application submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={errors.firstName ? 'border-red-500' : ''}
                  data-testid="input-firstName"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>
              
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={errors.lastName ? 'border-red-500' : ''}
                  data-testid="input-lastName"
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className={errors.dateOfBirth ? 'border-red-500' : ''}
                  data-testid="input-dateOfBirth"
                />
                {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
              </div>
              
              <div>
                <Label htmlFor="ssn">Social Security Number *</Label>
                <Input
                  id="ssn"
                  placeholder="XXX-XX-XXXX"
                  value={formData.ssn}
                  onChange={(e) => handleInputChange('ssn', e.target.value)}
                  className={errors.ssn ? 'border-red-500' : ''}
                  data-testid="input-ssn"
                />
                {errors.ssn && <p className="text-red-500 text-sm mt-1">{errors.ssn}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
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
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <Label htmlFor="phone">Mobile Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={errors.phone ? 'border-red-500' : ''}
                  data-testid="input-phone"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                data-testid="input-address"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  data-testid="input-city"
                />
              </div>
              
              <div>
                <Label htmlFor="state">State</Label>
                <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                  <SelectTrigger data-testid="select-state">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AL">Alabama</SelectItem>
                    <SelectItem value="FL">Florida</SelectItem>
                    <SelectItem value="GA">Georgia</SelectItem>
                    <SelectItem value="NY">New York</SelectItem>
                    <SelectItem value="CA">California</SelectItem>
                    <SelectItem value="TX">Texas</SelectItem>
                    {/* Add more states as needed */}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  data-testid="input-zipCode"
                />
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Business Details</h3>
            
            <div>
              <Label htmlFor="legalCompanyName">Legal Company Name *</Label>
              <Input
                id="legalCompanyName"
                value={formData.legalCompanyName}
                onChange={(e) => handleInputChange('legalCompanyName', e.target.value)}
                className={errors.legalCompanyName ? 'border-red-500' : ''}
                data-testid="input-legalCompanyName"
              />
              {errors.legalCompanyName && <p className="text-red-500 text-sm mt-1">{errors.legalCompanyName}</p>}
            </div>

            <div>
              <Label htmlFor="dbaName">DBA Name (if different)</Label>
              <Input
                id="dbaName"
                value={formData.dbaName}
                onChange={(e) => handleInputChange('dbaName', e.target.value)}
                data-testid="input-dbaName"
              />
            </div>

            <div>
              <Label htmlFor="businessAddress">Business Address</Label>
              <Input
                id="businessAddress"
                value={formData.businessAddress}
                onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                data-testid="input-businessAddress"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="businessCity">City</Label>
                <Input
                  id="businessCity"
                  value={formData.businessCity}
                  onChange={(e) => handleInputChange('businessCity', e.target.value)}
                  data-testid="input-businessCity"
                />
              </div>
              
              <div>
                <Label htmlFor="businessState">State</Label>
                <Select value={formData.businessState} onValueChange={(value) => handleInputChange('businessState', value)}>
                  <SelectTrigger data-testid="select-businessState">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AL">Alabama</SelectItem>
                    <SelectItem value="FL">Florida</SelectItem>
                    <SelectItem value="GA">Georgia</SelectItem>
                    <SelectItem value="NY">New York</SelectItem>
                    <SelectItem value="CA">California</SelectItem>
                    <SelectItem value="TX">Texas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="businessZip">ZIP Code</Label>
                <Input
                  id="businessZip"
                  value={formData.businessZip}
                  onChange={(e) => handleInputChange('businessZip', e.target.value)}
                  data-testid="input-businessZip"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ein">Federal EIN *</Label>
                <Input
                  id="ein"
                  placeholder="XX-XXXXXXX"
                  value={formData.ein}
                  onChange={(e) => handleInputChange('ein', e.target.value)}
                  className={errors.ein ? 'border-red-500' : ''}
                  data-testid="input-ein"
                />
                {errors.ein && <p className="text-red-500 text-sm mt-1">{errors.ein}</p>}
              </div>
              
              <div>
                <Label htmlFor="businessType">Business Type *</Label>
                <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                  <SelectTrigger className={errors.businessType ? 'border-red-500' : ''} data-testid="select-businessType">
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="llc">LLC</SelectItem>
                    <SelectItem value="corporation">Corporation</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                  </SelectContent>
                </Select>
                {errors.businessType && <p className="text-red-500 text-sm mt-1">{errors.businessType}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="industryType">Industry Type</Label>
                <Select value={formData.industryType} onValueChange={(value) => handleInputChange('industryType', value)}>
                  <SelectTrigger data-testid="select-industryType">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="restaurant">Restaurant & Food Service</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="construction">Construction</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="professional">Professional Services</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="timeInBusiness">Time in Business *</Label>
                <Select value={formData.timeInBusiness} onValueChange={(value) => handleInputChange('timeInBusiness', value)}>
                  <SelectTrigger className={errors.timeInBusiness ? 'border-red-500' : ''} data-testid="select-timeInBusiness">
                    <SelectValue placeholder="Select time in business" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6-12months">6-12 months</SelectItem>
                    <SelectItem value="1-2years">1-2 years</SelectItem>
                    <SelectItem value="2-5years">2-5 years</SelectItem>
                    <SelectItem value="5+years">5+ years</SelectItem>
                  </SelectContent>
                </Select>
                {errors.timeInBusiness && <p className="text-red-500 text-sm mt-1">{errors.timeInBusiness}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="employeeCount">Number of Employees</Label>
              <Select value={formData.employeeCount} onValueChange={(value) => handleInputChange('employeeCount', value)}>
                <SelectTrigger data-testid="select-employeeCount">
                  <SelectValue placeholder="Select employee count" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Just me</SelectItem>
                  <SelectItem value="2-5">2-5 employees</SelectItem>
                  <SelectItem value="6-10">6-10 employees</SelectItem>
                  <SelectItem value="11-25">11-25 employees</SelectItem>
                  <SelectItem value="26-50">26-50 employees</SelectItem>
                  <SelectItem value="50+">50+ employees</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="businessDescription">Business Description</Label>
              <Textarea
                id="businessDescription"
                placeholder="Briefly describe your business, products, or services..."
                value={formData.businessDescription}
                onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                rows={3}
                data-testid="textarea-businessDescription"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Financial Information</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="monthlyRevenue">Average Monthly Revenue *</Label>
                <Select value={formData.monthlyRevenue} onValueChange={(value) => handleInputChange('monthlyRevenue', value)}>
                  <SelectTrigger className={errors.monthlyRevenue ? 'border-red-500' : ''} data-testid="select-monthlyRevenue">
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
                {errors.monthlyRevenue && <p className="text-red-500 text-sm mt-1">{errors.monthlyRevenue}</p>}
              </div>

              <div>
                <Label htmlFor="requestedAmount">Requested Loan Amount *</Label>
                <Select value={formData.requestedAmount} onValueChange={(value) => handleInputChange('requestedAmount', value)}>
                  <SelectTrigger className={errors.requestedAmount ? 'border-red-500' : ''} data-testid="select-requestedAmount">
                    <SelectValue placeholder="Select amount needed" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10k-50k">$10K - $50K</SelectItem>
                    <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                    <SelectItem value="100k-250k">$100K - $250K</SelectItem>
                    <SelectItem value="250k-500k">$250K - $500K</SelectItem>
                    <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                    <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                    <SelectItem value="5m+">$5M+</SelectItem>
                  </SelectContent>
                </Select>
                {errors.requestedAmount && <p className="text-red-500 text-sm mt-1">{errors.requestedAmount}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="useOfFunds">Use of Funds *</Label>
              <Select value={formData.useOfFunds} onValueChange={(value) => handleInputChange('useOfFunds', value)}>
                <SelectTrigger className={errors.useOfFunds ? 'border-red-500' : ''} data-testid="select-useOfFunds">
                  <SelectValue placeholder="How will you use the funds?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="working-capital">Working Capital</SelectItem>
                  <SelectItem value="equipment">Equipment Purchase</SelectItem>
                  <SelectItem value="inventory">Inventory</SelectItem>
                  <SelectItem value="expansion">Business Expansion</SelectItem>
                  <SelectItem value="real-estate">Real Estate</SelectItem>
                  <SelectItem value="debt-consolidation">Debt Consolidation</SelectItem>
                  <SelectItem value="marketing">Marketing & Advertising</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.useOfFunds && <p className="text-red-500 text-sm mt-1">{errors.useOfFunds}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="creditScore">Personal Credit Score Range</Label>
                <Select value={formData.creditScore} onValueChange={(value) => handleInputChange('creditScore', value)}>
                  <SelectTrigger data-testid="select-creditScore">
                    <SelectValue placeholder="Select credit score range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="750+">750+</SelectItem>
                    <SelectItem value="700-749">700-749</SelectItem>
                    <SelectItem value="650-699">650-699</SelectItem>
                    <SelectItem value="600-649">600-649</SelectItem>
                    <SelectItem value="550-599">550-599</SelectItem>
                    <SelectItem value="below-550">Below 550</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="bankAccountType">Primary Bank Account Type</Label>
                <Select value={formData.bankAccountType} onValueChange={(value) => handleInputChange('bankAccountType', value)}>
                  <SelectTrigger data-testid="select-bankAccountType">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="business-checking">Business Checking</SelectItem>
                    <SelectItem value="personal-checking">Personal Checking</SelectItem>
                    <SelectItem value="business-savings">Business Savings</SelectItem>
                    <SelectItem value="personal-savings">Personal Savings</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="bankName">Primary Bank Name</Label>
              <Input
                id="bankName"
                value={formData.bankName}
                onChange={(e) => handleInputChange('bankName', e.target.value)}
                placeholder="e.g., Chase, Bank of America, Wells Fargo"
                data-testid="input-bankName"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hasCollateral">Do you have collateral to secure the loan?</Label>
                <Select value={formData.hasCollateral} onValueChange={(value) => handleInputChange('hasCollateral', value)}>
                  <SelectTrigger data-testid="select-hasCollateral">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="maybe">Maybe</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="currentLoans">Current Outstanding Loans</Label>
                <Select value={formData.currentLoans} onValueChange={(value) => handleInputChange('currentLoans', value)}>
                  <SelectTrigger data-testid="select-currentLoans">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No current loans</SelectItem>
                    <SelectItem value="1">1 loan</SelectItem>
                    <SelectItem value="2-3">2-3 loans</SelectItem>
                    <SelectItem value="4+">4+ loans</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {formData.hasCollateral === 'yes' && (
              <div>
                <Label htmlFor="collateralDescription">Collateral Description</Label>
                <Textarea
                  id="collateralDescription"
                  placeholder="Describe the collateral you can offer..."
                  value={formData.collateralDescription}
                  onChange={(e) => handleInputChange('collateralDescription', e.target.value)}
                  rows={3}
                  data-testid="textarea-collateralDescription"
                />
              </div>
            )}

            <div>
              <Label htmlFor="monthlyDebt">Total Monthly Debt Payments</Label>
              <Select value={formData.monthlyDebt} onValueChange={(value) => handleInputChange('monthlyDebt', value)}>
                <SelectTrigger data-testid="select-monthlyDebt">
                  <SelectValue placeholder="Select monthly debt payments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1k">$0 - $1K</SelectItem>
                  <SelectItem value="1k-5k">$1K - $5K</SelectItem>
                  <SelectItem value="5k-10k">$5K - $10K</SelectItem>
                  <SelectItem value="10k+">$10K+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Additional Details</h3>
            
            <div>
              <Label htmlFor="businessOwnership">What percentage of the business do you own?</Label>
              <Select value={formData.businessOwnership} onValueChange={(value) => handleInputChange('businessOwnership', value)}>
                <SelectTrigger data-testid="select-businessOwnership">
                  <SelectValue placeholder="Select ownership percentage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100%">100%</SelectItem>
                  <SelectItem value="75-99%">75-99%</SelectItem>
                  <SelectItem value="51-74%">51-74%</SelectItem>
                  <SelectItem value="25-50%">25-50%</SelectItem>
                  <SelectItem value="less-25%">Less than 25%</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="hasPartners">Do you have business partners?</Label>
              <Select value={formData.hasPartners} onValueChange={(value) => handleInputChange('hasPartners', value)}>
                <SelectTrigger data-testid="select-hasPartners">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="yes">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.hasPartners === 'yes' && (
              <div>
                <Label htmlFor="partnerDetails">Partner Details</Label>
                <Textarea
                  id="partnerDetails"
                  placeholder="Please provide names and ownership percentages of business partners..."
                  value={formData.partnerDetails}
                  onChange={(e) => handleInputChange('partnerDetails', e.target.value)}
                  rows={3}
                  data-testid="textarea-partnerDetails"
                />
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Review & Submit</h3>
            
            {submitStatus && (
              <div className={`p-4 rounded-lg ${
                submitStatus.type === 'success' 
                  ? 'bg-green-50 border border-green-200 text-green-800' 
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                {submitStatus.message}
              </div>
            )}
            
            {/* Application Summary */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-lg mb-4">Application Summary</h4>
              
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Applicant:</strong> {formData.firstName} {formData.lastName}
                </div>
                <div>
                  <strong>Business:</strong> {formData.legalCompanyName}
                </div>
                <div>
                  <strong>Requested Amount:</strong> {formData.requestedAmount}
                </div>
                <div>
                  <strong>Monthly Revenue:</strong> {formData.monthlyRevenue}
                </div>
                <div>
                  <strong>Time in Business:</strong> {formData.timeInBusiness}
                </div>
                <div>
                  <strong>Use of Funds:</strong> {formData.useOfFunds}
                </div>
              </div>
            </div>

            {/* Consent Checkboxes */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="consentToCredit"
                  checked={formData.consentToCredit}
                  onChange={(e) => handleInputChange('consentToCredit', e.target.checked)}
                  className="mt-1"
                  data-testid="checkbox-consentToCredit"
                />
                <label htmlFor="consentToCredit" className="text-sm text-gray-700">
                  <strong>Consent to Credit Check:</strong> I authorize Lendura Capital and its designated representatives to obtain consumer, personal, business, and investigative reports about me from consumer reporting agencies, banks, creditors, and other third parties for purposes related to this loan application. *
                </label>
              </div>
              {errors.consentToCredit && <p className="text-red-500 text-sm">{errors.consentToCredit}</p>}

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="consentToCommunications"
                  checked={formData.consentToCommunications}
                  onChange={(e) => handleInputChange('consentToCommunications', e.target.checked)}
                  className="mt-1"
                  data-testid="checkbox-consentToCommunications"
                />
                <label htmlFor="consentToCommunications" className="text-sm text-gray-700">
                  <strong>Consent to Communications:</strong> I authorize Lendura Capital to communicate with me via phone calls, text messages, and emails, including automated technology and pre-recorded messages, for informational, marketing, or transactional purposes. I may opt-out at any time. *
                </label>
              </div>
              {errors.consentToCommunications && <p className="text-red-500 text-sm">{errors.consentToCommunications}</p>}
            </div>

            {/* Electronic Signature */}
            <div>
              <Label htmlFor="electronicSignature">Electronic Signature *</Label>
              <Input
                id="electronicSignature"
                placeholder="Type your full legal name"
                value={formData.electronicSignature}
                onChange={(e) => handleInputChange('electronicSignature', e.target.value)}
                className={errors.electronicSignature ? 'border-red-500' : ''}
                data-testid="input-electronicSignature"
              />
              {errors.electronicSignature && <p className="text-red-500 text-sm mt-1">{errors.electronicSignature}</p>}
              <p className="text-xs text-gray-500 mt-1">
                By typing your name above, you are providing your electronic signature and agreeing to all terms and conditions.
              </p>
            </div>

            <div className="border-t pt-6">
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-4 text-lg font-semibold bg-[#193a59] hover:bg-[#285d8a] text-white"
                data-testid="button-submit-application"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting Application...
                  </>
                ) : (
                  "Submit Loan Application"
                )}
              </Button>
              
              <p className="text-sm text-gray-500 text-center mt-3">
                Upon submission, a PDF copy of your application will be generated and sent to our underwriting team.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-[#193a59]">Step {currentStep + 1} of {steps.length}</span>
          <span className="text-sm text-gray-500">{Math.round(((currentStep + 1) / steps.length) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-[#193a59] h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2">
          {steps.map((step, index) => (
            <div key={index} className={`text-xs ${index <= currentStep ? 'text-[#193a59] font-medium' : 'text-gray-400'}`}>
              {step}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="mb-8">
        {renderStep()}
      </div>

      {/* Navigation Buttons */}
      {currentStep < 4 && (
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-6"
            data-testid="button-previous"
          >
            Previous
          </Button>
          
          <Button
            type="button"
            onClick={nextStep}
            className="px-6 bg-[#193a59] hover:bg-[#285d8a] text-white"
            data-testid="button-next"
          >
            Next Step
          </Button>
        </div>
      )}
    </div>
  );
}