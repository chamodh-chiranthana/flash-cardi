"use client";

<<<<<<< Updated upstream
import { useEffect, useState } from "react";
import { DeckCard } from "./DeckCard";
import { AddNewDeck } from "./AddNewDeck";
=======
import { useEffect, useState, useContext } from "react";
import { DeckCard } from "./DeckCard";
import { AddNewDeck } from "./AddNewDeck";
import { DeckContext } from "../contexts/DeckProvider";
>>>>>>> Stashed changes

interface Deck {
  deckId: string;
  title: string;
  description: string;
}

<<<<<<< Updated upstream
export const Decks = () => {
  const [decks, setDecks] = useState<Deck[]>();
=======
interface DecksProps {
  isMobile: boolean;
}

export const Decks = ({ isMobile }: DecksProps) => {
>>>>>>> Stashed changes
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

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
  }, []);

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
          ? "flex flex-row h-full items-center py-2 px-1 overflow-x-auto overflow-y-hidden w-full"
          : "flex flex-col items-center w-full"
      }`}
      style={{ scrollbarWidth: "thin" }}
    >
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
          <AddNewDeck isMobile={isMobile} />
        </>
      ) : (
        <div className="w-full grid grid-cols-1 place-items-center gap-2">
          {decks?.map((deck) => (
            <DeckCard
              key={deck.deckId}
              title={deck.title}
              deckId={deck.deckId}
              description={deck.description}
              isMobile={isMobile}
            />
          ))}
          <AddNewDeck isMobile={isMobile} />
        </div>
      )}
    </div>
  );
};
