import SolutionDetailTemplate from "@/components/solution-detail-template";

export default function SBALoansDetail() {
  return (
    <SolutionDetailTemplate
      title="SBA Loans"
      description="Government-backed loans offering favorable terms and lower down payments for qualified businesses."
      heroImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop"
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
    />
  );
}