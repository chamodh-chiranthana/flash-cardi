import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useContext,
} from "react";

export interface Card {
  deckId: string;
  cardId: string;
  frontText: string;
  backText: string;
}

interface CardContextType {
  cards: Card[];
  setCards: Dispatch<SetStateAction<Card[]>>;
  updateCard: (updatedCard: Card) => void;
  removeCard: (cardId: string) => void;
  // Card modal related properties
  editingCard: Card | null;
  isEditCardModalOpen: boolean;
  isDeletingCardModalOpen: boolean;
  openCardEditModal: (card: Card) => void;
  closeCardEditModal: () => void;
  openCardDeleteModal: (card: Card) => void;
  closeCardDeleteModal: () => void;
}

export const CardContext = createContext<CardContextType>({
  cards: [],
  setCards: () => {},
  updateCard: () => {},
  removeCard: () => {},
  // Default values for modal properties
  editingCard: null,
  isEditCardModalOpen: false,
  isDeletingCardModalOpen: false,
  openCardEditModal: () => {},
  closeCardEditModal: () => {},
  openCardDeleteModal: () => {},
  closeCardDeleteModal: () => {},
});

export const useCardContext = () => {
  const context = useContext(CardContext);
  if (context === undefined) {
    throw new Error("useCardContext must be used within a CardProvider");
  }
  return context;
};

export const CardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cards, setCards] = useState<Card[]>([]);

  // Card modal state
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [isEditCardModalOpen, setIsEditCardModalOpen] = useState(false);
  const [isDeletingCardModalOpen, setIsDeletingCardModalOpen] = useState(false);

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

  // Card modal methods
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
    <CardContext.Provider
      value={{
        cards,
        setCards,
        updateCard,
        removeCard,
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
    </CardContext.Provider>
  );
};
