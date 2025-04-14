"use client";

import { useContext, useState } from "react";
import { CardContext } from "../contexts/CardProvider";
import { DeckContext } from "../contexts/DeckProvider";
import { AddNewCard } from "./AddNewCard";
import React from "react";
import FlashCard from "./FlashCard";
import { API_BASE_URL } from "../config/api";
import {
  PencilSquareIcon,
  TrashIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

interface CurrentDeckProps {
  isMobile?: boolean;
}

export default function CurrentDeck({ isMobile = false }: CurrentDeckProps) {
  const { selectedDeck, updateDeck, removeDeck, setSelectedDeck } =
    useContext(DeckContext);
  const { cards } = useContext(CardContext);

  // States for edit functionality
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deckTitle, setDeckTitle] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  if (!selectedDeck) {
    return (
      <div className="p-4 text-gray-500">
        Please select a deck to view its cards...
      </div>
    );
  }

  // Initialize state values from selected deck
  const openModal = () => {
    setDeckTitle(selectedDeck.title);
    setDeckDescription(selectedDeck.description || "");
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
      const response = await fetch(
        `${API_BASE_URL}/deck/${selectedDeck.deckId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: deckTitle,
            description: deckDescription,
          }),
        }
      );

      if (response.ok) {
        const updatedDeck = await response.json();

        updateDeck({
          deckId: selectedDeck.deckId,
          title: updatedDeck.title || deckTitle,
          description: updatedDeck.description || deckDescription,
        });

        // Update the selected deck as well
        setSelectedDeck({
          ...selectedDeck,
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

  const handleDeleteDeck = async () => {
    setIsDeleting(true);
    setDeleteError(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/deck/${selectedDeck.deckId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        removeDeck(selectedDeck.deckId);
        setSelectedDeck(null);
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

  // Filter cards that belong to the selected deck
  const deckCards =
    cards?.filter((card) => card.deckId === selectedDeck.deckId) || [];

  return (
    <div className={`${isMobile ? "p-2" : "p-4"} w-full`}>
      {/* Title area with edit/delete buttons */}
      <div
        className={`flex ${
          isMobile ? "items-center mb-2" : "items-center mb-4"
        } justify-between`}
      >
        <h1
          className={`font-bold ${isMobile ? "text-xl" : "text-2xl"}`}
          style={{ fontFamily: "var(--font-logo)" }}
        >
          {selectedDeck.title}
        </h1>

        <div className="flex gap-2">
          <button
            onClick={openModal}
            className={`${
              isMobile ? "p-1.5" : "p-2"
            } bg-blue-100 rounded-md hover:bg-blue-200 transition-colors`}
            aria-label="Edit deck"
          >
            <PencilSquareIcon
              className={`${isMobile ? "h-5 w-5" : "h-6 w-6"} text-blue-600`}
            />
          </button>
          <button
            onClick={openDeleteModal}
            className={`${
              isMobile ? "p-1.5" : "p-2"
            } bg-red-100 rounded-md hover:bg-red-200 transition-colors`}
            aria-label="Delete deck"
          >
            <TrashIcon
              className={`${isMobile ? "h-5 w-5" : "h-6 w-6"} text-red-600`}
            />
          </button>
        </div>
      </div>

      {selectedDeck.description && (
        <p className={`${isMobile ? "mb-2 text-sm" : "mb-4"} text-gray-700`}>
          {selectedDeck.description}
        </p>
      )}

      <div className={`${isMobile ? "mt-2" : "mt-4"}`}>
        <h2
          className={`${
            isMobile ? "text-lg mb-2" : "text-xl mb-3"
          } font-semibold`}
        >
          Cards ({deckCards.length})
        </h2>

        {deckCards.length > 0 ? (
          <div
            className={`
            ${
              isMobile
                ? "grid grid-cols-1 gap-3 overflow-y-auto pb-4 w-full"
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 w-full max-w-full"
            }
          `}
            style={{
              overflowX: "hidden",
              maxWidth: "100%",
            }}
          >
            {deckCards.map((card, index) => (
              <div key={card.cardId} className="flex justify-center">
                <FlashCard card={card} colorIndex={index} isMobile={isMobile} />
              </div>
            ))}
            <div className="flex items-center justify-center">
              <AddNewCard deckId={selectedDeck.deckId} isMobile={isMobile} />
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-md text-center flex flex-col items-center justify-center gap-4">
            <p className="text-gray-500">No cards in this deck yet</p>
            <AddNewCard deckId={selectedDeck.deckId} isMobile={isMobile} />
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity ${
          isEditOpen ? "opacity-100" : "opacity-0 pointer-events-none"
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

      {/* Delete Confirmation Modal */}
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
            Are you sure you want to delete &quot;{selectedDeck.title}&quot;?
            This action cannot be undone.
          </p>

          {deleteError && (
            <p className="text-red-600 mb-4 text-sm">{deleteError}</p>
          )}

          <div className="flex items-center justify-center space-x-4">
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
            <button
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={closeDeleteModal}
              disabled={isDeleting}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
