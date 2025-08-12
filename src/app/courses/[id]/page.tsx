
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {  ChevronDown } from "lucide-react";
import { useLiveClassQuery } from "@/Redux/feature/liveRoomSlice";
import { useCategoryVideoQuery } from "@/Redux/feature/categoryVideoSlice";
// import Loading from "@/components/Loading";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";


interface Lesson {
  object_id: string;
  title: string;
  duration: string;
  duration_seconds?: number;
  videoUrl?: string;
  isCompleted?: boolean;
  isLocked?: boolean;
}

interface Module {
  id: string;
  title: string;
  name: string;
  videoCount: number;
  videoDuration: string;
  videoUrl?: string;
  icon: string;
  iconBg: string;
  lessons?: Lesson[];
  videos?: Lesson[]; // Added to fix the error
  isCompleted?: boolean;
  progress?: number;
  thumbnail?: string;
  total_videos?: number;

}

interface LiveClass {
  id: string;

  title: string;
  date_time: string;
  duration_minutes: number;
  link: string;
}



export default function Category() {

  const params = useParams();
  // const router = useRouter();
  const id = params?.id as string;
  console.log(id, 'id');

  const [expandedModule, setExpandedModule] = useState<string | null>(
    "exchanges"
  );
  const { data, isLoading } = useLiveClassQuery(undefined)

  const { data: categoryVideo, isLoading: categoryVideoLoading } = useCategoryVideoQuery(id);
  console.log(categoryVideo, 'categoryVideosdfsdkljflsdksdklj');






  const toggleModule = (moduleId: string) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  // if (isLoading) {
  //   return <Loading />
  // }


  return (
    <div className="min-h-screen mt-[100px] lg:mt-[100px] p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto space-y-5">


        <div>
          {isLoading ? (
            <div className="bg-[#23272f] border-t border-[#333] px-4 py-6 flex items-center gap-4">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/3" />
              </div>
              <Skeleton className="w-20 h-8 rounded-md" />
            </div>
          ) : (
            <div className="bg-[#333333] rounded-xl mb-6 shadow-lg overflow-hidden" title="Live Class">
              <div
                className="flex items-center justify-between p-4 cursor-pointer group"
                onClick={() => toggleModule("live")}
              >
                <div className="flex items-center justify-between gap-5">
                  <div className="relative w-[100px] h-[70px] rounded-lg overflow-hidden shadow-md">
                    <Image
                      src="/images/live.png"
                      alt="Live Class"
                      width={100}
                      height={70}
                      className="object-cover w-full h-full"
                      priority
                    />
                  </div>
                  <h1 className="text-2xl font-semibold text-white tracking-tight">
                    Live Class
                  </h1>
                </div>
                <ChevronDown
                  className={`text-white transition-transform duration-200 group-hover:scale-110 ${expandedModule === "live" ? "rotate-180" : ""
                    }`}
                  size={32}
                />
              </div>
              {expandedModule === "live" && data?.data?.length > 0 && data.data.map((live: LiveClass) => (
                <div
                  key={live.id}
                  className="bg-[#23272f] border-t border-[#333] px-4 py-6 flex items-center gap-4"
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="20"
                      cy="20"
                      r="19.1169"
                      stroke="#62C1BF"
                      strokeWidth="1.76627"
                    />
                    <path
                      d="M14.7295 15.0811C14.7295 14.2753 15.5775 13.7512 16.2983 14.1115L26.8184 19.3716C27.6174 19.7711 27.6174 20.9113 26.8184 21.3108L16.2983 26.5708C15.5775 26.9312 14.7295 26.4071 14.7295 25.6013V15.0811Z"
                      fill="#62C1BF"
                    />
                  </svg>

                  <div className="text-white flex flex-col gap-1 flex-grow">
                    <p className="lg:text-xl text-base font-medium">{live.title}</p>
                    <p className="text-sm text-gray-300">
                      {new Date(live.date_time).toLocaleString()} ({live.duration_minutes} mins)
                    </p>
                  </div>

                  <a
                    href={live.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-text cursor-pointer lg:px-6 px-2 py-2 lg:rounded-full rounded-lg font-normal text-black"
                  >
                    Join Live
                  </a>
                </div>
              ))}

            </div>
          )
          }
        </div>

        <div >
          {
            categoryVideoLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 7 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-[#23272f] border-t border-[#333] px-4 py-6 flex items-center gap-4"
                  >
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/3" />
                    </div>
                    <Skeleton className="w-20 h-8 rounded-md" />
                  </div>
                ))}
              </div>

            ) : (
              <div className="space-y-3">
                {categoryVideo?.data?.map((module: Module) => {

                  return (
                    <Link 
                      href={`/courses/${id}/category/${module.id}`}
                      key={module.id}
                      className="bg-[#2a2a2a] rounded-xl overflow-hidden"
                      title={module.name}
                    >
                      {/* Module Header */}
                      <Button
                        onClick={() => toggleModule(module.id)}
                        className="w-full cursor-pointer p-4 flex items-center justify-between bg-transparent hover:bg-[#333333] transition-colors duration-200 rounded-none h-auto"
                        variant="ghost"
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <Image
                              src={module.thumbnail || "/images/placeholder.png"}
                              alt={module.name}
                              width={500}
                              height={500}
                              className="object-cover w-[100px] h-[70px] object-center"
                            />
                          </div>
                          <div className="text-left flex-1">
                            <h3 className="text-white font-semibold text-2xl">
                              {module.name}
                            </h3>
                            <p className="text-[#62C1BF] text-lg font-normal">
                              {module?.total_videos || 0} Video
                              {/* {module.videos?.length !== 1 ? "s" : ""} */}
                            </p>
                          </div>
                        </div>

                        <div className="text-gray-400">
                          {/* Chevron icon */}
                          <svg
                            width="24"
                            height="13"
                            viewBox="0 0 24 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            // className={`${isExpanded ? "rotate-180 transition-transform" : ""}`}
                            className="rotate-260 transition-transform"
                          >
                            <path
                              d="M2 1.5L12 11.5L22 1.5"
                              stroke="#E0E0E0"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {/* <ArrowRight /> */}
                        </div>
                      </Button>

             
                    </Link>
                  );
                })}
              </div>
            )
          }
        </div>

      </div>
    </div>
  );
}
