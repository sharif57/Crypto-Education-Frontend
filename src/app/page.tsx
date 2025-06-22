import AIAssistantSection from "@/components/ai-assistant-section";
import MobileShowcase from "@/components/app-showcase";
import FeaturesSection from "@/components/features-section";
import Banner from "@/components/hero-banner";
import MasterClass from "@/components/master-class";
import PricingSection from "@/components/pricing-section";
import TestimonialsSection from "@/components/testimonials-section";
import React from "react";

export default function Home() {
  return (
    <div className="mt-[80px] lg:mt-[50px]">
      <Banner></Banner>
      <MasterClass />
      <AIAssistantSection></AIAssistantSection>
      <FeaturesSection/>
      <PricingSection/>
      <TestimonialsSection />   
      <MobileShowcase/>
    </div>
  );
}
