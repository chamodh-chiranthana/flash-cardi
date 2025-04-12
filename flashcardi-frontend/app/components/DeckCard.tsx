"use client";

import {
  // ExclamationTriangleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import { useContext, CSSProperties, useState, useMemo } from "react";
import { DeckContext } from "../contexts/DeckProvider";
import { CardContext } from "../contexts/CardProvider";
import { API_BASE_URL } from "../config/api";

// Normal text style for desktop view
const normalTextStyle: CSSProperties = {
  color: "#ffffff",
  fontSize: "1.3rem",
  fontWeight: "600",
};

// Mobile text style (changed from vertical to horizontal for better visibility)
const mobileTextStyle: CSSProperties = {
  color: "#ffffff",
  fontSize: "1rem",
  fontWeight: "500",
  textAlign: "center",
  width: "100%",
};

interface DeckCardProps {
  title: string;
  deckId: string;
  description: string;
  isMobile?: boolean;
  colorIndex?: number;
}

// Helper function to get card color based on index
const getCardColor = (colorIndex: number = 1): string => {
  const safeIndex = ((colorIndex - 1) % 9) + 1; // Ensure it's between 1-9
  return `var(--card-color-${safeIndex})`;
};

// Color assignment context to ensure consistent sequential assignment
const ColorAssignmentContext = {
  assignedColors: new Map<string, number>(),
  nextColorIndex: 1,
  getColorForId: function (id: string): number {
    if (this.assignedColors.has(id)) {
      return this.assignedColors.get(id)!;
    }

    const colorIndex = this.nextColorIndex;
    this.assignedColors.set(id, colorIndex);
    this.nextColorIndex = (this.nextColorIndex % 9) + 1; // Cycle through 1-9

    return colorIndex;
  },
};

export const DeckCard: React.FC<DeckCardProps> = ({
  title,
  deckId,
  description,
  isMobile = false,
  colorIndex,
}) => {
  const { setSelectedDeck } = useContext(DeckContext);
  const { setCards } = useContext(CardContext);
  const [isHovered, setIsHovered] = useState(false);

  // Use provided colorIndex or get a consistent one from our context
  const stableColorIndex = useMemo(() => {
    if (colorIndex !== undefined) return colorIndex;
    return ColorAssignmentContext.getColorForId(deckId);
  }, [deckId, colorIndex]);

  const cardColor = getCardColor(stableColorIndex);

  // Always use white text for better contrast against colored backgrounds
  const textColor = "#ffffff";

  const handleSelectDeck = async () => {
    const deck = {
      deckId: deckId,
      title: title,
      description: description,
    };

    setSelectedDeck(deck);

    try {
      const response = await fetch(`${API_BASE_URL}/deck/${deckId}/card`);
      if (!response.ok) {
        throw new Error("Failed to fetch cards from that deck.");
      }

      const cardsData = await response.json();
      setCards(cardsData);
    } catch (err) {
      console.log("An Error occurred fetching cards: ", err);
      setCards([]);
    }
  };

  // For mobile version with horizontal text
  if (isMobile) {
    return (
      <div
        className={`
          relative
          min-w-[140px] max-w-[140px] mx-2 
          hover:scale-105 transition-all duration-300
          rounded-lg p-4 shadow-md cursor-pointer
          border-2
        `}
        style={{
          borderColor: isHovered ? cardColor : "#e5e7eb",
          backgroundColor: cardColor, // Always show full color
        }}
        onClick={handleSelectDeck}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col items-center h-full">
          <div className="flex-1 flex items-center justify-center py-2">
            <h2
              className="font-medium transition-colors duration-300"
              style={{
                ...mobileTextStyle,
                color: textColor,
              }}
            >
              {title}
            </h2>
          </div>
          <div className="p-1">
            <button
              onClick={handleSelectDeck}
              className="p-1 bg-white rounded-full"
              aria-label="Select deck"
            >
              <ArrowRightCircleIcon style={{ height: 20, width: 20 }} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Desktop version with reduced height and uniform size
  return (
    <div
      className={`
        relative
        w-full transition-all duration-300
        rounded-lg p-4 shadow-md cursor-pointer
        border-2 hover:shadow-lg transform hover:-translate-y-1
      `}
      style={{
        borderColor: isHovered ? "#ffffff" : "#e5e7eb",
        backgroundColor: cardColor, // Always show full color
      }}
      onClick={handleSelectDeck}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full py-4 relative z-20">
        {/* Title area - centered with larger text */}
        <div className="flex justify-between items-center mb-4">
          <h1
            className="text-xl md:text-2xl font-bold truncate transition-colors duration-300"
            style={{
              ...normalTextStyle,
              color: textColor,
            }}
          >
            {title}
          </h1>

          {/* Arrow button for loading deck content */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSelectDeck();
            }}
            className="hover:scale-110 transition-all duration-300 z-30 relative"
            style={{
              color: textColor,
              transform: isHovered ? "translateX(4px)" : "none",
            }}
          >
            <ArrowRightCircleIcon
              style={{ height: 30, width: 30 }}
              className={isHovered ? "animate-pulse" : ""}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
