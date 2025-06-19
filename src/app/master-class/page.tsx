"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
  isCompleted?: boolean;
  isLocked?: boolean;
}

interface Module {
  id: string;
  title: string;
  videoCount: number;
  icon: string;
  iconBg: string;
  lessons?: Lesson[];
  isCompleted?: boolean;
  progress?: number;
}

export default function MasterClass() {
  const [expandedModule, setExpandedModule] = useState<string | null>(
    "exchanges"
  );

  const modules: Module[] = [
    {
      id: "introduction",
      title: "Introduction",
      videoCount: 1,
      icon: "🎯",
      iconBg: "bg-orange-500",
      lessons: [
        {
          id: "intro-1",
          title: "Welcome to Crypto Learning Journey",
          duration: "5:30",
          videoUrl: "https://example.com/intro-video.mp4",
        },
      ],
    },
    {
      id: "crypto-basics",
      title: "Crypto Basics",
      videoCount: 27,
      icon: "📚",
      iconBg: "bg-purple-500",
      lessons: [
        {
          id: "basics-1",
          title: "What is Cryptocurrency?",
          duration: "8:45",
          videoUrl: "https://example.com/basics-1.mp4",
        },
        {
          id: "basics-2",
          title: "Blockchain Technology Explained",
          duration: "12:20",
          videoUrl: "https://example.com/basics-2.mp4",
        },
        {
          id: "basics-3",
          title: "Digital Wallets and Security",
          duration: "10:15",
          videoUrl: "https://example.com/basics-3.mp4",
        },
      ],
    },
    {
      id: "exchanges",
      title: "Exchanges",
      videoCount: 3,
      icon: "🔄",
      iconBg: "bg-blue-500",
      lessons: [
        {
          id: "exchange-1",
          title: "Facts and Background: What are virtual currencies?",
          duration: "7:22",
          videoUrl: "https://example.com/exchange-1.mp4",
        },
        {
          id: "exchange-2",
          title: "How to Choose the Right Exchange Platform",
          duration: "9:18",
          videoUrl: "https://example.com/exchange-2.mp4",
        },
        {
          id: "exchange-3",
          title: "Trading Fees and Security Measures",
          duration: "6:45",
          videoUrl: "https://example.com/exchange-3.mp4",
        },
      ],
    },
    {
      id: "cryptocurrencies",
      title: "Cryptocurrencies & Trend Coins",
      videoCount: 31,
      icon: "🪙",
      iconBg: "bg-yellow-500",
      lessons: [
        {
          id: "crypto-1",
          title: "Bitcoin: The First Cryptocurrency",
          duration: "15:30",
          videoUrl: "https://example.com/crypto-1.mp4",
        },
        {
          id: "crypto-2",
          title: "Ethereum and Smart Contracts",
          duration: "18:45",
          videoUrl: "https://example.com/crypto-2.mp4",
        },
        {
          id: "crypto-3",
          title: "Altcoins and Market Analysis",
          duration: "13:20",
          videoUrl: "https://example.com/crypto-3.mp4",
          isLocked: true,
        },
      ],
    },
    {
      id: "wallet",
      title: "Wallet",
      videoCount: 7,
      icon: "👛",
      iconBg: "bg-orange-600",
      lessons: [
        {
          id: "wallet-1",
          title: "Types of Crypto Wallets",
          duration: "11:15",
          videoUrl: "https://example.com/wallet-1.mp4",
        },
        {
          id: "wallet-2",
          title: "Setting Up Your First Wallet",
          duration: "14:30",
          videoUrl: "https://example.com/wallet-2.mp4",
        },
      ],
    },
    {
      id: "crypto-trading",
      title: "Crypto Trading",
      videoCount: 30,
      icon: "📈",
      iconBg: "bg-blue-600",
      lessons: [
        {
          id: "trading-1",
          title: "Trading Fundamentals",
          duration: "20:45",
          videoUrl: "https://example.com/trading-1.mp4",
        },
        {
          id: "trading-2",
          title: "Technical Analysis Basics",
          duration: "25:30",
          videoUrl: "https://example.com/trading-2.mp4",
        },
      ],
    },
    {
      id: "building-wealth",
      title: "Building Wealth",
      videoCount: 25,
      icon: "💰",
      iconBg: "bg-green-500",
    },
    {
      id: "making-money",
      title: "Making Money in Web3",
      videoCount: 6,
      icon: "💎",
      iconBg: "bg-cyan-500",
    },
    {
      id: "nfts",
      title: "NFTs",
      videoCount: 13,
      icon: "🖼️",
      iconBg: "bg-purple-600",
    },
    {
      id: "metaverse",
      title: "Metaverse",
      videoCount: 6,
      icon: "🌐",
      iconBg: "bg-indigo-500",
    },
  ];

  const toggleModule = (moduleId: string) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  const handleLessonClick = (lesson: Lesson) => {
    if (lesson.isLocked) {
      alert("This lesson is locked. Complete previous lessons to unlock.");
      return;
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-3">
          {modules.map((module) => {
            const isExpanded = expandedModule === module.id;
            const hasLessons = module.lessons && module.lessons.length > 0;

            return (
              <div
                key={module.id}
                className="bg-[#2a2a2a] rounded-xl overflow-hidden"
              >
                {/* Module Header */}
                <Button
                  onClick={() => toggleModule(module.id)}
                  className="w-full cursor-pointer p-4 flex items-center justify-between bg-transparent hover:bg-[#333333] transition-colors duration-200 rounded-none h-auto"
                  variant="ghost"
                >
                  <div className="flex items-center gap-4">
                    {/* Module Icon */}
                    <div className="relative">
                      <div>
                        <Image
                          src={"/images/image.png"}
                          alt={module.title}
                          width={500}
                          height={500}
                          className="object-cover w-[100px] h-[70px] object-center"
                        />
                      </div>
                    </div>

                    {/* Module Info */}
                    <div className="text-left flex-1">
                      <h3 className="text-white font-semibold text-2xl">
                        {module.title}
                      </h3>
                      <p className="text-[#62C1BF] text-lg font-normal">
                        {module.videoCount} Video
                        {module.videoCount !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  {/* Expand/Collapse Icon */}
                  <div className="text-gray-400">
                    {hasLessons ? (
                      isExpanded ? (
                        <svg
                          width="24"
                          height="13"
                          viewBox="0 0 24 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 1.5L12 11.5L22 1.5"
                            stroke="#E0E0E0"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="24"
                          height="13"
                          viewBox="0 0 24 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 1.5L12 11.5L22 1.5"
                            stroke="#E0E0E0"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )
                    ) : (
                      <svg
                        width="24"
                        height="13"
                        viewBox="0 0 24 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 1.5L12 11.5L22 1.5"
                          stroke="#E0E0E0"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </Button>

                {/* Expanded Content */}
                {isExpanded && hasLessons && (
                  <div className="px-4 pb-4">
                    <div className="space-y-2">
                      {module.lessons?.map((lesson, index) => {
                        const isLocked = lesson.isLocked;

                        return (
                          <div
                            key={lesson.id}
                            onClick={() => handleLessonClick(lesson)}
                            className={` ${
                              isLocked
                                ? "bg-[#2a2a2a] opacity-50 cursor-not-allowed"
                                : "bg-[#333333] hover:bg-[#3a3a3a]"
                            }`}
                          >
                            <Link href={`/master-class/${lesson.id}`} className="flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 cursor-pointer">
                              {/* Play Button / Status */}
                              <div className="flex-shrink-0">
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
                              </div>

                              {/* Lesson Info */}
                              <div className="flex-1">
                                <p className="text-white text-sm font-medium leading-relaxed">
                                  {lesson.title}
                                </p>
                                <p className="text-gray-400 text-xs">
                                  {lesson.duration}
                                </p>
                              </div>

                              {/* Lesson Number */}
                              <div className="text-gray-500 text-xs">
                                {index + 1}
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
