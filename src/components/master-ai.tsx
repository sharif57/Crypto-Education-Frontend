// import React from "react";
// import { Button } from "./ui/button";

// export default function MasterAi() {
//   return (
//     <section className="relative container mx-auto bg-gradient-to-r from-[#202020] to-[#307574]  overflow-hidden rounded-3xl bg-[#1B1B1B]">

//       {/* Background Image */}
//       <div
//         className="
//           absolute inset-0
//           border
//           bg-[url('/images/masterclass.png')]
//           bg-no-repeat
//           bg-[position:100%]
//           bg-contain
//           lg:bg-[length:520px]
//           opacity-90
//           pointer-events-none
//         "
//       />

//       {/* Content */}
//       <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-10">

//         {/* Left Content */}
//         <div className="text-white space-y-6 text-center lg:text-left">
//           <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
//             Join our Masterclass
//           </h1>

//           <p className="text-[#B5B5B5] text-base md:text-lg max-w-xl mx-auto lg:mx-0">
//             The crypto world is evolving fast. With TheClue, you&apos;ll not only
//             keep up but lead the way. This is more than just learning; it&apos;s
//             an exhilarating adventure into the future of finance.
//           </p>

//           <Button
//             size="lg"
//             className="
//               bg-text text-[#224443]
//               font-medium px-8 py-6 rounded-full text-lg
//               transition-all duration-300
//               shadow-lg shadow-cyan-400/25
//               hover:shadow-cyan-400/40
//             "
//           >
//             To the Crypto-Masterclass
//           </Button>
//         </div>

//         {/* Spacer */}
//         <div className="hidden lg:block" />
//       </div>
//     </section>
//   );
// }
import React from "react";
import { Button } from "./ui/button";

export default function MasterAi() {
  return (
    <section className="relative max-w-7xl mx-auto overflow-hidden rounded-3xl bg-gradient-to-r from-[#202020] to-[#307574] px-4 sm:px-6 lg:px-10">
      {/* Background Image */}
      <div
        className="
          absolute inset-0
          bg-[url('/images/masterclass.png')]
          bg-no-repeat
          bg-right
          bg-contain
          lg:bg-[length:520px]
          opacity-80
          pointer-events-none
        "
      />

      {/* Overlay (for better text contrast) */}
      <div className="absolute inset-0 bg-black/30 rounded-3xl" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl py-14 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <div className="text-center lg:text-left text-white space-y-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal leading-tight">
            Join our Masterclass
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#D1D1D1] max-w-xl mx-auto lg:mx-0 leading-relaxed">
            The crypto world is evolving fast. With TheClue, you&apos;ll not only
            keep up but lead the way. This is more than just learning; it&apos;s
            an exhilarating adventure into the future of finance.
          </p>

          <div className="pt-2">
            <Button
              size="lg"
              className="
                bg-[#62C1BF] hover:bg-[#52a9a7] cursor-pointer text-[#224443]
                px-8 py-6 rounded-full text-base sm:text-lg font-medium
                transition-all duration-300
                shadow-lg shadow-cyan-400/30
                hover:shadow-cyan-400/50
                hover:scale-105
              "
            >
              To the Crypto-Masterclass
            </Button>
          </div>
        </div>

        {/* Right Spacer (keeps image space on desktop) */}
        <div className="hidden lg:block" />
      </div>
    </section>
  );
}
