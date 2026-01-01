import React from "react";

export default function Heading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <h1 className="text-3xl font-normal w-full lg:w-1/2 mx-auto text-[60px] text-white text-center">
        {title.split("TheClue®")[0]}
        <span className="bg-gradient-to-r from-[#94ecea] to-[#307574] bg-clip-text text-transparent font-normal">
          TheClue®
        </span>
        {title.split("TheClue®")[1]}
      </h1>
      <p className="text-[16px] font-normal text-[#B4B4B4] pt-2 w-full lg:w-4xl mx-auto text-center text-balance">
        {subtitle}
      </p>
    </div>
  );
}
