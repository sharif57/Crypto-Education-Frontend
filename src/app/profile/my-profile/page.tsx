"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MyProfile() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full  text-white flex items-center justify-center">
      <main
        className="w-full"
        style={{
          backgroundImage: "url('/sideGradin.png')",
          backgroundPosition: "top right",
          backgroundRepeat: "no-repeat",
          backgroundSize: "auto 100%",
        }}
      >
        <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-24 ">
          <div className="flex flex-col items-center justify-center  gap-8">
            <div className="w-full max-w-[740px] bg-gradient-to-b border border-[#62C1BF]  from-[#161616] via-[#2c2c2c] to-[#3f3d3d] rounded-3xl shadow-xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
                <div className="w-[200px] h-[240px] sm:w-[250px] sm:h-[300px] md:w-[300px] md:h-[370px] flex-shrink-0">
                  <Image
                    src="/images/Profile.png"
                    height={900}
                    width={900}
                    alt="profile"
                    className="w-full h-full object-cover "
                  />
                </div>
                <div className="flex flex-col gap-6 sm:gap-8 justify-center items-start">
                  <div className="flex flex-col gap-1">
                    <h1 className="text-lg sm:text-xl md:text-[23px] font-medium">
                      Name:
                    </h1>
                    <p className="text-lg sm:text-xl md:text-[23px] font-medium text-[#E6F9FD]">
                      Marvin McKinney
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-lg sm:text-xl md:text-[23px] font-medium">
                      Email:
                    </h1>
                    <p className="text-lg sm:text-xl md:text-[23px] font-medium text-[#E6F9FD]">
                      sharifmahamud@gmail.com
                    </p>
                  </div>
                  <div>
                    <Link href="/profile/edit-profile">
                      <Button
                        className="px-6 !py-5 sm:px-8 sm:py-4 cursor-pointer 
                     bg-text hover:bg-text font-normal text-[#224443] rounded-2xl text-sm sm:text-[16px]"
                      >
                        Edit Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
