'use client';

import { useTranslation } from '@/hooks/useTranslation';

export function FooterI18n() {
  const { t } = useTranslation();

  const links = [
    { label: t('footer_about'), href: '/condition/about-us' },
    { label: t('footer_privacy'), href: '/condition/privacy' },
    { label: t('footer_terms'), href: '/condition/services' },
    { label: t('footer_contact'), href: '/contact' },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-blue-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2026 Crypto Education. {t('language')}: {t('english')} | {t('german')}</p>
        </div>
      </div>
    </footer>
  );
}
