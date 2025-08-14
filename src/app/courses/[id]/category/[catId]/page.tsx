// 'use client';

// import { useCategoryWiseVideoQuery } from '@/Redux/feature/categoryVideoSlice';
// import { useParams } from 'next/navigation';
// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Skeleton } from '@/components/ui/skeleton';

// interface Lesson {
//   object_id: string;
//   title: string;
//   duration_seconds?: number | null;
//   video_file?: string;
// }

// export default function CategoryWise() {
//   const params = useParams();
//   const id = params?.catId as string;
//   console.log(id, 'catid');

//   const { data: categoryVideo, isLoading: categoryVideoLoading } = useCategoryWiseVideoQuery(id);
//   const [expandedVideo, setExpandedVideo] = useState<string | null>(null);

//   const toggleVideo = (videoId: string) => {
//     setExpandedVideo(expandedVideo === videoId ? null : videoId);
//   };

//   return (
//     <div className="min-h-screen mt-[100px] lg:mt-[100px] p-4 sm:p-6 lg:p-8">
//       <div className="max-w-3xl mx-auto space-y-5">
//         {categoryVideoLoading ? (
//           <div className="space-y-4">
//             {Array.from({ length: 3 }).map((_, index) => (
//               <div
//                 key={index}
//                 className="bg-[#23272f] border-t border-[#333] px-4 py-6 flex items-center gap-4"
//               >
//                 <Skeleton className="w-10 h-10 rounded-full" />
//                 <div className="flex-1 space-y-2">
//                   <Skeleton className="h-5 w-3/4" />
//                   <Skeleton className="h-4 w-1/3" />
//                 </div>
//                 <Skeleton className="w-20 h-8 rounded-md" />
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="space-y-3">
       
//             {categoryVideo?.data?.videos?.map((lesson: Lesson, index: number) => {
//               const isExpanded = expandedVideo === lesson.object_id;
//               return (
//                 <div
//                   key={lesson.object_id}
//                   className="bg-[#2a2a2a] rounded-xl overflow-hidden"
//                 >
//                   <Button
//                     onClick={() => toggleVideo(lesson.object_id)}
//                     className="w-full cursor-pointer p-4 flex items-center justify-between bg-transparent hover:bg-[#333333] transition-colors duration-200 rounded-none h-auto"
//                     variant="ghost"
//                   >
//                     <div className="flex items-center gap-4">
//                       <div className="relative">
//                         <Image
//                           src={categoryVideo?.data?.thumbnail || '/images/placeholder.png'}
//                           alt={lesson.title || 'Video Thumbnail'}
//                           width={500}
//                           height={500}
//                           className="object-cover w-[100px] h-[70px] object-center rounded-lg"
//                         />
//                       </div>
//                       <div className="text-left flex-1">
//                         <h3 className="text-white font-semibold text-2xl">{lesson.title.slice(0, 40)}</h3>
//                         <p className="text-[#62C1BF] text-lg font-normal">1 Video</p>
//                       </div>
//                     </div>
//                     <div className="text-gray-400">
//                       <svg
//                         width="24"
//                         height="13"
//                         viewBox="0 0 24 13"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                         className={`${isExpanded ? 'rotate-180 transition-transform' : ''}`}
//                       >
//                         <path
//                           d="M2 1.5L12 11.5L22 1.5"
//                           stroke="#E0E0E0"
//                           strokeWidth="2.5"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                     </div>
//                   </Button>
//                   {isExpanded && (
//                     <div className="px-4 pb-4">
//                       <div className="bg-[#333333] hover:bg-[#3a3a3a] rounded-lg">
//                         <Link
//                           href={`/courses/${id}/category/${params.catId}/${lesson.object_id}`}
//                           className="flex items-center gap-3 p-3"
//                         >
//                           <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
//                             <svg
//                               width="40"
//                               height="40"
//                               viewBox="0 0 40 40"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <circle
//                                 cx="20"
//                                 cy="20"
//                                 r="19.1169"
//                                 stroke="#62C1BF"
//                                 strokeWidth="1.76627"
//                               />
//                               <path
//                                 d="M14.7294 15.0811C14.7294 14.2753 15.5775 13.7512 16.2982 14.1115L26.8184 19.3716C27.6174 19.7711 27.6174 20.9113 26.8184 21.3108L16.2982 26.5708C15.5775 26.9312 14.7294 26.4071 14.7294 25.6013V15.0811Z"
//                                 fill="#62C1BF"
//                               />
//                             </svg>
//                           </div>
//                           <div className="flex-1">
//                             <p className="text-white text-sm font-medium">{lesson.title}</p>
//                             {lesson.duration_seconds != null && (
//                               <p className="text-gray-400 text-xs">
//                                 {Math.floor(lesson.duration_seconds / 60)} min
//                               </p>
//                             )}
//                           </div>
//                           <div className="text-gray-500 text-xs">{index + 1}</div>
//                         </Link>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {  useSingleVideoQuery } from "@/Redux/feature/categoryVideoSlice";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronUp, ChevronDown, Play } from "lucide-react";
import Loading from "@/components/Loading";
import Chat from "@/components/chat";

interface RelatedVideo {
  id: number | string;
  title: string;
  duration_seconds: number;
  video_file?: string;
  [key: string]: unknown;
  object_id?: string;
}


export default function VideoDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.catId as string;
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const { data, isLoading, isError } = useSingleVideoQuery(id);

  console.log(data, 'related videoss');

  const toggleModule = (moduleId: string) => {
    setExpandedModule(prev => prev === moduleId ? null : moduleId);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data?.data) {
    return (
      <div className="container mx-auto p-4 text-white">
        <div className="flex items-center gap-4 p-4">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            size="sm"
            className="text-text hover:text-white bg-none hover:bg-red border border-text !px-8 rounded-full py-5"
          >
            <ArrowLeft className="w-8 h-4 mr-2" />
            Back
          </Button>
        </div>
        <div className="text-center py-8">
          Error loading video data. Please try again later.
        </div>
      </div>
    );
  }

  const video = data.data;
  const relatedVideos = data.related_videos || [];
  const totalVideos = relatedVideos.length + 1;
  console.log('idssssssssssssd', video?.subtitle_object_id);

  return (
    <div className="container mt-[100px] lg:mt-[120px] mx-auto lg:px-8 px-4 text-white relative">
      {/* Header */}
      <div className="flex items-center gap-4 p-4">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          size="sm"
          className="text-text hover:text-white bg-none hover:bg-red border border-text !px-8 rounded-full py-5"
        >
          <ArrowLeft className="w-8 h-4 mr-2" />
          Back
        </Button>
        <div className="flex items-center lg:gap-2 gap-0">
          <span className="text-white font-medium">{video.category_name}</span>
          <span className="text-gray-400">•</span>
          <span className="text-text">{totalVideos} Video{totalVideos !== 1 ? 's' : ''}</span>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Video Player */}
        <div className="bg-black rounded-xl overflow-hidden relative">
          <div className="aspect-video relative">
            {isLoading ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-800">
                <Loading />
              </div>
            ) : (
              <video
                className="w-full h-full object-cover"
                controls
                poster="/placeholder.svg?height=400&width=800"
                controlsList="nodownload"
                autoPlay
              >
                <source src={video.video_file} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>

        {/* Video Title and Chat */}
        <div className="lg:flex items-start justify-between gap-8">
          <div className="flex-1">
            <h1 className="text-2xl lg:text-4xl font-medium text-white mb-4">
              {video.title}
            </h1>
            <div className="text-text">
              <p>Duration: {Math.floor(video.duration_seconds / 60)}m {video.duration_seconds % 60}s</p>
              {/* <p>Duration: {video.duration_seconds} S</p> */}
            </div>
          </div>
          <div className="">
            <Chat videoId={video?.subtitle_object_id} />
          </div>
        </div>

        {/* Module List */}
        <div className="space-y-3 mt-8">
          <h2 className="text-xl font-medium text-white mb-4">Course Modules</h2>

          {/* Current Video as first module */}
          <div
            key={data.data.id}
            className="bg-[#2a2a2a] rounded-xl overflow-hidden transition-all"
          >
            <button
              onClick={() => toggleModule(data?.data?.object_id?.toString())}
              className="w-full p-4 flex items-center justify-between hover:bg-[#333333]"
              aria-expanded={expandedModule === data?.data?.object_id.toString()}
              aria-controls={`module-${data?.data?.object_id}-content`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📹</span>
                </div>
                <div className="text-left">
                  <h3 className="text-white font-medium">{data.data.title}</h3>
                  <p className="text-gray-400 text-sm">
                    {Math.floor(data.data.duration_seconds / 60)}m {data.data.duration_seconds % 60}s
                  </p>
                </div>
              </div>
              <span className="text-gray-400">
                {expandedModule === data?.data?.object_id?.toString() ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </span>
            </button>

            {expandedModule === data?.data?.object_id?.toString() && (
              <div
                id={`module-${data?.data?.object_id}-content`}
                className="px-4 pb-4 space-y-2"
              >
                <div
                  className="flex items-center gap-3 p-3 bg-[#333333] rounded-lg hover:bg-[#3a3a3a] transition-colors cursor-pointer"
                  role="button"
                  tabIndex={0}
                >
                  <div className="w-8 h-8 bg-[#4ade80] rounded-full flex items-center justify-center">
                    <Play className="w-4 h-4 text-black fill-black ml-0.5" />
                  </div>
                  <span className="text-white text-sm">Watch Video</span>
                </div>
              </div>
            )}
          </div>

          {/* Related Videos as additional modules */}
          {data.related_videos?.map((video: RelatedVideo) => (
            <div
              key={video?.object_id}
              className="bg-[#2a2a2a] rounded-xl overflow-hidden transition-all"
            >
              <button
                // onClick={() => toggleModule(video?.object_id?.toString())}
                onClick={() => toggleModule(video?.object_id?.toString() ?? '')}
                className="w-full p-4 flex items-center justify-between hover:bg-[#333333]"
                aria-expanded={expandedModule === video?.object_id?.toString()}
                aria-controls={`module-${video.object_id}-content`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📹</span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-white font-medium">{video.title}</h3>
                    <p className="text-gray-400 text-sm">
                      {Math.floor(video.duration_seconds / 60)}m {video.duration_seconds % 60}s
                    </p>
                  </div>
                </div>
                <span className="text-gray-400">
                  {expandedModule === video?.object_id?.toString() ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </span>
              </button>

              {expandedModule === video?.object_id?.toString() && (
                <div
                  id={`module-${video?.object_id}-content`}
                  className="px-4 pb-4 space-y-2"
                >
                  <div
                    className="flex items-center gap-3 p-3 bg-[#333333] rounded-lg hover:bg-[#3a3a3a] transition-colors cursor-pointer"
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      // You might want to handle navigation to this video
                      router.push(`/master-class/${video?.object_id}`)
                    }}
                  >
                    <div className="w-8 h-8 bg-[#4ade80] rounded-full flex items-center justify-center">
                      <Play className="w-4 h-4 text-black fill-black ml-0.5" />
                    </div>
                    <span className="text-white text-sm">Watch Video</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
