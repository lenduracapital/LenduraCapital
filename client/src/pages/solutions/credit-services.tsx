import SolutionDetailTemplate from "@/components/solution-detail-template";
import creditRepairImage from "@assets/creditrepair.jpg";

export default function CreditServicesDetail() {
  return (
    <SolutionDetailTemplate
      slug="credit-services"
      title="Credit Repair"
      description="Professional business credit building and repair services to improve your company's financial standing."
      heroImage={creditRepairImage}
      contentImage={creditRepairImage}
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
      faq={[
        {
          question: "How long does it take to build business credit?",
          answer: "Building strong business credit typically takes 6-18 months of consistent payment history and credit activity. Some improvements can be seen within 3-6 months with proper credit management."
        },
        {
          question: "What's the difference between business and personal credit?",
          answer: "Business credit is tied to your EIN and business entity, while personal credit uses your SSN. Business credit protects personal assets and can provide higher credit limits for business expenses."
        },
        {
          question: "Do I need to have revenue to build business credit?",
          answer: "While revenue helps, you can start building business credit immediately after incorporating. Focus on establishing trade lines, business bank accounts, and vendor relationships first."
        },
        {
          question: "Can poor personal credit affect my business credit?",
          answer: "Initially yes, as many lenders consider personal credit for new businesses. However, as your business credit strengthens, you can qualify for financing based solely on business creditworthiness."
        },
        {
          question: "What business credit scores should I aim for?",
          answer: "Business credit scores range from 0-100. Aim for 80+ for the best financing terms. Scores above 75 are considered good, while scores below 50 may limit financing options."
        },
        {
          question: "How do I monitor my business credit?",
          answer: "Monitor your business credit through the major bureaus: Dun & Bradstreet, Experian Business, and Equifax Business. Regular monitoring helps catch errors and track progress."
        }
      ]}
      comparison={{
        traditional: [
          "Banks don't offer credit repair",
          "No guidance on credit building",
          "Focus only on personal credit",
          "No business credit support",
          "DIY credit improvement"
        ],
        fundtek: [
          "Professional credit repair services",
          "Expert credit building strategies",
          "Business credit establishment",
          "Dedicated credit specialists",
          "Proven improvement process"
        ]
      }}
    />
  );
}