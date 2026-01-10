'use client';

import { useTranslation } from '@/hooks/useTranslation';

export function TheClueI18n() {
  const { t } = useTranslation();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">
          {t('clue_title')}
        </h2>
        <p className="text-xl text-gray-600">
          {t('clue_description')}
        </p>
      </div>
      {/* Content goes here */}
    </section>
  );
}
