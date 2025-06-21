"use client";

import type React from "react";

import { useRef, useEffect } from "react";
import { Search } from "lucide-react";

interface SearchModalProps {
  onClose: () => void;
}

export default function SearchModal({ onClose }: SearchModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Focus the input when modal opens
    inputRef.current?.focus();

    // Close modal on escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Close the modal if the click is on the overlay (not on the modal content)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const chatHistory = [
    "Chat name",
    "Chat name",
    "Chat name",
    "Chat name",
    "Chat name",
    "Chat name",
    "Chat name",
    "Chat name",
  ];

  const handleNewChat = () => {
    onClose();
    // Logic to start a new chat would go here
  };

  return (
    <div
      className="fixed inset-0  bg-opacity-50 flex items-start justify-center  pt-20 z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="bg-gradient-to-b z-10  from-[#1A1A1A] via-[#1A1A1A] to-[#3f3d3d] border border-[#62C1BF] w-full max-w-2xl mx-auto  shadow-xl rounded-3xl p-4 overflow-hidden"
      >
        {/* Search input */}
        <div className="p-3  border-[#006A82]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search chat"
              className="w-full bg-[#373737] text-white pl-10 pr-4 py-2 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#373737]"
            />
          </div>
        </div>

        {/* New Chat button */}
        <button
          onClick={handleNewChat}
          className="lg:w-1/4 w-full p-3  flex items-center gap-3 rounded-3xl bg-text transition-colors "
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"
              stroke="#224443"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.0399 3.02025L8.15988 10.9003C7.85988 11.2003 7.55988 11.7903 7.49988 12.2203L7.06988 15.2303C6.90988 16.3203 7.67988 17.0803 8.76988 16.9303L11.7799 16.5003C12.1999 16.4403 12.7899 16.1403 13.0999 15.8403L20.9799 7.96025C22.3399 6.60025 22.9799 5.02025 20.9799 3.02025C18.9799 1.02025 17.3999 1.66025 16.0399 3.02025Z"
              stroke="#224443"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.9099 4.15039C15.5799 6.54039 17.4499 8.41039 19.8499 9.09039"
              stroke="#224443"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span className="text-lg text-[#224443] font-normal">New Chat</span>
        </button>

        {/* Chat history */}
        <div className="max-h-96 mt-6 overflow-y-auto scrollbar-hide">
          <h3 className="px-4 py-2 text-sm font-medium text-gray-400">Today</h3>
          <ul>
            {chatHistory.map((chat, index) => (
              <li key={index}>
                <button className="w-full text-left px-4 py-2 hover:bg-[#005163] transition-colors flex items-center">
                  <Search className="h-4 w-4 mr-3 text-gray-400" />
                  <span className="text-sm">{chat}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
