import { Button } from "@/components/ui/button";
import { ChevronLeft, FileText, MessageSquare, Users, CheckCircle, Clock, Mail } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";

export default function ApplicationProcessPage() {
  const [, setLocation] = useLocation();

  const processSteps = [
    {
      icon: FileText,
      step: "1",
      title: "Submit Application",
      description: "Apply online through our career portal or send your resume directly to careers@fundtekcapitalgroup.com",
      timeline: "Same day"
    },
    {
      icon: MessageSquare,
      step: "2", 
      title: "Initial Screening",
      description: "Our HR team reviews your application and may conduct a brief phone screening to discuss your background",
      timeline: "2-3 business days"
    },
    {
      icon: Users,
      step: "3",
      title: "Interview Process",
      description: "Meet with the hiring manager and team members through video or in-person interviews",
      timeline: "1-2 weeks"
    },
    {
      icon: CheckCircle,
      step: "4",
      title: "Final Decision",
      description: "Reference checks, background verification, and final hiring decision with offer details",
      timeline: "3-5 business days"
    }
  ];

  const applicationTips = [
    {
      title: "Tailor Your Resume",
      description: "Highlight relevant experience in financial services, sales, or customer service roles."
    },
    {
      title: "Show Your Impact", 
      description: "Use specific numbers and metrics to demonstrate your achievements in previous roles."
    },
    {
      title: "Research Our Company",
      description: "Understand our mission, values, and the types of businesses we serve."
    },
    {
      title: "Prepare Questions",
      description: "Come ready with thoughtful questions about the role, team, and growth opportunities."
    },
    {
      title: "Be Authentic",
      description: "We value genuine personalities and want to see who you really are."
    }
  ];

  return (
    <>
      <SEOHead 
        title="Application Process - FundTek Capital Group Careers"
        description="Learn about FundTek Capital Group's hiring process. From application to offer, understand what to expect when applying for positions at our company."
        keywords="FundTek application process, hiring process, interview process, how to apply, career application"
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
                Application Process
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                Our streamlined hiring process is designed to find the right fit for both you and our team. 
                Here's what to expect every step of the way.
              </p>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Hiring Process</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We believe in a transparent, efficient process that respects your time while helping us get to know you.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-[#85abe4] text-white rounded-full text-2xl font-bold mb-4">
                      {step.step}
                    </div>
                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    {index < processSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gray-300 z-0"></div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{step.description}</p>
                  <div className="inline-flex items-center text-[#85abe4] font-medium">
                    <Clock className="h-4 w-4 mr-2" />
                    {step.timeline}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Tips */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Tips for Success</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Make your application stand out with these proven strategies from our hiring team.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {applicationTips.map((tip, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="w-8 h-8 bg-[#85abe4] rounded-full flex items-center justify-center text-white font-bold mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{tip.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Look For */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  What We Look For
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-[#85abe4] rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Growth Mindset</h4>
                      <p className="text-gray-600">Candidates who are eager to learn, adapt, and grow with our expanding company.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-[#85abe4] rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Client Focus</h4>
                      <p className="text-gray-600">A genuine desire to help small business owners succeed and achieve their goals.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-[#85abe4] rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Team Collaboration</h4>
                      <p className="text-gray-600">Strong communication skills and the ability to work effectively with diverse teams.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-[#85abe4] rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Results Orientation</h4>
                      <p className="text-gray-600">Track record of achieving goals and driving positive outcomes in previous roles.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=800&q=80"
                  alt="Professional interview setting"
                  className="rounded-xl shadow-2xl w-full h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20 bg-[#85abe4]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Questions About the Process?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Our HR team is here to help guide you through the application process and answer any questions you may have.
            </p>
            <div className="grid md:grid-cols-2 gap-8 text-white mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Mail className="h-8 w-8 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Email Us</h3>
                <p className="mb-4">careers@fundtekcapitalgroup.com</p>
                <Button 
                  onClick={() => window.open("mailto:careers@fundtekcapitalgroup.com", "_blank")}
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#85abe4]"
                >
                  Send Email
                </Button>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="h-8 w-8 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Schedule a Call</h3>
                <p className="mb-4">Speak with our HR team directly</p>
                <Button 
                  onClick={() => window.open("https://calendly.com/admin-fundtekcapitalgroup/30min", "_blank")}
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#85abe4]"
                >
                  Book Meeting
                </Button>
              </div>
            </div>
            <Button 
              onClick={() => setLocation("/careers")}
              className="bg-white text-[#85abe4] hover:bg-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-lg px-8 py-4 h-auto font-semibold"
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