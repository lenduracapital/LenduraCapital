import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, MapPin, Clock, DollarSign, Users, Award, Heart, Lightbulb, Target } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";
import ConversionTracking from "@/components/conversion-tracking";

export default function CareersPage() {
  const [, setLocation] = useLocation();

  const openPositions = [
    {
      title: "Senior Business Development Manager",
      department: "Sales",
      location: "Brooklyn, NY",
      type: "Full-time",
      salary: "$75,000 - $95,000",
      description: "Lead business development initiatives and build relationships with potential clients seeking financing solutions."
    },
    {
      title: "Loan Processing Specialist",
      department: "Operations",
      location: "Brooklyn, NY / Remote",
      type: "Full-time",
      salary: "$50,000 - $65,000",
      description: "Process and review loan applications, ensuring compliance with lending standards and regulations."
    },
    {
      title: "Financial Analyst",
      department: "Underwriting",
      location: "Brooklyn, NY",
      type: "Full-time",
      salary: "$60,000 - $80,000",
      description: "Analyze financial data and risk assessments to support lending decisions and portfolio management."
    },
    {
      title: "Customer Success Manager",
      department: "Client Relations",
      location: "Remote",
      type: "Full-time",
      salary: "$55,000 - $70,000",
      description: "Ensure client satisfaction and success throughout their financing journey with ongoing support."
    },
    {
      title: "Marketing Coordinator",
      department: "Marketing",
      location: "Brooklyn, NY / Hybrid",
      type: "Full-time",
      salary: "$45,000 - $58,000",
      description: "Support marketing campaigns, content creation, and brand initiatives to drive business growth."
    },
    {
      title: "Compliance Officer",
      department: "Legal & Compliance",
      location: "Brooklyn, NY",
      type: "Full-time",
      salary: "$70,000 - $90,000",
      description: "Ensure all operations comply with federal and state regulations governing financial services."
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive medical, dental, and vision insurance with company contribution to premiums."
    },
    {
      icon: DollarSign,
      title: "Competitive Compensation",
      description: "Market-leading salaries with performance bonuses and annual raises based on merit."
    },
    {
      icon: Clock,
      title: "Work-Life Balance",
      description: "Flexible scheduling, remote work options, and 20 days PTO plus holidays."
    },
    {
      icon: Award,
      title: "Professional Growth",
      description: "Training programs, conference attendance, and tuition reimbursement for continued education."
    },
    {
      icon: Users,
      title: "Team Culture",
      description: "Collaborative environment with team building events and recognition programs."
    },
    {
      icon: Target,
      title: "Performance Rewards",
      description: "Quarterly bonuses, achievement awards, and career advancement opportunities."
    }
  ];

  const companyValues = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We continuously seek new ways to improve our services and help businesses succeed."
    },
    {
      icon: Heart,
      title: "Integrity",
      description: "We build trust through transparent communication and ethical business practices."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We work together as a team to achieve shared goals and support each other's success."
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from client service to internal operations."
    }
  ];

  return (
    <>
      <SEOHead 
        title="Careers at FundTek Capital Group - Join Our Growing Team"
        description="Join FundTek Capital Group's dynamic team. We're hiring passionate professionals for roles in sales, operations, underwriting, and more. Competitive benefits and growth opportunities."
        keywords="FundTek careers, business financing jobs, Brooklyn jobs, financial services careers, remote work opportunities"
      />
      <ConversionTracking eventType="page_view" eventData={{ page_title: "Careers" }} />
      
      <div className="min-h-screen bg-white">
        <Header transparent={false} />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#85abe4] to-[#6b95d6]">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Build Your Career at FundTek
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join our mission to empower businesses with flexible financing solutions. 
              We're growing rapidly and looking for talented professionals to join our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => setLocation("/careers/life-at-fundtek")}
                className="bg-white text-[#85abe4] hover:bg-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-lg px-8 py-4 h-auto font-semibold"
              >
                Life at FundTek
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={() => {
                  const element = document.getElementById('open-positions');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-[#85abe4] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-lg px-8 py-4 h-auto font-semibold"
              >
                View Open Positions
              </Button>
            </div>
          </div>
        </section>

        {/* Company Values Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Values Drive Everything We Do</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                At FundTek Capital Group, our values shape our culture and guide how we work together to serve our clients.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {companyValues.map((value, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#85abe4] text-white rounded-full mb-6">
                    <value.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Join Us Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Why Choose FundTek Capital Group?
                </h2>
                <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                  <p>
                    We're not just another financial services company. At FundTek, you'll be part of a team that's 
                    genuinely committed to helping small businesses thrive. Every day, you'll have the opportunity 
                    to make a real difference in entrepreneurs' lives.
                  </p>
                  <p>
                    Our rapid growth means abundant opportunities for career advancement. We promote from within 
                    and invest heavily in our team's professional development. Whether you're just starting your 
                    career or looking to take the next step, FundTek provides the platform for your success.
                  </p>
                  <p>
                    Join a company where your ideas matter, your contributions are recognized, and your career 
                    can flourish in an environment built on trust, collaboration, and excellence.
                  </p>
                </div>
                <div className="mt-8">
                  <Button 
                    onClick={() => setLocation("/careers/benefits-perks")}
                    className="bg-[#85abe4] hover:bg-[#7299d1] text-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-lg px-8 py-4 h-auto font-semibold"
                  >
                    Explore Benefits & Perks
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="Professional team collaboration"
                  className="rounded-xl shadow-2xl w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#85abe4]/20 to-transparent rounded-xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits & Perks Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Benefits & Perks</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We believe in taking care of our team with comprehensive benefits and meaningful perks that support 
                your personal and professional well-being.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="flex items-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-[#85abe4] text-white rounded-lg mr-4">
                      <benefit.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{benefit.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions Section */}
        <section id="open-positions" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Current Openings</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ready to join our team? Explore our current job openings and find the perfect role for your skills and career goals.
              </p>
            </div>
            
            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <div key={index} className="bg-gray-50 p-8 rounded-xl border hover:shadow-lg transition-all duration-300 hover:border-[#85abe4]">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <h3 className="text-2xl font-bold text-gray-900">{position.title}</h3>
                        <span className="bg-[#85abe4] text-white px-3 py-1 rounded-full text-sm font-medium">
                          {position.department}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-6 text-gray-600 mb-4">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {position.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {position.type}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-2" />
                          {position.salary}
                        </div>
                      </div>
                      
                      <p className="text-gray-700 leading-relaxed mb-6 lg:mb-0">
                        {position.description}
                      </p>
                    </div>
                    
                    <div className="lg:ml-8">
                      <Button 
                        onClick={() => window.open("mailto:careers@fundtekcapitalgroup.com?subject=Application for " + position.title, "_blank")}
                        className="bg-[#85abe4] hover:bg-[#7299d1] text-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 px-6 py-3 font-semibold w-full lg:w-auto"
                      >
                        Apply Now
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-lg text-gray-600 mb-6">
                Don't see the perfect role? We're always looking for talented professionals.
              </p>
              <Button 
                onClick={() => window.open("mailto:careers@fundtekcapitalgroup.com?subject=General Career Inquiry", "_blank")}
                variant="outline"
                className="border-[#85abe4] text-[#85abe4] hover:bg-[#85abe4] hover:text-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 px-8 py-4 h-auto text-lg font-semibold"
              >
                Submit General Application
              </Button>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-[#85abe4]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Make an Impact?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Join FundTek Capital Group and help us revolutionize business financing. 
              Your career growth starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => setLocation("/careers/application-process")}
                className="bg-white text-[#85abe4] hover:bg-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-lg px-8 py-4 h-auto font-semibold"
              >
                Application Process
              </Button>
              <Button 
                onClick={() => window.open("mailto:careers@fundtekcapitalgroup.com", "_blank")}
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-[#85abe4] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-lg px-8 py-4 h-auto font-semibold"
              >
                Contact HR Team
              </Button>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  );
}