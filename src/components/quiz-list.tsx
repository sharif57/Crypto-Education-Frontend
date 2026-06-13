'use client';

import { useQuizResultQuery } from '@/Redux/feature/quiz';
import Link from 'next/link';
import React, { useState } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

function QuizList({ id }: { id: string }) {
    const { data: result, isLoading: isResultLoading } = useQuizResultQuery(id);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    if (isResultLoading) {
        return (
            <div>
                <Skeleton className="w-full h-[88px] rounded-[12px] bg-[#2A2A2A]" />
            </div>
        );
    }

    const hasCompletedQuiz = result?.success && result?.submission_report && result.submission_report.length > 0;

    if (hasCompletedQuiz) {
        return (
            <div>
                <Link href={`/courses/${id}/quiz-result`} className="bg-[#1E1E1E] border border-[#62C1BF] px-6 py-4 cursor-pointer rounded-[12px] flex justify-between items-center transition-colors hover:bg-[#252525]">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-semibold text-white flex items-center gap-2">
                            Quiz Completed <CheckCircle2 className="w-5 h-5 text-[#62C1BF]" />
                        </h1>
                        <p className="text-sm sm:text-lg font-normal text-gray-400">View your result</p>
                    </div>
                    <div>
                        <svg width="13" height="23" viewBox="0 0 13 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.25 1.25L11.25 11.25L1.25 21.25" stroke="#62C1BF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </Link>
            </div>
        );
    }

    return (
        <>
            <div>
                <div 
                    onClick={() => setIsModalOpen(true)} 
                    className="bg-[#62C1BF] px-6 py-4 cursor-pointer rounded-[12px] flex justify-between items-center transition-colors hover:bg-[#5bc5b6]"
                >
                    <div>
                        <h1 className="text-2xl font-semibold text-[#224443]">Take Quiz</h1>
                        <p className="text-lg font-normal text-[#224443]">To earn points</p>
                    </div>
                    <div >
                        <svg width="13" height="23" viewBox="0 0 13 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.25 1.25L11.25 11.25L1.25 21.25" stroke="#224443" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[#1E1E1E] border border-[#3A3A3A] rounded-3xl p-6 sm:p-8 w-full max-w-sm shadow-2xl relative animate-in zoom-in-95 duration-200">
                        {/* Close Button */}
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        
                        <div className="flex flex-col items-center text-center mt-2">
                            {/* Icon */}
                            <div className="w-16 h-16 bg-[#263534] rounded-full flex items-center justify-center mb-6">
                                <AlertCircle className="w-8 h-8 text-[#62C1BF]" />
                            </div>
                            
                            {/* Content */}
                            <h2 className="text-2xl font-semibold text-white mb-3">Wait a moment!</h2>
                            <p className="text-[#A0A0A0] text-[15px] mb-8 leading-relaxed">
                                You can only submit this quiz <strong className="text-white">once</strong>. Are you sure you are ready to proceed?
                            </p>
                            
                            {/* Actions */}
                            <div className="flex gap-4 w-full">
                                <button 
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-3.5 px-4 rounded-xl border border-[#3A3A3A] text-white font-medium hover:bg-[#2A2A2A] transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={() => router.push(`/courses/${id}/quiz`)}
                                    className="flex-1 py-3.5 px-4 rounded-xl bg-[#62C1BF] text-[#111111] font-semibold hover:bg-[#4ea2a0] transition-colors"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default QuizList;