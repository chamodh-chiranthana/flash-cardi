"use client";

import {
  ArrowRightCircleIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

interface DeckCardProps {
  deckTitle: string;
}

const buttonOnClick = () => {
  console.log("Clicked.");
};

export const DeckCard: React.FC<DeckCardProps> = ({ deckTitle }) => {
  return (
    <div className="grid w-[270px] h-[92px] content-center px-5  border-2 border-black mt-10 rounded-xl">
      <div className="flex justify-between mb-3 gap-3">
        <h1 className="text-3xl">{deckTitle}</h1>
        <button onClick={buttonOnClick}>
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
