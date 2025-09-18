import SolutionDetailTemplate from '@/components/solution-detail-template';
import commercialBuildingImage from "@assets/crelending.jpg";

export default function CommercialRealEstateLending() {
  return (
    <SolutionDetailTemplate 
      slug="commercial-real-estate-lending"
      title="Commercial Real Estate Lending"
      description="Access capital for commercial real estate purchases, refinancing, and development projects with our specialized CRE lending programs."
      heroImage={commercialBuildingImage}
      contentImage={commercialBuildingImage}
      features={[
        "Loan amounts from $1M to $50M+",
        "Competitive rates starting at 4.5%",
        "Terms up to 25 years",
        "LTV ratios up to 80%",
        "Fast approval process (30-60 days)",
        "Experienced CRE specialists"
      ]}
      perfectFor={[
        "Office building acquisitions",
        "Retail property investments",
        "Industrial facility purchases",
        "Multi-family property financing",
        "Mixed-use development projects",
        "Portfolio refinancing"
      ]}
      qualificationRequirements={[
        "Strong credit profile (680+ preferred)",
        "Significant real estate experience",
        "Property cash flow analysis",
        "Down payment 20-25%",
        "Debt service coverage ratio 1.25x",
        "Environmental assessments"
      ]}
      approvalTime={{
        label: "Approval Process",
        duration: "30-60 days"
      }}
      howItWorks={{
        title: "How CRE Lending Works",
        items: [
          "Initial property evaluation and loan application",
          "Property appraisal and due diligence process",
          "Underwriting and loan committee approval",
          "Closing coordination and funding"
        ]
      }}
      faq={[
        {
          question: "What types of commercial properties do you finance?",
          answer: "We finance office buildings, retail properties, industrial facilities, multi-family properties, mixed-use developments, and other income-producing commercial real estate."
        },
        {
          question: "What are the typical loan-to-value ratios?",
          answer: "LTV ratios typically range from 70-80% depending on property type, location, and borrower qualifications. Stronger properties and borrowers may qualify for higher LTV ratios."
        },
        {
          question: "How long does the approval process take?",
          answer: "The approval process typically takes 30-60 days from application to closing, depending on property complexity, due diligence requirements, and loan committee scheduling."
        },
        {
          question: "What credit requirements do you have?",
          answer: "We prefer borrowers with credit scores of 680 or higher, though we may consider lower scores with strong property cash flow and significant down payments."
        },
        {
          question: "Do you offer construction financing?",
          answer: "Yes, we offer construction-to-permanent loans for new developments and major renovations, with specialized terms for construction projects."
        },
        {
          question: "What documentation is required?",
          answer: "Required documentation includes property financials, rent rolls, environmental assessments, property appraisals, borrower financial statements, and detailed project plans for developments."
        }
      ]}
      comparison={{
        traditional: [
          "Limited to local properties only",
          "60-90 day approval process",
          "Rigid property requirements",
          "High down payment (30-40%)",
          "Limited to bank's portfolio"
        ],
        lendura: [
          "Nationwide CRE financing",
          "30-day approval process",
          "Flexible property types",
          "Down payments from 20%",
          "Multiple lender network"
        ]
      }}
    />
  );
}