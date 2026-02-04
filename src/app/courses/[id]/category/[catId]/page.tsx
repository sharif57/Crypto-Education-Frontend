
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProgressUpdateMutation, useSingleVideoQuery } from "@/Redux/feature/categoryVideoSlice";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronUp, ChevronDown, Play, ArrowRight } from "lucide-react";
import Loading from "@/components/Loading";
import Chat from "@/components/chat";
import Link from "next/link";

interface RelatedVideo {
  id: number | string;
  object_id?: string;
  title: string;
  duration_seconds: number;
  video_file?: string;
  created_at?: string;
  progress?: {
    is_completed?: boolean;
    seconds_watched?: number;
  };
  [key: string]: unknown;
}


export default function VideoDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.catId as string;
  const [expandedModule, setExpandedModule] = useState<string | null>('related-videos');
  const [currentTime, setCurrentTime] = useState<number>(0);

  const { data, isLoading, isError } = useSingleVideoQuery(id);

  const [progressUpdate] = useProgressUpdateMutation();


  const handleProgressUpdate = async (videoId: string, isCompleted: boolean) => {
    try {
      await progressUpdate({ video: videoId, is_completed: isCompleted }).unwrap();

      // Find the first incomplete video from related videos
      const incompleteVideos = data?.related_videos?.filter((v: RelatedVideo) => !v.progress?.is_completed) || [];

      let nextVideo = null;
      if (incompleteVideos.length > 0) {
        // Navigate to first incomplete video
        nextVideo = incompleteVideos[0];
      } else if (data?.related_videos && data.related_videos.length > 0) {
        // If all are completed, navigate to first video
        nextVideo = data.related_videos[0];
      }

      if (nextVideo?.object_id) {
        const courseId = params?.id as string;
        router.push(`/courses/${courseId}/category/${nextVideo.object_id}`);
      }
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };




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

  // Calculate video watch percentage using real-time currentTime
  const watchPercentage = video?.duration_seconds
    ? (currentTime / video.duration_seconds) * 100
    : 0;
  const isVideoWatched50Percent = watchPercentage >= 50 || video?.progress?.is_completed;

  // Sort related videos: incomplete first (by created_at asc), then completed (by created_at asc)
  const sortedRelatedVideos = [...relatedVideos].sort((a, b) => {
    const aCompleted = a.progress?.is_completed ? 1 : 0;
    const bCompleted = b.progress?.is_completed ? 1 : 0;

    // If completion status is different, incomplete videos come first
    if (aCompleted !== bCompleted) {
      return aCompleted - bCompleted;
    }

    // If same completion status, sort by created_at ascending (oldest first)
    const aDate = new Date(a.created_at || 0).getTime();
    const bDate = new Date(b.created_at || 0).getTime();
    return aDate - bDate;
  });

  return (
    <div className="w-full  bg-gradient-to-b from-[#326866] to-[#1B1B1B]">
      <div className="container pt-[100px] lg:pt-[120px] mx-auto lg:px-8 px-4 text-white relative ">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 p-3 sm:p-4">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            size="sm"
            className="text-text hover:text-white bg-none hover:bg-red border border-text !px-4 sm:!px-8 rounded-full py-2.5 sm:py-5 text-xs sm:text-sm"
          >
            <ArrowLeft className="w-5 sm:w-8 h-4 mr-2" />
            Back
          </Button>
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            <span className="text-white font-medium text-sm sm:text-base">{video.category_name}</span>
            <span className="text-gray-400 text-sm sm:text-base">•</span>
            <span className="text-text text-xs sm:text-base">{totalVideos} Video{totalVideos !== 1 ? 's' : ''}</span>
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
                  onTimeUpdate={(e) => setCurrentTime((e.target as HTMLVideoElement).currentTime)}
                >
                  <source src={video?.video_file} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>

          {/* Video Title and Chat */}
          <div className="lg:flex items-start justify-between gap-8">
            <div className="flex-1 ">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                <h1 className="text-2xl lg:text-4xl font-medium text-white ">
                  {video.title}
                </h1>
                {!isVideoWatched50Percent && (
                  <p className="text-[10px] sm:text-xs text-gray-400 sm:text-right">
                    Watch 50% to continue ({Math.round(watchPercentage)}%)
                  </p>
                )}
              </div>
              <div className="text-text flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-2 border-b-2 border-[#7D7D7D] pb-4 mt-4">
                <p className="text-sm sm:text-base">Duration: {Math.floor(video?.duration_seconds / 60)}m {video?.duration_seconds % 60}s</p>

                <div className="flex flex-wrap gap-2 sm:gap-4 items-center justify-start sm:justify-end">

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


                  {/* <Chat videoId={video?.subtitle_object_id} videoResource={video?.video_resource} /> */}
                  <Chat
                    videoId={video?.subtitle_object_id ?? ""}
                    videoResource={
                      typeof video?.video_resource === "string"
                        ? video.video_resource
                        : ""
                    }
                  />

                  {/* <Link href={`/courses/${id}/category/${id}`}> */}
                  <div className="flex flex-col items-start gap-1">
                    <Button
                      onClick={() => handleProgressUpdate(video?.object_id ?? "", true)}
                      disabled={!isVideoWatched50Percent}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isVideoWatched50Percent
                        ? 'bg-[#62C1BF] text-[#224443] cursor-pointer hover:bg-[#4CA7A5]'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'
                        }`}
                    >
                      Next Video
                      <ArrowRight className="w-8 h-4 mr-2" />
                    </Button>

                  </div>
                  {/* </Link> */}

                </div>
              </div>
            </div>

          </div>

          {/* Module List */}
          <div className="space-y-3 mt-8 w-full lg:w-2/3">
            <h2 className="text-xl font-medium text-white mb-4">Course Modules</h2>



            {/* Related Videos as additional modules */}
            <div className={`bg-[#2a2a2a] rounded-xl overflow-hidden border transition-colors ${expandedModule === 'related-videos' ? 'border-[#62C1BF]' : 'border-[#3a3a3a]'
              }`}>
              <button
                onClick={() => toggleModule('related-videos')}
                className="w-full p-3 sm:p-4 flex items-center justify-between hover:bg-[#333333] transition-colors"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-[#62C1BF] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl sm:text-2xl">📚</span>
                  </div>
                  <div className="text-left min-w-0">
                    <h3 className="text-white font-medium text-sm sm:text-base">{data?.data?.category_name || "Up Next Videos"}</h3>
                    <p className="text-[#62C1BF] text-xs sm:text-sm">
                      {data.related_videos?.length || 0} Video{data.related_videos?.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <span className="text-gray-400 transition-transform">
                  {expandedModule === 'related-videos' ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </span>
              </button>

              {expandedModule === 'related-videos' && (
                <div className="px-3 sm:px-4 pb-4 space-y-2 border-t border-[#3a3a3a]">
                  {sortedRelatedVideos?.map((video: RelatedVideo) => (
                    <button
                      key={video?.object_id}
                      onClick={() => {
                        if (video?.object_id) {
                          const courseId = params?.id as string;
                          router.push(`/courses/${courseId}/category/${video.object_id}`);
                        }
                      }}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors group ${video.progress?.is_completed
                        ? 'bg-[#2a3a2a] hover:bg-[#2f4a2f]'
                        : 'bg-[#333333] hover:bg-[#3a3a3a]'
                        }`}
                    >
                      <div className={`w-7 sm:w-8 h-7 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${video.progress?.is_completed
                        ? 'bg-green-600'
                        : 'bg-[#62C1BF]'
                        }`}>
                        {video.progress?.is_completed ? (
                          <span className="text-white text-sm">✓</span>
                        ) : (
                          <Play className="w-3 sm:w-4 h-3 sm:h-4 text-black fill-black ml-0.5" />
                        )}
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <p className="text-white text-xs sm:text-sm font-medium truncate group-hover:text-[#62C1BF] transition-colors">
                          {video.title}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {Math.floor(video.duration_seconds / 60)}m {video.duration_seconds % 60}s
                        </p>
                      </div>
                      <p className="text-xs text-green-500">{video?.progress?.is_completed ? 'already completed' : ''}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
