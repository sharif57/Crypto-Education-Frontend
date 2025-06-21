"use client"

import { useState, useEffect } from "react"

interface MessageProps {
  message: {
    role: "user" | "assistant"
    content: string
  }
}

export default function ChatMessage({ message }: MessageProps) {
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (message.role === "assistant" && message.content.length > 100) {
      setIsTyping(true)
      const timer = setTimeout(() => {
        setIsTyping(false)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [message])

  if (message.role === "user") {
    return (
      <div className="mb-4 max-w-3xl ml-auto">
        <div className="bg-[#62C1BF] text-[#373737] p-3 rounded-r-xl rounded-bl-xl">
          <p>{message.content}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-6 max-w-4xl">
      <div className="bg-[#373737] text-[#E0E0E0] p-3 rounded-r-xl rounded-bl-xl">
        {isTyping ? (
          <div className="flex space-x-2 items-center">
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-75"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
          </div>
        ) : (
          <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: message.content }} />
        )}
      </div>
    </div>
  )
}
