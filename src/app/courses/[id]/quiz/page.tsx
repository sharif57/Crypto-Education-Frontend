/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from 'react';
import QuizComplete from '@/components/quiz-complete';
import { useQuizQuestionsQuery, useQuizResultQuery, useSubmitAnswerMutation } from '@/Redux/feature/quiz';
import { useParams } from 'next/navigation';

export default function QuizPage() {
    const { id } = useParams();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
    const [isFinished, setIsFinished] = useState(false);

    const { data, isLoading, error } = useQuizQuestionsQuery(id);

    const { data: result, isLoading: isResultLoading } = useQuizResultQuery(id, { skip: !isFinished });
    const [submitAnswer] = useSubmitAnswerMutation();

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center text-white text-xl">Loading quiz...</div>;
    }

    if (error || !data || !data.quizzes || data.quizzes.length === 0) {
        return <div className="min-h-screen flex items-center justify-center text-white text-xl">No quiz available.</div>;
    }

    const formattedQuestions = data.quizzes.map((q: any) => ({
        id: q.id,
        question: q.questions,
        options: [
            { id: 'option1', text: q.option1 },
            { id: 'option2', text: q.option2 },
            { id: 'option3', text: q.option3 },
            { id: 'option4', text: q.option4 }
        ].filter((opt: any) => opt.text),
        correctAnswer: q.correct_option
    }));

    const currentQuestion = formattedQuestions[currentQuestionIndex];
    const totalQuestions = formattedQuestions.length;
    const currentAnswer = selectedAnswers[currentQuestion.id];

    const handleSelectOption = (optionId: string) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: optionId
        }));
    };

    const handleNext = async () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            // Submit the answers
            const payload = {
                course_id: Number(id),
                answers: formattedQuestions.map((q: any) => ({
                    quiz_id: q.id,
                    answer: selectedAnswers[q.id] || ""
                }))
            };

            try {
                await submitAnswer(payload).unwrap();
                setIsFinished(true);
            } catch (err) {
                console.error("Failed to submit quiz:", err);
            }
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    if (isFinished) {
        if (isResultLoading || !result) {
            return <div className="min-h-screen flex items-center justify-center text-white text-xl">Loading results...</div>;
        }

        const score = result.submission_report ? result.submission_report.filter((r: any) => r.is_correct).length : 0;

        const serverSelectedAnswers: Record<number, string> = {};
        if (result.submission_report) {
            result.submission_report.forEach((report: any) => {
                serverSelectedAnswers[report.question] = report.answer;
                // Also update correct answers based on server response to be perfectly accurate
                const questionObj = formattedQuestions.find((q: any) => q.id === report.question);
                if (questionObj) {
                    questionObj.correctAnswer = report.correct_answer;
                }
            });
        }

        return (
            <QuizComplete
                score={score}
                totalQuestions={totalQuestions}
                questions={formattedQuestions}
                selectedAnswers={serverSelectedAnswers}
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
                    {currentQuestion.options.map((option: any) => {
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
