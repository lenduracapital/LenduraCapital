import SolutionDetailTemplate from "@/components/solution-detail-template";

export default function InvoiceFactoringDetail() {
  return (
    <SolutionDetailTemplate
      title="Invoice Factoring"
      description="Convert outstanding invoices into immediate cash flow by selling them at a discount to improve liquidity."
      heroImage="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=600&fit=crop"
      contentImage="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop"
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
    />
  );
}