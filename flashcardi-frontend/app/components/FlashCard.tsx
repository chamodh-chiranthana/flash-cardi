"use client";

import React, { useContext, useState } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { CardContext } from "../contexts/CardProvider";

interface FlashCardProps {
  card: {
    cardId: string;
    frontText: string;
    backText: string;
    deckId: string;
  };
  colorIndex: number;
  isMobile?: boolean;
}

export default function FlashCard({
  card,
  colorIndex,
  isMobile = false,
}: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { openCardEditModal, openCardDeleteModal } = useContext(CardContext);

  const handleClick = () => {
    setIsFlipped((prev) => !prev);
  };

  // Modal handlers
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openCardEditModal(card);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openCardDeleteModal(card);
  };

  return (
    <div
      className={`
        shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative
        ${isMobile ? "h-[180px] w-full" : "h-[250px] w-[300px]"}
      `}
      style={{
        perspective: "1000px",
      }}
    >
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.6s",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front of card */}
        <div
          onClick={handleClick}
          className="absolute inset-0 w-full h-full flex flex-col justify-center items-center p-6 rounded-lg cursor-pointer group"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            backgroundColor: `var(--card-color-${(colorIndex % 10) + 1})`,
            color: "white",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          <div
            className={`font-medium ${
              isMobile ? "text-base" : "text-lg"
            } text-center`}
          >
            {card.frontText}
          </div>
          <div
            className={`absolute bottom-3 right-3 flex gap-2 ${
              isMobile
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100 transition-opacity"
            }`}
          >
            <button
              className="p-1 border-white border-2 bg-transparent rounded hover:bg-white hover:bg-opacity-20"
              onClick={handleEditClick}
            >
              <PencilSquareIcon
                style={{
                  height: isMobile ? 16 : 20,
                  width: isMobile ? 16 : 20,
                }}
                className="text-white"
              />
            </button>
            <button
              className="p-1 border-white border-2 bg-transparent rounded hover:bg-white hover:bg-opacity-20"
              onClick={handleDeleteClick}
            >
              <TrashIcon
                style={{
                  height: isMobile ? 16 : 20,
                  width: isMobile ? 16 : 20,
                }}
                className="text-white"
              />
            </button>
          </div>
        </div>

        {/* Back of card */}
        <div
          onClick={handleClick}
          className="absolute inset-0 w-full h-full flex flex-col justify-center items-center p-6 rounded-lg cursor-pointer group"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            backgroundColor: `var(--card-color-${(colorIndex % 10) + 1})`,
            transform: "rotateY(180deg)",
            color: "white",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          <div
            className={`font-medium ${
              isMobile ? "text-base overflow-y-auto max-h-[120px]" : "text-lg"
            } text-center`}
          >
            {card.backText}
          </div>
          <div
            className={`absolute bottom-3 right-3 flex gap-2 ${
              isMobile
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100 transition-opacity"
            }`}
          >
            <button
              className="p-1 border-white border-2 bg-transparent rounded hover:bg-white hover:bg-opacity-20"
              onClick={handleEditClick}
            >
              <PencilSquareIcon
                style={{
                  height: isMobile ? 16 : 20,
                  width: isMobile ? 16 : 20,
                }}
                className="text-white"
              />
            </button>
            <button
              className="p-1 border-white border-2 bg-transparent rounded hover:bg-white hover:bg-opacity-20"
              onClick={handleDeleteClick}
            >
              <TrashIcon
                style={{
                  height: isMobile ? 16 : 20,
                  width: isMobile ? 16 : 20,
                }}
                className="text-white"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
