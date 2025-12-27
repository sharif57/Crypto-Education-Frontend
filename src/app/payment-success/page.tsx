import { CheckCircle2 } from 'lucide-react';
import React from 'react';

export default function PaymentSuccessful() {
  return (
    <main className="flex items-center justify-center min-h-screen  ">
      <div
        className="mx-auto max-w-3xl text-center px-4 py-8 sm:py-12 "
        role="alert"
        aria-live="assertive"
      >
        {/* Success Icon */}
        <div
          className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-green-100 dark:bg-green-900/20 mb-6 animate-in zoom-in-50 duration-500"
        >
          <CheckCircle2
            className="w-10 h-10 md:w-12 md:h-12 text-green-600 dark:text-green-400 animate-in zoom-in-50 duration-700 delay-200"
            aria-hidden="true"
          />
        </div>

        {/* Heading */}
        <h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white dark:text-white mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300"
        >
          Payment Successful!
        </h1>

        {/* Description */}
        <p
          className="text-base md:text-lg text-gray-400 dark:text-gray-300 mb-6 max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400"
        >
          Thank you for your donation! Your support means the world to us. 
        </p>

       
      </div>
    </main>
  );
}