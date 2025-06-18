import AIAssistantSection from "@/components/ai-assistant-section";
import FeaturesSection from "@/components/features-section";
import Banner from "@/components/hero-banner";
import MasterClass from "@/components/master-class";
import React from "react";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <MasterClass />
      <AIAssistantSection></AIAssistantSection>
      <FeaturesSection/>
    </div>
  );
}
