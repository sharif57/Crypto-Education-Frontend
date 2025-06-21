"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AIAssistantSection() {
  return (
    <section className="relative bg-[#1a1a1a] py-16 lg:py-24 overflow-hidden">
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Left Content - Text */}
          <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-medium leading-tight">
                <span className="text-white">Got Questions?</span>
                <br />
                <span className="text-white">Ask Our AI</span>
                <br />
                <span className="text-white">Learning Assistant</span>
              </h2>

              <p className="text-gray-300 text-lg sm:text-xl lg:text-xl leading-relaxed lg:w-2/3  mx-auto lg:mx-0">
                Instantly get answers about Web3, crypto, or any course topic —
                24/7, powered by AI
              </p>
            </div>

            <div className="flex justify-center lg:justify-start">
              <Link href="/chat">
                <Button
                  size="lg"
                  className="bg-text cursor-pointer text-[#224443] font-medium px-8 py-4 rounded-full text-lg transition-all duration-300 shadow-lg shadow-cyan-400/25 hover:shadow-cyan-400/40 group"
                >
                  Ask the AI Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Phone Mockup with AI Robot */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <Image
              src="/images/Group 471.png"
              alt="Masterclass"
              width={1000}
              height={1000}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
