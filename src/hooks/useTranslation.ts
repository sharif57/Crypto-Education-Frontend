'use client';

import { useTranslation as useTranslationBase } from 'react-i18next';

export function useTranslation() {
  return useTranslationBase('common');
}
