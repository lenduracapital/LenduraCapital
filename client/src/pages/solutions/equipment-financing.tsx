import SolutionDetailTemplate from "@/components/solution-detail-template";

export default function EquipmentFinancingDetail() {
  return (
    <SolutionDetailTemplate
      title="Equipment Financing"
      description="Specialized financing for purchasing or leasing business equipment, machinery, and vehicles."
      heroImage="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=600&fit=crop"
      contentImage="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop"
      features={[
        "100% financing available",
        "Equipment as collateral",
        "2-7 year terms",
        "Tax advantages",
        "Fast approval process",
        "Competitive rates"
      ]}
      perfectFor={[
        "Equipment purchases",
        "Machinery acquisition",
        "Vehicle financing",
        "Technology upgrades"
      ]}
      qualificationRequirements={[
        "Minimum 6 months in business",
        "$8,000+ monthly revenue",
        "Personal credit score 550+",
        "Equipment serves as collateral"
      ]}
    />
  );
}