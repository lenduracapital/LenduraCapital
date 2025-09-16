/**
 * Example Usage Guide for the 5 Essential SEO Components
 * 
 * This file demonstrates how to use the newly created components
 * in your solutions and industry pages. Copy these examples and
 * adapt them to your specific needs.
 */

import React from 'react';
import Layout, { SolutionLayout, IndustryLayout } from '@/components/Layout';
import Hero from '@/components/Hero';
import CTAButton, { ApplyNowButton, CallNowButton } from '@/components/CTAButton';
import FAQAccordion, { commonBusinessFundingFAQs, createFAQItem } from '@/components/FAQAccordion';
import BenefitList, { FeatureList, ProcessSteps, KeyPoints, commonBusinessFundingBenefits, quickApprovalProcess } from '@/components/BenefitList';

// Example 1: Complete Solution Page using all components
export function ExampleSolutionPage() {
  const termLoansFAQs = [
    createFAQItem(
      "What are business term loans?",
      "Business term loans provide a lump sum of capital that you repay over a fixed period with regular payments. They're ideal for major purchases, expansion, or working capital needs."
    ),
    createFAQItem(
      "How long does approval take?",
      "Most term loan applications are approved within 24-48 hours. Once approved, funding typically arrives within 1-3 business days."
    ),
    ...commonBusinessFundingFAQs.slice(0, 3) // Add 3 more common FAQs
  ];

  const termLoanBenefits = [
    "Fixed interest rates and predictable payments",
    "Funding amounts from $10K to $750K",
    "Terms from 6 months to 5 years",
    "Use funds for any business purpose",
    "No collateral required for most loans",
    "Credit scores as low as 500 accepted"
  ];

  return (
    <SolutionLayout
      title="Business Term Loans | Fast Approval & Competitive Rates | Lendura Capital"
      description="Get business term loans from $10K-$750K with competitive rates and fast approval. Fixed payments, flexible terms, and no collateral required. Apply online today."
      canonical="/solutions/term-loans"
      solutionName="Business Term Loans"
    >
      {/* Hero Section with Breadcrumbs */}
      <Hero
        title="Business Term Loans"
        description="Get the capital you need to grow your business with competitive fixed-rate term loans. Fast approval, flexible terms, and funding from $10K to $750K."
        backgroundImage="/attached_assets/termloans.jpg"
        breadcrumbs={[
          { label: "Solutions", href: "/solutions" },
          { label: "Term Loans", href: "/solutions/term-loans" }
        ]}
        ctaText="Get Pre-Approved Today"
        size="large"
      />

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeatureList
            title="Why Choose Our Term Loans?"
            benefits={termLoanBenefits}
            columns={2}
            size="md"
          />
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProcessSteps
            title="Simple Application Process"
            benefits={quickApprovalProcess}
            size="lg"
          />
        </div>
      </section>

      {/* FAQ Section with Auto-Generated Schema */}
      <FAQAccordion
        faqs={termLoansFAQs}
        title="Term Loan Frequently Asked Questions"
        generateSchema={true}
        defaultExpanded={0}
      />

      {/* CTA Section */}
      <section className="py-16 bg-[#193a59] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Get pre-approved for your term loan in minutes</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ApplyNowButton size="lg" />
            <CallNowButton size="lg" />
          </div>
        </div>
      </section>
    </SolutionLayout>
  );
}

// Example 2: Industry Page Layout
export function ExampleIndustryPage() {
  const constructionBenefits = [
    "Equipment financing for heavy machinery",
    "Working capital for large projects",
    "Invoice factoring for cash flow",
    "Contractor-specific lending solutions",
    "Bonding assistance available"
  ];

  const constructionFAQs = [
    createFAQItem(
      "What types of construction businesses do you fund?",
      "We fund all types of construction businesses including general contractors, specialty contractors, residential builders, commercial construction, and heavy civil construction companies."
    ),
    createFAQItem(
      "Can I get funding for equipment purchases?",
      "Yes, we offer specialized equipment financing for construction machinery, tools, vehicles, and other business equipment with competitive rates and terms."
    )
  ];

  return (
    <IndustryLayout
      title="Construction Industry Funding | Equipment & Working Capital | Lendura Capital"
      description="Specialized funding solutions for construction businesses. Equipment financing, working capital, and project funding with fast approval. Serving contractors nationwide."
      canonical="/industries/construction"
      industryName="Construction"
    >
      <Hero
        title="Construction Industry Funding"
        description="Specialized financing solutions for construction businesses. From equipment purchases to project funding, we understand your unique needs."
        backgroundImage="/attached_assets/construction.jpg"
        breadcrumbs={[
          { label: "Industries", href: "/who-we-fund" },
          { label: "Construction", href: "/industries/construction" }
        ]}
        alignment="center"
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <KeyPoints
            title="Construction Funding Solutions"
            benefits={constructionBenefits}
            iconColor="primary"
          />
        </div>
      </section>

      <FAQAccordion faqs={constructionFAQs} />
    </IndustryLayout>
  );
}

// Example 3: Custom CTA Buttons
export function ExampleCTAUsage() {
  return (
    <div className="space-y-4">
      {/* Primary CTA */}
      <CTAButton variant="primary" size="lg">
        Learn More About Funding
      </CTAButton>

      {/* Apply Now Button */}
      <ApplyNowButton size="lg" />

      {/* Call Button */}
      <CallNowButton />

      {/* Custom Action Button */}
      <CTAButton
        variant="secondary"
        href="/solutions"
        size="md"
        icon="arrow"
      >
        View All Solutions
      </CTAButton>

      {/* Custom onClick Handler */}
      <CTAButton
        variant="apply-now"
        onClick={() => {
          // Custom tracking or action
          console.log('Custom CTA clicked');
          window.open("https://form.jotform.com/251965461165159", "_blank");
        }}
      >
        Custom Apply Action
      </CTAButton>
    </div>
  );
}

// Example 4: Benefit List Variants
export function ExampleBenefitListUsage() {
  const features = ["Fast approval", "No collateral", "Competitive rates"];
  const steps = ["Apply online", "Get approved", "Receive funding"];
  const advantages = ["Better rates", "Faster service", "Expert support"];

  return (
    <div className="space-y-16">
      {/* Feature List with Checkmarks */}
      <FeatureList
        title="Key Features"
        benefits={features}
        columns={3}
      />

      {/* Process Steps with Numbers */}
      <ProcessSteps
        title="How It Works"
        benefits={steps}
      />

      {/* Key Points with Arrows */}
      <KeyPoints
        title="Our Advantages"
        benefits={advantages}
        columns={2}
      />

      {/* Custom Variant */}
      <BenefitList
        title="Why Choose Us"
        benefits={commonBusinessFundingBenefits}
        variant="stars"
        columns={2}
        iconColor="primary"
        size="lg"
      />
    </div>
  );
}

export default {
  ExampleSolutionPage,
  ExampleIndustryPage,
  ExampleCTAUsage,
  ExampleBenefitListUsage
};