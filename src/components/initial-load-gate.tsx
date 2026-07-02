'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const FIRST_LOAD_KEY = 'initial-loader-shown';
const FIRST_LOAD_DURATION_MS = 1200;

export default function InitialLoadGate({ children }: { children: React.ReactNode }) {
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const alreadyShown = sessionStorage.getItem(FIRST_LOAD_KEY) === 'true';

        if (alreadyShown) {
            setShowLoader(false);
            return;
        }

        sessionStorage.setItem(FIRST_LOAD_KEY, 'true');

        const timer = window.setTimeout(() => {
            setShowLoader(false);
        }, FIRST_LOAD_DURATION_MS);

        return () => window.clearTimeout(timer);
    }, []);

    return (
        <>
            {showLoader && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-b from-[#326866] to-[#1B1B1B]">
                    <div className="flex flex-col items-center justify-center gap-6">
                        {/* Logo with pulse ring */}
                        <div className="relative flex items-center justify-center">
                            <div className="absolute h-20 w-20 animate-ping rounded-full bg-[#62C1BF]/20" />
                            <div className="absolute h-20 w-20 rounded-full bg-[#62C1BF]/10" />
                            <Image
                                src="/images/logo.png"
                                alt="Logo"
                                width={58}
                                height={58}
                                className="relative z-10 animate-pulse"
                            />
                        </div>

                        {/* Spinner */}
                        {/* <div className="relative h-12 w-12">
                            <div className="absolute inset-0 rounded-full border-4 border-[#62C1BF]/20" />
                            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#62C1BF] border-r-[#62C1BF]/50" />
                        </div> */}

                        {/* Loading text with animated dots */}
                        <div className="flex items-center gap-1">
                            {/* <p className="text-sm font-medium tracking-wide text-[#BFE9E8]">
                                Loading website
                            </p> */}
                            {/* <span className="flex gap-0.5">
                                <span className="h-1 w-1 animate-bounce rounded-full bg-[#BFE9E8] [animation-delay:-0.3s]" />
                                <span className="h-1 w-1 animate-bounce rounded-full bg-[#BFE9E8] [animation-delay:-0.15s]" />
                                <span className="h-1 w-1 animate-bounce rounded-full bg-[#BFE9E8]" />
                            </span> */}
                        </div>
                    </div>
                </div>
            )}
            {children}
        </>
    );
}
