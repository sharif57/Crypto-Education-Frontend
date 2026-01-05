'use client';
import Image from 'next/image'
import React, { useEffect } from 'react'
import { Button } from './ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { useUserProfileQuery } from '@/Redux/feature/userSlice';
import { ArrowRight } from 'lucide-react';

export default function Trainer() {

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

    const items = [
        {
            title: "All-in-one Platform – no other App needed",
            describe:
                "A comprehensive platform offering everything from educational videos to news and glossaries — all in one place, accessible anytime."
        },
        {
            title: "Personalized Learning Paths",
            describe:
                "Custom-tailored learning paths adapt to each user's experience level and goals, ensuring relevant and effective learning."
        },
        {
            title: "Real-Time Market Analysis",
            describe:
                "Live market insights empower users to make informed trading decisions by staying updated on current crypto trends."
        },
        {
            title: "Weekly Q&A, 24/7 AI Coaching & Telegram Trading Channel",
            describe:
                "Ongoing support through weekly Q&A sessions, round-the-clock AI coaching, and a dedicated Telegram trading channel for community interaction."
        },
        {
            title: "Trading Simulations",
            describe:
                "Simulated trading environments allow users to practice strategies without financial risk, helping to build real-world trading skills."
        },
        {
            title: "Portfolio Optimization Tool",
            describe:
                "An integrated tool that evaluates and optimizes users’ crypto portfolios to enhance performance and reduce risk."
        }
    ];


    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white flex flex-col lg:flex-row items-start justify-between gap-10 py-14">
            <div className=''>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-white text-start">
                    The Clue®: AI <br />
                    <span className="bg-gradient-to-r from-[#94ecea] to-[#307574] bg-clip-text text-transparent font-normal">
                        Crypto Trainer
                    </span>
                </h1>
                <div className='mt-4'>
                    <p className='w-3/4 text-sm font-normal text-[#aaa5a5]'>Your complete package for the entire Web3 and crypto sector. Enter our exciting future world.
                        Learn how to invest properly and sustainably, trade and get to know new business models. With the CryptoClue Premium App, you always have your web3 companion with you.</p>

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
                            AI Assistance
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
