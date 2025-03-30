"use client";

import { useContext, useState } from "react";
import { DeckContext } from "../contexts/DeckProvider";
import { AddNewCard } from "./AddNewCard";
import React from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function CurrentDeck() {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const { selectedDeck, cards } = useContext(DeckContext);

  const handleClick = (cardId: string) => {
    setFlippedCards((prevFlipped) => ({
      ...prevFlipped,
      [cardId]: !prevFlipped[cardId],
    }));
  };

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
              <div
                key={card.cardId}
                className="h-[250px] w-[300px] shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative"
                style={{
                  perspective: "1000px",
                }}
              >
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    transformStyle: "preserve-3d",
                    transition: "transform 0.6s",
                    transform: flippedCards[card.cardId]
                      ? "rotateY(180deg)"
                      : "rotateY(0deg)",
                  }}
                >
                  {/* Front of card */}
                  <div
                    onClick={() => handleClick(card.cardId)}
                    className="absolute inset-0 w-full h-full flex flex-col justify-center items-center p-6 rounded-lg cursor-pointer group"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      backgroundColor: `var(--card-color-${(index % 10) + 1})`,
                      color: "white",
                      fontFamily: "Arial, Helvetica, sans-serif",
                    }}
                  >
                    <div className="font-medium text-lg text-center">
                      {card.frontText}
                    </div>
                    <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 border-white border-2 bg-opacity-20 rounded hover:bg-opacity-30">
                        <PencilSquareIcon
                          style={{
                            height: 20,
                            width: 20,
                          }}
                        />
                      </button>
                      <button className="p-1 border-white border-2  bg-opacity-20 rounded hover:bg-opacity-30">
                        <TrashIcon
                          style={{
                            height: 20,
                            width: 20,
                          }}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Back of card */}
                  <div
                    onClick={() => handleClick(card.cardId)}
                    className="absolute inset-0 w-full h-full flex flex-col justify-center items-center p-6 rounded-lg cursor-pointer group"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      backgroundColor: `var(--card-color-${(index % 10) + 1})`,
                      transform: "rotateY(180deg)",
                      color: "white",
                      fontFamily: "Arial, Helvetica, sans-serif",
                    }}
                  >
                    <div className="font-medium text-lg text-center">
                      {card.backText}
                    </div>
                    <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 border-white border-2 bg-opacity-20 rounded hover:bg-opacity-30">
                        <PencilSquareIcon
                          style={{
                            height: 20,
                            width: 20,
                          }}
                        />
                      </button>
                      <button className="p-1 border-white border-2  bg-opacity-20 rounded hover:bg-opacity-30">
                        <TrashIcon
                          style={{
                            height: 20,
                            width: 20,
                          }}
                        />
                      </button>
                    </div>
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
