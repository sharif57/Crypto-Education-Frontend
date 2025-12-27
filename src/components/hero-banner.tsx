'use client';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <section className="relative  bg-[#1a1a1a] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/images/BG.png"
          alt="Hero background"
          width={1920}
          height={1080}
          className="object-cover object w-full "
          priority
        />
      </div>

      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-6 lg:w-5/6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight text-white">
                Master Crypto & Web3 — The{" "}
                <span className="text-text">Smart</span> Way
              </h1>
              <p className="text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed mx-auto lg:mx-0">
                Learn with AI-powered tools, expert-made courses, and personal
                coaching — all in one global platform.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="https://apps.apple.com/gb/app/theclue-crypto-education/id6752632864" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="bg-text cursor-pointer hover:bg-text text-[#224443] font-medium px-8 py-6 rounded-full text-lg transition-all duration-300 shadow-lg shadow-cyan-400/25 hover:shadow-cyan-400/40"
                >
                  Download App
                </Button>
              </a>
              <Link href={'/courses'}>
                {" "}
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 w-full cursor-pointer border-gray-600 text-white hover:text-text hover:bg-gray-800 hover:border-gray-500 px-8 py-6 rounded-full text-lg font-medium transition-all duration-300"
                >
                  Start learning
                </Button>{" "}
              </Link>
            </div>
          </div>

          {/* Right Content - Mobile Mockups */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl">
              <Image
                src="/images/banner.png"
                alt="Phone Mockup"
                width={500}
                height={500}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
