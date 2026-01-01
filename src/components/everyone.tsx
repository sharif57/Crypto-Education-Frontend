import Heading from '@/hook/heading'
import { Verified } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Badge } from './ui/badge'

export default function Everyone() {
  return (
    <div className="py-12">
      <Heading
        title="TheClue® is for everyone"
        subtitle="No matter your background or experience, TheClue empowers you to grow, connect, and succeed—your journey starts here."
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">

          {/* Image (2 columns) */}
          <div className="lg:col-span-2 h-[380px] lg:h-[400px] rounded-2xl overflow-hidden">
            <Image
              src="/image.png"
              width={1200}
              height={700}
              alt="image"
              priority
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* Glass Card (1 column) */}
          <div className="h-[380px] lg:h-[400px] bg-[#1B1B1B]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <Verified className="text-white w-6 h-6" />

              <h1 className="text-xl font-semibold text-white">
                The Clue is fully secured
              </h1>

              <p className="text-[16px] font-normal text-[#B4B4B4] leading-relaxed">
                Your data is safe with us—TheClue uses top-tier encryption and
                security standards to protect your privacy at all times.
              </p>

              <Badge
                variant="outline"
                className="mt-6 rounded-full px-6 py-2 w-fit flex items-center gap-2 text-white border-white"
              >
                <Verified className="w-4 h-4 text-white" />
                Secure
              </Badge>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
