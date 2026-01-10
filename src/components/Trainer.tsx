'use client';
import Image from 'next/image'
import React, { useEffect } from 'react'
import { Button } from './ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { useUserProfileQuery } from '@/Redux/feature/userSlice';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function Trainer() {
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

    const items = [
        {
            title: t('trainer_feature_1_title'),
            describe: t('trainer_feature_1_desc')
        },
        {
            title: t('trainer_feature_2_title'),
            describe: t('trainer_feature_2_desc')
        },
        {
            title: t('trainer_feature_3_title'),
            describe: t('trainer_feature_3_desc')
        },
        {
            title: t('trainer_feature_4_title'),
            describe: t('trainer_feature_4_desc')
        },
        {
            title: t('trainer_feature_5_title'),
            describe: t('trainer_feature_5_desc')
        },
        {
            title: t('trainer_feature_6_title'),
            describe: t('trainer_feature_6_desc')
        }
    ];



    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white flex flex-col lg:flex-row items-start justify-between gap-10 py-14">
            <div className=''>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-white text-start">
                    {t('trainer_title_part1')} <br />
                    <span className="bg-gradient-to-r from-[#94ecea] to-[#307574] bg-clip-text text-transparent font-normal">
                        {t('trainer_title_part2')}
                    </span>
                </h1>
                <div className='mt-4'>
                    <p className='w-3/4 text-sm font-normal text-[#aaa5a5]'>{t('trainer_description')}</p>

                    <div className='mt-8 space-y-4'>
                        {
                            items?.map((item, index) => (
                                <div key={index}>
                                    <h1 className='text-lg font-medium text-white'> {index + 1}. {item?.title}</h1>
                                    <p className='text-sm font-normal text-[#aaa5a5]'>{item?.describe}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className='pt-5'>
                        <Button
                            onClick={handleStartLearning}
                            size="lg"
                            className="bg-text cursor-pointer text-[#224443] font-medium !px-8 py-6 rounded-full text-lg transition-all duration-300 shadow-lg shadow-cyan-400/25 hover:shadow-cyan-400/40 group"
                        >
                            {t('trainer_button')}
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                    </div>
                </div>
            </div>
            <div>
                <Image src={'/images/tainner.png'} alt='Trainer' width={1000} height={1000} placeholder="blur" blurDataURL='  ' />
            </div>
        </div>
    )
}
