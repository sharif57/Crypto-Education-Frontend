'use client';

import { useTranslation } from '@/hooks/useTranslation';

export function PricingSectionI18n() {
    const { t } = useTranslation();

    const plans = [
        {
            name: t('pricing_basic'),
            price: '$29',
            features: ['Feature 1', 'Feature 2'],
        },
        {
            name: t('pricing_pro'),
            price: '$79',
            features: ['Feature 1', 'Feature 2', 'Feature 3'],
        },
        {
            name: t('pricing_enterprise'),
            price: '$199',
            features: ['All features', 'Custom support'],
        },
    ];

    return (
        <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                    {t('pricing_title')}
                </h2>
                <p className="text-xl text-gray-600">
                    {t('pricing_subtitle')}
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {plans.map((plan) => (
                    <div key={plan.name} className="border rounded-lg p-8">
                        <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                        <p className="text-3xl font-bold mb-6">{plan.price}</p>
                        <ul className="space-y-2">
                            {plan.features.map((feature) => (
                                <li key={feature} className="text-gray-600">
                                    ✓ {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}
