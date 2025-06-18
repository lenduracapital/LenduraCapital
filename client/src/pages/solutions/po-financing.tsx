import SolutionDetailTemplate from "@/components/solution-detail-template";

export default function POFinancingDetail() {
  return (
    <SolutionDetailTemplate
      title="P.O. Financing"
      description="Purchase Order financing helps businesses fulfill large orders by providing working capital to cover supplier costs upfront."
      heroImage="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=600&fit=crop"
      contentImage="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop"
      features={[
        "Fulfill large orders",
        "No personal guarantees",
        "Quick turnaround",
        "Competitive rates",
        "Flexible terms",
        "Support growth"
      ]}
      perfectFor={[
        "Large order fulfillment",
        "Seasonal businesses",
        "Growing companies",
        "Export businesses"
      ]}
      qualificationRequirements={[
        "Established business",
        "Creditworthy customers",
        "Purchase orders in hand",
        "Proven track record"
      ]}
      howItWorks={{
        title: "How P.O. financing works",
        items: [
          "Financing rates range from 2% - 8% per month based on transaction terms",
          "Lender pays suppliers directly based on confirmed purchase orders",
          "You fulfill the order and deliver to your customer",
          "Customer pays lender directly or through you",
          "Can finance individual orders or ongoing purchase order flow",
          "Funding amounts range from $10,000 up to $10,000,000 per transaction"
        ]
      }}
      ratesBasedOn={[
        "End customer creditworthiness",
        "Purchase order terms and size",
        "Supplier reliability",
        "Industry and product type",
        "Transaction complexity"
      ]}
      requiredDocuments={[
        "Purchase order from creditworthy customer",
        "Supplier quotes and agreements",
        "Customer credit information",
        "Business financial statements",
        "Proof of business capability to fulfill orders"
      ]}
      askYourself={[
        "Do you have confirmed purchase orders from creditworthy customers?",
        "Can your suppliers deliver on time with third-party payment?",
        "Is the profit margin sufficient to cover financing costs?"
      ]}
      goodToKnow={[
        "P.O. financing allows you to take on larger orders than your cash flow permits",
        "Ideal for businesses with strong customer relationships but limited working capital",
        "Your customer's creditworthiness is more important than your own",
        "Can help you scale your business without giving up equity",
        "Perfect for import/export, distribution, and manufacturing businesses"
      ]}
    />
  );
}