'use client';

import { Send, X } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import Loading from './Loading';
import {  useVideoAskChatWithIdMutation, useVideoSessionCreateMutation } from '@/Redux/feature/videoChatSlice';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatProps {
  videoId: string;
}

export default function Chat({ videoId }: ChatProps) {

  console.log("pdf id", videoId);
  const [language, setLanguage] = useState<string>('');
  const [isAIModalOpen, setIsAIModalOpen] = useState<boolean>(false);
  const [videoSessionId, setVideoSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    // {
    //   id: '1',
    //   text: 'Crypto terms: What is a blockchain?',
    //   isUser: false,
    //   timestamp: new Date(),
    // },
  ]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [videoSessionCreate] = useVideoSessionCreateMutation();
  const [videoAskChatWithId] = useVideoAskChatWithIdMutation();

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages or loading state change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [messages, isLoading]);

  // Retrieve language from localStorage
  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  const createSession = async () => {
    try {
      const res = await videoSessionCreate({}).unwrap();
      localStorage.setItem('video_session', res?.session_id);
    } catch (error) {
      console.error('Failed to create video session:', error);
    }
  };

  // localStorage get session_id
  useEffect(()=>{
    const sessionId = localStorage.getItem('video_session');
    if (sessionId) {
      setVideoSessionId(sessionId);
    } else {
      createSession();
    }
  },[videoSessionId, createSession]);

  console.log('Video Session ID:', videoSessionId);



  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Format the payload to match the API expectation
      const payload = {
        question: inputMessage,
        language: language, // Language is included in the URL query, but also sent in body if required
        session_id: videoSessionId,
      };

      console.log('Payload:', payload);

      const res = await videoAskChatWithId({
        data: payload,
        id: videoId, // Maps to the video ID in the URL
      }).unwrap();

      console.log('API Response:', res);

      // Ensure the response has the expected 'answer' field
      if (!res?.answer) {
        throw new Error('Invalid API response: No answer field');
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: res.answer,
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Failed to fetch AI response:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "Error: " + error,
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (isLoading && messages.length === 0) {
    return <Loading />;
  }

  return (
    <div>
      <div className="lg:flex items-center justify-between  space-y-8">
        <Button
          onClick={() => {
            setIsAIModalOpen(true);
            createSession();
          }}
          className="px-4 py-2 mb-8 bg-[#62C1BF] text-[#224443] cursor-pointer rounded-full text-sm font-medium transition-colors"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_4244_2443)">
              <path
                d="M12 0.886719C12.0343 2.31622 11.7749 3.73818 11.2365 5.07121C10.6981 6.40424 9.89139 7.62213 8.86249 8.65521C7.8336 9.68829 6.60274 10.5163 5.24038 11.0917C3.87803 11.6671 2.41094 11.9787 0.923096 12.0087"
                stroke="#224443"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                d="M12.0001 0.886719C11.9658 2.31622 12.2252 3.73818 12.7636 5.07121C13.302 6.40424 14.1087 7.62213 15.1376 8.65521C16.1665 9.68829 17.3974 10.5163 18.7597 11.0917C20.1221 11.6671 21.5892 11.9787 23.077 12.0087"
                stroke="#224443"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                d="M12 23.1307C12.0343 21.7012 11.7749 20.2793 11.2365 18.9462C10.6981 17.6132 9.89139 16.3953 8.86249 15.3622C7.8336 14.3292 6.60274 13.5012 5.24038 12.9258C3.87803 12.3503 2.41094 12.0387 0.923096 12.0088"
                stroke="#224443"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                d="M12.0001 23.1307C11.9658 21.7012 12.2252 20.2793 12.7636 18.9462C13.302 17.6132 14.1087 16.3953 15.1376 15.3622C16.1665 14.3292 17.3974 13.5012 18.7597 12.9258C20.1221 12.3503 21.5892 12.0387 23.077 12.0088"
                stroke="#224443"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <ellipse cx="12" cy="12" rx="3" ry="7" fill="#224443" />
              <ellipse cx="12" cy="12" rx="3" ry="7" transform="rotate(90 12 12)" fill="#224443" />
            </g>
            <defs>
              <clipPath id="clip0_4244_2443">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
          AI Assistant
        </Button>
      </div>

      {isAIModalOpen && (
        <div className="absolute lg:top-[600px] top-0 h-[485px] border-text lg:right-12 right-0 lg:w-[400px] w-full m-0 lg:m-5 z-20 rounded-xl border flex flex-col">
          <div className="flex items-center justify-between p-4 bg-[#62C1BF] rounded-t-xl text-[#224443]">
            <div className="flex items-center gap-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_4244_2443)">
                  <path
                    d="M12 0.886719C12.0343 2.31622 11.7749 3.73818 11.2365 5.07121C10.6981 6.40424 9.89139 7.62213 8.86249 8.65521C7.8336 9.68829 6.60274 10.5163 5.24038 11.0917C3.87803 11.6671 2.41094 11.9787 0.923096 12.0087"
                    stroke="#224443"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12.0001 0.886719C11.9658 2.31622 12.2252 3.73818 12.7636 5.07121C13.302 6.40424 14.1087 7.62213 15.1376 8.65521C16.1665 9.68829 17.3974 10.5163 18.7597 11.0917C20.1221 11.6671 21.5892 11.9787 23.077 12.0087"
                    stroke="#224443"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 23.1307C12.0343 21.7012 11.7749 20.2793 11.2365 18.9462C10.6981 17.6132 9.89139 16.3953 8.86249 15.3622C7.8336 14.3292 6.60274 13.5012 5.24038 12.9258C3.87803 12.3503 2.41094 12.0387 0.923096 12.0088"
                    stroke="#224443"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12.0001 23.1307C11.9658 21.7012 12.2252 20.2793 12.7636 18.9462C13.302 17.6132 14.1087 16.3953 15.1376 15.3622C16.1665 14.3292 17.3974 13.5012 18.7597 12.9258C20.1221 12.3503 21.5892 12.0387 23.077 12.0088"
                    stroke="#224443"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                  <ellipse cx="12" cy="12" rx="3" ry="7" fill="#224443" />
                  <ellipse cx="12" cy="12" rx="3" ry="7" transform="rotate(90 12 12)" fill="#224443" />
                </g>
                <defs>
                  <clipPath id="clip0_4244_2443">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span className="font-medium">AI Assistant</span>
            </div>
            <Button
              onClick={() => {
                setIsAIModalOpen(false);
                localStorage.removeItem('video_session');
              }}
              variant="ghost"
              size="sm"
              className="text-[#224443] hover:text-[#224443] hover:bg-[#4a9a98] p-1"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto no-scrollbar overflow-x-hidden p-4 space-y-4 bg-[#2a2a2a] scroll-smooth max-h-[350px]"
            style={{ scrollBehavior: 'smooth' }}
          >
            {messages.map((message) => (
              <div key={message.id} className="flex justify-start">
                <div className="flex items-start gap-2 max-w-[100%]">
                  {!message.isUser && (
                    <div className="w-8 h-8 bg-[#62C1BF] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <ellipse cx="12" cy="12" rx="3" ry="7" fill="#224443" />
                        <ellipse cx="12" cy="12" rx="3" ry="7" transform="rotate(90 12 12)" fill="#224443" />
                      </svg>
                    </div>
                  )}
                  {message.isUser && (
                    <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-medium">U</span>
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-r-3xl rounded-bl-3xl text-sm leading-relaxed ${message.isUser
                        ? 'bg-[#373737] text-[12px] font-normal text-[#E0E0E0]'
                        : 'bg-[#62C1BF] text-[12px] font-normal text-[#373737]'
                      }`}
                  >
                    {message.text}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 bg-[#62C1BF] rounded-full flex items-center justify-center">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <ellipse cx="12" cy="12" rx="3" ry="7" fill="#224443" />
                      <ellipse cx="12" cy="12" rx="3" ry="7" transform="rotate(90 12 12)" fill="#224443" />
                    </svg>
                  </div>
                  <div className="bg-[#333333] text-white p-3 rounded-lg text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.1s' }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-[#2a2a2a] rounded-b-2xl border-t border-gray-600 sticky bottom-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about the current video..."
                className="flex-1 bg-[#333333] text-white px-3 py-2 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#62C1BF]"
              />
              <Button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-[#62C1BF] hover:bg-[#4a9a98] text-[#224443] px-3 py-2 rounded-lg"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}