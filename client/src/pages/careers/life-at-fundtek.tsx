import { Button } from "@/components/ui/button";
import { ChevronLeft, Coffee, Users, Calendar, Award, Gamepad2, Heart } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";

export default function LifeAtFundTekPage() {
  const [, setLocation] = useLocation();

  const cultureHighlights = [
    {
      icon: Coffee,
      title: "Coffee & Conversations",
      description: "Start your day with premium coffee and meaningful conversations with colleagues who become friends."
    },
    {
      icon: Users,
      title: "Collaborative Environment",
      description: "Work alongside passionate professionals who support each other's success and celebrate achievements together."
    },
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description: "Balance your work and personal life with flexible hours and remote work options that fit your lifestyle."
    },
    {
      icon: Award,
      title: "Recognition Programs",
      description: "Regular recognition for outstanding performance, with monthly awards and quarterly team celebrations."
    },
    {
      icon: Gamepad2,
      title: "Fun Activities",
      description: "Team building events, game nights, and social gatherings that bring our team closer together."
    },
    {
      icon: Heart,
      title: "Wellness Focus",
      description: "Comprehensive wellness programs including mental health support and fitness membership reimbursements."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Business Development Manager",
      tenure: "2 years at FundTek",
      quote: "What I love most about FundTek is the genuine care for both our clients and our team. Leadership truly listens to our ideas and gives us the autonomy to implement them. I've grown more in 2 years here than in my previous 5 years elsewhere.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b789?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Marcus Rodriguez",
      role: "Financial Analyst",
      tenure: "1.5 years at FundTek",
      quote: "The learning opportunities here are incredible. From day one, I was encouraged to take ownership of my projects and contribute to strategic decisions. The mentorship program helped me advance faster than I ever thought possible.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Jennifer Kim",
      role: "Customer Success Manager",
      tenure: "3 years at FundTek",
      quote: "FundTek isn't just a job – it's a place where you can build a meaningful career while making a real difference. Every day, I help business owners achieve their dreams, and I'm supported by an amazing team that feels like family.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <>
      <SEOHead 
        title="Life at FundTek Capital Group - Company Culture & Work Environment"
        description="Discover what it's like to work at FundTek Capital Group. Learn about our company culture, team environment, and what makes our workplace special."
        keywords="FundTek culture, work environment, team culture, employee experience, company values"
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
                Life at FundTek
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                More than just a workplace – discover a culture where innovation thrives, 
                relationships matter, and every voice is heard.
              </p>
            </div>
          </div>
        </section>

        {/* Office Culture Image */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80"
                alt="FundTek team collaboration in modern office"
                className="rounded-xl shadow-2xl w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Our Brooklyn Headquarters</h3>
                <p className="text-lg opacity-90">Where innovation meets collaboration</p>
              </div>
            </div>
          </div>
        </section>

        {/* Culture Highlights */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">What Makes Us Special</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our culture is built on respect, growth, and the shared mission of empowering businesses to succeed.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cultureHighlights.map((highlight, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#85abe4] text-white rounded-full mb-6">
                    <highlight.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{highlight.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Employee Testimonials */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Hear From Our Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Real stories from real employees about their experience working at FundTek Capital Group.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-50 p-8 rounded-xl">
                  <div className="flex items-center mb-6">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-[#85abe4] font-medium">{testimonial.role}</p>
                      <p className="text-sm text-gray-500">{testimonial.tenure}</p>
                    </div>
                  </div>
                  <blockquote className="text-gray-700 italic leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Work Environment Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  A Day in the Life
                </h2>
                <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                  <p>
                    <strong className="text-gray-900">9:00 AM:</strong> Start your day with fresh coffee and a brief team standup. 
                    Share updates, celebrate wins, and align on priorities for the day.
                  </p>
                  <p>
                    <strong className="text-gray-900">10:00 AM:</strong> Dive into meaningful work that directly impacts small business owners. 
                    Whether you're processing applications, developing client relationships, or analyzing market trends.
                  </p>
                  <p>
                    <strong className="text-gray-900">12:30 PM:</strong> Lunch with colleagues in our comfortable break area, 
                    or step outside to explore Brooklyn's vibrant food scene.
                  </p>
                  <p>
                    <strong className="text-gray-900">2:00 PM:</strong> Collaborate on projects, attend training sessions, 
                    or participate in cross-department initiatives that drive our company forward.
                  </p>
                  <p>
                    <strong className="text-gray-900">5:30 PM:</strong> Wrap up your day knowing you've made a difference. 
                    Some days end with team activities, others with the flexibility to work remotely.
                  </p>
                </div>
              </div>
              <div className="space-y-8">
                <img 
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80"
                  alt="Team meeting at FundTek"
                  className="rounded-xl shadow-lg w-full h-64 object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
                  alt="Modern office workspace"
                  className="rounded-xl shadow-lg w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-[#85abe4]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Be Part of Our Story?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Join a team that values your growth, celebrates your successes, and supports your journey 
              in building a meaningful career.
            </p>
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