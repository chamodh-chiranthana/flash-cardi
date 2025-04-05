"use client";

import { useEffect, useState, useContext } from "react"; // Added useContext
import { DeckCard } from "./DeckCard";
import { AddNewDeck } from "./AddNewDeck";
import { DeckContext } from "../contexts/DeckProvider"; // Import DeckContext

interface Deck {
  deckId: string;
  title: string;
  description: string;
}

export const Decks = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Use decks from context instead of local state
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
        setDecks(data); // Update decks in context instead of local state
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

  // Set up a refresh interval to keep data in sync
  useEffect(() => {
    // Refresh deck data every 30 seconds
    const refreshInterval = setInterval(async () => {
      try {
        const response = await fetch("http://localhost:8080/api/deck");
        if (response.ok) {
          const freshData: Deck[] = await response.json();
          setDecks(freshData);
        }
      } catch (error) {
        console.error("Error refreshing deck data:", error);
      }
    }, 30000);

    return () => clearInterval(refreshInterval);
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
