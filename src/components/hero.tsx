'use client';
import { ArrowRight } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useUserProfileQuery } from "@/Redux/feature/userSlice";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";

const SeraUIHero = () => {
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
        <div className="w-full  bg-gradient-to-b max-h-[800px]  from-[#326866] to-[#1B1B1B]">
            <main className="relative z-10 pt-[80px] pb-14">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28">

                    {/* Top Pill */}
                    {/* <div className="flex justify-center mb-8 ">
                        <a
                            href="#"
                            className="
                inline-flex items-center gap-3
                rounded-full px-2 py-2
                bg-gradient-to-r from-[#050808] to-[#5FBCBA]
                border-2 border-[#B4B4B4] 
                backdrop-blur
                hover:opacity-90 transition-all
              "
                        >
                            <Badge
                                variant="secondary"
                                className="
                  bg-gradient-to-r from-[#85dfdd] to-[#296361]
                  text-white border-0 rounded-full px-3 py-1
                "
                            >
                                New
                            </Badge>

                            <span className="text-white text-sm sm:text-base hidden sm:inline">
                                The new way to learn Crypto
                            </span>

                            <ArrowRight className="w-4 h-4 text-white/80" />
                        </a>
                    </div> */}
                    <div className="flex justify-center mb-8 px-4">
                        <a
                            href="#"
                            className="
      inline-flex items-center gap-2 sm:gap-3
      rounded-full
      px-3 py-2 sm:px-4
      bg-gradient-to-r from-[#050808] to-[#5FBCBA]
      border border-[#B4B4B4]
      backdrop-blur-md
      transition-all duration-300
      hover:opacity-90
      active:scale-95
      max-w-full
    "
                        >
                            {/* Badge */}
                            <Badge
                                variant="secondary"
                                className="
        bg-gradient-to-r from-[#85dfdd] to-[#296361]
        text-white
        border-0
        rounded-full
        px-3 py-1
        text-xs sm:text-sm
        whitespace-nowrap
      "
                            >
                                New
                            </Badge>

                            {/* Text */}
                            <span className="text-white text-xs sm:text-sm md:text-base truncate max-w-[180px] sm:max-w-none">
                                {t('hero_header')}
                            </span>

                            {/* Icon */}
                            <ArrowRight className="w-4 h-4 text-white/80 shrink-0" />
                        </a>
                    </div>


                    {/* Hero Content */}
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl leading-tight lg:text-7xl font-normal tracking-tight text-white mb-6">
                            {t('hero_title')}
                        </h1>

                        <p className="text-base sm:text-lg text-[#B4B4B4] max-w-3xl mx-auto mb-10">
                            {t('hero_subtitle')}
                        </p>

                        <div className="flex justify-center">
                            <Button
                                size="lg"
                                onClick={handleStartLearning}
                                className="bg-[#62C1BF] hover:bg-[#52a9a7] cursor-pointer text-[#224443] font-medium !px-8 py-6 rounded-full text-lg transition-all duration-300 shadow-lg shadow-cyan-400/25 hover:shadow-cyan-400/40 group"
                            >
                                {t('hero_cta')}
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </Button>

                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default SeraUIHero;

