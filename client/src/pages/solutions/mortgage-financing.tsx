import SolutionDetailTemplate from '@/components/solution-detail-template';
import mortgageImage from "@assets/realestate.jpg";

export default function MortgageFinancing() {
  return (
    <SolutionDetailTemplate 
      slug="mortgage-financing"
      title="Mortgage Financing"
      description="Secure financing for your property investments with our comprehensive mortgage programs designed for business owners and real estate investors."
      heroImage={mortgageImage}
      contentImage={mortgageImage}
      features={[
        "Competitive interest rates starting at 3.25%",
        "Flexible down payment options from 10-25%",
        "Terms up to 30 years for maximum cash flow",
        "Fast pre-approval in 24-48 hours",
        "Support for investment properties",
        "No prepayment penalties"
      ]}
      perfectFor={[
        "First-time homebuyers",
        "Real estate investors",
        "Business owners expanding",
        "Property refinancing",
        "Investment property purchases",
        "Commercial real estate acquisition"
      ]}
      qualificationRequirements={[
        "Credit score of 620 or higher",
        "Debt-to-income ratio below 43%",
        "Stable employment history (2+ years)",
        "Down payment funds available",
        "Property appraisal required",
        "Income documentation"
      ]}
      approvalTime={{
        label: "Pre-Approval Time",
        duration: "24-48 hours"
      }}
      howItWorks={{
        title: "How Mortgage Financing Works",
        items: [
          "Submit mortgage application with required documents",
          "Property appraisal and income verification completed",
          "Final approval and loan terms finalized",
          "Closing scheduled and funds disbursed"
        ]
      }}
      faq={[
        {
          question: "What types of properties can I finance?",
          answer: "We offer financing for primary residences, investment properties, and commercial real estate including office buildings, retail spaces, and multi-family properties."
        },
        {
          question: "What down payment is required?",
          answer: "Down payment requirements typically range from 10-25% depending on the property type and loan program. Investment properties may require higher down payments."
        },
        {
          question: "How long does the approval process take?",
          answer: "Pre-approval can be completed in 24-48 hours. Full approval and closing typically takes 30-45 days depending on property type and documentation completeness."
        },
        {
          question: "What credit score do I need?",
          answer: "We typically require a minimum credit score of 620, though some programs may accept lower scores with compensating factors such as larger down payments."
        },
        {
          question: "Can I finance investment properties?",
          answer: "Yes, we offer financing for investment properties including single-family rentals, multi-family properties, and commercial real estate investments."
        },
        {
          question: "Are there prepayment penalties?",
          answer: "Most of our mortgage programs do not include prepayment penalties, allowing you to pay off your loan early without additional fees."
        }
      ]}
    />
  );
}