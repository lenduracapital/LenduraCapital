import SolutionDetailTemplate from "@/components/solution-detail-template";
import poImage from "@assets/purchaseorderfinancing.jpg";

export default function POFinancingDetail() {
  return (
    <SolutionDetailTemplate
      slug="po-financing"
      title="Purchase Order Financing"
      description="Purchase Order financing helps businesses fulfill large orders by providing working capital to cover supplier costs upfront."
      heroImage={poImage}
      contentImage={poImage}
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
      faq={[
        {
          question: "How does purchase order financing work?",
          answer: "The lender pays your supplier directly based on confirmed purchase orders from creditworthy customers. You fulfill the order and get paid by your customer, then repay the lender."
        },
        {
          question: "What types of businesses use PO financing?",
          answer: "Distributors, importers, exporters, manufacturers, and resellers who have large orders but lack working capital to fulfill them. Common in retail, textiles, electronics, and consumer goods."
        },
        {
          question: "How much does PO financing cost?",
          answer: "Fees typically range from 2-6% of the purchase order value, depending on the deal size, customer creditworthiness, and transaction complexity."
        },
        {
          question: "What makes a good candidate for PO financing?",
          answer: "Businesses with confirmed orders from creditworthy customers, reliable suppliers, established industry relationships, and profit margins sufficient to cover financing costs."
        },
        {
          question: "How long does the PO financing process take?",
          answer: "Once approved, funding can typically be arranged within 1-2 weeks. Initial approval and setup may take 2-4 weeks for new relationships."
        },
        {
          question: "What happens if the customer doesn't pay?",
          answer: "The lender typically requires credit insurance or may provide non-recourse financing where they bear the customer credit risk. Terms vary by arrangement."
        }
      ]}
      comparison={{
        traditional: [
          "Banks don't fund purchase orders",
          "Require strong business credit",
          "Need extensive collateral",
          "Can't fund supplier costs",
          "Miss large order opportunities"
        ],
        lendura: [
          "Specialized PO financing",
          "Customer credit matters most",
          "PO serves as collateral",
          "Direct supplier payment",
          "Fulfill any size order"
        ]
      }}
    />
  );
}