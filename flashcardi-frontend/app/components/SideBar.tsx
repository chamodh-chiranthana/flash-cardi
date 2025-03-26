"use client";

import { Decks } from "./Decks";
import Logo from "./Logo";

export default function SiderBar() {
  return (
    <>
      <div className="border-b-gray-500 border-b-2 ">
        <Logo />
      </div>
      <div>
        <Decks />
      </div>
    </>
  );
}
