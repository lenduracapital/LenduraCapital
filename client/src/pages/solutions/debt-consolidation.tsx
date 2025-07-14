import SolutionDetailTemplate from "@/components/solution-detail-template";
import debtConsolidationImage from "@assets/download_1752510375017.jpg";

export default function DebtConsolidationDetail() {
  return (
    <SolutionDetailTemplate
      title="Debt Consolidation"
      description="Combine multiple debts into a single payment with potentially lower rates and simplified management."
      heroImage="https://images.unsplash.com/photo-1554224154-26032fced8bd?w=1200&h=600&fit=crop"
      contentImage={debtConsolidationImage}
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
      faq={[
        {
          question: "What types of debt can be consolidated?",
          answer: "Most business debts can be consolidated including merchant cash advances, business credit cards, equipment loans, lines of credit, and other business financing obligations."
        },
        {
          question: "Will debt consolidation hurt my credit score?",
          answer: "Initially there may be a small impact from credit inquiries, but consolidation often improves credit scores over time by reducing utilization ratios and simplifying payment management."
        },
        {
          question: "How much can I save with debt consolidation?",
          answer: "Savings vary based on your current debt structure, but many businesses reduce monthly payments by 20-40% and save significantly on interest over the loan term."
        },
        {
          question: "How long does the consolidation process take?",
          answer: "The debt consolidation process typically takes 2-4 weeks from application to funding, including time for underwriting and paying off existing creditors."
        },
        {
          question: "Can I consolidate if I have bad credit?",
          answer: "Yes, debt consolidation options are available for businesses with poor credit. While rates may be higher, consolidation can still provide payment relief and help rebuild credit."
        },
        {
          question: "What happens to my existing accounts after consolidation?",
          answer: "Existing debt accounts are paid off and closed as part of the consolidation process. You'll then have one new loan with a single monthly payment instead of multiple payments."
        }
      ]}
    />
  );
}