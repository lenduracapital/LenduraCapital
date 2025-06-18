import SolutionDetailTemplate from "@/components/solution-detail-template";

export default function CreditServicesDetail() {
  return (
    <SolutionDetailTemplate
      title="Credit Services"
      description="Professional business credit building and repair services to improve your company's financial standing."
      heroImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=600&fit=crop"
      contentImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop"
      features={[
        "Credit analysis",
        "Score improvement",
        "Credit monitoring",
        "Expert guidance",
        "Business credit building",
        "Ongoing support"
      ]}
      perfectFor={[
        "New businesses",
        "Credit improvement",
        "Future funding prep",
        "Credit monitoring"
      ]}
      qualificationRequirements={[
        "Valid business entity",
        "Business bank account",
        "Committed to improvement",
        "Follow recommendations"
      ]}
      howItWorks={{
        title: "How credit building works",
        items: [
          "Service fees range from $500 - $5,000 based on credit goals and complexity",
          "Establish business credit separate from personal credit",
          "Build relationships with business credit reporting agencies",
          "Create positive payment history with trade vendors",
          "Monitor and optimize business credit profile",
          "Process typically takes 6-18 months for significant results"
        ]
      }}
      ratesBasedOn={[
        "Current business credit status",
        "Desired credit goals",
        "Business structure and age",
        "Industry and business model",
        "Level of service required"
      ]}
      requiredDocuments={[
        "Business formation documents",
        "EIN confirmation letter",
        "Business bank account statements",
        "Current business credit reports",
        "Business license and permits"
      ]}
      askYourself={[
        "Do you want to separate business and personal credit?",
        "Are you planning to apply for business financing in the future?",
        "Do you have the patience for a 6-18 month credit building process?"
      ]}
      goodToKnow={[
        "Building business credit takes time but provides long-term benefits",
        "Strong business credit can qualify you for better financing terms",
        "Protects personal credit from business financial activities",
        "Can increase business valuation and exit opportunities",
        "Essential for businesses planning significant growth or expansion"
      ]}
    />
  );
}