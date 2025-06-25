
// "use client";

// import type React from "react";
// import { useState, useRef, useEffect } from "react";
// import { ArrowUp } from "lucide-react";
// import ChatSidebar from "@/components/chat-sidebar";
// import ChatMessage from "@/components/chat-message";
// import SearchModal from "@/components/search-modal";

// interface Message {
//   role: "user" | "assistant";
//   content: string;
// }

// export default function Home() {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       role: "assistant",
//       content: "Hello! Ask me about business growth, leadership, or strategy",
//     },
//   ]);
//   const [inputValue, setInputValue] = useState("");
//   const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const formRef = useRef<HTMLFormElement>(null); // Add ref for form

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!inputValue.trim()) return;

//     // Hide welcome message when user sends a message
//     setShowWelcomeMessage(false);

//     // Add user message
//     const userMessage = { role: "user" as const, content: inputValue };
//     setMessages((prev) => [...prev, userMessage]);
//     setInputValue("");

//     // Simulate AI response
//     setTimeout(() => {
//       if (
//         inputValue.toLowerCase().includes("strategy") ||
//         inputValue.toLowerCase().includes("startup")
//       ) {
//         setMessages((prev) => [
//           ...prev,
//           {
//             role: "assistant",
//             content: `
//               <h2>1. Customer-Centric Growth</h2>
//               <p>Focusing on customer needs is one of the most effective strategies for growing a startup...</p>
//               <!-- Truncated for brevity -->
//             `,
//           },
//         ]);
//       } else {
//         setMessages((prev) => [
//           ...prev,
//           {
//             role: "assistant",
//             content:
//               "I can help with that! What specific aspects of this topic would you like to explore further?",
//           },
//         ]);
//       }
//     }, 1000);
//   };

//   // Handle Enter key press in textarea
//   const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault(); // Prevent newline
//       formRef.current?.requestSubmit(); // Trigger form submission
//     }
//     // Shift + Enter will allow newline by default
//   };

//   return (
//     <div className="flex h-screen bg-[#1B1B1B] text-white">
//       {/* Sidebar */}
//       <ChatSidebar
//         isMobileMenuOpen={isMobileMenuOpen}
//         setIsMobileMenuOpen={setIsMobileMenuOpen}
//         setIsSearchModalOpen={setIsSearchModalOpen}
//       />

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col max-w-5xl mx-auto h-full relative">
//         {/* Mobile menu toggle */}
//         <div
//           className="md:hidden absolute top-4 left-4 z-10"
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         >
//           <div className="w-6 h-0.5 bg-white mb-1.5"></div>
//           <div className="w-6 h-0.5 bg-white mb-1.5"></div>
//           <div className="w-6 h-0.5 bg-white"></div>
//         </div>

//         {/* Header */}
//         <div className="h-4"></div>

//         {/* Messages */}
//         {showWelcomeMessage ? (
//           <div className="flex-1 flex items-center justify-center p-4">
//             <div className="text-center max-w-4xl">
//               <p className="text-xl lg:text-3xl font-normal text-[#62C1BF]">
//                 Ask me anything about your course, crypto terms, or how Web3
//                 works
//               </p>
//             </div>
//           </div>
//         ) : (
//           <div className="flex-1 overflow-y-auto p-4 md:p-6 no-scrollbar">
//             {messages.slice(1).map((message, index) => (
//               <ChatMessage key={index} message={message} />
//             ))}
//             <div ref={messagesEndRef} />
//           </div>
//         )}

//         {/* Input */}
//         <div className="p-4 border-[#006A82]">
//           <form ref={formRef} onSubmit={handleSubmit} className="relative">
//             <textarea
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               // Add onKeyDown handler
//               onKeyDown={handleKeyDown}
//               placeholder="Ask me anything about business..."
//               className={`w-full text-white bg-gradient-to-b z-10 no-scrollbar from-[#1A1A1A] via-[#1A1A1A] to-[#3f3d3d] placeholder-[#62C1BF] rounded-2xl border border-[#62C1BF] pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-text ${inputValue ? "h-30 py-5" : "h-30 py-5"}`}
//               // style={{ minHeight: inputValue ? "" : "7.5rem" }}
//               />
//             <button
//               type="submit"
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-text text-[#005163] hover:bg-opacity-80 transition-colors"
//             >
//               <ArrowUp className="h-4 w-4" />
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Search Modal */}
//       {isSearchModalOpen && (
//         <SearchModal onClose={() => setIsSearchModalOpen(false)} />
//       )}
//     </div>
//   );
// }
"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import ChatSidebar from "@/components/chat-sidebar"
import ChatMessage from "@/components/chat-message"
import SearchModal from "@/components/search-modal"

// Types
interface Message {
  role: "user" | "assistant"
  content: string
}

interface ChatInputProps {
  onSubmit: (message: string) => void
  placeholder?: string
  disabled?: boolean
}

// ChatInput Component
function ChatInput({ onSubmit, placeholder = "Ask me anything about business...", disabled = false }: ChatInputProps) {
  const [inputValue, setInputValue] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${Math.max(textarea.scrollHeight, 120)}px`
    }
  }, [inputValue])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || disabled) return

    onSubmit(inputValue.trim())
    setInputValue("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(new Event("submit") as unknown as React.FormEvent<HTMLFormElement>)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value)
  }

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
  )
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
  )
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
  )
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
  )
}

// Messages Container Component
function MessagesContainer({
  messages,
  isLoading,
  messagesEndRef,
}: {
  messages: Message[]
  isLoading: boolean
  messagesEndRef: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <div className="flex-1 no-scrollbar overflow-y-auto p-4 md:p-6 scrollbar-none">
      {messages.slice(1).map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}

      {isLoading && <LoadingDots />}

      <div ref={messagesEndRef} />
    </div>
  )
}

// Main Component
export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! Ask me about business growth, leadership, or strategy",
    },
  ])
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleMessageSubmit = async (message: string) => {
    // Hide welcome message when user sends a message
    setShowWelcomeMessage(false)
    setIsLoading(true)

    // Add user message
    const userMessage: Message = { role: "user", content: message }
    setMessages((prev) => [...prev, userMessage])

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        role: "assistant",
        content: getAIResponse(message),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  const getAIResponse = (input: string): string => {
    if (input.toLowerCase().includes("strategy") || input.toLowerCase().includes("startup")) {
      return `
        <h2 class="text-xl font-semibold text-[#62C1BF] mb-3">1. Customer-Centric Growth</h2>
        <p class="mb-4">Focusing on customer needs is one of the most effective strategies for growing a startup. Understanding your target audience and delivering exceptional value builds loyalty and drives organic growth.</p>
        
        <h2 class="text-xl font-semibold text-[#62C1BF] mb-3">2. Data-Driven Decision Making</h2>
        <p class="mb-4">Use analytics and metrics to guide your business decisions and identify growth opportunities. Track key performance indicators (KPIs) and user behavior to optimize your strategies.</p>
        
        <h2 class="text-xl font-semibold text-[#62C1BF] mb-3">3. Strategic Partnerships</h2>
        <p>Build relationships with complementary businesses to expand your reach and capabilities. Partnerships can provide access to new markets, technologies, and resources.</p>
      `
    }
    return "I can help with that! What specific aspects of this topic would you like to explore further?"
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

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
        {showWelcomeMessage ? (
          <WelcomeMessage />
        ) : (
          <MessagesContainer messages={messages} isLoading={isLoading} messagesEndRef={messagesEndRef} />
        )}

        {/* Chat Input */}
        <ChatInput
          onSubmit={handleMessageSubmit}
          placeholder="Ask me anything about business..."
          disabled={isLoading}
        />
      </div>

      {/* Search Modal */}
      {isSearchModalOpen && <SearchModal onClose={() => setIsSearchModalOpen(false)} />}
    </div>
  )
}
