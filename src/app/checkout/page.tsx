"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { Suspense, useMemo } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";

// Load Stripe Promise using environment variable
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const clientSecret = searchParams.get("secret");

  const options = useMemo(() => ({ clientSecret: clientSecret || "" }), [clientSecret]);

  if (!clientSecret) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-900 px-4 bg-white">
        <h2 className="text-2xl font-semibold mb-4 text-[#62C1BF]">Invalid Checkout Link</h2>
        <p className="text-gray-500 mb-6 text-center max-w-md">
          No checkout details were found. Please go back and select a subscription plan.
        </p>
        <Button
          onClick={() => router.push("/#pricing")}
          className="bg-[#62C1BF] hover:bg-[#52a9a7] text-[#224443] font-medium px-8 py-3 rounded-full text-lg transition-all duration-300"
        >
          View Plans
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      <div className="w-full max-w-6xl">
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen bg-white">
            <Loader2 className="w-12 h-12 animate-spin text-[#62C1BF]" />
          </div>
        }
      >
        <CheckoutContent />
      </Suspense>
    </div>
  );
}