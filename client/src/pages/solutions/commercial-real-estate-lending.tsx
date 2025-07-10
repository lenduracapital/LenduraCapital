import SolutionDetailTemplate from '@/components/solution-detail-template';

export default function CommercialRealEstateLending() {
  return (
    <SolutionDetailTemplate 
      title="Commercial Real Estate Lending"
      subtitle="Comprehensive financing solutions for commercial property investments"
      description="Access capital for commercial real estate purchases, refinancing, and development projects with our specialized CRE lending programs."
      heroImage="/api/placeholder/800/400"
      benefits={[
        "Loan amounts from $1M to $50M+",
        "Competitive rates starting at 4.5%",
        "Terms up to 25 years",
        "LTV ratios up to 80%",
        "Fast approval process (30-60 days)",
        "Experienced CRE specialists"
      ]}
      qualificationsList={[
        "Strong credit profile (680+ preferred)",
        "Significant real estate experience",
        "Property cash flow analysis",
        "Down payment 20-25%",
        "Debt service coverage ratio 1.25x",
        "Environmental assessments"
      ]}
      idealFor={[
        "Office building acquisitions",
        "Retail property investments",
        "Industrial facility purchases",
        "Multi-family property financing",
        "Mixed-use development projects",
        "Portfolio refinancing"
      ]}
      processSteps={[
        "Initial property evaluation and loan application",
        "Property appraisal and due diligence process",
        "Underwriting and loan committee approval",
        "Closing coordination and funding"
      ]}
      solutionType="cre-lending"
    />
  );
}