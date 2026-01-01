import AIAssistantSection from "@/components/ai-assistant-section";
import MobileShowcase from "@/components/app-showcase";
import Faq from "@/components/faq";
import FeaturesSection from "@/components/features-section";
import Hero from "@/components/hero";
import Banner from "@/components/hero-banner";
import MasterClass from "@/components/master-class";
import PricingSection from "@/components/pricing-section";
import TestimonialsSection from "@/components/testimonials-section";
import TheClue from "@/components/TheClue";
import Trainer from "@/components/Trainer";
import Transform from "@/components/Transform";
import React from "react";

export default function Home() {
  return (
    <div className="mt-[0px] lg:t-[50px]">
      {/* <Banner></Banner> */}
      <Hero />
      <TheClue />
      <MasterClass />
      <AIAssistantSection></AIAssistantSection>
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <Faq />
      <Transform />
      <Trainer />
      <MobileShowcase />
    </div>
  );
}
