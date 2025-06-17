import SolutionDetailTemplate from "@/components/solution-detail-template";

export default function MerchantCashAdvanceDetail() {
  return (
    <SolutionDetailTemplate
      title="Merchant Cash Advance"
      description="Quick access to working capital based on your future credit card sales with flexible repayment structure."
      heroImage="https://images.unsplash.com/photo-1560472355-536de3962603?w=1200&h=600&fit=crop"
      contentImage="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop"
      features={[
        "Fast approval process (24-48 hours)",
        "No fixed monthly payments",
        "Repayment tied to daily sales",
        "No collateral required",
        "Factor rates instead of interest rates",
        "Flexible repayment structure"
      ]}
      perfectFor={[
        "Retail businesses",
        "Restaurants and cafes",
        "Service providers",
        "Seasonal businesses"
      ]}
      qualificationRequirements={[
        "Minimum 6 months in business",
        "$5,000+ monthly credit card sales",
        "Personal credit score 500+",
        "No recent bankruptcies"
      ]}
    />
  );
}