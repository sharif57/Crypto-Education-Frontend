/* eslint-disable @typescript-eslint/no-explicit-any */


"use client";

import { useAskAssistentQuestionMutation } from "@/Redux/feature/chatSlice";
import { useUserProfileQuery } from "@/Redux/feature/userSlice";
import { Bot, Send, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";



type Message = {
  id: number;
  text: string;
  isUser: boolean;
};

export default function Message() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. How can I help you today?",
      isUser: false,
    },
  ]);

  const { data: profileData } = useUserProfileQuery(undefined);
  const language = profileData?.data?.language || "english";

  const [askAssistentQuestion, { isLoading: isAsking }] = useAskAssistentQuestionMutation(language);

  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Hide chat on auth pages
  if (
    pathname === "/auth/create-pass" ||
    pathname === "/auth/forgot-otp" ||
    pathname === "/auth/forgot-pass" ||
    pathname === "/auth/signup" ||
    pathname === "/auth/login" ||
    pathname === "/auth/verify-email"
  ) {
    return null;
  }



  // Auto-scroll to bottom when new messages arrive

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || isAsking) return;

    const userMessage: Message = {
      id: Date.now(),
      text: newMessage.trim(),
      isUser: true,
    };

    // Add user message immediately
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");

    try {
      // Call backend API
      const response = await askAssistentQuestion({
        data: {
          question: userMessage.text
        },
        language: language,
      }).unwrap();

      const botMessage: Message = {
        id: Date.now() + 1,
        text: response.content || "Sorry, I couldn't process that.",
        isUser: false,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      console.error("AI Assistant Error:", error);

      const errorText =
        error?.data?.message ||
        error?.message ||
        "Sorry, something went wrong. Please try again later.";

      const botMessage: Message = {
        id: Date.now() + 1,
        text: errorText,
        isUser: false,
      };

      setMessages((prev) => [...prev, botMessage]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="z-[999]">
      {/* Floating Chat Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-[999] text-white rounded-full transition-all hover:scale-110 cursor-pointer shadow-2xl"
        aria-label="Open AI Assistant"
      >
        <svg
          width="110"
          height="110"
          viewBox="0 0 110 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_580_256)">
            <rect x="15" y="5" width="80" height="80" rx="40" fill="#62C1BF" />
            <path
              d="M73.1815 38.6365C73.1815 32.1095 67.8903 26.8184 61.3633 26.8184C57.5763 26.8184 54.2053 28.6044 52.0424 31.3769C61.2671 31.7336 68.6361 39.3245 68.6361 48.6365C68.6361 48.8371 68.6326 49.0369 68.6259 49.2358L69.23 49.3974C70.9869 49.8675 72.5943 48.2601 72.1242 46.5032L71.8926 45.6377C71.7056 44.9385 71.818 44.1998 72.1187 43.5415C72.8012 42.0474 73.1815 40.3864 73.1815 38.6365Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M65.9088 48.6365C65.9088 56.6698 59.3966 63.182 51.3633 63.182C49.117 63.182 46.9895 62.6728 45.0902 61.7634C44.4373 61.4509 43.6977 61.3412 42.9986 61.5283L40.7694 62.1247C39.0124 62.5948 37.4051 60.9874 37.8752 59.2305L38.4716 57.0013C38.6587 56.3021 38.549 55.5625 38.2364 54.9097C37.3271 53.0104 36.8179 50.8829 36.8179 48.6365C36.8179 40.6033 43.3301 34.0911 51.3633 34.0911C59.3966 34.0911 65.9088 40.6033 65.9088 48.6365ZM44.9997 50.4547C46.0038 50.4547 46.8179 49.6407 46.8179 48.6365C46.8179 47.6324 46.0038 46.8184 44.9997 46.8184C43.9955 46.8184 43.1815 47.6324 43.1815 48.6365C43.1815 49.6407 43.9955 50.4547 44.9997 50.4547ZM51.3633 50.4547C52.3675 50.4547 53.1815 49.6407 53.1815 48.6365C53.1815 47.6324 52.3675 46.8184 51.3633 46.8184C50.3592 46.8184 49.5451 47.6324 49.5451 48.6365C49.5451 49.6407 50.3592 50.4547 51.3633 50.4547ZM57.727 50.4547C58.7311 50.4547 59.5451 49.6407 59.5451 48.6365C59.5451 47.6324 58.7311 46.8184 57.727 46.8184C56.7228 46.8184 55.9088 47.6324 55.9088 48.6365C55.9088 49.6407 56.7228 50.4547 57.727 50.4547Z"
              fill="white"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_580_256"
              x="-1"
              y="-11"
              width="112"
              height="121"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="10" />
              <feGaussianBlur stdDeviation="7.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.391667 0 0 0 0 0.169396 0 0 0 0 0.0212153 0 0 0 0.18 0"
              />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_580_256" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_580_256" result="shape" />
            </filter>
          </defs>
        </svg>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-[140px] right-6 z-[999] w-full max-w-md rounded-2xl overflow-hidden shadow-2xl bg-[#1B1B1B]  ">
          {/* Header */}
          <div className="bg-[#62C1BF] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-black">Personal Assistant</h3>
                <p className="text-xs text-black/80">Usually responds instantly</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-white hover:bg-white/20"
              onClick={toggleChat}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages Area */}
          <div className="h-96 overflow-y-auto p-4 ">
            <div className="flex flex-col gap-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  {!message.isUser && (
                    <div className="mr-3 bg-[#62C1BF] p-2 rounded-full h-9 w-9 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl ${message.isUser
                      ? "bg-white text-black shadow-md"
                      : "bg-[#62C1BF] text-black"
                      }`}
                  >
                    <div
                      className="text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: message.text
                          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                          .replace(/^\d+\.\s+(.*?)$/gm, "<li class='ml-4'>$1</li>")
                          .replace(/\n\n/g, "<br/><br/>")
                          .replace(/\n/g, "<br/>"),
                      }}
                    />
                  </div>
                </div>
              ))}

              {/* Loading Indicator */}
              {isAsking && (
                <div className="flex justify-start">
                  <div className="mr-3 bg-[#62C1BF] p-2 rounded-full h-9 w-9 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div className="bg-[#62C1BF] text-white px-4 py-3 rounded-2xl">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4  bg-text">
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 rounded-full bg-white border border-[#FFD0B0] focus:outline-none focus:ring-2 focus:ring-[#62C1BF] text-black placeholder-gray-500"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isAsking}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isAsking || newMessage.trim() === ""}
                className="bg-black hover:bg-[#52a9a7] text-white rounded-full p-2 shadow-md disabled:opacity-50"
              >
                <Send className="h-" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}