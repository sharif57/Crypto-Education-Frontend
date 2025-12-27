// 'use client';
// import { Button } from "@/components/ui/button";
// import { useUserProfileQuery } from "@/Redux/feature/userSlice";
// import { ArrowRight } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// export default function Masterclass() {
//   const [itemName, setItemName]= useState(); 
//   const {data} = useUserProfileQuery(undefined)
//   const user = data?.data;
//   console.log(user, 'user');


//       const isSubscribed = user?.subscription && ["basic", "pro", "elite"].includes(user.subscription);

//     if (itemName === "Courses" || itemName === "AI Assistance") {
//       if (!isSubscribed) {
//         // Redirect to pricing page if not subscribed
//         if (pathname === "/") {
//           const element = document.getElementById("pricing");
//           if (element) {
//             element.scrollIntoView({ behavior: "smooth", block: "start" });
//           }
//           setActiveItem("Pricing");
//         } else {
//           router.push("/#pricing");
//         }
//         return;
//       }
//     }

//   return (
//     <section className="relative bg-[#1a1a1a] py-16 lg:py-24 overflow-hidden">
//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
//           {/* Left Content - Phone Mockup */}
//           <div className="flex justify-center lg:justify-start">
//             <div className="relative">
//               <Image
//                 src="/images/master.png"
//                 alt="Masterclass"
//                 width={600}
//                 height={600}
//                 className="object-contain"
//               />
//             </div>
//           </div>

//           {/* Right Content - Text */}
//           <div className="space-y-8 text-center lg:text-left">
//             <div className="space-y-6">
//               <h2 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-medium leading-tight">
//                 <span className="text-white">Masterclasses</span>
//                 <br />
//                 <span className="text-white">Learn from the</span>
//                 <br />
//                 <span className="text-text">Best</span>
//               </h2>

//               <p className="text-[#E0E0E0] text-lg sm:text-xl lg:text-2xl leading-relaxed  mx-auto lg:mx-0">
//                 Dive deep into curated lessons on Crypto, Blockchain, NFTs,
//                 DeFi, and the future of Web3 — perfect for beginners and
//                 advanced learners alike.
//               </p>
//             </div>

//             <div className="flex justify-center lg:justify-start">
//               {/* <Link href={"/courses"}> */}
//                 {" "}
//                 <Button
//                   size="lg"
//                   className="bg-text hover:bg-text cursor-pointer text-[#224443] font-medium !px-8 py-6 rounded-full text-lg transition-all duration-300 shadow-lg shadow-cyan-400/25 hover:shadow-cyan-400/40 group"
//                 >
//                   Start Learning
//                   <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
//                 </Button>
//               {/* </Link> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
'use client';

import { Button } from "@/components/ui/button";
import { useUserProfileQuery } from "@/Redux/feature/userSlice";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Masterclass() {
  const pathname = usePathname();
  const router = useRouter();

  const { data, isLoading } = useUserProfileQuery(undefined);
  const user = data?.data;

  const isSubscribed = user?.subscription && ["basic", "pro", "elite"].includes(user.subscription.toLowerCase());

  const handleStartLearning = () => {
    if (!isSubscribed) {
      if (pathname === "/") {
        const element = document.getElementById("pricing");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        router.push("/#pri");
      }
    } else {
      // Subscribed → go to courses
      router.push("/courses");
    }
  };

  useEffect(() => {
    if (!isLoading && !isSubscribed && pathname.includes("#pricing")) {
      const element = document.getElementById("pricing");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [isLoading, isSubscribed, pathname]);

  if (isLoading) {
    return null; 
  }

  return (
    <section className="relative bg-[#1a1a1a] py-16 lg:py-24 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Left Content - Phone Mockup */}
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative">
              <Image
                src="/images/master.png"
                alt="Masterclass - Learn Crypto, Blockchain, NFTs, DeFi"
                width={600}
                height={600}
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>

          {/* Right Content - Text */}
          <div className="space-y-8 text-center lg:text-left order-1 lg:order-2">
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-medium leading-tight">
                <span className="text-white">Masterclasses</span>
                <br />
                <span className="text-white">Learn from the</span>
                <br />
                <span className="text-[#62C1BF]">Best</span>
              </h2>

              <p className="text-[#E0E0E0] text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Dive deep into curated lessons on Crypto, Blockchain, NFTs,
                DeFi, and the future of Web3 — perfect for beginners and
                advanced learners alike.
              </p>
            </div>

            <div className="flex justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={handleStartLearning}
                className="bg-[#62C1BF] hover:bg-[#52a9a7] cursor-pointer text-[#224443] font-medium !px-8 py-6 rounded-full text-lg transition-all duration-300 shadow-lg shadow-cyan-400/25 hover:shadow-cyan-400/40 group"
              >
                Start Learning
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}