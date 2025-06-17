import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface SolutionDetailProps {
  title: string;
  description: string;
  heroImage: string;
  contentImage: string;
  features: string[];
  perfectFor: string[];
  qualificationRequirements: string[];
}

export default function SolutionDetailTemplate({
  title,
  description,
  heroImage,
  contentImage,
  features,
  perfectFor,
  qualificationRequirements
}: SolutionDetailProps) {
  const [, setLocation] = useLocation();
  
  const handleApplyNow = () => {
    window.open("https://form.jotform.com/251417715331047", "_blank");
  };

  const handleBackToSolutions = () => {
    setLocation("/solutions");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section with Image */}
      <section className="relative pt-20 md:pt-24 pb-12 md:pb-20 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('${heroImage}')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#85abe4]/20 to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-base md:text-xl text-gray-200 leading-relaxed px-4">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start">
            <div className="relative order-2 lg:order-1">
              <img 
                src={contentImage}
                alt={`${title} financing solution`}
                className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-4 md:mb-6">
                What are {title}?
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
                {description}
              </p>
              
              <h3 className="text-xl md:text-2xl font-bold text-black mb-3 md:mb-4">Key Features</h3>
              <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 flex-shrink-0" style={{ color: '#85abe4' }} />
                    <span className="text-sm md:text-base text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl md:text-2xl font-bold text-black mb-3 md:mb-4">Perfect for:</h3>
              <ul className="space-y-1 md:space-y-2 mb-6 md:mb-8">
                {perfectFor.map((use, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="mr-2 md:mr-3">•</span>
                    <span className="text-sm md:text-base">{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
              <h3 className="text-xl md:text-2xl font-bold text-black mb-4">Get Your Quote Today</h3>
              <p className="text-sm md:text-base text-gray-600 mb-6">
                Ready to secure funding for your business? Our specialists are standing by to help you find the perfect {title.toLowerCase()} solution.
              </p>
              <div className="space-y-4">
                <div className="bg-gray-50 p-3 md:p-4 rounded border-l-4" style={{ borderLeftColor: '#85abe4' }}>
                  <p className="text-xs md:text-sm text-gray-600">Call us directly:</p>
                  <p className="text-xl md:text-2xl font-bold text-black">(305) 307-4658</p>
                </div>
                <Button 
                  onClick={handleApplyNow}
                  style={{ backgroundColor: '#85abe4' }}
                  className="w-full text-white py-3 rounded font-semibold text-base md:text-lg hover:opacity-90"
                >
                  Apply Now
                </Button>
                <Button 
                  onClick={handleBackToSolutions}
                  variant="outline"
                  className="w-full py-3 rounded font-semibold text-base md:text-lg border-black text-black hover:bg-black hover:text-white"
                >
                  Back to Solutions
                </Button>
              </div>
            </div>

            <div className="p-6 md:p-8 rounded-lg" style={{ backgroundColor: '#85abe4' }}>
              <h4 className="text-lg md:text-xl font-bold text-white mb-4">Qualification Requirements</h4>
              <ul className="space-y-2 text-white">
                {qualificationRequirements.map((req, index) => (
                  <li key={index} className="text-sm md:text-base">• {req}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}