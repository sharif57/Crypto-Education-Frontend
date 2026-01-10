
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
          {/* <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium mb-6">
              What Our Learners Are{" "}
              <span className="text-text">Saying</span>
            </h2>
            <p className="text-gray-300 text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed">
              Join thousands of people worldwide who&lsquo;ve transformed their
              understanding of Web3 with us.
            </p>
          </div> */}
          {/* <Heading title=" What customers say" subtitle="Join thousands of people worldwide who&lsquo;ve transformed their
              understanding of Web3 with us." /> */}
          <div>
            <h1 className="text-3xl font-normal w-full lg:w-1/2 mx-auto text-[60px] text-white text-center">
              {t('testimonials_section_title')} <span className="bg-gradient-to-r from-[#94ecea] to-[#307574] bg-clip-text text-transparent font-normal">

              </span>
            </h1>
            <p className="text-[16px] font-normal text-[#B4B4B4] pt-2 w-full lg:w-4xl mx-auto text-center text-balance">
              {t('testimonials_section_subtitle')}
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
