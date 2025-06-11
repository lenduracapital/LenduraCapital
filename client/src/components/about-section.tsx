import { Card, CardContent } from "@/components/ui/card";
import { Clock, Shield, Users } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Fast Approvals",
    description: "Get pre-qualified in minutes and receive funding decisions within 24-48 hours.",
    color: "bg-[--primary]"
  },
  {
    icon: Shield,
    title: "Transparent Terms",
    description: "No hidden fees or surprise charges. Every term is clearly explained upfront.",
    color: "bg-[--accent]"
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description: "Your success is our priority. Get personalized support throughout your journey.",
    color: "bg-[--primary]"
  }
];

const stats = [
  { value: "$500M+", label: "Funded" },
  { value: "2,000+", label: "Businesses Served" },
  { value: "98%", label: "Satisfaction Rate" }
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-[--bg-primary]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[--text-primary]">
              Empowering Business Growth Since 2015
            </h2>
            
            <p className="text-lg text-[--text-secondary] leading-relaxed">
              FundTek Capital Group was founded with a simple mission: to bridge the gap between ambitious businesses and the capital they need to thrive. With over $500 million in funding facilitated and 2,000+ successful partnerships, we've become a trusted name in business financing.
            </p>
            
            <p className="text-lg text-[--text-secondary] leading-relaxed">
              Our team of financial experts understands that every business is unique. That's why we offer personalized funding solutions, competitive rates, and exceptional customer service that puts your success at the center of everything we do.
            </p>
            
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-[--primary] mb-2">{stat.value}</div>
                  <div className="text-sm text-[--text-secondary]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="bg-[--bg-secondary] border border-[--bg-tertiary]/30">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[--text-primary] mb-2">{feature.title}</h3>
                        <p className="text-[--text-secondary]">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
