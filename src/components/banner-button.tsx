import { useTranslation } from '@/hooks/useTranslation';
import { useUserProfileQuery } from '@/Redux/feature/userSlice';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

export default function BannerButton() {
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
        <div>
            <Button
                size="lg"
                onClick={handleStartLearning}
                className="bg-[#62C1BF] hover:bg-[#52a9a7] cursor-pointer text-[#224443] font-medium !px-8 py-6 rounded-full text-lg transition-all duration-300 shadow-lg shadow-cyan-400/25 hover:shadow-cyan-400/40 group"
            >
                {t('hero_cta')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>

        </div>
    )
}
