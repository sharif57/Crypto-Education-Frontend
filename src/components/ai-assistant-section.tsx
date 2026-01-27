"use client";

import { Button } from "@/components/ui/button";
import { useUserProfileQuery } from "@/Redux/feature/userSlice";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AIAssistantSection() {
  const pathname = usePathname();
  const router = useRouter();

  const { data, isLoading } = useUserProfileQuery(undefined);
  const user = data?.data;

  const isSubscribed = user?.subscription && ["basic", "pro", "elite"].includes(user.subscription.toLowerCase());

  const handleStartLearning = () => {
    if (!isSubscribed) {
      if (pathname === "/") {
        const element = document.getElementById("pricing");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        router.push("/#pricing");
      }
    } else {
      // Subscribed → go to courses
      router.push("/chat");
    }
  };

  useEffect(() => {
    if (!isLoading && !isSubscribed && pathname.includes("#pricing")) {
      const element = document.getElementById("pricing");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [isLoading, isSubscribed, pathname]);

  if (isLoading) {
    return null;
  }
  return (
    <section className="relative bg-[#1a1a1a] py-16 lg:py-24 overflow-hidden">
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Left Content - Text */}
          <div
            className="
    order-2 lg:order-1
    space-y-10
    text-center lg:text-left
    max-w-6xl
    mx-auto
    px-4 sm:px-6 lg:px-0
  "
          >
            {/* Heading + Text */}
            <div className="space-y-6">
              <h2
                className="
        font-medium text-white leading-tight
        text-3xl sm:text-4xl md:text-5xl xl:text-6xl
      "
              >
                <span>Got Questions?</span>
                <br />
                <span>Ask Our AI</span>
                <br />
                <span>Learning Assistant</span>
              </h2>

              <p
                className="
        text-gray-300 leading-relaxed
        text-base sm:text-lg md:text-xl
        max-w-xl lg:max-w-2xl
        mx-auto lg:mx-0
      "
              >
                Instantly get answers about Web3, crypto, or any course topic —
                24/7, powered by AI
              </p>
            </div>

            {/* Button */}
            <div className="flex justify-center lg:justify-start">
              <Button
                onClick={handleStartLearning}
                size="lg"
                className="
        bg-text text-[#224443] font-medium cursor-pointer
        px-6 sm:px-8 py-4 sm:py-6
        rounded-full
        text-base sm:text-lg
        transition-all duration-300
        shadow-lg shadow-cyan-400/25
        hover:shadow-cyan-400/40
        group
      "
              >
                Ask the AI Now
                <ArrowRight
                  className="
          ml-2 w-4 h-4 sm:w-5 sm:h-5
          group-hover:translate-x-1
          transition-transform duration-300
        "
                />
              </Button>
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
