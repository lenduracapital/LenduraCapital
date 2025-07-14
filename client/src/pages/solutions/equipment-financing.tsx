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
      howItWorks={{
        title: "How equipment financing works",
        items: [
          "Interest rates range from 5% - 30% based on creditworthiness and equipment type",
          "Equipment serves as collateral, reducing lender risk",
          "Repayment terms range from 24 months up to 84 months",
          "Can finance new or used equipment up to 100% of purchase price",
          "Funds can be sent directly to equipment vendor",
          "Funding amounts range from $5,000 up to $5,000,000"
        ]
      }}
      ratesBasedOn={[
        "Equipment type and age",
        "Business credit profile",
        "Time in business",
        "Down payment amount",
        "Overall financial strength"
      ]}
      requiredDocuments={[
        "Equipment quote or invoice",
        "Completed application form",
        "3-6 months of business bank statements",
        "Personal credit authorization",
        "Business license and registration"
      ]}
      askYourself={[
        "What type of equipment do you need and what is the total cost?",
        "How will this equipment improve your business operations or revenue?",
        "Do you prefer to own the equipment or would leasing be better?"
      ]}
      goodToKnow={[
        "Equipment financing typically offers some of the most competitive rates available",
        "The equipment itself serves as collateral, making approval easier",
        "Can often finance 100% of equipment cost with no down payment required",
        "Perfect for businesses needing specific equipment to operate or grow",
        "May qualify for tax benefits including Section 179 deductions"
      ]}
      faq={[
        {
          question: "What types of equipment can I finance?",
          answer: "You can finance virtually any business equipment including machinery, vehicles, computers, medical equipment, restaurant equipment, construction equipment, and manufacturing tools."
        },
        {
          question: "Can I finance used equipment?",
          answer: "Yes, we can finance both new and used equipment. Used equipment typically requires the equipment to be less than 10 years old and in good working condition."
        },
        {
          question: "Do I need a down payment?",
          answer: "Many equipment financing programs offer 100% financing with no down payment required. However, some lenders may require 10-20% down depending on the equipment type and your credit profile."
        },
        {
          question: "How long are equipment financing terms?",
          answer: "Equipment financing terms typically range from 2-7 years (24-84 months) depending on the type of equipment and its expected useful life."
        },
        {
          question: "What happens if I can't make payments?",
          answer: "Since the equipment serves as collateral, the lender may repossess the equipment if payments are not made. We work with borrowers to find solutions before this happens."
        },
        {
          question: "Are there tax benefits to equipment financing?",
          answer: "Yes, equipment purchases may qualify for Section 179 tax deductions, allowing you to deduct the full purchase price in the year of purchase rather than depreciating over time."
        }
      ]}
      comparison={{
        traditional: [
          "Limited equipment financing options",
          "20-30% down payment required",
          "Slow approval for equipment loans",
          "Restrictive equipment categories",
          "Complex documentation process"
        ],
        fundtek: [
          "100% equipment financing available",
          "0% down payment options",
          "Same-day equipment loan approval",
          "Finance any business equipment",
          "Simple application process"
        ]
      }}
    />
  );
}