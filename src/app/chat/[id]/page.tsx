
"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import ChatSidebar from "@/components/chat-sidebar";
import ChatMessage from "@/components/chat-message";
import SearchModal from "@/components/search-modal";
import { useAskChatMutation, useSingleSessionQuery } from "@/Redux/feature/chatSlice";
import { useParams } from "next/navigation";
// import { toast } from "react-hot-toast";

// Types
interface Message {
  object_id: string;
  role: "user" | "bot";
  content: string;
  timestamp: string;
  session_id: string;
}

interface ChatInputProps {
  onSubmit: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

// ChatInput Component
function ChatInput({ onSubmit, placeholder = "Ask me anything about business...", disabled = false }: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.max(textarea.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || disabled) return;

    onSubmit(inputValue.trim());
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(new Event("submit") as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="relative">
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full text-white no-scrollbar bg-gradient-to-b from-[#1A1A1A] via-[#1A1A1A] to-[#3f3d3d]
            placeholder-[#62C1BF] rounded-2xl border border-[#62C1BF]
            pl-4 pr-12 py-5 resize-none overflow-hidden transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-[#62C1BF] focus:border-[#62C1BF]
            disabled:opacity-50 disabled:cursor-not-allowed
            scrollbar-none
            ${inputValue.length > 200 ? "overflow-y-auto" : "overflow-y-hidden"}
          `}
          style={{
            minHeight: "120px",
            maxHeight: "300px",
          }}
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || disabled}
          className={`
            absolute right-2 top-1/2 transform -translate-y-1/2
            p-2 rounded-full transition-all duration-200 border-none cursor-pointer
            ${
              !inputValue.trim() || disabled
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-[#62C1BF] text-[#005163] hover:bg-opacity-80 hover:scale-105 hover:shadow-lg"
            }
          `}
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}

// Loading Dots Component
function LoadingDots() {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-[#2A2A2A] rounded-lg p-4">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-[#62C1BF] rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-[#62C1BF] rounded-full animate-bounce [animation-delay:0.1s]"></div>
          <div className="w-2 h-2 bg-[#62C1BF] rounded-full animate-bounce [animation-delay:0.2s]"></div>
        </div>
      </div>
    </div>
  );
}

// Mobile Menu Button Component
function MobileMenuButton({ onClick, isOpen }: { onClick: () => void; isOpen: boolean }) {
  return (
    <button
      className="md:hidden absolute top-4 left-4 z-10 p-2 bg-transparent border-none cursor-pointer"
      onClick={onClick}
      aria-label="Toggle mobile menu"
    >
      <div
        className={`w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}
      ></div>
      <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}></div>
      <div
        className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
      ></div>
    </button>
  );
}

// Welcome Message Component
function WelcomeMessage() {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="text-center max-w-4xl">
        <h1 className="text-xl lg:text-3xl font-normal text-[#62C1BF] mb-4">
          Ask me anything about your course, crypto terms, or how Web3 works
        </h1>
      </div>
    </div>
  );
}

// Messages Container Component
function MessagesContainer({
  messages,
  isLoading,
  messagesEndRef,
}: {
  messages: Message[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="flex-1 no-scrollbar overflow-y-auto p-4 md:p-6 scrollbar-none">
      {messages.slice(1).map((message) => (
        <ChatMessage key={message.object_id} message={message} />
      ))}
      {isLoading && <LoadingDots />}
      <div ref={messagesEndRef} />
    </div>
  );
}

// Main Component
export default function Home() {

const params = useParams();
//   const router = useRouter();
  const id = params?.id as string;
  const sessionId = id;

  const [messages, setMessages] = useState<Message[]>([
    {
      object_id: "initial",
      role: "bot",
      content: "Hello! Ask me about business growth, leadership, or strategy",
      timestamp: new Date().toISOString(),
      session_id: "",
    },
  ]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
//   const [sessionId, setSessionId] = useState("");
  const [language, setLanguage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [askChat] = useAskChatMutation();
  const { data, isLoading: sessionLoading, error } = useSingleSessionQuery(sessionId, {
    skip: !sessionId,
  });

  // Load session ID and language from localStorage
  useEffect(() => {
    // const session_id = localStorage.getItem("session_id");
    // if (session_id) {
    //   setSessionId(session_id);
    // }
    const language = localStorage.getItem("language");
    if (language) {
      setLanguage(language);
    }
  }, []);

  // Sync messages with session data
  useEffect(() => {
    if (data && data.length > 0) {
      setMessages((prev) => [
        prev[0], // Keep initial welcome message
        ...data.map((msg: Message) => ({
          object_id: msg.object_id,
          role: msg.role === "bot" ? "assistant" : msg.role,
          content: msg.content,
          timestamp: msg.timestamp,
          session_id: msg.session_id,
        })),
      ]);
      setShowWelcomeMessage(false);
    }
  }, [data]);

  // Handle errors from session query
  useEffect(() => {
    if (error) {
      // toast.error("Failed to load session data. Please try again.");
    }
  }, [error]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleMessageSubmit = async (message: string) => {
    if (!sessionId) {
      // toast.error("No session ID found. Please start a new session.");
      return;
    }

    setShowWelcomeMessage(false);
    setIsLoading(true);

    // Add user message immediately
    const userMessage: Message = {
      object_id: crypto.randomUUID(),
      role: "user",
      content: message,
      timestamp: new Date().toISOString(),
      session_id: sessionId,
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await askChat({
        question: message,
        session_id: sessionId,
        language: language,
      }).unwrap();

      // Add assistant response
      const assistantMessage: Message = {
        object_id: crypto.randomUUID(),
        role: "bot",
        content: res?.response,
        timestamp: new Date().toISOString(),
        session_id: sessionId,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      // toast.error("Failed to send message. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-[#1B1B1B] text-white">
      {/* Sidebar */}
      <ChatSidebar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        setIsSearchModalOpen={setIsSearchModalOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col max-w-5xl mx-auto h-full relative">
        {/* Mobile Menu Toggle */}
        <MobileMenuButton onClick={toggleMobileMenu} isOpen={isMobileMenuOpen} />

        {/* Header Spacer */}
        <div className="h-4" />

        {/* Messages Area */}
        {showWelcomeMessage && !sessionLoading ? (
          <WelcomeMessage />
        ) : (
          <MessagesContainer messages={messages} isLoading={isLoading || sessionLoading} messagesEndRef={messagesEndRef} />
        )}

        {/* Chat Input */}
        <ChatInput
          onSubmit={handleMessageSubmit}
          placeholder="Ask me anything about business..."
          disabled={isLoading || sessionLoading}
        />
      </div>

      {/* Search Modal */}
      {isSearchModalOpen && <SearchModal onClose={() => setIsSearchModalOpen(false)} />}
    </div>
  );
}