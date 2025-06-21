"use client";

import { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import Link from "next/link";

interface ChatSidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  setIsSearchModalOpen: (isOpen: boolean) => void;
}

export default function ChatSidebar({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  setIsSearchModalOpen,
}: ChatSidebarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const chatGroups = {
    today: Array(8)
      .fill(0)
      .map((_, i) => `Chat name ${i + 1}`),
    yesterday: Array(8)
      .fill(0)
      .map((_, i) => `Chat name ${i + 1}`),
    previous: Array(8)
      .fill(0)
      .map((_, i) => `Chat name ${i + 1}`),
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className={`
        fixed md:static top-0 left-0 h-full bg-gradient-to-b   from-[#161616] via-[#2c2c2c] to-[#3f3d3d] w-64 z-30
        transform transition-transform duration-300 ease-in-out
        ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }
      `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4  ">
            <Link href="/">
              {" "}
              <Image
                src="/images/sidebatlogo.png"
                alt="Logo"
                width={400}
                height={400}
                className="object-cover object-center p-4"
              />{" "}
            </Link>
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchModalOpen(true);
                }}
                className="p-2 rounded-full hover:bg-[#005163] transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-[#005163] transition-colors">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 2.72461H9C4 2.72461 2 4.72461 2 9.72461V15.7246C2 20.7246 4 22.7246 9 22.7246H15C20 22.7246 22 20.7246 22 15.7246V13.7246"
                    stroke="#F5FDFF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.04 3.74486L8.16 11.6249C7.86 11.9249 7.56 12.5149 7.5 12.9449L7.07 15.9549C6.91 17.0449 7.68 17.8049 8.77 17.6549L11.78 17.2249C12.2 17.1649 12.79 16.8649 13.1 16.5649L20.98 8.68486C22.34 7.32486 22.98 5.74486 20.98 3.74486C18.98 1.74486 17.4 2.38486 16.04 3.74486Z"
                    stroke="#F5FDFF"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.91 4.875C15.58 7.265 17.45 9.135 19.85 9.815"
                    stroke="#F5FDFF"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Chat Sections */}
          <div className="flex-1 overflow-y-auto scrollbar-hide no-scrollbar    ">
            <div className="p-4">
              <h2 className="text-sm font-medium mb-2">Today</h2>
              <ul className="space-y-1">
                {chatGroups.today.map((chat, index) => (
                  <li key={`today-${index}`} className="relative group">
                    <button className="w-full text-left py-2 px-3 rounded hover:bg-[#005163] transition-colors text-sm flex items-center justify-between">
                      <span>{chat}</span>
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenu(
                              activeMenu === `today-${index}`
                                ? null
                                : `today-${index}`
                            );
                          }}
                          className="opacity-0 group-hover:opacity-100 focus:opacity-100 p-1 rounded-full hover:bg-[#006A82]"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="19" cy="12" r="1"></circle>
                            <circle cx="5" cy="12" r="1"></circle>
                          </svg>
                        </button>

                        {activeMenu === `today-${index}` && (
                          <div className="absolute right-0 mt-1 w-32 bg-[#004050] rounded-md shadow-lg z-10 py-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle edit
                                setActiveMenu(null);
                              }}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-[#005163]"
                            >
                              Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle delete
                                setActiveMenu(null);
                              }}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-[#005163] text-red-400"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4">
              <h2 className="text-sm font-medium mb-2">Yesterday</h2>
              <ul className="space-y-1">
                {chatGroups.yesterday.map((chat, index) => (
                  <li key={`yesterday-${index}`} className="relative group">
                    <button className="w-full text-left py-2 px-3 rounded hover:bg-[#005163] transition-colors text-sm flex items-center justify-between">
                      <span>{chat}</span>
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenu(
                              activeMenu === `yesterday-${index}`
                                ? null
                                : `yesterday-${index}`
                            );
                          }}
                          className="opacity-0 group-hover:opacity-100 focus:opacity-100 p-1 rounded-full hover:bg-[#006A82]"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="19" cy="12" r="1"></circle>
                            <circle cx="5" cy="12" r="1"></circle>
                          </svg>
                        </button>

                        {activeMenu === `yesterday-${index}` && (
                          <div className="absolute right-0 mt-1 w-32 bg-[#004050] rounded-md shadow-lg z-10 py-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle edit
                                setActiveMenu(null);
                              }}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-[#005163]"
                            >
                              Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle delete
                                setActiveMenu(null);
                              }}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-[#005163] text-red-400"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4">
              <h2 className="text-sm font-medium mb-2">Previous 7 days</h2>
              <ul className="space-y-1">
                {chatGroups.previous.map((chat, index) => (
                  <li key={`previous-${index}`} className="relative group">
                    <button className="w-full text-left py-2 px-3 rounded hover:bg-[#005163] transition-colors text-sm flex items-center justify-between">
                      <span>{chat}</span>
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenu(
                              activeMenu === `previous-${index}`
                                ? null
                                : `previous-${index}`
                            );
                          }}
                          className="opacity-0 group-hover:opacity-100 focus:opacity-100 p-1 rounded-full hover:bg-[#006A82]"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="19" cy="12" r="1"></circle>
                            <circle cx="5" cy="12" r="1"></circle>
                          </svg>
                        </button>

                        {activeMenu === `previous-${index}` && (
                          <div className="absolute right-0 mt-1 w-32 bg-[#004050] rounded-md shadow-lg z-10 py-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle edit
                                setActiveMenu(null);
                              }}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-[#005163]"
                            >
                              Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle delete
                                setActiveMenu(null);
                              }}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-[#005163] text-red-400"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* User Profile */}
          <div className="p-4 border-t border-[#006A82] flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-400 mr-3 overflow-hidden">
              <Image
                src="/placeholder.svg?height=32&width=32"
                alt="User avatar"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <span className="text-sm">Marvin McKinney</span>
          </div>
        </div>
      </div>
    </>
  );
}
