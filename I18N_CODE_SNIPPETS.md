# i18n Code Snippets - Copy & Paste Ready

## Quick Copy-Paste Templates

---

## 1. Basic Component (Copy & Use)

```typescript
"use client";

import { useTranslation } from "@/hooks/useTranslation";

export function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("hero_title")}</h1>
      <p>{t("hero_subtitle")}</p>
    </div>
  );
}
```

---

## 2. Section with Features List

```typescript
"use client";

import { useTranslation } from "@/hooks/useTranslation";

export function FeaturesSection() {
  const { t } = useTranslation();

  const items = [
    t("features_24_7"),
    t("features_certificate"),
    t("features_community"),
    t("features_mentorship"),
  ];

  return (
    <section className="py-20">
      <h2 className="text-4xl font-bold">{t("features_title")}</h2>
      <ul className="mt-8 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex items-center">
            <span className="mr-4">✓</span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
```

---

## 3. Pricing Cards Component

```typescript
"use client";

import { useTranslation } from "@/hooks/useTranslation";

export function PricingCards() {
  const { t } = useTranslation();

  const plans = [
    { name: t("pricing_basic"), price: "$29" },
    { name: t("pricing_pro"), price: "$79" },
    { name: t("pricing_enterprise"), price: "$199" },
  ];

  return (
    <section id="pricing" className="py-20">
      <h2 className="text-4xl font-bold text-center">{t("pricing_title")}</h2>
      <p className="text-center text-gray-600 mt-2">{t("pricing_subtitle")}</p>

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        {plans.map((plan) => (
          <div key={plan.name} className="border rounded-lg p-8">
            <h3 className="text-2xl font-bold">{plan.name}</h3>
            <p className="text-3xl font-bold mt-4">{plan.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

## 4. Navigation Menu with Translations

```typescript
"use client";

import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export function NavigationI18n() {
  const { t } = useTranslation();

  const navItems = [
    { key: "nav_home", href: "/" },
    { key: "nav_courses", href: "/courses" },
    { key: "nav_master_class", href: "/master-class" },
    { key: "nav_contact", href: "/contact" },
  ];

  return (
    <nav className="flex items-center gap-8">
      {navItems.map((item) => (
        <Link key={item.key} href={item.href} className="hover:text-blue-600">
          {t(item.key)}
        </Link>
      ))}
    </nav>
  );
}
```

---

## 5. Button Component with Translation

```typescript
"use client";

import { useTranslation } from "@/hooks/useTranslation";

export function CtaButton() {
  const { t } = useTranslation();

  return (
    <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700">
      {t("hero_cta")}
    </button>
  );
}
```

---

## 6. Language Switcher with Button

```typescript
"use client";

import { useTranslation } from "@/hooks/useTranslation";

export function LanguageToggle() {
  const { t, i18n } = useTranslation();

  return (
    <div className="flex gap-4">
      <button
        onClick={() => i18n.changeLanguage("en")}
        className={`px-4 py-2 rounded ${
          i18n.language === "en" ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
      >
        {t("english")}
      </button>
      <button
        onClick={() => i18n.changeLanguage("de")}
        className={`px-4 py-2 rounded ${
          i18n.language === "de" ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
      >
        {t("german")}
      </button>
    </div>
  );
}
```

---

## 7. Hero Section (Full Example)

```typescript
"use client";

import { useTranslation } from "@/hooks/useTranslation";

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-600 to-purple-700 flex items-center justify-center text-white px-4">
      <div className="text-center max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          {t("hero_title")}
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          {t("hero_subtitle")}
        </p>
        <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition">
          {t("hero_cta")}
        </button>
      </div>
    </section>
  );
}
```

---

## 8. Footer with Links

```typescript
"use client";

import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export function FooterI18n() {
  const { t } = useTranslation();

  const links = [
    { label: t("footer_about"), href: "/about" },
    { label: t("footer_privacy"), href: "/privacy" },
    { label: t("footer_terms"), href: "/terms" },
    { label: t("footer_contact"), href: "/contact" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-blue-400"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2026 Crypto Education. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
```

---

## 9. Testimonials Section

```typescript
"use client";

import { useTranslation } from "@/hooks/useTranslation";

export function TestimonialsSection() {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: "John Doe",
      role: "Crypto Trader",
      text: "Great course, learned so much!",
    },
    {
      name: "Jane Smith",
      role: "Developer",
      text: "Excellent content and support!",
    },
  ];

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12">
        {t("testimonials_title")}
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.name}
            className="bg-white shadow-lg rounded-lg p-8"
          >
            <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
            <div>
              <p className="font-bold">{testimonial.name}</p>
              <p className="text-sm text-gray-600">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

## 10. FAQ Section

```typescript
"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { useState } from "react";

export function FaqSection() {
  const { t } = useTranslation();
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is cryptocurrency?",
      a: "A digital currency secured by cryptography.",
    },
    {
      q: "How do I start learning?",
      a: "Sign up and choose a course to begin!",
    },
    {
      q: "Is there a money-back guarantee?",
      a: "Yes, 30-day money-back guarantee.",
    },
  ];

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12">{t("faq_title")}</h2>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border rounded-lg">
            <button
              className="w-full p-4 text-left font-bold hover:bg-gray-50"
              onClick={() => setOpen(open === idx ? null : idx)}
            >
              {faq.q} {open === idx ? "−" : "+"}
            </button>
            {open === idx && (
              <div className="p-4 border-t bg-gray-50">{faq.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

## 11. Card Component (Reusable)

```typescript
"use client";

import { useTranslation } from "@/hooks/useTranslation";

interface CardProps {
  titleKey: string;
  descKey: string;
  icon?: string;
}

export function TranslatedCard({ titleKey, descKey, icon }: CardProps) {
  const { t } = useTranslation();

  return (
    <div className="border rounded-lg p-6 hover:shadow-lg transition">
      {icon && <div className="text-4xl mb-4">{icon}</div>}
      <h3 className="font-bold text-lg mb-2">{t(titleKey)}</h3>
      <p className="text-gray-600">{t(descKey)}</p>
    </div>
  );
}

// Usage:
// <TranslatedCard titleKey="features_title" descKey="features_24_7" icon="🌍" />
```

---

## 12. Form Component with Translations

```typescript
"use client";

import { useTranslation } from "@/hooks/useTranslation";

export function LoginForm() {
  const { t } = useTranslation();

  return (
    <form className="max-w-md mx-auto space-y-4">
      <div>
        <label className="block font-bold">{t("nav_login")}</label>
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded px-3 py-2 mt-1"
        />
      </div>
      <div>
        <label className="block font-bold">Password</label>
        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded px-3 py-2 mt-1"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {t("nav_login")}
      </button>
      <button
        type="button"
        className="w-full border py-2 rounded hover:bg-gray-50"
      >
        {t("nav_signup")}
      </button>
    </form>
  );
}
```

---

## 13. Conditional Rendering Based on Language

```typescript
"use client";

import { useTranslation } from "@/hooks/useTranslation";

export function LanguageSpecificContent() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>{t("hero_title")}</h1>

      {i18n.language === "en" && (
        <div className="bg-blue-100 p-4 rounded">
          <p>Welcome to our English version! 🇬🇧</p>
        </div>
      )}

      {i18n.language === "de" && (
        <div className="bg-blue-100 p-4 rounded">
          <p>Willkommen zu unserer deutschen Version! 🇩🇪</p>
        </div>
      )}
    </div>
  );
}
```

---

## 14. Dynamic Language List

```typescript
"use client";

import { useTranslation } from "@/hooks/useTranslation";

export function LanguageList() {
  const { t, i18n } = useTranslation();

  const languages = [
    { code: "en", label: t("english") },
    { code: "de", label: t("german") },
  ];

  return (
    <div className="space-y-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className={`w-full p-3 rounded border-2 transition ${
            i18n.language === lang.code
              ? "border-blue-600 bg-blue-50 font-bold"
              : "border-gray-300 hover:border-gray-400"
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
```

---

## 15. Page Title with Translation

```typescript
"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { useEffect } from "react";

export function PageWithTranslation() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("hero_title");
  }, [t]);

  return (
    <div>
      <h1>{t("hero_title")}</h1>
      <p>{t("hero_subtitle")}</p>
    </div>
  );
}
```

---

## Tips for Using These Snippets

1. **Copy the entire code block** (including the component wrapper)
2. **Replace component names** if needed
3. **Adjust className** for your styling system
4. **Always include** 'use client' directive
5. **Always import** useTranslation hook
6. **Check JSON files** for available translation keys

---

## Common Modifications

### Change styling:

```typescript
// Replace className with your CSS framework
className="text-4xl font-bold" // Tailwind
className="h1 bold" // Bootstrap
style={{ fontSize: '2rem', fontWeight: 'bold' }} // Inline CSS
```

### Add more languages:

```typescript
const languages = [
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "es", label: "Español" }, // Add here
];
```

### Use with Next.js Link:

```typescript
import Link from "next/link";

<Link href="/courses">{t("nav_courses")}</Link>;
```

### Use with Material-UI:

```typescript
import { Button, Typography } from '@mui/material';

<Typography variant="h1">{t('hero_title')}</Typography>
<Button variant="contained">{t('hero_cta')}</Button>
```

---

**Happy coding! All snippets are production-ready!** ✅
