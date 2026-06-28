/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Button } from "@/components/ui/button";
import { useBuySubscriptionMutation } from "@/Redux/feature/subscriptionSlice";
import { useUserProfileQuery } from "@/Redux/feature/userSlice";
import { Check, LoaderCircle, Sparkles, ArrowRight, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "@/hooks/useTranslation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  featured: boolean;
  billingCycle: string;  // Remove ? to make it required
}

const EliteCard = ({ t }: { t: any }) => {
  return (
    <div className="relative rounded-3xl transition-all duration-500 overflow-hidden group bg-gradient-to-br from-[#1c1c1c] to-[#2e2e2e] border border-gray-700/50 hover:border-cyan-400/30 hover:shadow-lg hover:shadow-cyan-400/10 h-[600px] lg:h-full">
      {/* Hover Background Image */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none">
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

      <div className="relative lg:absolute lg:inset-0 p-8 z-20 flex flex-col h-full">
        {/* Scrollable Content */}
        <div className="grow flex flex-col overflow-y-auto pr-2 mb-6 space-y-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-500">

          <div>
            <h3 className="text-2xl lg:text-3xl font-medium text-white mb-2">
              {t('pricing_plan_elite')}
            </h3>
            <h4 className="text-xl font-medium text-cyan-300">
              {t('pricing_elite_card_title')}
            </h4>
          </div>

          <div className="text-gray-300 text-sm space-y-2">
            <p>{t('pricing_elite_card_intro1')}</p>
            {t('pricing_elite_card_intro2') && <p>{t('pricing_elite_card_intro2')}</p>}
            <p className="font-semibold text-white">{t('pricing_elite_card_intro3')}</p>
            <p>{t('pricing_elite_card_intro4')}</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-cyan-300">{t('pricing_elite_card_what_you_get')}</h4>

            <div className="space-y-1">
              <p className="text-white font-medium">{t('pricing_elite_card_mentoring_title')}</p>
              <p className="text-gray-400 text-sm">{t('pricing_elite_card_mentoring_desc')}</p>
            </div>

            <div className="space-y-1">
              <p className="text-white font-medium">{t('pricing_elite_card_strategy_title')}</p>
              <p className="text-gray-400 text-sm">{t('pricing_elite_card_strategy_desc')}</p>
              <ul className="text-gray-400 text-sm pl-2 space-y-0.5">
                <li>{t('pricing_elite_card_strategy_p1')}</li>
                <li>{t('pricing_elite_card_strategy_p2')}</li>
                <li>{t('pricing_elite_card_strategy_p3')}</li>
                <li>{t('pricing_elite_card_strategy_p4')}</li>
              </ul>
            </div>

            <div className="space-y-1">
              <p className="text-white font-medium">{t('pricing_elite_card_market_title')}</p>
              <p className="text-gray-400 text-sm">{t('pricing_elite_card_market_desc')}</p>
              <ul className="text-gray-400 text-sm pl-2 space-y-0.5">
                <li>{t('pricing_elite_card_market_p1')}</li>
                <li>{t('pricing_elite_card_market_p2')}</li>
                <li>{t('pricing_elite_card_market_p3')}</li>
                <li>{t('pricing_elite_card_market_p4')}</li>
              </ul>
            </div>

            <div className="space-y-1">
              <p className="text-white font-medium">{t('pricing_elite_card_clue_title')}</p>
              <p className="text-gray-400 text-sm">{t('pricing_elite_card_clue_desc')}</p>
              <ul className="text-cyan-400 text-sm pl-2 space-y-0.5">
                <li>{t('pricing_elite_card_clue_p1')}</li>
                <li>{t('pricing_elite_card_clue_p2')}</li>
                <li>{t('pricing_elite_card_clue_p3')}</li>
                <li>{t('pricing_elite_card_clue_p4')}</li>
                <li>{t('pricing_elite_card_clue_p5')}</li>
              </ul>
            </div>

            <div className="space-y-1">
              <p className="text-white font-medium">{t('pricing_elite_card_target_title')}</p>
              <p className="text-gray-400 text-sm">{t('pricing_elite_card_target_desc')}</p>
              <ul className="text-gray-400 text-sm pl-2 space-y-0.5">
                <li>{t('pricing_elite_card_target_p1')}</li>
                <li>{t('pricing_elite_card_target_p2')}</li>
                <li>{t('pricing_elite_card_target_p3')}</li>
              </ul>
            </div>

          </div>

        </div>

        {/* CTA Button Fixed at bottom */}
        <div className="mt-auto pt-4 border-t border-gray-700/50">
          <Button
            className="w-full !py-6 rounded-full text-lg font-medium transition-all duration-300 bg-text hover:bg-text cursor-pointer text-black shadow-lg shadow-cyan-400/25 hover:shadow-cyan-400/40"
            onClick={() => window.open("https://calendly.com/", "_blank")}
          >
            {t('pricing_elite_card_contact')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function PricingSection() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [buySubscription] = useBuySubscriptionMutation();
  const { data } = useUserProfileQuery(undefined);
  const user = data?.data;
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatPrice = (price: number) => {
    const locale = i18n.language?.startsWith("de") ? "de-DE" : "en-US";

    return `$${new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price)}`;
  };


  const PLANS: Plan[] = [
    {
      id: 'pro',
      name: t('pricing_plan_pro'),
      billingCycle: 'monthly',
      price: 29.99,
      description: t('pricing_pro_monthly_desc'),
      features: [
        t('pricing_feature_ai'),
        t('pricing_feature_telegram'),
        t('pricing_feature_videos'),
        t('pricing_feature_live_calls'),
        t('pricing_feature_workshops'),
      ],
      featured: false,
    },
    {
      id: 'pro',
      name: t('pricing_plan_pro'),
      billingCycle: 'yearly',
      price: 250,
      description: t('pricing_pro_yearly_desc'),
      features: [
        t('pricing_feature_ai'),
        t('pricing_feature_telegram'),
        t('pricing_feature_videos'),
        t('pricing_feature_live_calls'),
        t('pricing_feature_workshops'),
      ],
      featured: true,
    },
    {
      id: 'elite',
      name: t('pricing_plan_elite'),
      billingCycle: 'lifetime',
      price: 3999,
      description: t('pricing_elite_lifetime_desc'),
      features: [
        t('pricing_elite_feature_mentoring'),
        t('pricing_elite_feature_strategy'),
        t('pricing_elite_feature_analysis'),
        t('pricing_elite_feature_access'),
        t('pricing_elite_feature_support'),
      ],
      featured: false,
    },
  ];

  const handleOpenModal = (plan: Plan) => {
    if (!user) {
      toast.error("Please sign in to buy a subscription.");
      router.push("/auth/login");
      return;
    }
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleConfirmSubscription = async (skip_trial: boolean) => {
    if (!selectedPlan) return;

    const payload = {
      plan: selectedPlan.id,
      billing_cycle: selectedPlan.billingCycle,
      skip_trial,
    };
    console.log(payload, '=======================')

    // console.log("SUBSCRIPTION PAYLOAD 👉", payload);

    try {
      setLoadingPlan(`${selectedPlan.id}-${selectedPlan.billingCycle}-${skip_trial}`);
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
      setIsModalOpen(false);
    }
  };

  return (
    <section id="pricing" className="relative bg-[#1a1a1a] ">
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
            plan.name === t('pricing_plan_elite') ? (
              <EliteCard key={plan.billingCycle} t={t} />
            ) : (
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
                  <div className="grow flex flex-col">
                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline">
                        <span className="text-4xl lg:text-4xl font-semibold text-white">
                          {formatPrice(plan.price)}
                        </span>
                        <span className="text-gray-400 ml-2">/{t(`pricing_${plan.billingCycle}`)}</span>
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
                    <div className="space-y-4 mb-4">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-5 h-5 bg-cyan-400/20 rounded-full flex items-center justify-center mt-0.5">
                            <Check className="w-3 h-3 text-cyan-400" />
                          </div>
                          <span className="text-gray-300 text-base">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-auto pt-2 pb-4">
                      <p className="text-gray-300 text-sm text-center">
                        {t('motivation_title')}
                      </p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    disabled={loadingPlan !== null && loadingPlan.startsWith(`${plan.id}-${plan.billingCycle}`)}
                    className="w-full !py-6 rounded-full text-lg font-medium transition-all duration-300 bg-text hover:bg-text cursor-pointer text-black shadow-lg shadow-cyan-400/25 hover:shadow-cyan-400/40"
                    onClick={() => handleOpenModal(plan)}
                  >
                    {loadingPlan !== null && loadingPlan.startsWith(`${plan.id}-${plan.billingCycle}`) ? (
                      <LoaderCircle className="animate-spin size-8" />
                    ) : (
                      t('pricing_choose_plan')
                    )}
                  </Button>
                </div>
              </div>
            )
          ))}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-gradient-to-br from-[#1c1c1c] to-[#2e2e2e] text-white border border-gray-700/50 shadow-lg shadow-cyan-400/10 sm:max-w-md p-0 overflow-hidden rounded-3xl [&>button]:text-gray-400 [&>button:hover]:text-white">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#94ecea] to-[#307574]"></div>

          <div className="p-8">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-normal flex items-center gap-2 mb-2">
                <Sparkles className="w-6 h-6 text-[#94ecea]" />
                <span className="bg-gradient-to-r from-[#94ecea] to-[#307574] bg-clip-text text-transparent">Choose Your Path</span>
              </DialogTitle>
              <DialogDescription className="text-[#B4B4B4] text-base leading-relaxed">
                Unlock the full potential of your trading journey. Start with a risk-free trial or dive straight in.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4 mt-8">
              <Button
                className="w-full !py-6 rounded-full text-lg font-medium transition-all duration-300 bg-text hover:bg-text cursor-pointer text-black shadow-lg shadow-cyan-400/25 hover:shadow-cyan-400/40 group relative flex items-center justify-center gap-2 border-none"
                onClick={() => handleConfirmSubscription(false)}
                disabled={!!loadingPlan}
              >
                {loadingPlan === `${selectedPlan?.id}-${selectedPlan?.billingCycle}-false` ? (
                  <LoaderCircle className="animate-spin size-6" />
                ) : (
                  <>
                    <span>Start 3-Day Free Trial</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-gray-700/50"></div>
                <span className="flex-shrink-0 mx-4 text-[#B4B4B4] text-sm font-normal">OR</span>
                <div className="flex-grow border-t border-gray-700/50"></div>
              </div>

              <Button
                className="w-full !py-6 rounded-full text-lg font-medium transition-all duration-300 bg-transparent border border-gray-700 hover:border-cyan-400/30 text-gray-300 hover:text-white hover:bg-cyan-400/5 group flex items-center justify-center gap-2"
                onClick={() => handleConfirmSubscription(true)}
                disabled={!!loadingPlan}
              >
                {loadingPlan === `${selectedPlan?.id}-${selectedPlan?.billingCycle}-true` ? (
                  <LoaderCircle className="animate-spin size-6" />
                ) : (
                  <>
                    <Zap className="w-5 h-5 group-hover:scale-110 transition-transform text-[#94ecea]" />
                    <span>Skip Trial & Pay Now</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}