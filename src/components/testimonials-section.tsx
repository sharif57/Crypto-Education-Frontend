
'use client';

import { useTranslation } from '@/hooks/useTranslation'

export default function TestimonialsSection() {
  const { t } = useTranslation();

  const reviews = [
    {
      "id": 1,
      "name": "Jasmin K.",
      "messageKey": "testimonial_jasmin"
    },
    {
      "id": 2,
      "name": "Alex K.",
      "messageKey": "testimonial_alex"
    },
    {
      "id": 3,
      "name": "Maria S.",
      "messageKey": "testimonial_maria"
    },
    {
      "id": 4,
      "name": "Feliz M.",
      "messageKey": "testimonial_feliz"
    },
    {
      "id": 5,
      "name": "Manuel F.",
      "messageKey": "testimonial_manuel"
    },
    {
      "id": 6,
      "name": "John B.",
      "messageKey": "testimonial_john"
    }
  ]


  return (
    <div>
      <div id="testimonials" className="min-h-screen     text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto -z-20">
          {/* Header Section */}
          <div className="px-4 sm:px-6 lg:px-0">
            <h1
              className="
      mx-auto text-center text-white font-normal
      text-3xl sm:text-4xl md:text-5xl xl:text-6xl
      leading-tight sm:leading-snug xl:leading-[1.15]
      max-w-5xl
    "
            >
              {t("testimonials_section_title")}
              <span className="bg-gradient-to-r from-[#94ecea] to-[#307574] bg-clip-text text-transparent">
                {/* Optional highlighted text */}
              </span>
            </h1>

            <p
              className="
      mx-auto mt-3 text-center text-[#B4B4B4]
      text-sm sm:text-base md:text-lg
      max-w-3xl
    "
            >
              {t("testimonials_section_subtitle")}
            </p>
          </div>


          <div className="grid grid-cols-1 -z-20 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 lg:mt-[100px] mt-[100px] ">

            {
              reviews?.map((review, index) => (
                <div key={index} className="bg-gradient-to-br from-[#1c1c1c] to-[#2e2e2e] rounded-3xl p-8 border border-[#3a3939] hover:border-[#242424]/90 cursor-pointer transition-all duration-300 group relative overflow-hidden hover:bg-text">
                  <div className="flex items-center gap-3 mb-4">

                    <span className="font-semibold text-lg text-white">
                      {review?.name}
                    </span>
                  </div>
                  <p className="text-gray-300 font-normal text-lg leading-relaxed">
                    {t(review?.messageKey)}
                  </p>
                </div>
              ))
            }




          </div>

        </div>
      </div>
    </div>
  );
}
