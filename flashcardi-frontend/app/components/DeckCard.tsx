"use client";

import {
  TrashIcon,
  PencilSquareIcon,
  ExclamationTriangleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import { useContext, useState, useEffect, CSSProperties } from "react";
import { DeckContext } from "../contexts/DeckProvider";
import { CardContext } from "../contexts/CardProvider";

// Normal text style for desktop view
const normalTextStyle: CSSProperties = {
  color: "#000000",
  fontSize: "1.3rem",
  fontWeight: "600",
};

// Keep vertical text style for mobile only
const verticalTextStyle: CSSProperties = {
  writingMode: "vertical-lr",
  textOrientation: "mixed",
  height: "100%",
  color: "#000000",
  display: "inline-block",
  padding: "0.5rem",
  fontSize: "1.1rem",
  fontWeight: "500",
};

interface DeckCardProps {
  title: string;
  deckId: string;
  description: string;
  isMobile?: boolean;
}

export const DeckCard: React.FC<DeckCardProps> = ({
  title,
  deckId,
  description,
  isMobile = false,
}) => {
  const [IsEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deckTitle, setDeckTitle] = useState(title);
  const [deckDescription, setDeckDescription] = useState(description);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { setSelectedDeck, removeDeck, updateDeck } = useContext(DeckContext);
  const { setCards } = useContext(CardContext);

  useEffect(() => {
    setDeckTitle(title);
    setDeckDescription(description);
  }, [title, description]);

  const openModal = () => {
    setDeckTitle(title);
    setDeckDescription(description);
    setIsEditOpen(true);
    setError(null);
    setSuccessMessage(null);
  };

  const closeModal = () => {
    setIsEditOpen(false);
    setError(null);
    setSuccessMessage(null);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setDeleteError(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteError(null);
  };

  const submitDeckEdit = async () => {
    setError(null);
    setSuccessMessage("");
    setIsEditing(true);

    try {
      const response = await fetch(`http://localhost:8080/api/deck/${deckId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: deckTitle,
          description: deckDescription,
        }),
      });

      if (response.ok) {
        const updatedDeck = await response.json();

        updateDeck({
          deckId,
          title: updatedDeck.title || deckTitle,
          description: updatedDeck.description || deckDescription,
        });

        setSuccessMessage("Deck Updated Successfully.");
        setTimeout(() => {
          closeModal();
        }, 1500);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to edit the deck.");
      }
    } catch (error) {
      setError("Network Error, Please try again.");
      console.error("Error updating deck: ", error);
    } finally {
      setIsEditing(false);
    }
  };

  const handleSelectDeck = async () => {
    const deck = {
      deckId,
      title,
      description,
    };

    try {
      setSelectedDeck(deck);

      const response = await fetch(
        `http://localhost:8080/api/deck/${deckId}/card`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cards from that deck.");
      }

      const cardsData = await response.json();
      setCards(cardsData);
    } catch (err) {
      console.error("An Error occurred fetching cards: ", err);
      setCards([]);
    }
  };

  const handleDeleteDeck = async () => {
    setIsDeleting(true);
    setDeleteError(null);

    try {
      const response = await fetch(`http://localhost:8080/api/deck/${deckId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        removeDeck(deckId);
        setTimeout(() => {
          closeDeleteModal();
        }, 1000);
      } else {
        const errorData = await response.json();
        setDeleteError(errorData.error || "Failed to delete the deck.");
      }
    } catch (error) {
      setDeleteError("Network error. Please try again.");
      console.error("Error deleting deck: ", error);
    } finally {
      setIsDeleting(false);
    }
  };

  // For mobile version with vertical text
  if (isMobile) {
    return (
      <div
        className="min-w-[70px] h-full flex flex-col justify-center mx-2 border-2 border-black rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={handleSelectDeck}
      >
        <div className="flex flex-col items-center h-full">
          <div className="flex-1 flex items-center justify-center py-2">
            <h2 className="font-medium px-1" style={verticalTextStyle}>
              {title}
            </h2>
          </div>
        </div>
      </div>
    );
  }

  // Desktop version with smaller height, larger title text, and bigger buttons
  return (
    <div className="w-full max-w-[400px] h-[140px] content-center px-6 border-2 border-black rounded-xl relative">
      <div className="flex flex-col h-full py-3 relative z-20">
        {/* Title area - centered with larger text */}
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-3xl font-bold truncate" style={normalTextStyle}>
            {title}
          </h1>

          {/* Arrow button placed at the top right */}
          <button
            onClick={handleSelectDeck}
            className="hover:scale-110 transition-transform z-30 relative"
          >
            <ArrowRightCircleIcon
              style={{ height: 36, width: 36 }}
              className="text-indigo-600"
            />
          </button>
        </div>

        {/* Bottom with edit and delete buttons */}
        <div className="flex justify-end gap-5 mt-auto">
          <button
            onClick={openModal}
            className="hover:scale-110 transition-transform z-30 relative"
          >
            <PencilSquareIcon
              style={{
                height: 32,
                width: 32,
                border: "2px solid",
                borderRadius: 5,
              }}
            />
          </button>

          <button
            onClick={openDeleteModal}
            className="hover:scale-110 transition-transform z-30 relative"
          >
            <TrashIcon
              style={{
                height: 32,
                width: 32,
                border: "2px solid",
                borderRadius: 5,
              }}
            />
          </button>
        </div>
      </div>

      {/* Main clickable area with lower z-index than buttons */}
      <div
        className="absolute inset-0 cursor-pointer hover:bg-gray-50 transition-colors rounded-xl z-10"
        onClick={handleSelectDeck}
      ></div>

      {/* Modal code for editing */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity ${
          IsEditOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeModal}
        ></div>

        <div className="relative w-11/12 md:w-2/3 max-w-lg bg-white shadow-md rounded-xl border border-gray-400 p-8">
          <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
            Edit the Deck
          </h1>

          {successMessage && (
            <p className="text-green-600 mb-4">{successMessage}</p>
          )}
          {error && <p className="text-red-600 mb-4">{error}</p>}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
              >
                Deck Title
              </label>
              <input
                id="name"
                className="mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                placeholder="Enter deck name"
                value={deckTitle}
                onChange={(e) => setDeckTitle(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
              >
                Description
              </label>
              <textarea
                id="description"
                className="mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full p-3 text-sm border-gray-300 rounded border"
                placeholder="Enter description"
                rows={3}
                value={deckDescription}
                onChange={(e) => setDeckDescription(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="flex items-center justify-start w-full mt-6">
            <button
              className={`focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm ${
                isEditing ? "opacity-75 cursor-not-allowed" : ""
              }`}
              onClick={submitDeckEdit}
              disabled={isEditing}
            >
              {isEditing ? "Updating..." : "Update"}
            </button>
            <button
              className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>

          <button
            className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
            onClick={closeModal}
            aria-label="close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-x"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Modal code for deletion */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity ${
          isDeleteModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeDeleteModal}
        ></div>

        <div className="relative w-11/12 md:w-96 max-w-md bg-white shadow-md rounded-xl border border-gray-400 p-6 text-center">
          <div className="flex justify-center mb-4">
            <ExclamationTriangleIcon className="h-12 w-12 text-red-500" />
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Deck</h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete &quot;{title}&quot;? This action
            cannot be undone.
          </p>

          {deleteError && (
            <p className="text-red-600 mb-4 text-sm">{deleteError}</p>
          )}

          <div className="flex items-center justify-center space-x-4">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={closeDeleteModal}
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={handleDeleteDeck}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <span className="flex items-center">Deleting...</span>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
