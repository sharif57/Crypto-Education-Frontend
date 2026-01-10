'use client';

import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import type { i18n as I18nInstance } from 'i18next';
import { initI18n } from '@/i18n.config';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [i18n, setI18n] = useState<I18nInstance | null>(null);

  useEffect(() => {
    const i18nInstance = initI18n() as I18nInstance;
    setI18n(i18nInstance);
    setIsInitialized(true);
  }, []);

  if (!isInitialized || !i18n) {
    return <>{children}</>;
  }

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
}
