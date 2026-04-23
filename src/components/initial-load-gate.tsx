'use client';

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
                    <div className="flex flex-col items-center justify-center gap-4">
                        <div className="h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-[#62C1BF]" />
                        <p className="text-sm font-medium tracking-wide text-[#BFE9E8]">Loading website...</p>
                    </div>
                </div>
            )}
            {children}
        </>
    );
}
