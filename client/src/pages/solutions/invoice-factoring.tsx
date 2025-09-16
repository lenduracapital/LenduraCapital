import SolutionDetailTemplate from "@/components/solution-detail-template";
import invoiceImage from "@assets/invoicefactoring.jpg";

export default function InvoiceFactoringDetail() {
  return (
    <SolutionDetailTemplate
      slug="invoice-factoring"
      title="Invoice Factoring"
      description="Convert outstanding invoices into immediate cash flow by selling them at a discount to improve liquidity."
      heroImage={invoiceImage}
      contentImage={invoiceImage}
      features={[
        "80-90% advance rate",
        "24-48 hour funding",
        "No long-term commitment",
        "Improve cash flow",
        "Credit protection available",
        "Online account management"
      ]}
      perfectFor={[
        "B2B businesses",
        "Staffing companies",
        "Manufacturing",
        "Transportation"
      ]}
      qualificationRequirements={[
        "Minimum 3 months in business",
        "B2B invoicing customers",
        "Creditworthy customers",
        "Clean invoicing process"
      ]}
      howItWorks={{
        title: "How invoice factoring works",
        items: [
          "Factor rates range from 1% - 5% of invoice value depending on terms",
          "Receive 80-90% advance on approved invoices immediately",
          "Factor company collects payment directly from your customers",
          "Receive remaining balance minus fees once customer pays",
          "Can factor individual invoices or ongoing receivables",
          "Funding amounts based on monthly invoicing volume"
        ]
      }}
      ratesBasedOn={[
        "Customer creditworthiness",
        "Invoice payment terms",
        "Monthly invoicing volume",
        "Industry type",
        "Length of relationship"
      ]}
      requiredDocuments={[
        "Sample invoices and aging reports",
        "Customer list and credit information",
        "3-6 months of business bank statements",
        "Accounts receivable aging report",
        "Business formation documents"
      ]}
      askYourself={[
        "Do your customers typically pay invoices within 30-90 days?",
        "Are your customers creditworthy businesses or government entities?",
        "Would faster access to cash improve your business operations?"
      ]}
      goodToKnow={[
        "Invoice factoring is not a loan - you're selling your receivables",
        "Your customers will know you're factoring as they pay the factor company",
        "Great solution for businesses with long payment cycles",
        "Can improve cash flow without taking on additional debt",
        "Factor company may provide credit protection and collection services"
      ]}
      faq={[
        {
          question: "How does invoice factoring work?",
          answer: "You sell your outstanding invoices to a factoring company at a discount. The factor advances you 80-90% immediately, then pays the remainder (minus their fee) when your customer pays the invoice."
        },
        {
          question: "What types of businesses use invoice factoring?",
          answer: "B2B companies with 30-90 day payment terms including staffing agencies, trucking companies, manufacturers, distributors, and professional service providers."
        },
        {
          question: "Will my customers know I'm factoring?",
          answer: "Yes, your customers will be directed to pay the factoring company instead of you. Most professional factors handle this transition smoothly and maintain good customer relationships."
        },
        {
          question: "How much does invoice factoring cost?",
          answer: "Factoring fees typically range from 1-5% of the invoice value, depending on your industry, invoice volume, customer creditworthiness, and payment terms."
        },
        {
          question: "Can I choose which invoices to factor?",
          answer: "Many factoring companies offer selective factoring, allowing you to choose which invoices to factor rather than requiring you to factor all receivables."
        },
        {
          question: "What happens if my customer doesn't pay?",
          answer: "This depends on whether you choose recourse or non-recourse factoring. With recourse factoring, you're responsible if the customer doesn't pay. Non-recourse protects you from customer default."
        }
      ]}
      comparison={{
        traditional: [
          "Banks don't offer factoring services",
          "Require waiting 30-90 days for payment",
          "No assistance with collections",
          "Credit based on your score",
          "Can't monetize receivables"
        ],
        fundtek: [
          "Specialized factoring solutions",
          "Get paid in 24-48 hours",
          "Factor handles collections",
          "Based on customer creditworthiness",
          "Turn invoices into instant cash"
        ]
      }}
    />
  );
}