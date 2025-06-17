import SolutionDetailTemplate from "@/components/solution-detail-template";

export default function CreditServicesDetail() {
  return (
    <SolutionDetailTemplate
      title="Credit Services"
      description="Professional business credit building and repair services to improve your company's financial standing."
      heroImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=600&fit=crop"
      contentImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop"
      features={[
        "Credit analysis",
        "Score improvement",
        "Credit monitoring",
        "Expert guidance",
        "Business credit building",
        "Ongoing support"
      ]}
      perfectFor={[
        "New businesses",
        "Credit improvement",
        "Future funding prep",
        "Credit monitoring"
      ]}
      qualificationRequirements={[
        "Valid business entity",
        "Business bank account",
        "Committed to improvement",
        "Follow recommendations"
      ]}
    />
  );
}