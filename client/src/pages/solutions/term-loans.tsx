import SolutionDetailTemplate from "@/components/solution-detail-template";
import termLoanImage from "@assets/termloans.jpg";

export default function TermLoansDetail() {
  return (
    <SolutionDetailTemplate
      slug="term-loans"
      title="Term Loans"
      description="Traditional fixed-term business loans with competitive rates and flexible repayment terms for various business needs."
      heroImage={termLoanImage}
      contentImage={termLoanImage}
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
      howItWorks={{
        title: "How term loans work",
        items: [
          "Interest rates range from 6% - 35% based on creditworthiness and business profile",
          "Repayment can be made on Daily, Weekly, or Monthly payment schedules",
          "Repayment terms range from 12 months up to 60 months",
          "Funds can be sent in as quick as one business day after approval",
          "Funding amounts range from $10,000 up to $5,000,000",
          "Fixed monthly payments make budgeting predictable and manageable"
        ]
      }}
      ratesBasedOn={[
        "Average monthly revenue",
        "Time in business",
        "Credit profile and score",
        "Overall financial health and profitability",
        "Industry type and risk assessment",
        "Loan amount and term length"
      ]}
      requiredDocuments={[
        "Completed application form",
        "3-6 months of business bank statements",
        "Personal credit authorization",
        "Business tax returns (if available)",
        "Proof of business ownership and registration",
        "Financial statements (P&L and balance sheet if available)"
      ]}
      askYourself={[
        "Do you have any existing debt on your balance sheet? If yes, what are the balances owed and who are they owed to?",
        "How do you plan on using the funding for your business growth?",
        "How quickly do you need the funding to be available?",
        "What monthly payment amount fits comfortably within your cash flow?"
      ]}
      goodToKnow={[
        "Term loans provide the most predictable payment structure with fixed monthly amounts",
        "These loans typically offer the lowest cost of capital compared to other funding options",
        "Perfect for businesses with steady revenue and good credit seeking long-term financing",
        "Can be used for any business purpose including expansion, equipment, or working capital",
        "Early payoff options available with most lenders to save on interest costs",
        "Great option for businesses seeking to build commercial credit history"
      ]}
      faq={[
        {
          question: "What can I use a term loan for?",
          answer: "Term loans can be used for any business purpose including equipment purchases, inventory, working capital, expansion, debt consolidation, or major business investments."
        },
        {
          question: "What are the qualification requirements?",
          answer: "Typically requires a minimum credit score of 550+, at least 6 months in business, and monthly revenue of $10,000+. We also consider cash flow, business history, and overall financial health."
        },
        {
          question: "How quickly can I get funded?",
          answer: "Most applications are approved within 24-48 hours, and funds are typically available within 2-3 business days after approval and document completion."
        },
        {
          question: "Are there prepayment penalties?",
          answer: "Most of our term loan products do not have prepayment penalties, allowing you to pay off your loan early without additional fees. Specific terms vary by lender."
        },
        {
          question: "What interest rates can I expect?",
          answer: "Interest rates vary based on your credit profile, business financials, and loan terms. We work with multiple lenders to find you the most competitive rates available for your situation."
        },
        {
          question: "Do I need collateral?",
          answer: "Collateral requirements depend on the loan amount and your business profile. Some term loans are unsecured, while larger amounts may require business assets or personal guarantees."
        }
      ]}
      comparison={{
        traditional: [
          "30-90 day approval process for term loans",
          "Extensive financial documentation required",
          "High credit score requirements (700+)",
          "Personal collateral often required",
          "Limited to established businesses (3+ years)"
        ],
        fundtek: [
          "24-48 hour term loan approval",
          "Basic business documentation only",
          "Flexible credit requirements (550+)",
          "Unsecured options available",
          "6 months in business minimum"
        ]
      }}
    />
  );
}