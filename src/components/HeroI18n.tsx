'use client';

import { useTranslation } from '@/hooks/useTranslation';
import React from 'react';

export default function HeroI18n() {
    const { t } = useTranslation();

    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

            <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                    {t('hero_title')}
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
                    {t('hero_subtitle')}
                </p>
                <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors duration-300 transform hover:scale-105">
                    {t('hero_cta')}
                </button>
            </div>
        </section>
    );
}
