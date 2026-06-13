/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect } from 'react';
import QuizComplete from '@/components/quiz-complete';
import { useQuizQuestionsQuery, useQuizResultQuery } from '@/Redux/feature/quiz';
import { useParams, useRouter } from 'next/navigation';

export default function QuizResultPage() {
    const { id } = useParams();
    const router = useRouter();

    const { data: questionsData, isLoading: isQuestionsLoading } = useQuizQuestionsQuery(id);
    const { data: result, isLoading: isResultLoading } = useQuizResultQuery(id);

    useEffect(() => {
        if (!isResultLoading && (!result || !result.success || !result.submission_report || result.submission_report.length === 0)) {
            router.replace(`/courses/${id}/quiz`);
        }
    }, [result, isResultLoading, router, id]);

    if (isQuestionsLoading || isResultLoading) {
        return <div className="min-h-screen flex items-center justify-center text-white text-xl">Loading results...</div>;
    }

    if (!result || !result.success || !result.submission_report || result.submission_report.length === 0) {
        return null; // Will redirect in useEffect
    }

    const formattedQuestions = questionsData?.quizzes?.map((q: any) => ({
        id: q.id,
        question: q.questions,
        options: [
            { id: 'option1', text: q.option1 },
            { id: 'option2', text: q.option2 },
            { id: 'option3', text: q.option3 },
            { id: 'option4', text: q.option4 }
        ].filter((opt: any) => opt.text),
        correctAnswer: q.correct_option
    })) || [];

    const totalQuestions = formattedQuestions.length;
    const score = result.submission_report.filter((r: any) => r.is_correct).length;
    
    const serverSelectedAnswers: Record<number, string> = {};
    result.submission_report.forEach((report: any) => {
        serverSelectedAnswers[report.question] = report.answer;
        const questionObj = formattedQuestions.find((q: any) => q.id === report.question);
        if (questionObj) {
            questionObj.correctAnswer = report.correct_answer;
        }
    });

    return (
        <QuizComplete
            score={score}
            totalQuestions={totalQuestions}
            questions={formattedQuestions}
            selectedAnswers={serverSelectedAnswers}
        />
    );
}
