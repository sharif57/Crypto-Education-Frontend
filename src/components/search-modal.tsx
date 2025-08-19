"use client";

import type React from "react";

import { useRef, useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useSearchChatQuery } from "@/Redux/feature/chatSlice";
import Link from "next/link";

interface SearchModalProps {
  onClose: () => void;
}
interface Chat {
  object_id: string;
  name: string;
}

export default function SearchModal({ onClose }: SearchModalProps) {
  
  const inputRef = useRef<HTMLInputElement>(null);
  console.log("SearchModal rendered", inputRef?.current?.value);
  const modalRef = useRef<HTMLDivElement>(null);
  const [searValue, setSearchValue] = useState("");

  const {data} = useSearchChatQuery(searValue);
  console.log("Search results:", data);

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
            <Search  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              ref={inputRef}
              onChange={(e) => setSearchValue(e.target.value)}
              value={searValue}
              autoFocus
              type="text"
              placeholder="Search chat"
              className="w-full bg-[#373737] text-white pl-10 pr-4 py-2 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#373737]"
            />
          </div>
        </div>

   

        {/* Chat history */}
        <div className="max-h-96 mt-6 overflow-y-auto scrollbar-hide">
          <h3 className="px-4 py-2 text-sm font-medium text-gray-400">Today</h3>
          <ul>
            {data?.data?.map((chat: Chat) => (
              <li key={chat.object_id}>
                <Link href={`/chat/${chat.object_id}`} className="w-full cursor-pointer text-left px-4 py-2 hover:bg-[#005163] transition-colors flex items-center">
                  <Search className="h-4 w-4 mr-3 text-gray-400" />
                  <span className="text-sm">{chat.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
