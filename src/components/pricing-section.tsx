"use client";

import { Button } from "@/components/ui/button";
import { useBuySubscriptionMutation } from "@/Redux/feature/subscriptionSlice";
import { useUserProfileQuery } from "@/Redux/feature/userSlice";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Plan {
  name: string;
  price: number;
  description: string;
  features: string[];
  featured: boolean;
}


export default function PricingSection() {

  const router = useRouter();

  const PLANS: Plan[] = [
    {
      name: "Basic",
      price: 56,
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
      price: 199,
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
      price: 399,
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

  const [buySubscription] = useBuySubscriptionMutation();

    const { data } = useUserProfileQuery(undefined)
    console.log(data?.data, 'profile')
    const user = data?.data



  const handleBuySubscription = async (planName: string) => {

    if (!user) {
      router.push("/auth/login");
      toast.error("Please log in to buy a subscription.");
      return;
    }

    try {
      const plan = PLANS.find((p) => p.name === planName);

      const res = await buySubscription({ plan: plan!.name.toLowerCase() }).unwrap();
      if (res?.sessionId) {
        window.open(res?.checkoutUrl as string, "_blank");
        window.open(res?.checkoutUrl as string, "_blank");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      // toast.error(error?.data?.error || "An error occurred while processing your subscription.");
      toast.error("An error occurred while processing your subscription.");
    }
  };

  return (
    <section id="prices" className="relative bg-[#1a1a1a] py-16 lg:py-24">
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
          <p className="text-gray-300 text-lg sm:text-xl lg:text-2xl font-normal leading-relaxed  mx-auto">
            Choose a plan that fits your learning journey — upgrade anytime as
            you grow.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6 xl:gap-8 ">
          {PLANS.map((plan: Plan) => (
            <div
              key={plan.name}
              className={
                "relative rounded-3xl p-8 transition-all duration-500 overflow-hidden group bg-gradient-to-br from-[#1c1c1c] to-[#2e2e2e] border border-gray-700/50 hover:border-cyan-400/30 hover:shadow-lg hover:shadow-cyan-400/10 min-h-[500px] flex flex-col"
              }
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
                <div className="absolute inset-0 " />
              </div>

              <div className="relative z-20  flex flex-col h-full">
                <div className=" grow">
                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl lg:text-4xl font-semibold text-white">
                        ${plan.price}
                      </span>
                      <span className="text-gray-400 ml-2">/month</span>
                    </div>
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl lg:text-3xl font-medium text-white mb-4">
                    {plan.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-base lg:text-lg leading-relaxed mb-8">
                    {plan.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-4 mb-8 ">
                    {plan.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-start space-x-3"
                      >
                        <div className="flex-shrink-0 w-5 h-5 bg-cyan-400/20 rounded-full flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-cyan-400" />
                        </div>
                        <span className="text-gray-300 text-base">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  className={
                    "w-full !py-6 rounded-full text-lg font-medium transition-all duration-300  bg-text hover:bg-text cursor-pointer  text-black shadow-lg shadow-cyan-400/25 hover:shadow-cyan-400/40"
                  }
                  onClick={() => handleBuySubscription(plan.name)}>
                  Choose Plan
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
