import SolutionDetailTemplate from '@/components/solution-detail-template';

export default function MortgageFinancing() {
  return (
    <SolutionDetailTemplate 
      title="Mortgage Financing"
      subtitle="Competitive mortgage solutions for residential and commercial properties"
      description="Secure financing for your property investments with our comprehensive mortgage programs designed for business owners and real estate investors."
      heroImage="/api/placeholder/800/400"
      benefits={[
        "Competitive interest rates starting at 3.25%",
        "Flexible down payment options from 10-25%",
        "Terms up to 30 years for maximum cash flow",
        "Fast pre-approval in 24-48 hours",
        "Support for investment properties",
        "No prepayment penalties"
      ]}
      qualificationsList={[
        "Credit score of 620 or higher",
        "Debt-to-income ratio below 43%",
        "Stable employment history (2+ years)",
        "Down payment funds available",
        "Property appraisal required",
        "Income documentation"
      ]}
      idealFor={[
        "First-time homebuyers",
        "Real estate investors",
        "Business owners expanding",
        "Property refinancing",
        "Investment property purchases",
        "Commercial real estate acquisition"
      ]}
      processSteps={[
        "Submit mortgage application with required documents",
        "Property appraisal and income verification completed",
        "Final approval and loan terms finalized",
        "Closing scheduled and funds disbursed"
      ]}
      solutionType="mortgage-financing"
    />
  );
}