import SolutionDetailTemplate from "@/components/solution-detail-template";

export default function TermLoansDetail() {
  return (
    <SolutionDetailTemplate
      title="Term Loans"
      description="Traditional fixed-term business loans with competitive rates and flexible repayment terms for various business needs."
      heroImage="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop"
      contentImage="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop"
      features={[
        "$10K - $5M funding available",
        "12-60 month repayment terms",
        "Fixed or variable interest rates",
        "Predictable monthly payments",
        "No prepayment penalties",
        "Fast approval process"
      ]}
      perfectFor={[
        "Equipment purchases",
        "Business expansion", 
        "Working capital needs",
        "Debt consolidation"
      ]}
      qualificationRequirements={[
        "Minimum 6 months in business",
        "$10,000+ monthly revenue",
        "Personal credit score 550+",
        "No recent bankruptcies"
      ]}
    />
  );
}