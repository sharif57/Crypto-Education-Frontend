'use client';
import { ArrowRight } from "lucide-react";
import { Badge } from "./ui/badge";
import { useTranslation } from "@/hooks/useTranslation";
import BannerButton from "./banner-button";

const SeraUIHero = () => {
    const { t } = useTranslation();


    return (
        <div className="w-full  bg-gradient-to-b max-h-[800px] pt-[50px] lg:pt-[80px]  from-[#326866] to-[#1B1B1B]">
            <main className="relative z-10 ">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28">

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
                        <h1 className="text-4xl sm:text-5xl md:text-6xl leading-tight lg:text-6xl font-normal tracking-tight text-white mb-6">
                            {t('hero_title')}
                        </h1>

                        <p className="text-base sm:text-lg text-[#B4B4B4] max-w-3xl mx-auto mb-10">
                            {t('hero_subtitle')}
                        </p>

                        <div className="flex justify-center">
                            <BannerButton />
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default SeraUIHero;

