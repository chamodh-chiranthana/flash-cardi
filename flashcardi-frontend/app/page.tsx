"use client";

import { Decks } from "./components/Decks";
import CurrentDeck from "./components/CurrentDeck";
import { CombinedProvider } from "./contexts/CombinedProvider";
import Logo from "./components/Logo";
import { useState, useEffect } from "react";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  // Check if we're on a mobile device based on screen width
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // Under 768px is considered mobile
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return (
    <CombinedProvider>
      {/* For mobile view, we use a different layout structure */}
      {isMobile ? (
        <div className="flex flex-col h-screen">
          {/* Logo stays at the top */}
          <div className="p-2 border-b border-gray-200">
            <Logo />
          </div>

          {/* Cards become the main content with vertical scrolling */}
          <div className="flex-grow overflow-y-auto p-3">
            <CurrentDeck isMobile={true} />
          </div>

          {/* Decks move to the bottom with horizontal scrolling */}
          <div className="h-32 border-t border-gray-200">
            <Decks isMobile={true} />
          </div>
        </div>
      ) : (
        /* Desktop layout with improved responsiveness */
        <div className="flex flex-col md:flex-row h-screen">
          <div className="w-full md:w-2/5 lg:w-1/3 overflow-y-auto border-r border-gray-200 p-4">
            <Logo />
            <Decks isMobile={false} />
          </div>
          <div className="w-full md:w-3/5 lg:w-2/3 overflow-y-auto p-4">
            <CurrentDeck isMobile={false} />
          </div>
        </div>
      )}
    </CombinedProvider>
  );
}
