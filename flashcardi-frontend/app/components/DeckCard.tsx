"use client";

import {
  ArrowRightCircleIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "react";
import { DeckContext } from "../contexts/DeckProvider";

interface DeckCardProps {
  title: string;
  deckId: string;
  description: string;
}

const buttonOnClick = () => {
  // Empty function
};

export const DeckCard: React.FC<DeckCardProps> = ({
  title,
  deckId,
  description,
}) => {
  const { setSelectedDeck, setCards } = useContext(DeckContext);

  const handleSelectDeck = async () => {
    const deck = {
      deckId: deckId,
      title: title,
      description: description,
    };

    setSelectedDeck(deck);

    try {
      const response = await fetch(
        `http://localhost:8080/api/deck/${deckId}/card`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cards from that deck.");
      }

      const cardsData = await response.json();
      setCards(cardsData);
    } catch (err) {
      console.log("An Error occured fetching cards: ", err);
      setCards([]);
    }
  };

  return (
    <div className="grid w-[270px] h-[92px] content-center px-5  border-2 border-black mt-10 rounded-xl">
      <div className="flex justify-between mb-3 gap-3">
        <h1 className="text-3xl">{title}</h1>
        <button onClick={handleSelectDeck}>
          <ArrowRightCircleIcon style={{ height: 35, width: 35 }} />
        </button>
      </div>
      <div className="flex gap-2">
        <button onClick={buttonOnClick}>
          <TrashIcon
            style={{
              height: 30,
              width: 30,
              border: "2px solid",
              borderRadius: 5,
            }}
          />
        </button>

        <button onClick={buttonOnClick}>
          <PencilSquareIcon
            style={{
              height: 30,
              width: 30,
              border: "2px solid",
              borderRadius: 5,
            }}
          />
        </button>
      </div>
    </div>
  );
};
