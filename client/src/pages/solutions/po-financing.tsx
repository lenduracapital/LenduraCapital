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
    />
  );
}