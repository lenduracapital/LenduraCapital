import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Send } from "lucide-react";
import { useLocation } from "wouter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { insertLoanApplicationSchema, type InsertLoanApplication } from "@shared/schema";

export default function LoanApplication() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState<InsertLoanApplication>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    businessName: "",
    businessType: "",
    yearsInBusiness: 0,
    monthlyRevenue: 0,
    loanAmount: 0,
    loanPurpose: "",
    creditScore: 0,
    status: "pending"
  });

  const createApplicationMutation = useMutation({
    mutationFn: async (data: InsertLoanApplication) => {
      const response = await fetch("/api/loan-applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to submit application");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted!",
        description: "Your loan application has been submitted successfully. We'll contact you within 24-48 hours.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/loan-applications"] });
      setLocation("/");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validatedData = insertLoanApplicationSchema.parse(formData);
      createApplicationMutation.mutate(validatedData);
    } catch (error) {
      toast({
        title: "Validation Error",
        description: "Please check all required fields are filled correctly.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: keyof InsertLoanApplication, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBackToHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-[--bg-primary] text-[--text-primary]">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button 
            variant="ghost"
            onClick={handleBackToHome}
            className="mb-8 text-[--text-secondary] hover:text-[--text-primary]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          <Card className="bg-[--bg-secondary] border border-[--bg-tertiary]/30">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[--text-primary]">
                Loan Application
              </CardTitle>
              <p className="text-[--text-secondary]">
                Complete the form below to apply for business funding. All fields marked with * are required.
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[--text-primary]">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-[--text-secondary]">First Name *</Label>
                      <Input
                        id="firstName"
                        required
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className="bg-[--bg-primary] border-[--bg-tertiary] text-[--text-primary]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-[--text-secondary]">Last Name *</Label>
                      <Input
                        id="lastName"
                        required
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className="bg-[--bg-primary] border-[--bg-tertiary] text-[--text-primary]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-[--text-secondary]">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="bg-[--bg-primary] border-[--bg-tertiary] text-[--text-primary]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-[--text-secondary]">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone || ""}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="bg-[--bg-primary] border-[--bg-tertiary] text-[--text-primary]"
                      />
                    </div>
                  </div>
                </div>

                {/* Business Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[--text-primary]">Business Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="businessName" className="text-[--text-secondary]">Business Name *</Label>
                      <Input
                        id="businessName"
                        required
                        value={formData.businessName}
                        onChange={(e) => handleInputChange("businessName", e.target.value)}
                        className="bg-[--bg-primary] border-[--bg-tertiary] text-[--text-primary]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="businessType" className="text-[--text-secondary]">Business Type</Label>
                      <Select value={formData.businessType || ""} onValueChange={(value) => handleInputChange("businessType", value)}>
                        <SelectTrigger className="bg-[--bg-primary] border-[--bg-tertiary] text-[--text-primary]">
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="trucking">Trucking & Transportation</SelectItem>
                          <SelectItem value="medical">Medical & Healthcare</SelectItem>
                          <SelectItem value="construction">Construction</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="auto">Auto Dealership</SelectItem>
                          <SelectItem value="hvac">HVAC & Trades</SelectItem>
                          <SelectItem value="restaurant">Restaurant</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="yearsInBusiness" className="text-[--text-secondary]">Years in Business</Label>
                      <Input
                        id="yearsInBusiness"
                        type="number"
                        min="0"
                        value={formData.yearsInBusiness || ""}
                        onChange={(e) => handleInputChange("yearsInBusiness", parseInt(e.target.value) || 0)}
                        className="bg-[--bg-primary] border-[--bg-tertiary] text-[--text-primary]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="monthlyRevenue" className="text-[--text-secondary]">Monthly Revenue ($)</Label>
                      <Input
                        id="monthlyRevenue"
                        type="number"
                        min="0"
                        value={formData.monthlyRevenue || ""}
                        onChange={(e) => handleInputChange("monthlyRevenue", parseInt(e.target.value) || 0)}
                        className="bg-[--bg-primary] border-[--bg-tertiary] text-[--text-primary]"
                      />
                    </div>
                  </div>
                </div>

                {/* Loan Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[--text-primary]">Loan Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="loanAmount" className="text-[--text-secondary]">Loan Amount Requested ($) *</Label>
                      <Input
                        id="loanAmount"
                        type="number"
                        required
                        min="1000"
                        value={formData.loanAmount || ""}
                        onChange={(e) => handleInputChange("loanAmount", parseInt(e.target.value) || 0)}
                        className="bg-[--bg-primary] border-[--bg-tertiary] text-[--text-primary]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="creditScore" className="text-[--text-secondary]">Credit Score (Approximate)</Label>
                      <Select value={formData.creditScore?.toString() || ""} onValueChange={(value) => handleInputChange("creditScore", parseInt(value))}>
                        <SelectTrigger className="bg-[--bg-primary] border-[--bg-tertiary] text-[--text-primary]">
                          <SelectValue placeholder="Select credit score range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="300">300-500 (Poor)</SelectItem>
                          <SelectItem value="550">500-600 (Fair)</SelectItem>
                          <SelectItem value="650">600-700 (Good)</SelectItem>
                          <SelectItem value="750">700+ (Excellent)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="loanPurpose" className="text-[--text-secondary]">Loan Purpose</Label>
                    <Textarea
                      id="loanPurpose"
                      value={formData.loanPurpose || ""}
                      onChange={(e) => handleInputChange("loanPurpose", e.target.value)}
                      placeholder="Describe how you plan to use the loan funds..."
                      className="bg-[--bg-primary] border-[--bg-tertiary] text-[--text-primary]"
                      rows={4}
                    />
                  </div>
                </div>

                <Button 
                  type="submit"
                  disabled={createApplicationMutation.isPending}
                  className="w-full bg-[--primary] hover:bg-[--primary-dark] text-white py-3 text-lg font-semibold"
                >
                  {createApplicationMutation.isPending ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Submit Application
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}