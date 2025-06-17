import SolutionDetailTemplate from "@/components/solution-detail-template";

export default function LinesOfCreditDetail() {
  return (
    <SolutionDetailTemplate
      title="Lines of Credit"
      description="Revolving credit lines that provide flexible access to capital when you need it most for operational expenses."
      heroImage="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&h=600&fit=crop"
      contentImage="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop"
      features={[
        "$25K - $1M available credit",
        "Draw funds as needed",
        "Pay interest only on used funds",
        "Flexible repayment terms",
        "Revolving credit facility",
        "Quick access to funds"
      ]}
      perfectFor={[
        "Managing cash flow gaps",
        "Seasonal businesses",
        "Inventory purchases",
        "Emergency expenses"
      ]}
      qualificationRequirements={[
        "Minimum 12 months in business",
        "$15,000+ monthly revenue",
        "Personal credit score 600+",
        "Strong business cash flow"
      ]}
    />
  );
}