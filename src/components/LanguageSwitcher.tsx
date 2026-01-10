'use client';

import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('language', lang);
    };

    const currentLang = i18n.language;
    const langDisplay = currentLang === 'de' ? 'Deutsch' : 'English';

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#1c1c1c] to-[#2e2e2e] border border-[#404040] hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20 group">
                    <Globe className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                    <span className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors">{langDisplay}</span>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-gradient-to-b from-[#1c1c1c] to-[#2e2e2e] border border-[#404040]">
                <DropdownMenuItem
                    onClick={() => changeLanguage('en')}
                    className={`flex items-center justify-between px-4 py-2 cursor-pointer transition-all duration-200 ${currentLang === 'en'
                            ? 'bg-cyan-400/10 text-cyan-400'
                            : 'text-gray-300 hover:text-white hover:bg-[#404040]'
                        }`}
                >
                    <span className="font-medium">English</span>
                    {currentLang === 'en' && <Check className="w-4 h-4 text-cyan-400" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => changeLanguage('de')}
                    className={`flex items-center justify-between px-4 py-2 cursor-pointer transition-all duration-200 ${currentLang === 'de'
                            ? 'bg-cyan-400/10 text-cyan-400'
                            : 'text-gray-300 hover:text-white hover:bg-[#404040]'
                        }`}
                >
                    <span className="font-medium">Deutsch</span>
                    {currentLang === 'de' && <Check className="w-4 h-4 text-cyan-400" />}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
