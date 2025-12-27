"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Bot, MoreVertical, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

type Message = {
  id: number;
  text: string;
  isUser: boolean;
};

// AIzaSyAAqfA0f2nbOjMPPKKGR_qQh2K3Ag3X2w0

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
  const [newMessage, setNewMessage] = useState("");
  const [isLoading,] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // "/auth/create-pass",
  //     "/auth/forgot-otp",
  //     "/auth/forgot-pass",
  //     "/auth/signup",
  //     "/auth/login",
  //     "/auth/verify-email",

  if (pathname === "/auth/create-pass" ||
    pathname === "/auth/forgot-otp" ||
    pathname === "/auth/forgot-pass" ||
    pathname === "/auth/signup" ||
    pathname === "/auth/login" ||
    pathname === "/auth/verify-email") {
    return null;
  }

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      isUser: true,
    };
    setMessages([...messages, userMessage]);
    setNewMessage("");

    // Get bot response


  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  console.log(messages);

  return (
    <div className="z-[999]">
      {isOpen && (
        <div className="">
          <div className="fixed bottom-[120px] z-[999] lg:right-8  w-full max-w-md rounded-lg overflow-hidden shadow-lg bg-[#FFF0E6] border border-text">
            <div className="bg-text p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-text p-1.5 rounded-full">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <span className="font-medium text-white">
                  Personal Assistant
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                >
                  <MoreVertical className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={toggleChat}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="h-96 overflow-y-auto p-3 bg-[#FFF0E6]">
              <div className="flex flex-col gap-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? "justify-end" : "justify-start"
                      }`}
                  >
                    {!message.isUser && (
                      <div className="mr-2 bg-text p-1.5 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-1 rounded-lg ${message.isUser
                        ? "bg-white text-black"
                        : "bg-text text-white"
                        }`}
                    >
                      {/* <p className='text-sm'>{message.text}</p>  */}

                      {/* formatted response */}
                      <div
                        className={`max-w-full p-1 rounded-xl leading-relaxed text-sm ${message.isUser ? "bg-white text-black" : " text-white"
                          }`}
                        dangerouslySetInnerHTML={{
                          __html: message.text
                            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                            .replace(/- (.*?)\n/g, "<li>$1</li>")
                            .replace(/\n{2,}/g, "<br/><br/>")
                            .replace(/\n/g, "<br/>"),
                        }}
                      />
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="mr-2 bg-text p-1.5 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div className="max-w-[80%] p-3 rounded-lg bg-text text-white">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-white animate-bounce"></div>
                        <div
                          className="w-2 h-2 rounded-full bg-white animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-white animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* {/ Input area /} */}
            <div className="p-3 border-t border-[#FFD0B0] bg-[#FFF0E6]">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Your message..."
                  className="flex-1 p-3 text-black rounded-full border border-[#FFD0B0] bg-white focus:outline-none focus:ring-2 focus:ring-text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-transparent hover:bg-transparent p-2"
                  disabled={isLoading}
                >
                  <Send className="h-6 w-6 text-text" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* {/ Chat button /} */}
      <button
        onClick={toggleChat}
        className="fixed z-[999] bottom-0 right-3  text-white p-4 rounded-full transition-colors cursor-pointer"
      >
        {/* <div className='relative'>
          <Bot className='h-6 w-6' /> gfgd
        </div> */}

        <svg
          width="110"
          height="110"
          viewBox="0 0 110 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_580_256)">
            <rect
              x="15"
              y="5"
              width="80"
              height="80"
              rx="40"
              fill="#62C1BF"
              shapeRendering="crispEdges"
            />
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
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_580_256"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_580_256"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </button>
    </div>
  );
}