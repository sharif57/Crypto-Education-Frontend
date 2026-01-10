import AIAssistantSection from "@/components/ai-assistant-section";
// import MobileShowcase from "@/components/app-showcase";
import Everyone from "@/components/everyone";
import Faq from "@/components/faq";
// import FeaturesSection from "@/components/features-section";
import Hero from "@/components/hero";
// import Banner from "@/components/hero-banner";
import MasterAi from "@/components/master-ai";
// import MasterClass from "@/components/master-class";
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
      {/* <MasterClass /> */}
      <AIAssistantSection></AIAssistantSection>
      {/* <FeaturesSection /> */}
      <PricingSection />
      <MasterAi />
      <TestimonialsSection />
      <Everyone />
      <Faq />
      <Transform />
      <Trainer />
      {/* <MobileShowcase /> */}
    </div>
  );
}
