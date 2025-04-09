"use client";

import { Rowdies } from "next/font/google";

const rowdiesFont = Rowdies({
  subsets: ["latin"],
  weight: "400",
});

interface LogoProps {
  isMobile?: boolean;
}

export default function Logo({ isMobile = false }: LogoProps) {
  return (
    <div className={`bg-white ${isMobile ? "py-1" : ""}`}>
      <h1
        className={`text-center font-bold font-logo ${rowdiesFont.className} 
          text-4xl xs:text-5xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl 
          p-5 xs:p-6 sm:p-5 md:p-6 lg:p-8 xl:p-10
          ${isMobile ? "p-2" : ""}`}
      >
        <span className="text-red-500 logo-gradient">F</span>
        <span className="text-[#FFD700]">l</span>
        <span className="text-[#50C878]">a</span>
        <span className="text-[#FF7F50]">s</span>
        <span className="text-[#87CEEB]">h</span>
        <span className="text-[#FF00FF]">c</span>
        <span className="text-[#808000]">a</span>
        <span className="text-[#CD7F32]">r</span>
        <span className="text-[#40E0D0]">d</span>
        <span className="text-red-700">i</span>
      </h1>
    </div>
  );
}
