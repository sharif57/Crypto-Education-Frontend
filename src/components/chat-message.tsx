"use client";

import { useState, useEffect } from "react";

interface MessageProps {
  message: {
    role: "user" | "assistant";
    content: string;
  };
}

export default function ChatMessage({ message }: MessageProps) {
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (message.role === "assistant" && message.content.length > 100) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  if (message.role === "user") {
    return (
      <div className="mb-4 max-w-4xl space-y-8 ">
        <div className="bg-[#62C1BF] text-[#373737] p-3 rounded-r-xl rounded-bl-xl">
          <p>{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 max-w-4xl flex items-start gap-2">
       <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="20" cy="20" r="20" fill="#62C1BF" />
          <g clip-path="url(#clip0_4263_1481)">
            <path
              d="M19.5557 8.88672C19.59 10.3162 19.3305 11.7382 18.7922 13.0712C18.2538 14.4042 17.4471 15.6221 16.4182 16.6552C15.3893 17.6883 14.1584 18.5163 12.796 19.0917C11.4337 19.6671 9.96661 19.9787 8.47876 20.0087"
              stroke="#224443"
              stroke-width="2"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
            <path
              d="M19.5557 8.88672C19.5214 10.3162 19.7809 11.7382 20.3193 13.0712C20.8576 14.4042 21.6644 15.6221 22.6933 16.6552C23.7222 17.6883 24.953 18.5163 26.3154 19.0917C27.6777 19.6671 29.1448 19.9787 30.6327 20.0087"
              stroke="#224443"
              stroke-width="2"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
            <path
              d="M19.5557 31.1307C19.59 29.7012 19.3305 28.2793 18.7922 26.9462C18.2538 25.6132 17.4471 24.3953 16.4182 23.3622C15.3893 22.3292 14.1584 21.5012 12.796 20.9258C11.4337 20.3503 9.96661 20.0387 8.47876 20.0088"
              stroke="#224443"
              stroke-width="2"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
            <path
              d="M19.5557 31.1307C19.5214 29.7012 19.7809 28.2793 20.3193 26.9462C20.8576 25.6132 21.6644 24.3953 22.6933 23.3622C23.7222 22.3292 24.953 21.5012 26.3154 20.9258C27.6777 20.3503 29.1448 20.0387 30.6327 20.0088"
              stroke="#224443"
              stroke-width="2"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
            <ellipse cx="19.5557" cy="20" rx="3" ry="7" fill="#224443" />
            <ellipse
              cx="19.5557"
              cy="20"
              rx="3"
              ry="7"
              transform="rotate(90 19.5557 20)"
              fill="#224443"
            />
          </g>
          <defs>
            <clipPath id="clip0_4263_1481">
              <rect
                width="24"
                height="24"
                fill="white"
                transform="translate(7.55566 8)"
              />
            </clipPath>
          </defs>
        </svg>
      <div className="bg-[#373737] text-[#E0E0E0] p-3 rounded-r-xl rounded-bl-xl">
       

        {isTyping ? (
          <div className="flex space-x-2 items-center">
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-75"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
          </div>
        ) : (
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: message.content }}
          />
        )}
      </div>
    </div>
  );
}
