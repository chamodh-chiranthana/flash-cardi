"use client";

import { useContext } from "react";
import { DeckContext } from "../contexts/DeckProvider";
import { AddNewCard } from "./AddNewCard";

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
          <div className="grid grid-cols-3 gap-5">
            {cards.map((card, index) => (
              <div
                key={card.cardId}
                className="h-[250px] w-[300px] shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white border border-gray-300" // Added background, border
                style={{
                  backgroundColor: `var(--card-color-${(index % 10) + 1})`,
                  color: "white",
                  fontFamily: "Arial, Helvetica, sans-serif",
                }}
              >
                <div className="p-6 h-full flex flex-col justify-center items-center">
                  <div className="font-medium text-lg text-center">
                    {card.frontText}
                  </div>
                </div>
              </div>
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
