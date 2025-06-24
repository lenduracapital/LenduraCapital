import SolutionDetailTemplate from '../components/solution-detail-template';
import heroImage from '@assets/download (2)_1750787760177.jpg';

export default function DebtConsolidationPage() {
  // Using base64 embedded image to guarantee display
  const contentImage = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAGQAeADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigAooooAKKKKACnUtJSigD//Z";
  
  return (
    <SolutionDetailTemplate
      title="Debt Consolidation"
      description="Consolidate multiple business debts into one manageable payment with better terms and lower interest rates to improve your cash flow."
      heroImage={heroImage}
      contentImage={contentImage}
      features={[
        "Combine multiple debts into one payment",
        "Potentially lower interest rates",
        "Simplified debt management",
        "Improved monthly cash flow",
        "Faster payoff timeline",
        "Reduced stress and complexity"
      ]}
      perfectFor={[
        "Businesses with multiple high-interest debts",
        "Companies struggling with complex payment schedules", 
        "Organizations wanting to improve cash flow",
        "Businesses looking to simplify financial management",
        "Companies with good credit seeking better terms",
        "Businesses ready to take control of their debt"
      ]}
      qualificationRequirements={[
        "Minimum 600 credit score",
        "At least 12 months in business",
        "Monthly revenue of $15,000+",
        "Existing business debts to consolidate",
        "Demonstrable ability to service new payment",
        "Clean business banking history"
      ]}
      approvalTime={{
        label: "Typical approval time",
        duration: "2-5 business days"
      }}
      howItWorks={{
        title: "Debt Consolidation Process",
        items: [
          "Complete comprehensive debt analysis",
          "Review all existing business obligations", 
          "Calculate potential savings and new terms",
          "Submit consolidation application with documentation",
          "Receive approval and new loan terms",
          "Pay off existing debts with new consolidated loan",
          "Begin simplified single monthly payment"
        ]
      }}
      ratesBasedOn={[
        "Business credit score and history",
        "Total debt amount being consolidated",
        "Time in business and revenue stability",
        "Industry type and risk assessment",
        "Existing debt payment history",
        "Available collateral or security"
      ]}
      requiredDocuments={[
        "Complete list of existing business debts",
        "Business financial statements (12 months)",
        "Bank statements (6 months)",
        "Business tax returns (2 years)",
        "Current debt payment schedules",
        "Business registration and licenses"
      ]}
      askYourself={[
        "Are multiple debt payments creating cash flow challenges?",
        "Could lower interest rates significantly reduce costs?", 
        "Would simplified payments improve business operations?",
        "Is debt complexity affecting business decisions?",
        "Could consolidation free up working capital?",
        "Are current payment terms unsustainable?"
      ]}
      goodToKnow={[
        "Consolidation can improve credit utilization ratios",
        "Single payment reduces administrative overhead",
        "May qualify for better terms with improved credit",
        "Can free up credit lines for business growth",
        "Potential tax advantages with business interest",
        "Professional guidance available throughout process"
      ]}
      faq={[
        {
          question: "What types of business debts can be consolidated?",
          answer: "Most business debts including credit cards, merchant cash advances, equipment loans, lines of credit, and other business obligations can be consolidated into a single payment."
        },
        {
          question: "Will debt consolidation hurt my business credit?",
          answer: "Initially there may be a small impact from the credit inquiry, but consolidation often improves credit scores long-term by reducing credit utilization and ensuring consistent payments."
        },
        {
          question: "How much can I save with debt consolidation?",
          answer: "Savings vary based on current rates and terms, but businesses typically save 20-40% on monthly payments and significant amounts in total interest over the loan term."
        },
        {
          question: "Can I consolidate debts from multiple lenders?",
          answer: "Yes, debt consolidation is designed to combine obligations from various lenders into one manageable loan with a single monthly payment."
        },
        {
          question: "What happens to my existing credit lines?",
          answer: "Paid-off credit lines typically remain open, potentially improving your credit utilization ratio and maintaining available credit for future business needs."
        },
        {
          question: "Is there a minimum debt amount required?",
          answer: "Most lenders require at least $25,000 in existing business debt to make consolidation worthwhile, though this varies by lender and situation."
        }
      ]}
    />
  );
}