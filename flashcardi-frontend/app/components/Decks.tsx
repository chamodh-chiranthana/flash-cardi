"use client";

import { useEffect, useState, useContext } from "react";
import { DeckCard } from "./DeckCard";
import { AddNewDeck } from "./AddNewDeck";
import { DeckContext } from "../contexts/DeckProvider";

interface Deck {
  deckId: string;
  title: string;
  description: string;
}

interface DecksProps {
  isMobile?: boolean;
}

export const Decks = ({ isMobile = false }: DecksProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Use decks from context
  const { decks, setDecks } = useContext(DeckContext);

  useEffect(() => {
    async function fetchDecks() {
      try {
        const response = await fetch("http://localhost:8080/api/deck");
        if (!response.ok) {
          throw new Error(
            `Failed to fetch data: ${response.status} ${response.statusText}`
          );
        }
        const data: Deck[] = await response.json();
        setDecks(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unknown error occurred."));
        }
      } finally {
        setLoading(false);
      }
    }
    fetchDecks();
  }, [setDecks]);

  if (loading) {
    return (
      <>
        <div>
          <p>Loading please wait...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div>
          <p>Error: {error.message}</p>
        </div>
      </>
    );
  }

  return (
    <div
      className={`${
        isMobile
          ? "flex flex-col h-[180px] w-full"
          : "flex flex-col items-center w-full py-4" /* Column layout with spacing */
      }`}
    >
      {/* Title for deck section */}
      <h2
        className={`font-bold text-xl self-start mt-5 ${
          isMobile ? "px-2 mb-1" : "px-4 mb-2"
        }`}
      >
        Your Decks
      </h2>

      <div
        className={`${
          isMobile
            ? "flex flex-row items-center py-2 px-1 overflow-x-auto overflow-y-hidden w-full flex-1"
            : "flex flex-col items-center w-full space-y-4" /* Column layout with spacing */
        } custom-scrollbar`}
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "var(--sidebar-background) transparent",
        }}
      >
        <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #e8f5e9; /* Hardcoded color for better compatibility */
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          /* Firefox */
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #e8f5e9 transparent;
          }
        `}</style>

        {isMobile ? (
          <>
            {decks?.map((deck) => (
              <DeckCard
                key={deck.deckId}
                title={deck.title}
                deckId={deck.deckId}
                description={deck.description}
                isMobile={isMobile}
              />
            ))}
            <div className="min-w-[80px] h-[140px] flex-shrink-0 flex items-center">
              <AddNewDeck isMobile={isMobile} />
            </div>
          </>
        ) : (
          <>
            {decks?.map((deck) => (
              <DeckCard
                key={deck.deckId}
                title={deck.title}
                deckId={deck.deckId}
                description={deck.description}
                isMobile={isMobile}
              />
            ))}
            <div className="w-full max-w-md flex-shrink-0">
              <AddNewDeck isMobile={isMobile} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
