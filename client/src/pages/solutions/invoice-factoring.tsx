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
    />
  );
}