import SolutionDetailTemplate from "@/components/solution-detail-template";

export default function SBALoansDetail() {
  return (
    <SolutionDetailTemplate
      title="SBA Loans"
      description="Government-backed loans offering favorable terms and lower down payments for qualified businesses."
      heroImage="https://images.unsplash.com/photo-1554224154-26032fced8bd?w=1200&h=600&fit=crop"
      contentImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
      features={[
        "Lower down payments",
        "Competitive rates",
        "Longer repayment terms",
        "Government backed",
        "Up to $5M available",
        "Multiple loan programs"
      ]}
      perfectFor={[
        "Business expansion",
        "Real estate purchases",
        "Working capital",
        "Debt refinancing"
      ]}
      qualificationRequirements={[
        "Minimum 2 years in business",
        "Strong business credit",
        "Owner-occupied real estate",
        "Meet SBA size standards"
      ]}
      howItWorks={{
        title: "How SBA loans work",
        items: [
          "Interest rates typically 2-4% above prime rate with government backing",
          "SBA guarantees 75-90% of the loan, reducing lender risk",
          "Repayment terms up to 25 years for real estate, 10 years for equipment",
          "Lower down payment requirements (as low as 10%)",
          "Comprehensive application process including business plan",
          "Funding amounts range from $5,000 up to $5,000,000"
        ]
      }}
      ratesBasedOn={[
        "Prime rate plus margin",
        "Loan amount and term",
        "Business and personal credit",
        "Collateral and down payment",
        "Industry and business risk"
      ]}
      requiredDocuments={[
        "Comprehensive business plan",
        "3 years of business tax returns",
        "Personal tax returns",
        "Financial statements and projections",
        "Business license and formation documents",
        "Real estate documents if applicable"
      ]}
      askYourself={[
        "Do you qualify as a small business under SBA size standards?",
        "Do you have a comprehensive business plan and financial projections?",
        "Are you prepared for a longer application process (30-90 days)?"
      ]}
      goodToKnow={[
        "SBA loans offer some of the most favorable terms available to small businesses",
        "Longer application process but worth it for qualified businesses",
        "Can be used for real estate, equipment, working capital, and refinancing",
        "Requires personal guarantee from owners with 20% or more ownership",
        "Excellent for established businesses with strong financials and growth plans"
      ]}
    />
  );
}