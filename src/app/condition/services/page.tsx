'use client';
import Loading from "@/components/Loading";
import {   useTermsQuery } from "@/Redux/feature/privacySlice"
import Image from "next/image"

interface title {
  title: string;
  content: string;
}

export default function Services() {
  const {data, isLoading} = useTermsQuery(undefined)

  if(isLoading){
    return <><Loading /></>
  }

  return (
    <div className="relative min-h-svh w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image src="/images/BG.png" alt="About Us Background" fill className="object-cover" priority />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl">
    

          {/* Content Grid */}
          <div className="grid gap-6 sm:gap-8 lg:gap-10">
            {
              data?.data.map((item: title, index: number) => (
                <div key={index} className="space-y-3 sm:space-y-4">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 sm:mb-12 text-center lg:text-left">{item.title}</h2>
                  <div className="text-sm sm:text-base text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.content }}></div>
                </div>
              ))
            }
          
          </div>
        </div>
      </div>
    </div>
  )
}
