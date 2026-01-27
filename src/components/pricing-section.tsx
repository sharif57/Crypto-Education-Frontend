/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Button } from "@/components/ui/button";
import { useBuySubscriptionMutation } from "@/Redux/feature/subscriptionSlice";
import { useUserProfileQuery } from "@/Redux/feature/userSlice";
import { Check, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "@/hooks/useTranslation";

interface Plan {
  name: string;
  price: number;
  description: string;
  features: string[];
  featured: boolean;
  billingCycle: string;  // Remove ? to make it required
}

export default function PricingSection() {
  const { t } = useTranslation();
  const router = useRouter();
  const [buySubscription] = useBuySubscriptionMutation();
  const { data } = useUserProfileQuery(undefined);
  const user = data?.data;
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);


  const PLANS: Plan[] = [
    {
      name: t('pricing_plan_pro'),
      billingCycle: 'monthly',
      price: 29.90,
      description: t('pricing_pro_monthly_desc'),
      features: [
        t('pricing_feature_ai'),
        t('pricing_feature_telegram'),
        t('pricing_feature_videos'),
      ],
      featured: false,
    },
    {
      name: t('pricing_plan_pro'),
      billingCycle: 'yearly',
      price: 250,
      description: t('pricing_pro_yearly_desc'),
      features: [
        t('pricing_feature_everything_basic'),
        t('pricing_feature_qa_calls'),
        t('pricing_feature_signals'),
        t('pricing_feature_portfolio'),
      ],
      featured: true,
    },
    {
      name: t('pricing_plan_elite'),
      billingCycle: 'lifetime',
      price: 4000,
      description: t('pricing_elite_lifetime_desc'),
      features: [
        t('pricing_feature_everything_pro'),
        t('pricing_feature_masterclasses'),
        t('pricing_feature_mentoring'),
        t('pricing_feature_events'),
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

        {/* <div>
          <h1 className="text-3xl font-normal w-full  mx-auto text-[60px] text-white text-center">
            {t('pricing_header1')} <span className="bg-gradient-to-r from-[#94ecea] to-[#307574] bg-clip-text text-transparent font-normal">
              {t('pricing_header_value')} 
            </span>

            <span>{t('pricing_header2')}</span>
          </h1>
          <p className="text-[16px] font-normal text-[#B4B4B4] pt-2 w-full lg:w-4xl mx-auto text-center text-balance">
            {t('pricing_subtitle')}
          </p>
        </div> */}

        <div className="px-4 sm:px-6 lg:px-0">
          <h1
            className="
      mx-auto text-center text-white font-normal
      text-3xl sm:text-4xl md:text-5xl xl:text-6xl
      leading-tight sm:leading-snug xl:leading-[1.15]
      max-w-5xl
    "
          >
            {t("pricing_header1")}{" "}
            <span className="bg-gradient-to-r from-[#94ecea] to-[#307574] bg-clip-text text-transparent">
              {t("pricing_header_value")}
            </span>{" "}
            <span>{t("pricing_header2")}</span>
          </h1>

          <p
            className="
      mx-auto mt-3 text-center text-[#B4B4B4]
      text-sm sm:text-base md:text-lg
      max-w-3xl
    "
          >
            {t("pricing_subtitle")}
          </p>
        </div>


        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6 xl:gap-8 mt-14">
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
                        {t('pricing_most_popular')}
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
                    t('pricing_choose_plan')
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