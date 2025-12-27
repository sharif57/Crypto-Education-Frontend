"use client";

import { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import Link from "next/link";
import { useAllSessionsQuery, useCreateSessionMutation, useDeleteSessionMutation, useEditSessionMutation } from "@/Redux/feature/chatSlice";
import { toast } from "sonner";
import { useUserProfileQuery } from "@/Redux/feature/userSlice";

interface ChatSession {
  object_id: string;
  name: string;
  created_at: string;
  user: number;
}

interface ChatGroups {
  today: ChatSession[];
  yesterday: ChatSession[];
  previous: ChatSession[];
}

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
  const [editingSession, setEditingSession] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");
  const { data, isLoading, error } = useAllSessionsQuery(undefined);
  const [createSession] = useCreateSessionMutation();
  const [deleteSession] = useDeleteSessionMutation();
  const [editSession] =useEditSessionMutation();
    const { data: userProfileData } = useUserProfileQuery(undefined)
    console.log(userProfileData?.data, 'profile')
    const user = userProfileData?.data

  const handleCreateSession = async () => {
    try {
      const res = await createSession({}).unwrap();
      localStorage.setItem("session_id", res?.object_id);
      toast.success("Session created successfully!");
      window.location.href = "/chat";
    } catch (error) {
      console.error("Failed to create session:", error);
      toast.error("Failed to create session.");
    }
  };

  const handleDeleteSession = async (session_id: string) => {
    try {
      await deleteSession(session_id).unwrap();
      toast.success("Session deleted successfully!");
      setActiveMenu(null);
    } catch (error) {
      console.error("Failed to delete session:", error);
      toast.error("Failed to delete session.");
    }
  };

  const handleEditSession = async (session_id: string, newTitle: string) => {
    try {
       await editSession({ session_id, name: newTitle }).unwrap();
      toast.success("Session title updated successfully!");
      setEditingSession(null);
      setActiveMenu(null);
    } catch (error) {
      console.error("Failed to update session:", error);
      toast.error("Failed to update session.");
    }
  };

  const chatGroups: ChatGroups = data || { today: [], yesterday: [], previous: [] };

  // Handle click on the three-dot menu button
  const handleMenuButtonClick = (e: React.MouseEvent, sessionId: string, group: string) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveMenu(activeMenu === `${group}-${sessionId}` ? null : `${group}-${sessionId}`);
    setEditTitle(chatGroups[group as keyof ChatGroups].find(c => c.object_id === sessionId)?.name || "");
  };

  // Render chat session item
  const renderChatSession = (chat: ChatSession, group: string) => {
    if (editingSession === chat.object_id) {
      return (
        <div className="flex flex-col gap-3 p-3 bg-[#003040] rounded-lg border border-[#006A82]">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full p-2 rounded bg-[#004050] text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#006A82] placeholder-gray-400"
            autoFocus
            placeholder="Enter session name"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleEditSession(chat.object_id, editTitle);
              }
              if (e.key === 'Escape') {
                e.preventDefault();
                setEditingSession(null);
              }
            }}
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditingSession(null);
              }}
              className="px-3 py-1.5 text-sm rounded hover:bg-gray-600 transition-colors text-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEditSession(chat.object_id, editTitle);
              }}
              className="px-3 py-1.5 bg-[#006A82] text-sm rounded hover:bg-[#007A96] transition-colors disabled:opacity-50"
              disabled={!editTitle.trim()}
            >
              Save
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-between w-full">
        <Link
          href={`/chat/${chat.object_id}`}
          className="flex-1 py-2 px-3 text-left hover:bg-[#005163] transition-colors text-sm truncate"
          onClick={(e) => {
            if (activeMenu) {
              e.preventDefault();
            }
          }}
        >
          {chat.name}
        </Link>
        <div className="relative">
          <button
            onClick={(e) => handleMenuButtonClick(e, chat.object_id, group)}
            className="p-1 rounded-full hover:bg-[#006A82] opacity-0 group-hover:opacity-100 focus:opacity-100"
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
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </button>
          {activeMenu === `${group}-${chat.object_id}` && (
            <div
              className="absolute right-0 mt-1 w-32 bg-[#004050] rounded-md shadow-lg z-10 py-1"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingSession(chat.object_id);
                  setActiveMenu(null);
                }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-[#005163]"
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteSession(chat.object_id);
                }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-[#005163] text-red-400"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    );
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
          fixed md:static top-0 left-0 h-full bg-gradient-to-b from-[#161616] via-[#2c2c2c] to-[#3f3d3d] w-64 z-30
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4">
            <Link href="/">
              <Image
                src="/images/sidebatlogo.png"
                alt="Logo"
                width={400}
                height={400}
                className="object-cover object-center p-4"
              />
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
              <button
                onClick={handleCreateSession}
                className="p-2 cursor-pointer rounded-full hover:bg-[#005163] transition-colors"
              >
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
          <div className="flex-1 overflow-y-auto scrollbar-hide no-scrollbar">
            {isLoading && <div className="p-4 text-sm">Loading sessions...</div>}
            {error && <div className="p-4 text-sm text-red-400">Error loading sessions</div>}

            {chatGroups.today.length > 0 && (
              <div className="p-4">
                <h2 className="text-sm font-medium mb-2">Today</h2>
                <ul className="space-y-1">
                  {chatGroups.today.map((chat) => (
                    <li key={`today-${chat.object_id}`} className="relative group">
                      {renderChatSession(chat, "today")}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {chatGroups.yesterday.length > 0 && (
              <div className="p-4">
                <h2 className="text-sm font-medium mb-2">Yesterday</h2>
                <ul className="space-y-1">
                  {chatGroups.yesterday.map((chat) => (
                    <li key={`yesterday-${chat.object_id}`} className="relative group">
                      {renderChatSession(chat, "yesterday")}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {chatGroups.previous.length > 0 && (
              <div className="p-4">
                <h2 className="text-sm font-medium mb-2">Previous 7 days</h2>
                <ul className="space-y-1">
                  {chatGroups.previous.map((chat) => (
                    <li key={`previous-${chat.object_id}`} className="relative group">
                      {renderChatSession(chat, "previous")}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* User Profile */}
          <Link href="/profile/my-profile" className="p-4 border-t border-[#006A82] flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-400 mr-3 overflow-hidden">
              <Image
                src={user?.image || ""}
                alt="User avatar"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <span className="text-sm">{user?.full_name || "User"}</span>
          </Link>
        </div>
      </div>
    </>
  );
}