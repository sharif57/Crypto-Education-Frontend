'use client';
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useUserProfileQuery } from "@/Redux/feature/userSlice";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function Transform() {
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
        <div className="px-4 sm:px-6 lg:px-8 py-6">
            <section
                className="
      relative
      bg-[url('/images/transform.png')]
      bg-cover bg-center bg-no-repeat
      rounded-2xl
      border border-foreground
      max-w-7xl mx-auto
      overflow-hidden
    "
            >
                {/* Background Overlay */}
                <div
                    className="
        absolute inset-0
        bg-black/70        /* 👈 Strong on mobile */
        sm:bg-black/60
        lg:bg-black/40     /* 👈 Light on desktop */
        z-0
      "
                />

                {/* Content */}
                <div
                    className="
        relative z-10
        flex items-center
        min-h-[320px] sm:min-h-[380px] lg:min-h-[420px]
        px-4 sm:px-8 lg:px-12
      "
                >
                    <div className="max-w-xl space-y-5">
                        <h1
                            className="
            text-white font-normal leading-tight
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl
          "
                        >
                            {t("transform_title")}
                        </h1>

                        <p
                            className="
            text-gray-200        /* 👈 brighter text */
            text-sm sm:text-base md:text-lg
            leading-relaxed
          "
                        >
                            {t("transform_description")}
                        </p>

                        <div
                            className="
            flex flex-col sm:flex-row
            gap-3 sm:gap-4
            pt-4
          "
                        >
                            <Button
                                size="lg"
                                onClick={handleStartLearning}
                                className="
              bg-[#62C1BF] hover:bg-[#52a9a7]
              text-[#224443] font-medium
              px-6 sm:px-8 py-4 sm:py-6
              rounded-full
              text-base sm:text-lg
              transition-all duration-300
              shadow-lg shadow-cyan-400/25
              hover:shadow-cyan-400/40
              group
            "
                            >
                                {t("hero_cta")}
                                <ArrowRight
                                    className="
                ml-2 w-4 h-4 sm:w-5 sm:h-5
                group-hover:translate-x-1
                transition-transform duration-300
              "
                                />
                            </Button>

                            <Button
                                size="lg"
                                onClick={() => router.push("/contact")}
                                className="
              bg-white hover:bg-white/90
              text-[#224443] font-medium
              px-6 sm:px-8 py-4 sm:py-6
              rounded-full
              text-base sm:text-lg
              transition-all duration-300
              shadow-lg shadow-cyan-400/25
              hover:shadow-cyan-400/40
            "
                            >
                                {t("footer_contact")}
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}
