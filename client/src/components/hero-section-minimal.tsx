import { Button } from "@/components/ui/button";
import heroBackgroundPath from "@assets/pexels-mikhail-nilov-6963857 (1)_1752762912598.jpg";

// CRITICAL: Ultra-minimal hero section for maximum performance
export function HeroSection() {
  const handleApplyNow = () => {
    window.open('https://form.jotform.com/251965461165159', '_blank');
  };

  const handlePhoneClick = () => {
    window.open('https://calendly.com/fundtekcapitalgroup/15min', '_blank');
  };

  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroBackgroundPath})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#1e293b'
      }}
    >
      {/* Text Content Overlay */}
      <div className="absolute left-0 top-0 z-20 text-white pl-4 md:pl-8 w-full h-full">
        <div className="flex items-center h-full">
          <div className="max-w-2xl pt-2 md:pt-3">
            <h1 className="font-bold mb-2 text-4xl md:text-5xl lg:text-6xl leading-tight">
              Flexible<br />
              Financing for<br />
              <span style={{ color: '#85abe4' }}>Every Industry</span>
            </h1>
            
            <p className="mb-2 max-w-2xl text-lg md:text-xl lg:text-2xl font-medium">
              Empower your business with <span style={{ color: '#85abe4' }}>custom tailored</span><br />
              loan programs designed to fuel your growth and success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button 
                onClick={handleApplyNow}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors duration-200"
              >
                Apply Now
              </Button>
              
              <Button 
                onClick={handlePhoneClick}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg font-semibold rounded-lg transition-colors duration-200"
              >
                Call Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
    </section>
  );
}