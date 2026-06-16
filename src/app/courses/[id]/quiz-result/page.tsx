// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React, { useEffect } from 'react';
// import QuizComplete from '@/components/quiz-complete';
// import { useQuizResultQuery } from '@/Redux/feature/quiz';
// import { useParams, useRouter } from 'next/navigation';

// export default function QuizResultPage() {
//     const { id } = useParams();
//     const router = useRouter();

//     const { data: result, isLoading: isResultLoading } = useQuizResultQuery(id);

//     useEffect(() => {
//         if (!isResultLoading && (!result || !result.success || !result.submission_report || result.submission_report.length === 0)) {
//             router.replace(`/courses/${id}/quiz`);
//         }
//     }, [result, isResultLoading, router, id]);

//     if (isResultLoading) {
//         return <div className="min-h-screen flex items-center justify-center text-white text-xl">Loading results...</div>;
//     }

//     if (!result || !result.success || !result.submission_report || result.submission_report.length === 0) {
//         return null; // Will redirect in useEffect
//     }

//     const formattedQuestions = result.submission_report.map((report: any) => {
//         const q = report.question;
//         return {
//             id: q.id,
//             question: q.questions,
//             options: [
//                 { id: 'option1', text: q.option1 },
//                 { id: 'option2', text: q.option2 },
//                 { id: 'option3', text: q.option3 },
//                 { id: 'option4', text: q.option4 }
//             ].filter((opt: any) => opt.text),
//             correctAnswer: report.correct_answer || q.correct_option
//         };
//     });

//     const totalQuestions = formattedQuestions.length;
//     const score = result.submission_report.filter((r: any) => r.is_correct).length;

//     const serverSelectedAnswers: Record<number, string> = {};
//     result.submission_report.forEach((report: any) => {
//         serverSelectedAnswers[report.question.id] = report.answer;
//     });

//     return (
//         <QuizComplete
//             score={score}
//             totalQuestions={totalQuestions}
//             questions={formattedQuestions}
//             selectedAnswers={serverSelectedAnswers}
//         />
//     );
// }
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef } from 'react';
import QuizComplete from '@/components/quiz-complete';
import { useQuizResultQuery } from '@/Redux/feature/quiz';
import { useParams, useRouter } from 'next/navigation';

export default function QuizResultPage() {
    const { id } = useParams();
    const router = useRouter();
    // Guard: only redirect after we've confirmed loading is done AND data is invalid.
    // This prevents the race condition where the page redirects before the fresh
    // result arrives after a quiz submission.
    const hasRedirected = useRef(false);

    const { data: result, isLoading: isResultLoading } = useQuizResultQuery(id);

    useEffect(() => {
        // Only redirect once loading is fully complete and data is genuinely missing
        if (
            !isResultLoading &&
            (!result || !result.success || !result.submission_report || result.submission_report.length === 0) &&
            !hasRedirected.current
        ) {
            hasRedirected.current = true;
            router.replace(`/courses/${id}/quiz`);
        }
    }, [result, isResultLoading, router, id]);

    // Show spinner while fetching
    if (isResultLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-white">
                <svg
                    className="animate-spin h-10 w-10 text-[#62C1BF]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                </svg>
                <p className="text-xl">Loading results...</p>
            </div>
        );
    }

    // Data missing — useEffect will redirect, render nothing in the meantime
    if (!result || !result.success || !result.submission_report || result.submission_report.length === 0) {
        return null;
    }

    // Build formatted questions from the submission report
    const formattedQuestions = result.submission_report.map((report: any) => {
        const q = report.question;
        return {
            id: q.id,
            question: q.questions,
            options: [
                { id: 'option1', text: q.option1 },
                { id: 'option2', text: q.option2 },
                { id: 'option3', text: q.option3 },
                { id: 'option4', text: q.option4 }
            ].filter((opt: any) => opt.text),
            correctAnswer: report.correct_answer || q.correct_option
        };
    });

    const totalQuestions = formattedQuestions.length;
    const score = result.submission_report.filter((r: any) => r.is_correct).length;

    // Map question.id → selected answer string (e.g. "option1")
    const serverSelectedAnswers: Record<number, string> = {};
    result.submission_report.forEach((report: any) => {
        serverSelectedAnswers[report.question.id] = report.answer;
    });

    return (
        <QuizComplete
            score={score}
            totalQuestions={totalQuestions}
            questions={formattedQuestions}
            selectedAnswers={serverSelectedAnswers}
            onRetake={() => router.push(`/courses/${id}/quiz`)}
        />
    );
}