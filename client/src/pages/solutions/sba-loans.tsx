import SolutionDetailTemplate from "@/components/solution-detail-template";
import truckImage from "@assets/sbaloans.jpg";

export default function SBALoansDetail() {
  return (
    <SolutionDetailTemplate
      slug="sba-loans"
      title="SBA Loans"
      description="Government-backed loans offering favorable terms and lower down payments for qualified businesses."
      heroImage={truckImage}
      contentImage={truckImage}
      approvalTime={{
        label: "SBA Process",
        duration: "30-90 days"
      }}
      features={[
        "Lower down payments",
        "Competitive rates",
        "Longer repayment terms",
        "Government backed",
        "Up to $5M available",
        "Multiple loan programs"
      ]}
      perfectFor={[
        "Business expansion",
        "Real estate purchases",
        "Working capital",
        "Debt refinancing"
      ]}
      qualificationRequirements={[
        "Minimum 2 years in business",
        "Strong business credit",
        "Owner-occupied real estate",
        "Meet SBA size standards"
      ]}
      howItWorks={{
        title: "How SBA loans work",
        items: [
          "Interest rates typically 2-4% above prime rate with government backing",
          "SBA guarantees 75-90% of the loan, reducing lender risk",
          "Repayment terms up to 25 years for real estate, 10 years for equipment",
          "Lower down payment requirements (as low as 10%)",
          "Comprehensive application process including business plan",
          "Funding amounts range from $5,000 up to $5,000,000"
        ]
      }}
      ratesBasedOn={[
        "Prime rate plus margin",
        "Loan amount and term",
        "Business and personal credit",
        "Collateral and down payment",
        "Industry and business risk"
      ]}
      requiredDocuments={[
        "Comprehensive business plan",
        "3 years of business tax returns",
        "Personal tax returns",
        "Financial statements and projections",
        "Business license and formation documents",
        "Real estate documents if applicable"
      ]}
      askYourself={[
        "Do you qualify as a small business under SBA size standards?",
        "Do you have a comprehensive business plan and financial projections?",
        "Are you prepared for a longer application process (30-90 days)?"
      ]}
      goodToKnow={[
        "SBA loans offer some of the most favorable terms available to small businesses",
        "Longer application process but worth it for qualified businesses",
        "Can be used for real estate, equipment, working capital, and refinancing",
        "Requires personal guarantee from owners with 20% or more ownership",
        "Excellent for established businesses with strong financials and growth plans"
      ]}
      faq={[
        {
          question: "What is an SBA loan?",
          answer: "SBA loans are government-backed loans where the Small Business Administration guarantees 75-90% of the loan, allowing lenders to offer more favorable terms including lower interest rates and longer repayment periods."
        },
        {
          question: "How long does the SBA loan process take?",
          answer: "The SBA loan process typically takes 30-90 days from application to funding. This includes time for underwriting, SBA approval, and closing procedures."
        },
        {
          question: "What can I use SBA loan funds for?",
          answer: "SBA loans can be used for business expansion, real estate purchases, equipment financing, working capital, inventory, and debt refinancing. Funds cannot be used for speculation or investment purposes."
        },
        {
          question: "What are SBA size standards?",
          answer: "SBA size standards determine if your business qualifies as 'small' based on industry. Most service businesses must have fewer than $8M in average annual receipts, while manufacturing businesses typically must have fewer than 500 employees."
        },
        {
          question: "Do I need a down payment for an SBA loan?",
          answer: "Yes, SBA loans typically require a down payment of 10-15% for business acquisitions and 15-25% for real estate purchases. The exact amount depends on the loan program and use of funds."
        },
        {
          question: "What documents do I need for an SBA loan application?",
          answer: "Required documents include a comprehensive business plan, 3 years of tax returns, financial statements, cash flow projections, ownership information, and collateral documentation."
        }
      ]}
      comparison={{
        traditional: [
          "Traditional banks have limited SBA expertise",
          "Complex application without guidance",
          "May not offer all SBA programs",
          "Slow processing times",
          "Limited business support"
        ],
        fundtek: [
          "SBA loan specialists on staff",
          "Expert guidance through entire process",
          "Access to all SBA loan programs",
          "Streamlined 30-day processing",
          "Dedicated support throughout"
        ]
      }}
    />
  );
}