import { Button } from "@/components/ui/button";
import { ChevronLeft, Heart, DollarSign, Clock, GraduationCap, Car, Plane, Gift, Shield, Coffee, Dumbbell, Baby } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";

export default function BenefitsPerksPage() {
  const [, setLocation] = useLocation();

  const healthBenefits = [
    {
      icon: Heart,
      title: "Medical Insurance",
      description: "Comprehensive health coverage with multiple plan options. Company covers 80% of premiums for employees and 70% for family coverage."
    },
    {
      icon: Shield,
      title: "Dental & Vision",
      description: "Complete dental and vision insurance with preventive care coverage and low co-pays for routine visits."
    },
    {
      icon: Baby,
      title: "Family Support",
      description: "Maternity/paternity leave, adoption assistance, and dependent care flexible spending accounts."
    },
    {
      icon: Dumbbell,
      title: "Wellness Programs",
      description: "Gym membership reimbursement, wellness challenges, mental health resources, and annual health screenings."
    }
  ];

  const financialBenefits = [
    {
      icon: DollarSign,
      title: "Competitive Salary",
      description: "Market-leading base salaries with annual merit increases and performance-based bonuses up to 20% of base salary."
    },
    {
      icon: Gift,
      title: "401(k) Retirement Plan",
      description: "Company matches 100% of the first 3% and 50% of the next 2% of your contributions, with immediate vesting."
    },
    {
      icon: Car,
      title: "Transportation Benefits",
      description: "Monthly MetroCard reimbursement, parking allowances, and bike-to-work incentives for eco-friendly commuting."
    },
    {
      icon: Shield,
      title: "Life Insurance",
      description: "Company-paid life insurance coverage equal to 2x annual salary, plus optional supplemental coverage."
    }
  ];

  const workLifeBenefits = [
    {
      icon: Clock,
      title: "Flexible Time Off",
      description: "20 days PTO plus 10 company holidays, flexible scheduling, and sabbatical opportunities after 5 years."
    },
    {
      icon: Coffee,
      title: "Remote Work Options",
      description: "Hybrid work arrangements, fully remote positions available, and flexible daily schedules to fit your life."
    },
    {
      icon: Plane,
      title: "Personal Development",
      description: "Annual conference attendance, professional certification reimbursement, and leadership development programs."
    },
    {
      icon: GraduationCap,
      title: "Education Support",
      description: "Tuition reimbursement up to $5,000 annually for job-related courses and degree programs."
    }
  ];

  const uniquePerks = [
    "Catered lunch every Friday",
    "Birthday days off",
    "Company-wide volunteer days",
    "Tech stipend for home office setup",
    "Professional development book library",
    "Employee referral bonuses",
    "Team building budget for department activities",
    "Work anniversary recognition gifts",
    "Free snacks and premium coffee daily",
    "Flexible dress code",
    "Pet-friendly office policy",
    "Employee appreciation events"
  ];

  return (
    <>
      <SEOHead 
        title="Benefits & Perks - FundTek Capital Group Careers"
        description="Explore comprehensive benefits and perks at FundTek Capital Group. Health insurance, retirement plans, flexible time off, professional development and more."
        keywords="FundTek benefits, employee perks, health insurance, retirement plan, PTO, professional development"
      />
      
      <div className="min-h-screen bg-white">
        <Header transparent={false} />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#85abe4] to-[#6b95d6]">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button 
              onClick={() => setLocation("/careers")}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#85abe4] mb-8 transition-all duration-300"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Careers
            </Button>
            
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                Benefits & Perks
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                We invest in our team's well-being with comprehensive benefits and meaningful perks 
                that support your life both inside and outside of work.
              </p>
            </div>
          </div>
        </section>

        {/* Health & Wellness Benefits */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Health & Wellness</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Your health and well-being are our priority. We offer comprehensive coverage and wellness programs.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {healthBenefits.map((benefit, index) => (
                <div key={index} className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#85abe4] text-white rounded-full mb-6">
                    <benefit.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Financial Benefits */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Financial Security</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Build your financial future with competitive compensation and comprehensive retirement benefits.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {financialBenefits.map((benefit, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#85abe4] text-white rounded-full mb-6">
                    <benefit.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Work-Life Balance */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Work-Life Balance</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Achieve the perfect balance with flexible work arrangements and professional development opportunities.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {workLifeBenefits.map((benefit, index) => (
                <div key={index} className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#85abe4] text-white rounded-full mb-6">
                    <benefit.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Unique Perks */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">The FundTek Difference</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Beyond traditional benefits, we offer unique perks that make working at FundTek special.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {uniquePerks.map((perk, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center">
                  <div className="w-4 h-4 bg-[#85abe4] rounded-full mr-4 flex-shrink-0"></div>
                  <span className="text-gray-800 font-medium">{perk}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Summary */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#85abe4] rounded-2xl p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Total Compensation Package
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                When you combine our competitive salaries with comprehensive benefits and unique perks, 
                the total value of your compensation package can be worth 25-30% more than your base salary.
              </p>
              <div className="grid md:grid-cols-3 gap-8 text-white">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-3xl font-bold mb-2">$75K - $95K</div>
                  <div className="text-lg">Average Salary Range</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-3xl font-bold mb-2">$20K+</div>
                  <div className="text-lg">Benefits Value</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-3xl font-bold mb-2">20%</div>
                  <div className="text-lg">Performance Bonus</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Join Our Team?
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Experience the FundTek difference with comprehensive benefits and a culture that truly cares about your success.
            </p>
            <Button 
              onClick={() => setLocation("/careers")}
              className="bg-[#85abe4] hover:bg-[#7299d1] text-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-lg px-8 py-4 h-auto font-semibold"
            >
              View Open Positions
            </Button>
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  );
}