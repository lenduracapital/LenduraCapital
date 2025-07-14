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
      howItWorks={{
        title: "How funding works",
        items: [
          "Factor rate range: 15% – 49%; the advance is at a fixed rate, not an APR",
          "Repayment can be made on either a Daily, Weekly, Bi-Weekly, or Monthly payment",
          "Repayment terms range from 30 days up to 24 months",
          "Repayment can be made through ACH Debits or Credit Card Processing Holdbacks",
          "Funds can be sent in as quick as one business day",
          "Funding amounts range from $2,000 up to $2,000,000"
        ]
      }}
      ratesBasedOn={[
        "Average monthly revenue",
        "Time in business",
        "Credit profile",
        "Overall financial health / profitability",
        "Industry"
      ]}
      requiredDocuments={[
        "1-page data form (application)",
        "3-6 months of business bank statements",
        "Driver's license",
        "Voided check",
        "Additional stipulations may be requested, such as: proof of ownership, financials (P&L and balance sheet), tax returns, accounts receivable reports"
      ]}
      askYourself={[
        "Do you have any existing debt on your balance sheet? If yes, what are the balances owed and who are the balances owed to?",
        "How do you plan on using the funding?",
        "How quickly do you need funding?"
      ]}
      goodToKnow={[
        "Even if your credit score is low or you have negative financial history or the business is less than one year old, there are still funding options with a merchant cash advance",
        "We can consolidate existing merchant cash advances to lower payments and increase cash flow",
        "This is a fast and convenient process with minimal paperwork and same-day funding available",
        "When the balance is 50% paid, your business will be eligible for additional funding",
        "Great option of any business that is grossing $10,000 in revenue per month and has been in business for at least 6 months"
      ]}
      faq={[
        {
          question: "How does a merchant cash advance work?",
          answer: "A merchant cash advance provides upfront capital in exchange for a percentage of your future credit card sales. Repayment is automatic through daily credit card processing or ACH withdrawals."
        },
        {
          question: "What's the difference between factor rates and interest rates?",
          answer: "Factor rates are fixed costs (e.g., 1.15 means you pay back $1.15 for every $1 received). Unlike interest rates, factor rates don't compound over time and represent the total cost of the advance."
        },
        {
          question: "How quickly can I get funded?",
          answer: "Merchant cash advances offer some of the fastest funding available, often within 24-48 hours of approval. Same-day funding may be available in some cases."
        },
        {
          question: "What if my credit card sales are low some days?",
          answer: "Repayment adjusts automatically based on your daily sales volume. Lower sales days mean lower repayment amounts, providing built-in flexibility for seasonal businesses."
        },
        {
          question: "Can I get another advance before paying off the current one?",
          answer: "Many providers offer renewal options once you've paid down 50-70% of your current advance, allowing access to additional working capital."
        },
        {
          question: "What businesses qualify for merchant cash advances?",
          answer: "Retail businesses, restaurants, service providers, and any business that processes credit card sales regularly. Minimum requirements typically include $5,000+ monthly credit card volume."
        }
      ]}
      comparison={{
        traditional: [
          "Not available from traditional banks",
          "Banks require high credit scores",
          "Monthly fixed payment schedules",
          "Lengthy application process",
          "Collateral requirements"
        ],
        fundtek: [
          "Specialized MCA providers",
          "Credit scores from 500+",
          "Flexible daily/weekly payments",
          "24-hour approval and funding",
          "No collateral needed"
        ]
      }}
    />
  );
}