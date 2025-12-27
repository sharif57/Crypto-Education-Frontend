/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Button } from "@/components/ui/button";
import { useBuySubscriptionMutation } from "@/Redux/feature/subscriptionSlice";
import { useUserProfileQuery } from "@/Redux/feature/userSlice";
import { Check, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Plan {
  name: string;
  price: number;
  description: string;
  features: string[];
  featured: boolean;
  billingCycle: string;  // Remove ? to make it required
}

export default function PricingSection() {
  const router = useRouter();
  const [buySubscription] = useBuySubscriptionMutation();
  const { data } = useUserProfileQuery(undefined);
  const user = data?.data;
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);


  const PLANS: Plan[] = [
    {
      name: "Pro",
      billingCycle: "Monthly",
      price: 29.90,
      description:
        "Start your financial journey with guided videos, community access, and AI support—ideal for beginners building their foundation.",
      features: [
        "Access to the AI Agent",
        "Access to Telegram group",
        "Over 150 Videos",
      ],
      featured: false,
    },
    {
      name: "Pro",
      billingCycle: "Yearly",
      price: 250,
      description:
        "Take action with expert-led live calls, real-time trading signals, and portfolio insights—perfect for hands-on learners and active investors.",
      features: [
        "Everything in Basic",
        "Q&A Live Calls",
        "Trading signals",
        "Portfolio Analysis",
      ],
      featured: true,
    },
    {
      name: "Elite",
      billingCycle: "Lifetime",  // ← THIS WAS MISSING BEFORE
      price: 4000,
      description:
        "Unlock advanced learning with personal mentorship, exclusive events, and deep-dive masterclasses—built for serious investors.",
      features: [
        "Everything in Pro",
        "Exclusive Masterclasses",
        "1:1 Mentoring",
        "Exclusive Events",
      ],
      featured: false,
    },
  ];

  const handleBuySubscription = async (plan: Plan) => {
    if (!user) {
      toast.error("Please log in to buy a subscription.");
      router.push("/auth/login");
      return;
    }

    const payload = {
      plan: plan.name.toLowerCase(),
      billing_cycle: plan.billingCycle?.toLowerCase() || "", 
    };

    // console.log("SUBSCRIPTION PAYLOAD 👉", payload);

    try {
      setLoadingPlan(`${plan.name}-${plan.billingCycle}`);
      const res = await buySubscription(payload).unwrap();

      if (res?.checkout_url) {
        window.open(res.checkout_url, "_blank");
      } else {
        toast.error("No checkout URL received.");
      }
    } catch (error: any) {
      console.error("Subscription error:", error);
      toast.error(error?.data?.message || "Failed to process subscription. Please try again.");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section id="pricing" className="relative bg-[#1a1a1a] py-16 lg:py-24">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(6, 182, 212, 0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium leading-tight mb-6">
            <span className="text-white">Simple Plans. Serious </span>
            <span className="text-text">Value</span>
          </h2>
          <p className="text-gray-300 text-lg sm:text-xl lg:text-2xl font-normal leading-relaxed mx-auto">
            Choose a plan that fits your learning journey — upgrade anytime as you grow.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6 xl:gap-8">
          {PLANS.map((plan) => (
            <div
              key={`${plan.billingCycle}`}
              className="relative rounded-3xl p-8 transition-all duration-500 overflow-hidden group bg-gradient-to-br from-[#1c1c1c] to-[#2e2e2e] border border-gray-700/50 hover:border-cyan-400/30 hover:shadow-lg hover:shadow-cyan-400/10 min-h-[500px] flex flex-col"
            >
              {/* Hover Background Image */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: "url('/images/layers.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="absolute inset-0" />
              </div>

              <div className="relative z-20 flex flex-col h-full">
                <div className="grow">
                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl lg:text-4xl font-semibold text-white">
                        ${plan.price}
                      </span>
                      <span className="text-gray-400 ml-2">/{plan.billingCycle}</span>
                    </div>
                  </div>

                  {/* Plan Name + Badge if featured */}
                  <h3 className="text-2xl lg:text-3xl font-medium text-white mb-4">
                    {plan.name}
                    {plan.featured && (
                      <span className="ml-3 inline-block px-3 py-1 text-xs font-semibold text-cyan-300 bg-cyan-400/20 rounded-full">
                        Most Popular
                      </span>
                    )}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-base lg:text-lg leading-relaxed mb-8">
                    {plan.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-5 h-5 bg-cyan-400/20 rounded-full flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-cyan-400" />
                        </div>
                        <span className="text-gray-300 text-base">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  disabled={loadingPlan === `${plan.name}-${plan.billingCycle}`}
                  className="w-full !py-6 rounded-full text-lg font-medium transition-all duration-300 bg-text hover:bg-text cursor-pointer text-black shadow-lg shadow-cyan-400/25 hover:shadow-cyan-400/40"
                  onClick={() => handleBuySubscription(plan)}
                >
                  {loadingPlan === `${plan.name}-${plan.billingCycle}` ? (
                    <LoaderCircle className="animate-spin size-8" />
                  ) : (
                    "Choose Plan"
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}