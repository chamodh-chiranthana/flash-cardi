import { Rowdies } from "next/font/google";
const rowdiesFont = Rowdies({
  subsets: ["latin"],
  weight: "400",
});

export default function Logo() {
  return (
    <div>
      <h1
        className={`text-center font-bold font-logo text-5xl ${rowdiesFont.className} p-10`}
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
