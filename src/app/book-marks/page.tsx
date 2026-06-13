/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useSaveVideoListQuery } from '@/Redux/feature/bookingSlice';
import React from 'react';
import Link from 'next/link';

export default function BookMarksPage() {
    const { data, isLoading } = useSaveVideoListQuery(undefined);

    if (isLoading) {
        return <div className="min-h-screen flex justify-center items-center text-white bg-[#111111]">Loading...</div>;
    }

    const savedVideos = data || [];

    return (
        <div className="w-full min-h-screen flex justify-center items-start pt-28 sm:pt-36 pb-12 px-4 sm:px-6">
            <div className="w-full max-w-[800px] bg-[#373737] rounded-2xl p-6 sm:p-10 l">
                {savedVideos.length === 0 ? (
                    <div className="text-center text-gray-400 py-8">No saved videos found.</div>
                ) : (
                    <div className="flex flex-col">
                        {savedVideos.map((video: any, index: number) => {
                            const minutes = Math.floor(video.duration_seconds / 60);
                            return (
                                <React.Fragment key={video.video_id || index}>
                                    <Link
                                        href={`/courses/${video.course}/category/${video.object_id}`}
                                        className="flex items-center gap-4 sm:gap-6 py-5 border-b border-[#7D7D7D] group transition-colors hover:bg-[#323232]  px-4 -mx-4"
                                    >
                                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="40" height="40" rx="10" fill="#373737" />
                                            <circle cx="20" cy="20" r="19.1169" stroke="#62C1BF" strokeWidth="1.76627" />
                                            <path d="M14.7295 15.0811C14.7295 14.2753 15.5775 13.7512 16.2983 14.1115L26.8184 19.3716C27.6174 19.7711 27.6174 20.9113 26.8184 21.3108L16.2983 26.5708C15.5775 26.9312 14.7295 26.4071 14.7295 25.6013V15.0811Z" fill="#62C1BF" />
                                        </svg>

                                        <div className="flex flex-col">
                                            <h2 className="text-[#F3F3F3] text-base sm:text-[18px] font-medium group-hover:text-[#62C1BF] transition-colors leading-snug line-clamp-2">
                                                {video.category_name ? `${video.category_name}: ` : ''}{video.title}
                                            </h2>
                                            <span className="text-[#A0A0A0] text-xs sm:text-[13px] mt-1.5">{minutes}min</span>
                                        </div>
                                    </Link>
                                    {index < savedVideos.length - 1 && (
                                        <div className="w-full h-[1px] bg-[#3A3A3A] my-1" />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
