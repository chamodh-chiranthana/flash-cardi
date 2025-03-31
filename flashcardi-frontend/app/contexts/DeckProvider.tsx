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
  updateCard: (updatedCard: Card) => void;
  removeCard: (cardId: string) => void;
  decks: Deck[];
  setDecks: Dispatch<SetStateAction<Deck[]>>;
  // New card modal related properties
  editingCard: Card | null;
  isEditCardModalOpen: boolean;
  isDeletingCardModalOpen: boolean;
  openCardEditModal: (card: Card) => void;
  closeCardEditModal: () => void;
  openCardDeleteModal: (card: Card) => void;
  closeCardDeleteModal: () => void;
}

export const DeckContext = createContext<DeckContextType>({
  selectedDeck: null,
  setSelectedDeck: () => {},
  cards: [],
  setCards: () => {},
  removeDeck: () => {},
  updateDeck: () => {},
  updateCard: () => {},
  removeCard: () => {},
  decks: [],
  setDecks: () => {},
  // Default values for new properties
  editingCard: null,
  isEditCardModalOpen: false,
  isDeletingCardModalOpen: false,
  openCardEditModal: () => {},
  closeCardEditModal: () => {},
  openCardDeleteModal: () => {},
  closeCardDeleteModal: () => {},
});

export const DeckProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
  const [decks, setDecks] = useState<Deck[]>([]);
  const [cards, setCards] = useState<Card[]>([]);

  // New state for card modals
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [isEditCardModalOpen, setIsEditCardModalOpen] = useState(false);
  const [isDeletingCardModalOpen, setIsDeletingCardModalOpen] = useState(false);

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

  const updateCard = (updatedCard: Card) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.cardId === updatedCard.cardId ? { ...card, ...updatedCard } : card
      )
    );
  };

  const removeCard = (cardId: string) => {
    setCards((prevCards) => prevCards.filter((card) => card.cardId !== cardId));
  };

  // New methods for card modals
  const openCardEditModal = (card: Card) => {
    setEditingCard(card);
    setIsEditCardModalOpen(true);
  };

  const closeCardEditModal = () => {
    setIsEditCardModalOpen(false);
    setEditingCard(null);
  };

  const openCardDeleteModal = (card: Card) => {
    setEditingCard(card);
    setIsDeletingCardModalOpen(true);
  };

  const closeCardDeleteModal = () => {
    setIsDeletingCardModalOpen(false);
    setEditingCard(null);
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
        updateCard,
        removeCard,
        decks,
        setDecks,
        // New card modal related properties
        editingCard,
        isEditCardModalOpen,
        isDeletingCardModalOpen,
        openCardEditModal,
        closeCardEditModal,
        openCardDeleteModal,
        closeCardDeleteModal,
      }}
    >
      {children}
    </DeckContext.Provider>
  );
};
