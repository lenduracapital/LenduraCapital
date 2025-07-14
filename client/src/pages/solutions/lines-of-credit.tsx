import SolutionDetailTemplate from "@/components/solution-detail-template";
import lineOfCreditImage from "@assets/pexels-shkrabaanthony-5816283_1752511864339.jpg";

export default function LinesOfCreditDetail() {
  return (
    <SolutionDetailTemplate
      title="Lines of Credit"
      description="Revolving credit lines that provide flexible access to capital when you need it most for operational expenses."
      heroImage={lineOfCreditImage}
      contentImage={lineOfCreditImage}
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
      faq={[
        {
          question: "How does a business line of credit work?",
          answer: "A business line of credit provides access to funds up to a predetermined limit. You can draw funds as needed, pay interest only on what you use, and repay to restore your available credit."
        },
        {
          question: "What's the difference between a line of credit and a term loan?",
          answer: "A line of credit is revolving credit you can use repeatedly, while a term loan provides a lump sum with fixed payments. Lines of credit offer more flexibility for ongoing working capital needs."
        },
        {
          question: "How much can I qualify for?",
          answer: "Business lines of credit typically range from $25,000 to $1,000,000. The amount depends on your business revenue, credit profile, and financial strength."
        },
        {
          question: "When do I need to repay the funds?",
          answer: "Most lines of credit have a draw period where you pay interest only, followed by a repayment period with principal and interest payments. Terms vary by lender."
        },
        {
          question: "What can I use line of credit funds for?",
          answer: "Line of credit funds can be used for working capital, inventory purchases, payroll, seasonal cash flow gaps, equipment purchases, or other business expenses."
        },
        {
          question: "Are there fees associated with a line of credit?",
          answer: "There may be origination fees, annual fees, or draw fees depending on the lender. We'll help you find options with the most favorable fee structure for your situation."
        }
      ]}
      comparison={{
        traditional: [
          "Complex credit line applications",
          "Annual fees and maintenance charges",
          "High revenue requirements ($1M+)",
          "Personal guarantees required",
          "Limited draw periods"
        ],
        fundtek: [
          "Simple online application",
          "Transparent fee structure",
          "Revenue requirements from $15K/month",
          "Flexible guarantee options",
          "Continuous revolving access"
        ]
      }}
    />
  );
}