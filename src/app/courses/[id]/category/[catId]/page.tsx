'use client';

import { useCategoryWiseVideoQuery } from '@/Redux/feature/categoryVideoSlice';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

interface Lesson {
  object_id: string;
  title: string;
  duration_seconds?: number | null;
  video_file?: string;
}

export default function CategoryWise() {
  const params = useParams();
  const id = params?.catId as string;
  console.log(id, 'catid');

  const { data: categoryVideo, isLoading: categoryVideoLoading } = useCategoryWiseVideoQuery(id);
  const [expandedVideo, setExpandedVideo] = useState<string | null>(null);

  const toggleVideo = (videoId: string) => {
    setExpandedVideo(expandedVideo === videoId ? null : videoId);
  };

  return (
    <div className="min-h-screen mt-[100px] lg:mt-[100px] p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto space-y-5">
        {categoryVideoLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
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
       
            {categoryVideo?.data?.videos?.map((lesson: Lesson, index: number) => {
              const isExpanded = expandedVideo === lesson.object_id;
              return (
                <div
                  key={lesson.object_id}
                  className="bg-[#2a2a2a] rounded-xl overflow-hidden"
                >
                  <Button
                    onClick={() => toggleVideo(lesson.object_id)}
                    className="w-full cursor-pointer p-4 flex items-center justify-between bg-transparent hover:bg-[#333333] transition-colors duration-200 rounded-none h-auto"
                    variant="ghost"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Image
                          src={categoryVideo?.data?.thumbnail || '/images/placeholder.png'}
                          alt={lesson.title || 'Video Thumbnail'}
                          width={500}
                          height={500}
                          className="object-cover w-[100px] h-[70px] object-center rounded-lg"
                        />
                      </div>
                      <div className="text-left flex-1">
                        <h3 className="text-white font-semibold text-2xl">{lesson.title.slice(0, 40)}</h3>
                        <p className="text-[#62C1BF] text-lg font-normal">1 Video</p>
                      </div>
                    </div>
                    <div className="text-gray-400">
                      <svg
                        width="24"
                        height="13"
                        viewBox="0 0 24 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`${isExpanded ? 'rotate-180 transition-transform' : ''}`}
                      >
                        <path
                          d="M2 1.5L12 11.5L22 1.5"
                          stroke="#E0E0E0"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </Button>
                  {isExpanded && (
                    <div className="px-4 pb-4">
                      <div className="bg-[#333333] hover:bg-[#3a3a3a] rounded-lg">
                        <Link
                          href={`/courses/${id}/category/${params.catId}/${lesson.object_id}`}
                          className="flex items-center gap-3 p-3"
                        >
                          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
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
                                d="M14.7294 15.0811C14.7294 14.2753 15.5775 13.7512 16.2982 14.1115L26.8184 19.3716C27.6174 19.7711 27.6174 20.9113 26.8184 21.3108L16.2982 26.5708C15.5775 26.9312 14.7294 26.4071 14.7294 25.6013V15.0811Z"
                                fill="#62C1BF"
                              />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-white text-sm font-medium">{lesson.title}</p>
                            {lesson.duration_seconds != null && (
                              <p className="text-gray-400 text-xs">
                                {Math.floor(lesson.duration_seconds / 60)} min
                              </p>
                            )}
                          </div>
                          <div className="text-gray-500 text-xs">{index + 1}</div>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}