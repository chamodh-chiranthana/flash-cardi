"use client";

import { useEffect, useState } from "react";
import { DeckCard } from "./DeckCard";

interface Deck {
  deckId: string;
  title: string;
}

export const Decks = () => {
  const [decks, setDecks] = useState<Deck[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchDecks() {
      try {
        console.log("Fetching decks from API...");
        const response = await fetch("http://localhost:8080/api/deck");
        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            `Failed to fetch data: ${response.status} ${response.statusText}`,
            errorText
          );
          throw new Error(
            `Failed to fetch data: ${response.status} ${response.statusText}`
          );
        }
        const data: Deck[] = await response.json();
        console.log("Fetched decks:", data);
        setDecks(data);
      } catch (err) {
        console.error("Error fetching decks:", err);
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
        <DeckCard key={deck.deckId} deckTitle={deck.title} />
      ))}
    </div>
  );
};
