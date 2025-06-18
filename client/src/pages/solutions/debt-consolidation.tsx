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
      howItWorks={{
        title: "How debt consolidation works",
        items: [
          "Interest rates range from 8% - 30% based on creditworthiness and risk",
          "Combine multiple debts into single monthly payment",
          "Potentially lower overall interest rate and monthly payment",
          "Simplify business finances with one lender relationship",
          "Can include credit cards, merchant advances, and other business debt",
          "Funding amounts range from $25,000 up to $2,000,000"
        ]
      }}
      ratesBasedOn={[
        "Current debt payment history",
        "Total debt amount and types",
        "Business credit profile",
        "Cash flow and ability to pay",
        "Time in business and stability"
      ]}
      requiredDocuments={[
        "List of all current business debts",
        "Payment history and statements",
        "6-12 months of business bank statements",
        "Financial statements showing cash flow",
        "Personal credit authorization"
      ]}
      askYourself={[
        "Are you struggling to manage multiple business debt payments?",
        "Would a lower monthly payment improve your cash flow?",
        "Do you have good payment history on existing debts?"
      ]}
      goodToKnow={[
        "Debt consolidation can significantly improve cash flow and reduce stress",
        "May help improve business credit by simplifying payment structure",
        "Can free up working capital for business growth and operations",
        "Important to avoid taking on new debt after consolidation",
        "Best for businesses with good payment history seeking simplification"
      ]}
    />
  );
}