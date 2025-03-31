"use client";

import { useContext } from "react";
import { DeckContext } from "../contexts/DeckProvider";
import { AddNewCard } from "./AddNewCard";
import React from "react";
import FlashCard from "./FlashCard";

export default function CurrentDeck() {
  const { selectedDeck, cards } = useContext(DeckContext);

  if (!selectedDeck) {
    return (
      <div className="p-4 text-gray-500">
        Please select a deck to view its cards...
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1
        className="text-2xl font-bold mb-4"
        style={{ fontFamily: "var(--font-logo)" }}
      >
        {selectedDeck.title}
      </h1>

      {selectedDeck.description && (
        <p className="mb-4 text-gray-700">{selectedDeck.description}</p>
      )}

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-3">
          Cards ({cards?.length || 0})
        </h2>

        {cards && cards.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cards.map((card, index) => (
              <FlashCard key={card.cardId} card={card} colorIndex={index} />
            ))}
            <AddNewCard deckId={selectedDeck.deckId} />
          </div>
        ) : (
          <div className="p-4 border rounded-md text-center text-gray-500">
            No cards in this deck yet
          </div>
        )}
      </div>
    </div>
  );
}
