"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSingleCategoryVideoQuery } from "@/Redux/feature/categoryVideoSlice";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronUp, ChevronDown, Play } from "lucide-react";
import Loading from "@/components/Loading";
import Chat from "@/components/chat";
import Link from "next/link";

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
  const id = params?.id as string;
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const { data, isLoading, isError } = useSingleCategoryVideoQuery(id);

  console.log(data, 'related videos');

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
  // console.log('idssssssssssssd', video?.subtitle_object_id);

  return (
    <div className="w-full  bg-gradient-to-b from-[#326866] to-[#1B1B1B]">
      <div className="container pt-[100px] lg:pt-[120px] mx-auto lg:px-8 px-4 text-white relative">
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
            <div className="flex  gap-4 mt-3">
              {typeof video?.video_resource === "string" &&
                video.video_resource.trim() !== "" && (
                  <Link
                    href={video.video_resource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button
                      className="px-4 py-2 bg-[#62C1BF] text-[#224443] cursor-pointer rounded-full 
                   text-sm font-medium transition-colors hover:bg-[#4CA7A5]"
                    >
                      Video Resource
                    </Button>
                  </Link>
                )}

              {/* <Link
              href={video.video_resource}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block "
            >
              <Button
                className="px-4 py-2 bg-[#62C1BF] text-[#224443] cursor-pointer rounded-full 
                           text-sm font-medium transition-colors hover:bg-[#4CA7A5]"
              >
                Video Resource
              </Button>
            </Link> */}
              <Chat videoId={video?.subtitle_object_id} videoResource={video?.video_resource} />
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
    </div>
  );
}