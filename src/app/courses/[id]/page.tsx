
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useCategoryVideoQuery } from "@/Redux/feature/categoryVideoSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";

interface Lesson {
  object_id: string;
  title: string;
  duration?: string;
  duration_seconds?: number | null;
  video_file?: string;
  isCompleted?: boolean;
  isLocked?: boolean;
}

interface Module {
  id: number;
  name: string;
  description: string;
  thumbnail?: string;
  total_videos: number;
  completed_videos: number;
  videos: Lesson[];
}



export default function Category () {
  const params = useParams();
  const id = params?.id as string;

  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const { data: categoryVideo, isLoading: categoryVideoLoading } = useCategoryVideoQuery(id);


  const toggleModule = (moduleId: string) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  return (
    <div className="min-h-screen pt-[100px] lg:pt-[100px] p-4 sm:p-6 lg:p-8 w-full  bg-gradient-to-b from-[#326866] to-[#1B1B1B]">
      <div className="max-w-3xl mx-auto space-y-5">
   
        {/* Modules Section */}
        <div>
          {categoryVideoLoading ? (
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
              {categoryVideo?.data?.map((module: Module) => (
                <div
                  key={module.id}
                  className="bg-[#2a2a2a] rounded-xl overflow-hidden"
                  title={module.name}
                >
                  {/* Module Header */}
                  <Button
                    onClick={() => toggleModule(module.id.toString())}
                    className="w-full cursor-pointer p-4 flex items-center justify-between bg-transparent hover:bg-[#333333] transition-colors duration-200 rounded-none h-auto"
                    variant="ghost"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Image
                          src={module.thumbnail || "/images/placeholder.png"}
                          alt={module.name}
                          width={100}
                          height={70}
                          priority
                          className="object-cover w-[100px] h-[70px] object-center"
                        />
                      </div>
                      <div className="text-left flex-1">
                        <h3 className="text-white font-semibold text-2xl">{module.name}</h3>
                        <p className="text-[#62C1BF] text-lg font-normal">
                          {module.total_videos} Video{module.total_videos !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`text-white transition-transform duration-200 group-hover:scale-110 ${
                        expandedModule === module.id.toString() ? "rotate-180" : ""
                      }`}
                      size={32}
                    />
                  </Button>

                  {/* Videos List */}
                  {expandedModule === module.id.toString() && module.videos?.length > 0 && (
                    <div className="bg-[#23272f] border-t border-[#333] px-4 py-4 space-y-4">
                      {module.videos.map((video: Lesson) => (
                        <Link
                          key={video.object_id}
                          href={`/courses/${id}/category/${video.object_id}`}
                          className="flex items-center gap-4 p-2 hover:bg-[#333333] rounded-md transition-colors"
                        >
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="20" cy="20" r="19.1169" stroke="#62C1BF" strokeWidth="1.76627" />
                            <path
                              d="M14.7295 15.0811C14.7295 14.2753 15.5775 13.7512 16.2983 14.1115L26.8184 19.3716C27.6174 19.7711 27.6174 20.9113 26.8184 21.3108L16.2983 26.5708C15.5775 26.9312 14.7295 26.4071 14.7295 25.6013V15.0811Z"
                              fill="#62C1BF"
                            />
                          </svg>
                          <div className="text-white flex flex-col gap-1 flex-grow">
                            <p className="lg:text-xl text-base font-medium">{video.title}</p>
                            {video.duration_seconds && (
                              <p className="text-sm text-gray-300">
                                {Math.floor(video.duration_seconds / 60)} mins
                              </p>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}