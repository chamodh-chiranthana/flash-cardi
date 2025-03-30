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
  removeDeck: (deckId: string) => void;
  updateDeck: (updatedDeck: Deck) => void;
  decks: Deck[];
  setDecks: Dispatch<SetStateAction<Deck[]>>;
}

export const DeckContext = createContext<DeckContextType>({
  selectedDeck: null,
  setSelectedDeck: () => {},
  cards: [],
  setCards: () => {},
  removeDeck: () => {},
  updateDeck: () => {},
  decks: [],
  setDecks: () => {},
});

export const DeckProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
  const [decks, setDecks] = useState<Deck[]>([]);
  const [cards, setCards] = useState<Card[]>([]);

  const removeDeck = (deckId: string) => {
    setDecks((prevDecks) => prevDecks.filter((deck) => deck.deckId !== deckId));

    if (selectedDeck && selectedDeck.deckId === deckId) {
      setSelectedDeck(null);
      setCards([]);
    }
  };

  // Handle deck updates
  const updateDeck = (updatedDeck: Deck) => {
    setDecks((prevDecks) =>
      prevDecks.map((deck) =>
        deck.deckId === updatedDeck.deckId ? updatedDeck : deck
      )
    );

    if (selectedDeck && selectedDeck.deckId === updatedDeck.deckId) {
      setSelectedDeck(updatedDeck);
    }
  };

  return (
    <DeckContext.Provider
      value={{
        selectedDeck,
        setSelectedDeck,
        cards,
        setCards,
        removeDeck,
        updateDeck,
        decks,
        setDecks,
      }}
    >
      {children}
    </DeckContext.Provider>
  );
};
