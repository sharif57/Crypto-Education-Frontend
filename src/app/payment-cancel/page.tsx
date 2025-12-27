import { X, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function PaymentCancelled() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div
        className="mx-auto max-w-3xl text-center px-4 py-8 sm:py-12 "
        role="alert"
        aria-live="assertive"
      >
        {/* Icon Container */}
        <div
          className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-red-100 dark:bg-red-900/20 mb-6 animate-in zoom-in-50 duration-500"
        >
          <X
            className="w-10 h-10 md:w-12 md:h-12 text-red-600 dark:text-red-400 bg-white rounded-full p-2 animate-in zoom-in-50 duration-700 delay-200"
            aria-hidden="true"
          />
        </div>

        {/* Heading */}
        <h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white dark:text-white mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300"
        >
          Payment Cancelled
        </h1>

        {/* Description */}
        <p
          className="text-base md:text-lg text-gray-400 dark:text-gray-300 mb-6 max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400"
        >
          It looks like your payment was not completed. Please try again or contact support if the issue persists.
        </p>

        {/* Call to Action */}
        <Link
          href="/#prices" // Replace with your payment page route
          className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg- rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-300 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500"
        >
          <ArrowLeft className="w-5 h-5 mr-2" aria-hidden="true" />
          Try Again
        </Link>
      </div>
    </main>
  );
}