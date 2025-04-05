import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useCallback,
} from "react";

export interface Deck {
  deckId: string;
  title: string;
  description: string;
}

interface DeckContextType {
  decks: Deck[] | undefined;
  setDecks: Dispatch<SetStateAction<Deck[] | undefined>>;
  addDeck: (newDeck: Deck) => void;
  updateDeck: (updatedDeck: Deck) => void;
  removeDeck: (deckId: string) => void;
  selectedDeck: Deck | null;
  setSelectedDeck: Dispatch<SetStateAction<Deck | null>>;
}

export const DeckContext = createContext<DeckContextType>({
  decks: undefined,
  setDecks: () => {},
  addDeck: () => {},
  updateDeck: () => {},
  removeDeck: () => {},
  selectedDeck: null,
  setSelectedDeck: () => {},
});

export const DeckProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [decks, setDecks] = useState<Deck[] | undefined>([]);
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);

  const addDeck = useCallback((newDeck: Deck) => {
    setDecks((prevDecks) => (prevDecks ? [...prevDecks, newDeck] : [newDeck]));
  }, []);

  const updateDeck = useCallback((updatedDeck: Deck) => {
    setDecks((prevDecks) =>
      prevDecks?.map((deck) =>
        deck.deckId === updatedDeck.deckId ? { ...updatedDeck } : deck
      )
    );

    // Also update the selected deck if it's being edited
    setSelectedDeck((prevSelected) =>
      prevSelected?.deckId === updatedDeck.deckId
        ? { ...updatedDeck }
        : prevSelected
    );
  }, []);

  const removeDeck = useCallback(
    (deckId: string) => {
      setDecks((prevDecks) =>
        prevDecks?.filter((deck) => deck.deckId !== deckId)
      );
      if (selectedDeck?.deckId === deckId) {
        setSelectedDeck(null);
      }
    },
    [selectedDeck?.deckId]
  );

  return (
    <DeckContext.Provider
      value={{
        decks,
        setDecks,
        addDeck,
        updateDeck,
        removeDeck,
        selectedDeck,
        setSelectedDeck,
      }}
    >
      {children}
    </DeckContext.Provider>
  );
};
