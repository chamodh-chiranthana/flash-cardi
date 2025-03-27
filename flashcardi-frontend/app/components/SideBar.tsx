"use client";

import { AddNewDeck } from "./AddNewDeck";
import { Decks } from "./Decks";

import Logo from "./Logo";

export default function SiderBar() {
  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-10 border-b-gray-500 border-b-2">
        <Logo />
      </div>
      <div className="flex-1  overflow-y-auto">
        <Decks />
        <div className="flex justify-center">
          <AddNewDeck />
        </div>
      </div>
    </div>
  );
}
