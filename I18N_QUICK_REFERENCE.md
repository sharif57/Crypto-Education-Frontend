# Quick Reference - i18n Implementation

## Getting Started - 3 Steps

### 1. Import the hook

```typescript
"use client";
import { useTranslation } from "@/hooks/useTranslation";
```

### 2. Get the translation function

```typescript
export function MyComponent() {
  const { t } = useTranslation();
  // ...
}
```

### 3. Use translations

```typescript
<h1>{t('hero_title')}</h1>
<p>{t('hero_subtitle')}</p>
```

---

## Translation Methods

### Simple Text

```typescript
const { t } = useTranslation();
return <p>{t("nav_home")}</p>;
```

### With Variables

```json
{
  "welcome": "Welcome, {{name}}!"
}
```

```typescript
return <p>{t("welcome", { name: "John" })}</p>;
```

### Current Language

```typescript
const { i18n } = useTranslation();
console.log(i18n.language); // 'en' or 'de'
```

### Change Language

```typescript
const { i18n } = useTranslation();
i18n.changeLanguage("de");
```

---

## Available Translation Keys

### Navigation

- `nav_home` - Home
- `nav_courses` - Courses
- `nav_master_class` - Master Class
- `nav_contact` - Contact
- `nav_login` - Login
- `nav_signup` - Sign Up

### Hero Section

- `hero_title` - Master Cryptocurrency Education
- `hero_subtitle` - Learn from industry experts...
- `hero_cta` - Start Learning Today

### Features

- `features_title` - Features
- `features_24_7` - 24/7 Support
- `features_certificate` - Certificate Programs
- `features_community` - Community Access
- `features_mentorship` - 1-on-1 Mentorship

### Pricing

- `pricing_title` - Our Plans
- `pricing_subtitle` - Choose the perfect plan...
- `pricing_basic` - Basic
- `pricing_pro` - Professional
- `pricing_enterprise` - Enterprise

### Other

- `testimonials_title` - What Our Students Say
- `faq_title` - Frequently Asked Questions
- `footer_about` - About Us
- `footer_privacy` - Privacy Policy
- `footer_terms` - Terms of Service
- `footer_contact` - Contact Us
- `language` - Language
- `english` - English
- `german` - German

---

## Component Examples

### Example 1: Hero Section (Complete)

```typescript
"use client";
import { useTranslation } from "@/hooks/useTranslation";

export default function HeroI18n() {
  const { t } = useTranslation();

  return (
    <section className="py-20">
      <h1 className="text-4xl font-bold">{t("hero_title")}</h1>
      <p className="text-xl">{t("hero_subtitle")}</p>
      <button>{t("hero_cta")}</button>
    </section>
  );
}
```

### Example 2: Navigation with Language

```typescript
"use client";
import { useTranslation } from "@/hooks/useTranslation";

export function NavigationI18n() {
  const { t, i18n } = useTranslation();

  const navItems = [
    { key: "nav_home", href: "/" },
    { key: "nav_courses", href: "/courses" },
    { key: "nav_contact", href: "/contact" },
  ];

  return (
    <nav>
      {navItems.map((item) => (
        <a key={item.key} href={item.href}>
          {t(item.key)}
        </a>
      ))}
      <span>Language: {i18n.language.toUpperCase()}</span>
    </nav>
  );
}
```

### Example 3: Modal with Translations

```typescript
"use client";
import { useTranslation } from "@/hooks/useTranslation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ContactModal({ open, onClose }: any) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("footer_contact")}</DialogTitle>
        </DialogHeader>
        {/* Form content */}
      </DialogContent>
    </Dialog>
  );
}
```

---

## Adding New Translations

### Step 1: Update JSON files

**File: `public/locales/en/common.json`**

```json
{
  "my_new_key": "My English Text"
}
```

**File: `public/locales/de/common.json`**

```json
{
  "my_new_key": "Mein deutscher Text"
}
```

### Step 2: Use in component

```typescript
const { t } = useTranslation();
return <p>{t("my_new_key")}</p>;
```

---

## Language Detection Flow

1. **Check localStorage** for saved language
2. **Check browser language** (navigator.language)
3. **Default to English** if not supported

### To programmatically set language:

```typescript
const { i18n } = useTranslation();
i18n.changeLanguage("de");
// Automatically saved to localStorage
```

---

## Common Patterns

### Conditional Text

```typescript
const { t, i18n } = useTranslation();
if (i18n.language === "en") {
  // English-specific logic
}
```

### List Translations

```typescript
const { t } = useTranslation();
const items = [
  { label: t("features_24_7") },
  { label: t("features_certificate") },
  { label: t("features_community") },
];
```

### Form Labels

```typescript
<input placeholder={t('nav_login')} />
<button>{t('nav_signup')}</button>
```

---

## File Structure Reference

```
i18n.config.ts                              # Main config
├── initI18n()                              # Initialize function
└── resources                               # Language files

src/
├── components/
│   ├── LanguageProvider.tsx               # Wrap app with this
│   ├── LanguageSwitcher.tsx               # Language toggle
│   ├── HeroI18n.tsx                       # Example component
│   ├── PricingSectionI18n.tsx            # Example component
│   └── ...
├── hooks/
│   └── useTranslation.ts                  # Use this hook
└── app/
    └── layout.tsx                          # Already updated

public/locales/
├── en/common.json                         # English strings
└── de/common.json                         # German strings
```

---

## Testing

### Check current language:

```typescript
const { i18n } = useTranslation();
console.log(`Current language: ${i18n.language}`);
```

### Check if translation exists:

```typescript
const exists = t("any_key", { defaultValue: "NOT_FOUND" });
```

### Force language:

```typescript
const { i18n } = useTranslation();
i18n.changeLanguage("de").then(() => {
  console.log("Language changed to German");
});
```

---

## Browser DevTools Tips

1. **Check localStorage**:

   - Open DevTools → Application → Local Storage
   - Look for key `i18nextLng` (contains current language)

2. **Force language in console**:

   ```javascript
   localStorage.setItem("i18nextLng", "de");
   location.reload();
   ```

3. **Clear language preference**:
   ```javascript
   localStorage.removeItem("i18nextLng");
   location.reload();
   ```

---

## Performance Tips

- ✅ Translations are cached in localStorage
- ✅ Language switching is instant (no reload needed)
- ✅ All translations are bundled (no network requests)
- ✅ Use 'use client' in translated components
- ✅ Memoize translated data when possible

---

## Troubleshooting Checklist

- [ ] Component has 'use client' directive
- [ ] Import hook correctly: `from '@/hooks/useTranslation'`
- [ ] Translation key exists in JSON files
- [ ] Key name matches exactly (case-sensitive)
- [ ] LanguageProvider wraps entire app in layout.tsx
- [ ] Check browser localStorage for saved language
- [ ] Verify JSON syntax is valid
- [ ] Clear browser cache if changes don't appear

---

## Next Steps

1. Review existing components
2. Add 'use client' to components needing translations
3. Import useTranslation hook
4. Replace hardcoded strings with t() calls
5. Add translations to JSON files
6. Test language switching with LanguageSwitcher component

Good luck! 🚀
