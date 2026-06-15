/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { useUserProfileQuery } from "@/Redux/feature/userSlice";
import Batch1 from "@/components/icon/batch1";
import Batch2 from "@/components/icon/batch2";
import Batch3 from "@/components/icon/batch3";
import Batch4 from "@/components/icon/batch4";
import Batch5 from "@/components/icon/batch5";
import Batch6 from "@/components/icon/batch6";
import Batch7 from "@/components/icon/batch7";
import Batch8 from "@/components/icon/batch8";
import Batch9 from "@/components/icon/batch9";
import Batch10 from "@/components/icon/batch10";

export default function MyProfile() {
  const { data: userData, isLoading: userLoading } = useUserProfileQuery(undefined);
  const user = userData?.data;
  const quizData = userData?.user_progress_data?.quiz;
  const totalWatchedVideo = userData?.user_progress_data?.total_watched_video ?? 0;

  const batches = [Batch1, Batch2, Batch3, Batch4, Batch5, Batch6, Batch7, Batch8, Batch9, Batch10];
  const activeLevelIndex = Math.max(0, Math.min(9, (quizData?.level || 1) - 1));
  const ActiveBatchIcon = batches[activeLevelIndex];

  const defaultLevels = [
    { level: 1, name: "Explorer" },
    { level: 2, name: "Learner" },
    { level: 3, name: "Keeper" },
    { level: 4, name: "Trader" },
    { level: 5, name: "Adventurer" },
    { level: 6, name: "Collector" },
    { level: 7, name: "Builder" },
    { level: 8, name: "Strategist" },
    { level: 9, name: "Expert" },
    { level: 10, name: "Master" },
  ];

  const levelsToRender = quizData?.all_levels?.length ? quizData.all_levels : defaultLevels;

  if (userLoading) {
    return <div className="flex items-center justify-center min-h-screen text-white bg-[#111111]">Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-[#111111] flex justify-center items-center py-[160px] p-2 ">
      <div className="w-full max-w-[890px] bg-[#1E1E1E] border border-[#325251] rounded-[32px] p-[28px]  sm:p-[40px] shadow-2xl">

        {/* Top Section */}
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 rounded-full  "></div>
              <div className="relative w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] rounded-full overflow-hidden border border-[#2A2A2A]">
                {user?.image ? (
                  <Image src={user.image} alt={user.full_name || "User"} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center text-xs">No Image</div>
                )}
              </div>
            </div>

            {/* Name & Level */}
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-[24px] font-medium text-white tracking-wide">{user?.full_name || "User Name"}</h1>
              <span className="text-[#64748B] text-xs sm:text-sm font-normal">Current Level</span>
              <span className="text-text font-medium text-base sm:text-xl">Level {quizData?.level}</span>
            </div>
          </div>

          {/* Active Badge */}
          <div className="flex-shrink-0 sm:scale-[1.8]  origin-right mr-2 sm:mr-8 ">
            {ActiveBatchIcon && <ActiveBatchIcon />}
          </div>
        </div>

        {/* Levels List */}
        <div className="w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-[20px] p-2 mt-10 overflow-x-auto lg:overflow-hidden flex items-center justify-between gap-2 sm:gap-2 scrollbar-hide">
          {levelsToRender.map((lvl: any, index: number) => {
            const Icon = batches[index];
            const isActive = lvl.level === (quizData?.level || 1);
            return (
              <div
                key={lvl.level}
                className={`flex flex-col items-center justify-center min-w-[64px] md:min-w-0 md:flex-1 py-3 px-1 sm:px-2 rounded-xl transition-all flex-shrink-0 md:flex-shrink ${isActive ? "border border-[#62C1BF]" : "border border-transparent"
                  }`}
              >
                <div className={isActive ? "scale-110 mb-2 drop-shadow-md" : "mb-2"}>
                  {Icon && <Icon />}
                </div>
                <span className="text-white font-medium text-xs sm:text-sm">{lvl.level}</span>
                <span className={`text-[10px] sm:text-sm mt-1 font-normal ${isActive ? "text-white" : "text-[#A0A0A0]"}`}>
                  {lvl.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress Section */}
        <div className="w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-[20px] p-5 sm:p-6 mt-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-white font-medium text-sm sm:text-base">Level: {quizData?.level || 1}</div>
          </div>
          <div className="flex items-center justify-between gap-5 mb-4">

            <div className="w-full h-[6px] bg-[#3A3A3A] rounded-full ">
              <div
                className="h-full bg-[#62C1BF] rounded-full shadow-[0_0_8px_#62C1BF]"
                style={{ width: `${quizData?.progress_percentage || 0}%` }}
              ></div>
            </div>
            <div className="text-[#62C1BF] font-medium text-sm sm:text-lg">{quizData?.progress_percentage || 0}%</div>

          </div>

          <div className="flex justify-between items-center text-xs sm:text-sm ">
            <div>
              <span className="text-[#ffffff] font-normal font-sm">{quizData?.total_point_earned || 0}/{quizData?.next_level_xp}</span>{" "}
              <span className="text-[#62C1BF] font-normal font-sm ">Point</span>
            </div>
            <div className="text-[#ffffff] font-normal text-sm ">
              <span className="text-[#ffffff]">{quizData?.points_to_next_level || 100}</span> point to next level
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6">
          <div className="flex-1 bg-[#2A2A2A] border border-[#3A3A3A] rounded-[20px] p-6 flex flex-col items-center justify-center">
            <span className="text-white text-xl font-medium">{totalWatchedVideo}</span>
            <span className="text-[#D1D1D1] text-xs sm:text-sm mt-2 font-medium">Videos Watched</span>
          </div>
          <div className="flex-1 bg-[#2A2A2A] border border-[#3A3A3A] rounded-[20px] p-6 flex flex-col items-center justify-center">
            <span className="text-white text-xl font-medium">{quizData?.total_quize_submit || 0}</span>
            <span className="text-[#D1D1D1] text-xs sm:text-sm mt-2 font-medium">Quiz Complete</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8">
          <Link href="/profile/edit-profile">
            <Button className="bg-[#62C1BF] hover:bg-[#4ea2a0] text-[#111111] font-normal rounded-full px-8 py-6 text-[15px] transition-colors">
              Edit Profile
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
