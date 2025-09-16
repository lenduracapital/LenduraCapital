import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Shield, Clock, Phone } from "lucide-react";

// Step 1 Schema - Essential fields only
const step1Schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  fundingAmount: z.string().min(1, "Please select funding amount"),
  timeline: z.string().min(1, "Please select timeline"),
});

// Step 2 Schema - Additional details
const step2Schema = z.object({
  company: z.string().min(1, "Company name is required"),
  businessType: z.string().min(1, "Please select business type"),
  timeInBusiness: z.string().min(1, "Please select time in business"),
  monthlyRevenue: z.string().min(1, "Please select monthly revenue"),
  fundingPurpose: z.string().min(1, "Please describe funding purpose"),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;

export default function ModernContactForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{type: 'success' | 'error'; message: string} | null>(null);

  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      fundingAmount: "",
      timeline: "",
    },
  });

  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      company: "",
      businessType: "",
      timeInBusiness: "",
      monthlyRevenue: "",
      fundingPurpose: "",
    },
  });

  const onStep1Submit = (data: Step1Data) => {
    setStep1Data(data);
    setCurrentStep(2);
  };

  const onStep2Submit = async (data: Step2Data) => {
    if (!step1Data) return;
    
    setIsSubmitting(true);
    const fullData = { ...step1Data, ...data };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullData),
      });

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! We\'ll contact you within 24 hours to discuss your funding options.'
        });
        // Reset forms
        step1Form.reset();
        step2Form.reset();
        setCurrentStep(1);
        setStep1Data(null);
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
          <Form {...step1Form}>
            <form onSubmit={step1Form.handleSubmit(onStep1Submit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={step1Form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} data-testid="input-first-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={step1Form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Smith" {...field} data-testid="input-last-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={step1Form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input placeholder="john@company.com" type="email" {...field} data-testid="input-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={step1Form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="(555) 123-4567" {...field} data-testid="input-phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={step1Form.control}
                  name="fundingAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Funding Amount Needed *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-funding-amount">
                            <SelectValue placeholder="Select amount" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="10k-50k">$10K - $50K</SelectItem>
                          <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                          <SelectItem value="100k-250k">$100K - $250K</SelectItem>
                          <SelectItem value="250k-500k">$250K - $500K</SelectItem>
                          <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                          <SelectItem value="1m+">$1M+</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={step1Form.control}
                  name="timeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>When do you need funding? *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-timeline">
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="immediately">Immediately</SelectItem>
                          <SelectItem value="1-week">Within 1 week</SelectItem>
                          <SelectItem value="1-month">Within 1 month</SelectItem>
                          <SelectItem value="3-months">Within 3 months</SelectItem>
                          <SelectItem value="exploring">Just exploring options</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#193a59] hover:bg-[#285d8a] text-white py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                data-testid="button-step1-continue"
              >
                Continue to Step 2 →
              </Button>
            </form>
          </Form>
        ) : (
          <Form {...step2Form}>
            <form onSubmit={step2Form.handleSubmit(onStep2Submit)} className="space-y-6">
              <FormField
                control={step2Form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Company LLC" {...field} data-testid="input-company" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={step2Form.control}
                  name="businessType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Type *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-business-type">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={step2Form.control}
                  name="timeInBusiness"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time in Business *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-time-in-business">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="less-than-1-year">Less than 1 year</SelectItem>
                          <SelectItem value="1-2-years">1-2 years</SelectItem>
                          <SelectItem value="2-5-years">2-5 years</SelectItem>
                          <SelectItem value="5-10-years">5-10 years</SelectItem>
                          <SelectItem value="10-plus-years">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={step2Form.control}
                name="monthlyRevenue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Revenue *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-monthly-revenue">
                          <SelectValue placeholder="Select monthly revenue" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="less-than-10k">Less than $10K</SelectItem>
                        <SelectItem value="10k-25k">$10K - $25K</SelectItem>
                        <SelectItem value="25k-50k">$25K - $50K</SelectItem>
                        <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                        <SelectItem value="100k-250k">$100K - $250K</SelectItem>
                        <SelectItem value="250k-plus">$250K+</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={step2Form.control}
                name="fundingPurpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What will you use the funding for? *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Equipment purchase, inventory, marketing, working capital, etc."
                        className="min-h-[100px]"
                        {...field}
                        data-testid="textarea-funding-purpose"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
          </Form>
        )}
      </div>

      {/* Trust indicators in sidebar */}
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