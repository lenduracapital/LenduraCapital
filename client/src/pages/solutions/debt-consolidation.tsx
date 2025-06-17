import SolutionDetailTemplate from "@/components/solution-detail-template";

export default function DebtConsolidationDetail() {
  return (
    <SolutionDetailTemplate
      title="Debt Consolidation"
      description="Combine multiple debts into a single payment with potentially lower rates and simplified management."
      heroImage="https://images.unsplash.com/photo-1554224154-26032fced8bd?w=1200&h=600&fit=crop"
      contentImage="https://images.unsplash.com/photo-1554224154-26032fced8bd?w=800&h=600&fit=crop"
      features={[
        "Single monthly payment",
        "Potentially lower rates",
        "Simplified management",
        "Improved cash flow",
        "Stress reduction",
        "Better organization"
      ]}
      perfectFor={[
        "Multiple high-interest debts",
        "Cash flow improvement",
        "Debt management",
        "Interest savings"
      ]}
      qualificationRequirements={[
        "Existing business debts",
        "Stable revenue stream",
        "Good payment history",
        "Minimum credit score"
      ]}
    />
  );
}