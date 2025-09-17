import { Linkedin, Mail, Award, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuthorBioProps {
  name: string;
  title: string;
  company: string;
  bio: string;
  image: string;
  credentials?: string[];
  linkedinUrl?: string;
  email?: string;
  className?: string;
  compact?: boolean;
}

export default function AuthorBio({ 
  name, 
  title, 
  company, 
  bio, 
  image, 
  credentials = [], 
  linkedinUrl, 
  email, 
  className = "",
  compact = false 
}: AuthorBioProps) {
  
  if (compact) {
    return (
      <div className={`flex items-center gap-3 p-4 bg-gray-50 rounded-lg ${className}`}>
        <img
          src={image}
          alt={`${name} - ${title} at ${company}`}
          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 text-sm">{name}</h4>
          <p className="text-xs text-gray-600 truncate">{title} at {company}</p>
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-[#0077b5] hover:underline mt-1"
              data-testid={`link-author-linkedin-${name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <Linkedin className="w-3 h-3" />
              Connect
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-gray-50 to-white border rounded-lg p-6 ${className}`}>
      <div className="flex items-start gap-4">
        <img
          src={image}
          alt={`${name} - ${title} at ${company}`}
          className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-lg flex-shrink-0"
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <div>
              <h3 className="text-lg font-bold text-gray-900">{name}</h3>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Building2 className="w-4 h-4" />
                <span>{title} at {company}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {linkedinUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="text-[#0077b5] border-[#0077b5] hover:bg-[#0077b5] hover:text-white"
                  data-testid={`button-author-linkedin-${name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 mr-1" />
                    Connect
                  </a>
                </Button>
              )}
              {email && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="text-gray-600 hover:bg-gray-100"
                  data-testid={`button-author-email-${name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <a href={`mailto:${email}`}>
                    <Mail className="w-4 h-4 mr-1" />
                    Contact
                  </a>
                </Button>
              )}
            </div>
          </div>
          
          {credentials && credentials.length > 0 && (
            <div className="flex items-center gap-1 mb-3">
              <Award className="w-4 h-4 text-[#193a59]" />
              <div className="flex flex-wrap gap-1">
                {credentials.map((credential, index) => (
                  <span 
                    key={index}
                    className="inline-block px-2 py-1 text-xs bg-[#193a59] text-white rounded-full"
                  >
                    {credential}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <p className="text-gray-700 leading-relaxed">{bio}</p>
        </div>
      </div>
    </div>
  );
}

// Pre-configured author data for Lendura Capital team
export const authorProfiles = {
  "SBA Lending Team": {
    name: "SBA Lending Team",
    title: "Senior SBA Specialists",
    company: "Lendura Capital",
    bio: "Our SBA lending team brings over 20 years of combined experience in Small Business Administration loan programs. They stay current with all SBA policy changes and have helped thousands of businesses secure favorable financing.",
    image: "/attached_assets/generated_images/Professional_businesswoman_headshot_cb14e1cc.png",
    credentials: ["SBA Preferred Lender", "Certified Lending Professional"],
    linkedinUrl: "https://www.linkedin.com/company/lendura-capital"
  },
  "Credit Specialists": {
    name: "Credit Specialists",
    title: "Business Credit Analysts",
    company: "Lendura Capital", 
    bio: "Our credit specialists are experts in business credit building and optimization. They help businesses improve their creditworthiness and access better financing terms through strategic credit management.",
    image: "/attached_assets/generated_images/Professional_businesswoman_headshot_cb14e1cc.png",
    credentials: ["Credit Analysis Certified", "Business Finance Expert"],
    linkedinUrl: "https://www.linkedin.com/company/lendura-capital"
  },
  "Industry Analysts": {
    name: "Industry Analysts",
    title: "Market Research Team",
    company: "Lendura Capital",
    bio: "Our industry analysts track market trends, regulatory changes, and economic factors affecting small business lending. They provide insights to help businesses make informed financing decisions.",
    image: "/attached_assets/generated_images/Professional_businesswoman_headshot_cb14e1cc.png", 
    credentials: ["Market Research Certified", "Industry Analysis Expert"],
    linkedinUrl: "https://www.linkedin.com/company/lendura-capital"
  },
  "Equipment Finance Team": {
    name: "Equipment Finance Team", 
    title: "Equipment Financing Specialists",
    company: "Lendura Capital",
    bio: "Specializing in equipment financing across all industries, our team understands the unique challenges of capital equipment purchases and offers tailored financing solutions.",
    image: "/attached_assets/generated_images/Professional_businesswoman_headshot_cb14e1cc.png",
    credentials: ["Equipment Finance Certified", "Asset-Based Lending Expert"],
    linkedinUrl: "https://www.linkedin.com/company/lendura-capital"
  },
  "Business Finance Team": {
    name: "Business Finance Team",
    title: "Business Finance Advisors", 
    company: "Lendura Capital",
    bio: "Our business finance team provides comprehensive financial advisory services, helping businesses optimize their capital structure and access growth funding.",
    image: "/attached_assets/generated_images/Professional_businesswoman_headshot_cb14e1cc.png",
    credentials: ["CFA", "Business Finance Certified"],
    linkedinUrl: "https://www.linkedin.com/company/lendura-capital"
  },
  "Healthcare Finance Team": {
    name: "Healthcare Finance Team",
    title: "Healthcare Finance Specialists",
    company: "Lendura Capital",
    bio: "With deep expertise in healthcare industry regulations and financing needs, our team helps medical practices, dental offices, and healthcare facilities secure appropriate funding.",
    image: "/attached_assets/generated_images/Professional_businesswoman_headshot_cb14e1cc.png",
    credentials: ["Healthcare Finance Certified", "Medical Practice Management"],
    linkedinUrl: "https://www.linkedin.com/company/lendura-capital"
  },
  "Funding Specialists": {
    name: "Funding Specialists",
    title: "Alternative Funding Experts",
    company: "Lendura Capital",
    bio: "Our funding specialists evaluate all available financing options to find the best solutions for each business. They specialize in creative financing structures and alternative funding sources.",
    image: "/attached_assets/generated_images/Professional_businesswoman_headshot_cb14e1cc.png",
    credentials: ["Alternative Funding Certified", "Creative Finance Expert"],
    linkedinUrl: "https://www.linkedin.com/company/lendura-capital"
  },
  "Construction Finance Team": {
    name: "Construction Finance Team",
    title: "Construction Industry Specialists",
    company: "Lendura Capital",
    bio: "Understanding the cyclical nature of construction business, our team provides financing solutions that accommodate project-based revenue and seasonal cash flow patterns.",
    image: "/attached_assets/generated_images/Professional_businesswoman_headshot_cb14e1cc.png",
    credentials: ["Construction Finance Certified", "Project-Based Lending Expert"],
    linkedinUrl: "https://www.linkedin.com/company/lendura-capital"
  },
  "Restaurant Finance Team": {
    name: "Restaurant Finance Team",
    title: "Restaurant Industry Specialists", 
    company: "Lendura Capital",
    bio: "Our restaurant finance team understands the unique challenges of the food service industry, from equipment needs to working capital requirements and seasonal fluctuations.",
    image: "/attached_assets/generated_images/Professional_businesswoman_headshot_cb14e1cc.png",
    credentials: ["Restaurant Finance Certified", "Food Service Industry Expert"],
    linkedinUrl: "https://www.linkedin.com/company/lendura-capital"
  }
};