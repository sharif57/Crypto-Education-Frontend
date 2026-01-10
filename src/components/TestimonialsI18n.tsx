'use client';

import { useTranslation } from '@/hooks/useTranslation';

export function TestimonialsI18n() {
    const { t } = useTranslation();

    const testimonials = [
        {
            name: 'John Doe',
            role: 'Crypto Trader',
            comment: 'Great course, learned a lot!',
            image: '/images/testimonial1.jpg',
        },
        {
            name: 'Jane Smith',
            role: 'Blockchain Developer',
            comment: 'Excellent content and mentoring',
            image: '/images/testimonial2.jpg',
        },
    ];

    return (
        <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="text-center mb-12 max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold mb-4">
                    {t('testimonials_title')}
                </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.name} className="bg-white rounded-lg p-8 shadow-md">
                        <p className="text-gray-700 mb-4 italic">&ldquo;{testimonial.comment}&rdquo;</p>
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
