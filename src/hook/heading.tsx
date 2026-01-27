// import React from "react";

// export default function Heading({
//   title,
//   subtitle,
// }: {
//   title: string;
//   subtitle: string;
// }) {
//   return (
//     <div>
//       <h1 className="text-3xl font-normal w-full lg:w-1/2 mx-auto text-[60px] text-white text-center">
//         {title.split("TheClue®")[0]}
//         <span className="bg-gradient-to-r from-[#94ecea] to-[#307574] bg-clip-text text-transparent font-normal">
//           TheClue®
//         </span>
//         {title.split("TheClue®")[1]}
//       </h1>
//       <p className="text-[16px] font-normal text-[#B4B4B4] pt-2 w-full lg:w-4xl mx-auto text-center text-balance">
//         {subtitle}
//       </p>
//     </div>
//   );
// }
import React from "react";

interface HeadingProps {
  title: string;
  subtitle: string;
}

export default function Heading({ title, subtitle }: HeadingProps) {
  const parts = title.split("TheClue®");

  return (
    <div className="px-4 sm:px-6 lg:px-0">
      <h1
        className="
          mx-auto text-center text-white font-normal
          text-3xl sm:text-4xl md:text-5xl lg:text-6xl
          leading-tight sm:leading-snug lg:leading-[1.15]
          max-w-5xl
        "
      >
        {parts[0]}
        {parts.length > 1 && (
          <span className="bg-gradient-to-r from-[#94ecea] to-[#307574] bg-clip-text text-transparent">
            TheClue®
          </span>
        )}
        {parts[1]}
      </h1>

      <p
        className="
          mx-auto mt-3 text-center text-[#B4B4B4]
          text-sm sm:text-base md:text-lg
          max-w-3xl
        "
      >
        {subtitle}
      </p>
    </div>
  );
}
