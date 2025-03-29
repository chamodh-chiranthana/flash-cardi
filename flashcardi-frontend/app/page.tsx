"use client";

import { Decks } from "./components/Decks";
import CurrentDeck from "./components/CurrentDeck";
import { DeckProvider } from "./contexts/DeckProvider";
import Logo from "./components/Logo";

export default function Home() {
  return (
    <DeckProvider>
      <div className="flex flex-col md:flex-row h-screen">
        <div className="w-full md:w-1/3 overflow-y-auto border-r border-gray-200 p-4">
          <Logo />
          <Decks />
        </div>
        <div className="w-full md:w-2/3 overflow-y-auto p-4">
          <CurrentDeck />
        </div>
      </div>
    </DeckProvider>
  );
}
