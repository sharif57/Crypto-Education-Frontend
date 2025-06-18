import AIAssistantSection from "@/components/ai-assistant-section";
import Banner from "@/components/hero-banner";
import MasterClass from "@/components/master-class";
import React from "react";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <MasterClass />
      <AIAssistantSection></AIAssistantSection>
    </div>
  );
}
