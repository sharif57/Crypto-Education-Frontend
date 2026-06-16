import React from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import Cup from './cup';
import { useRouter } from 'next/navigation';

interface Question {
  id: number;
  question: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
}

interface QuizCompleteProps {
  score: number;
  totalQuestions: number;
  questions: Question[];
  selectedAnswers: Record<number, string>;
  onRetake?: () => void;
}

export default function QuizComplete({ score, totalQuestions, questions, selectedAnswers }: QuizCompleteProps) {
  // Assuming 100 points per correct answer based on the design showing "Point Earned 400" for 4/5.
  const pointsEarned = score * 100;
  const router = useRouter();
  const handleNavigateBack = () => {
    router.back();
  };

  return (
    <div className="relative min-h-screen bg-[#1c1c1c] text-white py-12 px-4 sm:px-6 lg:px-8 mt-20">
      {/* Background Image (Confetti) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image
          src="/winner.png"
          alt="Confetti Background"
          fill
          className="object-cover opacity-50"
          priority
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">

        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Cup />
          </div>

          <h1 className="text-xl sm:text-3xl font-medium mb-2">Congratulations!</h1>
          <h2 className="text-lg sm:text-xl text-white font-medium mb-6">Quiz Completed</h2>

          <p className="text-sm sm:text-lg text-white mb-2 font-medium">Point Earned <span className="text-white font-medium">{pointsEarned}</span></p>
          <p className="text-sm sm:text-lg text-white font-medium">You scored</p>
          <p className="text-sm sm:text-lg font-medium text-white">{score} / {totalQuestions}</p>
        </div>

        {/* Answers Sheet Section */}
        <div className="w-full text-left mb-10">
          <h3 className="text-[#62C1BF] font-medium text-lg mb-6">Answers Sheet</h3>

          <div className="space-y-8">
            {questions.map((q) => {
              const userAnswerId = selectedAnswers[q.id];
              const isCorrect = userAnswerId === q.correctAnswer;

              const userAnswerObj = q.options.find(opt => opt.id === userAnswerId);
              const correctAnswerObj = q.options.find(opt => opt.id === q.correctAnswer);

              return (
                <div key={q.id} className="space-y-3">
                  <p className="text-base  sm:text-lg font-normal text-[#F3F3F3]">{q.question}</p>

                  <div className={`relative flex items-center justify-between p-4 rounded-xl border ${isCorrect ? 'border-[#62C1BF]' : 'border-[#EF5053]'}`}>
                    <span className={`text-sm sm:text-base font-normal ${isCorrect ? 'text-[#62C1BF]' : 'text-[#EF5053]'}`}>
                      {userAnswerObj?.text || "No answer selected"}
                    </span>

                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-[#64d2c1] flex-shrink-0" />
                    ) : (
                      <div className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
                        <div className="absolute inset-0 rounded-full border-2 border-[#EF5053]"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#EF5053]"></div>
                      </div>
                    )}
                  </div>

                  {!isCorrect && correctAnswerObj && (
                    <p className="text-sm lg:text-base text-[#62C1BF] font-normal">
                      Correct Ans: {correctAnswerObj.text}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Back To Home Button */}
        <button onClick={handleNavigateBack} className="w-full ">
          <button className="w-full py-3 px-6 rounded-full bg-[#62C1BF] text-[#224443] font-medium text-lg transition-all duration-200 hover:bg-[#64d2c1]">
            Back To Home
          </button>
        </button>



      </div>
    </div>
  );
}
