import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

interface Deck {
  deckId: string;
  title: string;
  description: string;
}

interface Card {
  deckId: string;
  cardId: string;
  frontText: string;
  backText: string;
}

interface DeckContextType {
  selectedDeck: Deck | null;
  setSelectedDeck: Dispatch<SetStateAction<Deck | null>>;
  cards: Card[];
  setCards: Dispatch<SetStateAction<Card[]>>;
}

export const DeckContext = createContext<DeckContextType>({
  selectedDeck: null,
  setSelectedDeck: () => {},
  cards: [],
  setCards: () => {},
});

export const DeckProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
  const [cards, setCards] = useState<Card[]>([]);

  return (
    <DeckContext.Provider
      value={{
        selectedDeck,
        setSelectedDeck,
        cards,
        setCards,
      }}
    >
      {children}
    </DeckContext.Provider>
  );
};
