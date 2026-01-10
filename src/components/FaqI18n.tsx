'use client';

import { useTranslation } from '@/hooks/useTranslation';

export function FaqI18n() {
  const { t } = useTranslation();

  const faqs = [
    {
      question: 'What is cryptocurrency?',
      answer: 'Cryptocurrency is a digital or virtual form of currency secured by cryptography.',
    },
    {
      question: 'How do I start learning?',
      answer: 'Sign up for a course and start your learning journey today!',
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept all major credit cards, PayPal, and crypto payments.',
    },
  ];

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">
          {t('faq_title')}
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg p-6">
            <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
