'use client';
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useUserProfileQuery } from "@/Redux/feature/userSlice";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function Transform() {
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
        <div className="p-4">
            <section className="bg-[url('/images/transform.png')] max-w-7xl mx-auto bg-cover bg-center bg-no-repeat rounded-lg  border border-foreground">
                <div className="container mx-auto h-[400px] flex items-center">
                    {/* Overlay */}
                    {/* <div className="absolute inset-0 bg-black/60"></div> */}

                    {/* Content */}
                    <div className="relative z-10 max-w-xl px-4">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-white">
                            Transform Your <br /> Crypto Journey Today!
                        </h1>

                        <p className="mt-4 text-[#aca6a6] text-base sm:text-lg">
                            The crypto world is evolving fast. With TheClue, you&apos;ll not only
                            keep up but lead the way. This is more than just learning; it&apos;s an
                            exhilarating adventure into the future of finance.
                        </p>
                        <div className="mt-8 flex items-center gap-3">
                            <Button
                                size="lg"
                                onClick={handleStartLearning}
                                className="bg-[#62C1BF] hover:bg-[#52a9a7] cursor-pointer text-[#224443] font-medium !px-8 py-6 rounded-full text-lg transition-all duration-300 shadow-lg shadow-cyan-400/25 hover:shadow-cyan-400/40 group"
                            >
                                Get Started
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </Button>
                            <Button
                                size="lg"
                                onClick={handleStartLearning}
                                className="bg-white hover:bg-white/90 cursor-pointer text-[#224443] font-medium !px-8 py-6 rounded-full text-lg transition-all duration-300 shadow-lg shadow-cyan-400/25 hover:shadow-cyan-400/40 group"
                            >
                                Contact Us
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
