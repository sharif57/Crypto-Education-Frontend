import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Masterclass() {
  return (
    <section className="relative bg-[#1a1a1a] py-16 lg:py-24 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Left Content - Phone Mockup */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <Image
                src="/images/master.png"
                alt="Masterclass"
                width={600}
                height={600}
                className="object-contain"
              />
            </div>
          </div>

          {/* Right Content - Text */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-medium leading-tight">
                <span className="text-white">Masterclasses</span>
                <br />
                <span className="text-white">Learn from the</span>
                <br />
                <span className="text-text">Best</span>
              </h2>

              <p className="text-[#E0E0E0] text-lg sm:text-xl lg:text-2xl leading-relaxed  mx-auto lg:mx-0">
                Dive deep into curated lessons on Crypto, Blockchain, NFTs,
                DeFi, and the future of Web3 — perfect for beginners and
                advanced learners alike.
              </p>
            </div>

            <div className="flex justify-center lg:justify-start">
              <Link href={"/master-class"}>
                {" "}
                <Button
                  size="lg"
                  className="bg-text hover:bg-text cursor-pointer text-[#224443] font-medium px-20 py-6 rounded-full text-lg transition-all duration-300 shadow-lg shadow-cyan-400/25 hover:shadow-cyan-400/40 group"
                >
                  Start Learning
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
