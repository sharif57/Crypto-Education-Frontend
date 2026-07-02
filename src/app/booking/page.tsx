"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BookingPage() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 w-screen h-screen bg-[#1B1B1B] z-[9999] flex flex-col">
      {/* Top Header Bar */}
      <div className="w-full flex items-center justify-between p-4 bg-[#141414] border-b border-white/10">
        <button
          onClick={() => router.push("/pricing")}
          className="flex items-center gap-2 text-white hover:text-[#62C1BF] transition-colors cursor-pointer bg-transparent border-none text-base font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Pricing</span>
        </button>
        <span className="text-sm text-gray-400">Book your Executive Call</span>
      </div>

      {/* Full Screen Iframe Container */}
      <div className="flex-1 w-full h-full bg-[#1B1B1B]">
        <iframe
          src="https://calendly.com/creibchen/executive-call-corporate-solutions?month=2026-07"
          className="w-full h-full border-none"
          title="Executive Call Booking"
          allow="camera; microphone; autoplay; encrypted-media;"
        />
      </div>
    </div>
  );
}
