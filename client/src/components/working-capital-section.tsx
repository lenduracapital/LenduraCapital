import { Button } from "@/components/ui/button";
import { DollarSign, Clock, Users } from "lucide-react";

export default function WorkingCapitalSection() {
  const handleApplyNow = () => {
    window.open("https://form.jotform.com/251965461165159", "_blank");
  };

  return (
    <section className="py-16 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Working Capital Solutions for Every Business
          </h2>
          <p className="text-lg text-gray-600">
            Flexible funding options designed to help your business grow
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="flex justify-center mb-4">
              <DollarSign className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">$10K - $750K</h3>
            <p className="text-gray-600">Funding amounts to meet any business need</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="flex justify-center mb-4">
              <Clock className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">24 Hour Approval</h3>
            <p className="text-gray-600">Fast decisions when you need funding now</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="flex justify-center mb-4">
              <Users className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">All Credit Types</h3>
            <p className="text-gray-600">Good credit, bad credit, or no credit - we can help</p>
          </div>
        </div>
        
        <div className="text-center">
          <Button 
            onClick={handleApplyNow}
            className="bg-[#85abe4] hover:bg-[#6b8ed4] text-white px-8 py-3 text-lg"
          >
            Apply for Working Capital
          </Button>
        </div>
      </div>
    </section>
  );
}