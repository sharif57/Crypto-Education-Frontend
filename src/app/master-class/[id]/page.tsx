"use client";

import type React from "react";

import { useState } from "react";
import { ChevronDown, ChevronUp, Play, ArrowLeft, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {  useRouter } from "next/navigation";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function Component() {
//   const { id } = useParams();
  const [expandedModule, setExpandedModule] = useState("exchanges");
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Lorem ipsum dolor sit amet consectetur. Morbi ut habitant arcu nec imperdiet diam lorem ipsum dolor sit amet consectetur.",
      isUser: false,
      timestamp: new Date(),
    },
    {
      id: "2",
      text: "Lorem ipsum dolor sit amet consectetur. A elit quis dignissim egestas quis. Suspendisse est dapibus faucibus purus interdum imperdiet ut leo sit. Pharetra vel justo lectus gravida mauris gravida consectetur. Nunc mauris nunc cursus mauris risus. Diam ultrices ut ut eget sed tortor. Eget viverra quam posuere et. Nunc mauris nunc cursus mauris.",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const modules = [
    {
      id: "introduction",
      title: "Introduction",
      videoCount: 1,
      icon: "🎯",
      iconBg: "bg-orange-500",
    },
    {
      id: "crypto-basics",
      title: "Crypto Basics",
      videoCount: 27,
      icon: "📚",
      iconBg: "bg-purple-500",
    },
    {
      id: "exchanges",
      title: "Exchanges",
      videoCount: 3,
      icon: "🔄",
      iconBg: "bg-blue-500",
      lessons: [
        "Facts and Background: What are virtual currencies?",
        "Facts and Background: What are virtual currencies?",
        "Facts and Background: What are virtual currencies?",
      ],
    },
    {
      id: "cryptocurrencies",
      title: "Cryptocurrencies & Trend Coins",
      videoCount: 35,
      icon: "🪙",
      iconBg: "bg-yellow-500",
    },
  ];

  const toggleModule = (moduleId: string) => {
    setExpandedModule(expandedModule === moduleId ? "" : moduleId);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Simulate API call - replace with your actual API endpoint
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputMessage,
          context: "video learning about cryptocurrency exchanges",
        }),
      });

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text:
          data.response ||
          "I'm here to help you understand the video content better. What would you like to know?",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      // Fallback response if API fails
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm here to help you understand the video content better. What would you like to know about cryptocurrency exchanges?",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  const router = useRouter();

  return (
    <div className="container mt-[100px] lg:mt-[120px]  mx-auto lg:px-8 px-4  text-white relative">
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
          <span className="text-white font-medium">Exchanges</span>
          <span className="text-gray-400">•</span>
          <span className="text-text">3 Videos</span>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Video Player */}
        <div className="bg-black rounded-xl overflow-hidden relative">
          <div className="aspect-video relative">
            <video
              className="w-full h-full object-cover"
              controls
              poster="/placeholder.svg?height=400&width=800"
              controlsList="nodownload"
              autoPlay
            >
              <source
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Video Title and Completion */}
        <div className="lg:flex items-center justify-between border-b border-text space-y-8">
          <h1 className="lg:text-4xl font-medium text-white">
            How to ride your skateboard and Basic Equipment
          </h1>
          <Button
            onClick={() => setIsAIModalOpen(true)}
            className="px-4 py-2 mb-8 bg-[#62C1BF] text-[#224443] cursor-pointer rounded-full text-sm font-medium transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_4244_2443)">
                <path
                  d="M12 0.886719C12.0343 2.31622 11.7749 3.73818 11.2365 5.07121C10.6981 6.40424 9.89139 7.62213 8.86249 8.65521C7.8336 9.68829 6.60274 10.5163 5.24038 11.0917C3.87803 11.6671 2.41094 11.9787 0.923096 12.0087"
                  stroke="#224443"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                />
                <path
                  d="M12.0001 0.886719C11.9658 2.31622 12.2252 3.73818 12.7636 5.07121C13.302 6.40424 14.1087 7.62213 15.1376 8.65521C16.1665 9.68829 17.3974 10.5163 18.7597 11.0917C20.1221 11.6671 21.5892 11.9787 23.077 12.0087"
                  stroke="#224443"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                />
                <path
                  d="M12 23.1307C12.0343 21.7012 11.7749 20.2793 11.2365 18.9462C10.6981 17.6132 9.89139 16.3953 8.86249 15.3622C7.8336 14.3292 6.60274 13.5012 5.24038 12.9258C3.87803 12.3503 2.41094 12.0387 0.923096 12.0088"
                  stroke="#224443"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                />
                <path
                  d="M12.0001 23.1307C11.9658 21.7012 12.2252 20.2793 12.7636 18.9462C13.302 17.6132 14.1087 16.3953 15.1376 15.3622C16.1665 14.3292 17.3974 13.5012 18.7597 12.9258C20.1221 12.3503 21.5892 12.0387 23.077 12.0088"
                  stroke="#224443"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                />
                <ellipse cx="12" cy="12" rx="3" ry="7" fill="#224443" />
                <ellipse
                  cx="12"
                  cy="12"
                  rx="3"
                  ry="7"
                  transform="rotate(90 12 12)"
                  fill="#224443"
                />
              </g>
              <defs>
                <clipPath id="clip0_4244_2443">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            AI Assistant
          </Button>
        </div>
        {/* AI Assistant Modal - Right Side Positioned */}
        {isAIModalOpen && (
          <div className="absolute lg:top-2/5 top-0 h-[500px] border-text lg:right-12 right-4 lg:w-[400px] w-[300px] z-20   rounded-xl border  flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 bg-[#62C1BF] rounded-t-xl text-[#224443]">
              <div className="flex items-center gap-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_4244_2443)">
                    <path
                      d="M12 0.886719C12.0343 2.31622 11.7749 3.73818 11.2365 5.07121C10.6981 6.40424 9.89139 7.62213 8.86249 8.65521C7.8336 9.68829 6.60274 10.5163 5.24038 11.0917C3.87803 11.6671 2.41094 11.9787 0.923096 12.0087"
                      stroke="#224443"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12.0001 0.886719C11.9658 2.31622 12.2252 3.73818 12.7636 5.07121C13.302 6.40424 14.1087 7.62213 15.1376 8.65521C16.1665 9.68829 17.3974 10.5163 18.7597 11.0917C20.1221 11.6671 21.5892 11.9787 23.077 12.0087"
                      stroke="#224443"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 23.1307C12.0343 21.7012 11.7749 20.2793 11.2365 18.9462C10.6981 17.6132 9.89139 16.3953 8.86249 15.3622C7.8336 14.3292 6.60274 13.5012 5.24038 12.9258C3.87803 12.3503 2.41094 12.0387 0.923096 12.0088"
                      stroke="#224443"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12.0001 23.1307C11.9658 21.7012 12.2252 20.2793 12.7636 18.9462C13.302 17.6132 14.1087 16.3953 15.1376 15.3622C16.1665 14.3292 17.3974 13.5012 18.7597 12.9258C20.1221 12.3503 21.5892 12.0387 23.077 12.0088"
                      stroke="#224443"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                    />
                    <ellipse cx="12" cy="12" rx="3" ry="7" fill="#224443" />
                    <ellipse
                      cx="12"
                      cy="12"
                      rx="3"
                      ry="7"
                      transform="rotate(90 12 12)"
                      fill="#224443"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4244_2443">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="font-medium">AI Assistant</span>
              </div>
              <Button
                onClick={() => setIsAIModalOpen(false)}
                variant="ghost"
                size="sm"
                className="text-[#224443] hover:text-[#224443] hover:bg-[#4a9a98] p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className=" overflow-auto  p-4 space-y-4  bg-[#2a2a2a]">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex
                    justify-start
                  }`}
                >
                  <div className="flex items-start gap-2 max-w-[100%]">
                    {!message.isUser && (
                      <div className="w-8 h-8 bg-[#62C1BF]  rounded-full flex items-center justify-center flex-shrink-0">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <ellipse
                            cx="12"
                            cy="12"
                            rx="3"
                            ry="7"
                            fill="#224443"
                          />
                          <ellipse
                            cx="12"
                            cy="12"
                            rx="3"
                            ry="7"
                            transform="rotate(90 12 12)"
                            fill="#224443"
                          />
                        </svg>
                      </div>
                    )}
                    {message.isUser && (
                      <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-medium">
                          U
                        </span>
                      </div>
                    )}
                    <div
                      className={`p-3 rounded-r-3xl rounded-bl-3xl text-sm leading-relaxed ${
                        message.isUser
                          ? "bg-[#373737] text-[12px] font-normal text-[#E0E0E0]"
                          : "bg-[#62C1BF] text-[12px] font-normal text-[#373737]"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex  justify-start">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 bg-[#62C1BF] rounded-full flex items-center justify-center">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <ellipse cx="12" cy="12" rx="3" ry="7" fill="#224443" />
                        <ellipse
                          cx="12"
                          cy="12"
                          rx="3"
                          ry="7"
                          transform="rotate(90 12 12)"
                          fill="#224443"
                        />
                      </svg>
                    </div>
                    <div className="bg-[#333333] text-white p-3 rounded-lg text-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-[#2a2a2a] rounded-xl  border-t border-gray-600">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about the current video..."
                  className="flex-1 bg-[#333333] text-white px-3 py-2 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#62C1BF]"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-[#62C1BF] hover:bg-[#4a9a98] text-[#224443] px-3 py-2 rounded-lg"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Module List */}
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
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-[#333333] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 ${module.iconBg} rounded-lg flex items-center justify-center`}
                    >
                      <span className="text-2xl">{module.icon}</span>
                    </div>

                    {/* Info */}
                    <div className="text-left">
                      <h3 className="text-white font-medium">{module.title}</h3>
                      <p className="text-gray-400 text-sm">
                        {module.videoCount} Videos
                      </p>
                    </div>
                  </div>

                  {/* Arrow */}
                  {hasLessons && (
                    <div className="text-gray-400">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  )}
                </button>

                {/* Expanded Lessons */}
                {isExpanded && hasLessons && (
                  <div className="px-4 pb-4 space-y-2">
                    {module.lessons.map((lesson, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-[#333333] rounded-lg hover:bg-[#3a3a3a] transition-colors cursor-pointer"
                      >
                        <div className="w-8 h-8 bg-[#4ade80] rounded-full flex items-center justify-center">
                          <Play className="w-4 h-4 text-black fill-black ml-0.5" />
                        </div>
                        <span className="text-white text-sm">{lesson}</span>
                      </div>
                    ))}
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
