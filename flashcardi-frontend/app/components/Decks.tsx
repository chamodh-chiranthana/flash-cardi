"use client";

import { useEffect, useState } from "react";
import { DeckCard } from "./DeckCard";
import { AddNewDeck } from "./AddNewDeck";

interface Deck {
  deckId: string;
  title: string;
  description: string;
}

export const Decks = () => {
  const [decks, setDecks] = useState<Deck[]>();
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
    <div className="flex flex-col items-center">
      {decks?.map((deck) => (
        <DeckCard
          key={deck.deckId}
          title={deck.title}
          deckId={deck.deckId}
          description={deck.description}
        />
      ))}
      <AddNewDeck />
    </div>
  );
};
