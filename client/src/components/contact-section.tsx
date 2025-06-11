import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    fundingAmount: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for your message! We will contact you within 24 hours.",
    });
    
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      fundingAmount: "",
      message: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-20 bg-[--bg-secondary]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[--text-primary] mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-[--text-secondary] max-w-2xl mx-auto">
            Ready to discuss your funding needs? Our team is here to help you find the perfect solution.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-[--primary] rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[--text-primary] mb-2">Our Office</h3>
                <p className="text-[--text-secondary]">
                  123 Financial District<br />
                  New York, NY 10004<br />
                  United States
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-[--accent] rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[--text-primary] mb-2">Phone</h3>
                <p className="text-[--text-secondary]">
                  (555) 123-FUND<br />
                  Monday - Friday: 8AM - 8PM EST<br />
                  Saturday: 9AM - 5PM EST
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-[--primary] rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[--text-primary] mb-2">Email</h3>
                <p className="text-[--text-secondary]">
                  info@fundtekcapital.com<br />
                  applications@fundtekcapital.com<br />
                  support@fundtekcapital.com
                </p>
              </div>
            </div>
          </div>
          
          <Card className="bg-[--bg-primary] border border-[--bg-tertiary]/30">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-[--text-primary] mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-[--text-secondary] mb-2 block">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="bg-[--bg-secondary] border-[--bg-tertiary] text-[--text-primary] focus:ring-[--primary] focus:border-[--primary]"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-[--text-secondary] mb-2 block">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="bg-[--bg-secondary] border-[--bg-tertiary] text-[--text-primary] focus:ring-[--primary] focus:border-[--primary]"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-[--text-secondary] mb-2 block">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-[--bg-secondary] border-[--bg-tertiary] text-[--text-primary] focus:ring-[--primary] focus:border-[--primary]"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-[--text-secondary] mb-2 block">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="bg-[--bg-secondary] border-[--bg-tertiary] text-[--text-primary] focus:ring-[--primary] focus:border-[--primary]"
                  />
                </div>
                
                <div>
                  <Label htmlFor="fundingAmount" className="text-[--text-secondary] mb-2 block">Funding Amount Needed</Label>
                  <Select value={formData.fundingAmount} onValueChange={(value) => handleInputChange("fundingAmount", value)}>
                    <SelectTrigger className="bg-[--bg-secondary] border-[--bg-tertiary] text-[--text-primary]">
                      <SelectValue placeholder="Select amount range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-50k">Under $50,000</SelectItem>
                      <SelectItem value="50k-250k">$50,000 - $250,000</SelectItem>
                      <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
                      <SelectItem value="500k-1m">$500,000 - $1,000,000</SelectItem>
                      <SelectItem value="over-1m">Over $1,000,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-[--text-secondary] mb-2 block">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Tell us about your business and funding needs..."
                    className="bg-[--bg-secondary] border-[--bg-tertiary] text-[--text-primary] focus:ring-[--primary] focus:border-[--primary] resize-none"
                    rows={4}
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-[--primary] hover:bg-[--primary-dark] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
