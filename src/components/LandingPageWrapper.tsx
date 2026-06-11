'use client';

import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';

export default function LandingPageWrapper({ children }: { children: React.ReactNode }) {
    const { i18n } = useTranslation();
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (wrapperRef.current) {
            wrapperRef.current.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
        }
    }, [i18n.language]);

    return (
        <div ref={wrapperRef} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
            {children}
        </div>
    );
}