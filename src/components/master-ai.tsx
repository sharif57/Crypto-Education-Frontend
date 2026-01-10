
"use client";

import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { usePathname, useRouter } from "next/navigation";
import { useUserProfileQuery } from "@/Redux/feature/userSlice";

export default function MasterAi() {
  const { t } = useTranslation();
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
        router.push("/#pri");
      }
    } else {
      // Subscribed → go to courses
      router.push("/courses");
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
    <section className="relative max-w-7xl mx-auto overflow-hidden rounded-3xl bg-gradient-to-r from-[#202020] to-[#307574] px-4 sm:px-6 lg:px-10">
      {/* Background Image */}
      <div
        className="
          absolute inset-0
          bg-[url('/images/masterclass.png')]
          bg-no-repeat
          bg-right
          bg-contain
          lg:bg-[length:520px]
          opacity-80
          pointer-events-none
        "
      />

      {/* Overlay (for better text contrast) */}
      <div className="absolute inset-0 bg-black/30 rounded-3xl" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl py-14 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <div className="text-center lg:text-left text-white space-y-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal leading-tight">
            {t('masterclass_title')}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#D1D1D1] max-w-xl mx-auto lg:mx-0 leading-relaxed">
            {t('masterclass_description')}
          </p>

          <div className="pt-2">
            <Button
              size="lg"
              onClick={handleStartLearning}
              className="
                bg-[#62C1BF] hover:bg-[#52a9a7] cursor-pointer text-[#224443]
                px-8 py-6 rounded-full text-base sm:text-lg font-medium
                transition-all duration-300
                shadow-lg shadow-cyan-400/30
                hover:shadow-cyan-400/50
                hover:scale-105
              "
            >
              {t('masterclass_button')}
            </Button>
          </div>
        </div>

        {/* Right Spacer (keeps image space on desktop) */}
        <div className="hidden lg:block" />
      </div>
    </section>
  );
}
