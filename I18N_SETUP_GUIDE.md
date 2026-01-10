# Next.js Internationalization (i18n) Setup Guide - English to German

## Overview

This guide provides a complete setup for implementing internationalization in your Next.js application with English to German translation support.

## Installation

Dependencies installed:

```bash
npm install next-i18next i18next i18next-browser-languagedetector
npm install react-i18next
```

## Project Structure

```
your-project/
├── i18n.config.ts                          # Main i18n configuration
├── public/
│   └── locales/
│       ├── en/
│       │   └── common.json                # English translations
│       └── de/
│           └── common.json                # German translations
├── src/
│   ├── components/
│   │   ├── LanguageProvider.tsx           # Provider wrapper
│   │   ├── LanguageSwitcher.tsx           # Language toggle component
│   │   └── HeroI18n.tsx                   # Example translated component
│   ├── hooks/
│   │   └── useTranslation.ts              # Translation hook
│   └── app/
│       ├── layout.tsx                      # Updated with LanguageProvider
│       └── page.tsx                        # Landing page
```

## File Descriptions

### 1. i18n.config.ts

Main configuration file that initializes i18next with:

- Language detection (localStorage first, then browser)
- English and German resources
- React integration via i18next-browser-languagedetector

```typescript
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./public/locales/en/common.json";
import de from "./public/locales/de/common.json";

const resources = {
  en: { common: en },
  de: { common: de },
};

export const initI18n = () => {
  if (i18n.isInitialized) return i18n;

  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: "en",
      ns: ["common"],
      defaultNS: "common",
      interpolation: { escapeValue: false },
      detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
      },
    });

  return i18n;
};
```

### 2. Translation Files

**public/locales/en/common.json** - English translations
**public/locales/de/common.json** - German translations

Both files contain key-value pairs for all translatable strings:

```json
{
  "hero_title": "Master Cryptocurrency Education",
  "hero_subtitle": "Learn from industry experts..."
  // ... more translations
}
```

### 3. LanguageProvider.tsx

Wraps your entire application to provide translation context.

Must be placed in `src/components/LanguageProvider.tsx`

Initializes i18n on client side and provides the I18nextProvider context.

### 4. LanguageSwitcher.tsx

Dropdown component for switching between English and German.

Features:

- Displays current language
- Changes language globally
- Saves preference to localStorage
- Located in header navigation

### 5. useTranslation Hook

Custom hook in `src/hooks/useTranslation.ts` for simplified access to translations:

```typescript
import { useTranslation } from "@/hooks/useTranslation";

export function MyComponent() {
  const { t } = useTranslation();
  return <h1>{t("hero_title")}</h1>;
}
```

## Usage in Components

### Basic Usage

```typescript
"use client";

import { useTranslation } from "@/hooks/useTranslation";

export function MyComponent() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>{t("hero_title")}</h1>
      <p>{t("hero_subtitle")}</p>
      <p>Current language: {i18n.language}</p>
    </div>
  );
}
```

### With Variables (Interpolation)

In JSON:

```json
{
  "welcome": "Welcome, {{name}}!"
}
```

In component:

```typescript
const { t } = useTranslation();
return <p>{t("welcome", { name: "John" })}</p>;
```

### Pluralization

In JSON:

```json
{
  "items": "You have {{count}} item",
  "items_plural": "You have {{count}} items"
}
```

## Integration Steps

### Step 1: Update Layout

The layout.tsx has been updated to wrap your app with LanguageProvider:

```typescript
import { LanguageProvider } from "@/components/LanguageProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <Providers>{/* Your app content */}</Providers>
        </LanguageProvider>
      </body>
    </html>
  );
}
```

### Step 2: Update Components

Convert your components to use translations:

Before:

```typescript
<h1>Master Cryptocurrency Education</h1>
```

After:

```typescript
"use client";
import { useTranslation } from "@/hooks/useTranslation";

export function Hero() {
  const { t } = useTranslation();
  return <h1>{t("hero_title")}</h1>;
}
```

### Step 3: Add Language Switcher

Already added to navigation-header.tsx in the desktop navigation menu.

## Adding New Translations

### Process:

1. Add key-value pair to `public/locales/en/common.json`
2. Add corresponding German translation to `public/locales/de/common.json`
3. Use `t('your_key')` in components

Example:

```json
// en/common.json
{
  "my_new_feature": "New Feature Title"
}

// de/common.json
{
  "my_new_feature": "Neue Funktions Titel"
}
```

In component:

```typescript
const { t } = useTranslation();
return <h2>{t("my_new_feature")}</h2>;
```

## Language Detection & Storage

The system automatically:

1. Checks localStorage for saved language preference
2. Falls back to browser language if not found
3. Defaults to English if browser language is not supported
4. Saves language preference to localStorage when changed

## Supported Features

- ✅ Client-side language switching
- ✅ Persistent language preference (localStorage)
- ✅ Browser language auto-detection
- ✅ Variable interpolation
- ✅ Namespace support
- ✅ Fallback language
- ✅ Easy component integration
- ✅ TypeScript support

## Common Translations Reference

All available translation keys are:

**Navigation:**

- nav_home, nav_courses, nav_master_class, nav_contact, nav_login, nav_signup

**Hero Section:**

- hero_title, hero_subtitle, hero_cta

**Features:**

- features_title, features_24_7, features_certificate, features_community, features_mentorship

**Pricing:**

- pricing_title, pricing_subtitle, pricing_basic, pricing_pro, pricing_enterprise

**Other:**

- language, english, german, testimonials_title, faq_title, footer_about, footer_privacy, footer_terms, footer_contact

## Extending to More Languages

To add a new language (e.g., Spanish):

1. Create `public/locales/es/common.json`
2. Add Spanish translations
3. Update `i18n.config.ts`:

```typescript
import es from "./public/locales/es/common.json";

const resources = {
  en: { common: en },
  de: { common: de },
  es: { common: es }, // Add this
};
```

4. Update `LanguageSwitcher.tsx` to include new option

## Performance Tips

1. **Lazy Load Translations (Optional)**: For large translation files, use namespaces
2. **Caching**: Languages are cached in localStorage
3. **Code Splitting**: Only load active language resources
4. **Component Memoization**: Use React.memo for translated components

## Troubleshooting

### Translations Not Updating

- Ensure component has 'use client' directive
- Verify translation keys match exactly
- Check if i18n is initialized

### Language Not Persisting

- Check browser localStorage is enabled
- Verify LanguageSwitcher is in your layout
- Clear browser cache and try again

### Fallback Language Not Working

- Ensure fallbackLng: 'en' is in i18n config
- Verify en.json has all translation keys

## Files Modified/Created

✅ Created: `i18n.config.ts`
✅ Created: `public/locales/en/common.json`
✅ Created: `public/locales/de/common.json`
✅ Created: `src/components/LanguageProvider.tsx`
✅ Created: `src/components/LanguageSwitcher.tsx`
✅ Created: `src/components/HeroI18n.tsx` (example)
✅ Created: `src/hooks/useTranslation.ts`
✅ Modified: `src/app/layout.tsx` (added LanguageProvider)
✅ Modified: `src/components/navigation-header.tsx` (added LanguageSwitcher)

## Next Steps

1. Review and update existing components with translations
2. Replace hardcoded strings with `t()` calls
3. Test language switching in the browser
4. Add more languages as needed
5. Consider using Translations Management Tools (optional):
   - i18next-backend for dynamic loading
   - locize.com for translation management

## Support

For more information:

- i18next docs: https://www.i18next.com/
- next-i18next: https://github.com/isaachinman/next-i18next
- React-i18next: https://react.i18next.com/
