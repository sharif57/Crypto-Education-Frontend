"use client";

import React, { useState } from 'react';
import QuizComplete from '@/components/quiz-complete';

const questions = [
    {
        id: 1,
        question: "What is the primary purpose of a crypto wallet?",
        options: [
            { id: 'a', text: "To mine cryptocurrency" },
            { id: 'b', text: "To store and manage digital assets" },
            { id: 'c', text: "To create smart contracts" },
            { id: 'd', text: "To verify blockchain transactions" }
        ],
        correctAnswer: 'b'
    },
    {
        id: 2,
        question: "Which of the following is a characteristic of a hardware wallet?",
        options: [
            { id: 'a', text: "It is always connected to the internet" },
            { id: 'b', text: "It stores private keys offline" },
            { id: 'c', text: "It is a mobile application" },
            { id: 'd', text: "It is managed by a centralized exchange" }
        ],
        correctAnswer: 'b'
    },
    {
        id: 3,
        question: "What is a 'seed phrase' used for?",
        options: [
            { id: 'a', text: "To generate a public address" },
            { id: 'b', text: "To encrypt communications" },
            { id: 'c', text: "To recover a wallet if access is lost" },
            { id: 'd', text: "To pay transaction fees" }
        ],
        correctAnswer: 'c'
    },
    {
        id: 4,
        question: "Which type of wallet is considered the most secure for long-term storage?",
        options: [
            { id: 'a', text: "Web wallet" },
            { id: 'b', text: "Mobile wallet" },
            { id: 'c', text: "Hardware wallet" },
            { id: 'd', text: "Exchange wallet" }
        ],
        correctAnswer: 'c'
    },
    {
        id: 5,
        question: "What happens if you lose your private key and seed phrase?",
        options: [
            { id: 'a', text: "You can request a new one from the blockchain" },
            { id: 'b', text: "You permanently lose access to your funds" },
            { id: 'c', text: "Your funds are automatically returned to the sender" },
            { id: 'd', text: "You can recover it using your email address" }
        ],
        correctAnswer: 'b'
    }
];

export default function QuizPage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
    const [isFinished, setIsFinished] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];
    const totalQuestions = questions.length;
    const currentAnswer = selectedAnswers[currentQuestion.id];

    const handleSelectOption = (optionId: string) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: optionId
        }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setIsFinished(true);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    if (isFinished) {
        let score = 0;
        questions.forEach(q => {
            if (selectedAnswers[q.id] === q.correctAnswer) {
                score++;
            }
        });

        return (
            <QuizComplete
                score={score}
                totalQuestions={totalQuestions}
                questions={questions}
                selectedAnswers={selectedAnswers}
                onRetake={() => {
                    setIsFinished(false);
                    setCurrentQuestionIndex(0);
                    setSelectedAnswers({});
                }}
            />
        );
    }

    return (
        <div className="min-h-screen  flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                {/* Progress Badge */}
                <div className="mb-6">
                    <span className="inline-block px-2 py-1 rounded-full bg-[#373737] text-[#62C1BF] text-base font-normal border border-[#3b4747]">
                        Q {currentQuestionIndex + 1} of {totalQuestions}
                    </span>
                </div>

                {/* Question */}
                <h1 className="text-2xl sm:text-3xl font-medium text-white mb-8 leading-tight">
                    {currentQuestion.question}
                </h1>

                {/* Options */}
                <div className="space-y-4 mb-10">
                    {currentQuestion.options.map((option) => {
                        const isSelected = currentAnswer === option.id;

                        return (
                            <button
                                key={option.id}
                                onClick={() => handleSelectOption(option.id)}
                                className={`w-full text-left px-4 py-5  rounded-xl flex items-center transition-all duration-200 ${isSelected
                                    ? 'bg-[#62C1BF] text-gray-900'
                                    : 'bg-[#373737] text-gray-300 hover:bg-[#444444]'
                                    }`}
                            >
                                <div
                                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 flex-shrink-0 transition-colors duration-200 ${isSelected
                                        ? 'border-gray-900'
                                        : 'border-gray-400'
                                        }`}
                                >
                                    {isSelected && (
                                        <div className="w-2.5 h-2.5 rounded-full bg-gray-900" />
                                    )}
                                </div>
                                <span className="text-base font-normal">{option.text}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                        className="flex-1 py-3 px-8 rounded-full border border-[#62C1BF] text-lg text-[#62C1BF] font-medium transition-all duration-200 hover:bg-[#2a3031] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={!currentAnswer}
                        className="flex-1 py-3 px-8 rounded-full bg-[#62C1BF] text-lg text-[#224443] font-medium transition-all duration-200 hover:bg-[#5bc5b6] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {currentQuestionIndex === totalQuestions - 1 ? 'Submit' : 'Next'}
                    </button>
                </div>
            </div>
        </div>
    );
}
