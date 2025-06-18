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
      howItWorks={{
        title: "How lines of credit work",
        items: [
          "Interest rates range from 8% - 25% based on creditworthiness and business profile",
          "Draw funds as needed up to your approved credit limit",
          "Interest-only payments during draw period, then principal + interest",
          "Revolving credit - repay and reuse funds multiple times",
          "Credit line approval within 2-5 business days",
          "Funding amounts range from $10,000 up to $500,000"
        ]
      }}
      ratesBasedOn={[
        "Average monthly revenue",
        "Time in business",
        "Personal and business credit scores",
        "Overall financial health and cash flow",
        "Industry and business model"
      ]}
      requiredDocuments={[
        "Completed application form",
        "6-12 months of business bank statements",
        "Personal credit authorization",
        "Business and personal tax returns",
        "Financial statements (P&L and balance sheet)"
      ]}
      askYourself={[
        "Do you have seasonal cash flow fluctuations that need bridging?",
        "How much working capital do you typically need access to?",
        "Can you qualify for traditional bank credit standards?"
      ]}
      goodToKnow={[
        "Lines of credit offer the most cost-effective financing for businesses that don't need funds immediately",
        "Perfect for managing seasonal cash flow gaps and unexpected business opportunities",
        "You only pay interest on the amount you actually draw, not the full credit line",
        "Establishes a long-term banking relationship and builds business credit"
      ]}
    />
  );
}