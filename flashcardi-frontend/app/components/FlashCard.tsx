"use client";

import React, { useContext, useState } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { DeckContext } from "../contexts/DeckProvider";

interface FlashCardProps {
  card: {
    cardId: string;
    frontText: string;
    backText: string;
    deckId: string;
  };
  colorIndex: number;
}

export default function FlashCard({ card, colorIndex }: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [frontText, setFrontText] = useState(card.frontText);
  const [backText, setBackText] = useState(card.backText);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { updateCard, removeCard } = useContext(DeckContext);

  const handleClick = () => {
    setIsFlipped((prev) => !prev);
  };

  // Modal handlers
  const openEditModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFrontText(card.frontText);
    setBackText(card.backText);
    setIsEditOpen(true);
    setError(null);
    setSuccessMessage(null);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
    setError(null);
    setSuccessMessage(null);
  };

  const openDeleteModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleteModalOpen(true);
    setDeleteError(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteError(null);
  };

  // API calls
  const submitCardEdit = async () => {
    setError(null);
    setSuccessMessage("");

    try {
      const response = await fetch(
        `http://localhost:8080/api/deck/${card.deckId}/card/${card.cardId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            frontText: frontText,
            backText: backText,
          }),
        }
      );

      if (response.ok) {
        updateCard({
          cardId: card.cardId,
          deckId: card.deckId,
          frontText: frontText,
          backText: backText,
        });

        setSuccessMessage("Card updated successfully");
        setTimeout(() => {
          closeEditModal();
        }, 1500);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to edit the card.");
      }
    } catch (error) {
      setError("Network Error, Please try again.");
      console.error("Error updating card: ", error);
    }
  };

  const handleDeleteCard = async () => {
    setIsDeleting(true);
    setDeleteError(null);

    try {
      const response = await fetch(
        `http://localhost:8080/api/deck/${card.deckId}/card/${card.cardId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setTimeout(() => {
          removeCard(card.cardId);
          closeDeleteModal();
        }, 1000);
      } else {
        const errorData = await response.json();
        setDeleteError(errorData.error || "Failed to delete the card.");
      }
    } catch (error) {
      setDeleteError("Network error. Please try again.");
      console.error("Error deleting card: ", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {/* Card component */}
      <div
        className="h-[250px] w-[300px] shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative"
        style={{
          perspective: "1000px",
        }}
      >
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.6s",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front of card */}
          <div
            onClick={handleClick}
            className="absolute inset-0 w-full h-full flex flex-col justify-center items-center p-6 rounded-lg cursor-pointer group"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              backgroundColor: `var(--card-color-${(colorIndex % 10) + 1})`,
              color: "white",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            <div className="font-medium text-lg text-center">
              {card.frontText}
            </div>
            <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                className="p-1 border-white border-2 bg-opacity-20 rounded hover:bg-opacity-30"
                onClick={openEditModal}
              >
                <PencilSquareIcon
                  style={{
                    height: 20,
                    width: 20,
                  }}
                />
              </button>
              <button
                className="p-1 border-white border-2 bg-opacity-20 rounded hover:bg-opacity-30"
                onClick={openDeleteModal}
              >
                <TrashIcon
                  style={{
                    height: 20,
                    width: 20,
                  }}
                />
              </button>
            </div>
          </div>

          {/* Back of card */}
          <div
            onClick={handleClick}
            className="absolute inset-0 w-full h-full flex flex-col justify-center items-center p-6 rounded-lg cursor-pointer group"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              backgroundColor: `var(--card-color-${(colorIndex % 10) + 1})`,
              transform: "rotateY(180deg)",
              color: "white",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            <div className="font-medium text-lg text-center">
              {card.backText}
            </div>
            <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                className="p-1 border-white border-2 bg-opacity-20 rounded hover:bg-opacity-30"
                onClick={openEditModal}
              >
                <PencilSquareIcon
                  style={{
                    height: 20,
                    width: 20,
                  }}
                />
              </button>
              <button
                className="p-1 border-white border-2 bg-opacity-20 rounded hover:bg-opacity-30"
                onClick={openDeleteModal}
              >
                <TrashIcon
                  style={{
                    height: 20,
                    width: 20,
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeEditModal}
          ></div>

          <div className="relative w-11/12 md:w-2/3 max-w-lg bg-white shadow-md rounded-xl border border-gray-400 p-8">
            <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
              Edit the Card
            </h1>

            {successMessage && (
              <p className="text-green-600 mb-4">{successMessage}</p>
            )}
            {error && <p className="text-red-600 mb-4">{error}</p>}

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="front-text"
                  className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                >
                  Front Text
                </label>
                <input
                  id="front-text"
                  className="mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                  placeholder="Enter front text"
                  value={frontText}
                  onChange={(e) => setFrontText(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="back-text"
                  className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                >
                  Back Text
                </label>
                <textarea
                  id="back-text"
                  className="mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full p-3 text-sm border-gray-300 rounded border"
                  placeholder="Enter back text"
                  rows={3}
                  value={backText}
                  onChange={(e) => setBackText(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="flex items-center justify-start w-full mt-6">
              <button
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
                onClick={submitCardEdit}
              >
                Update
              </button>
              <button
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                onClick={closeEditModal}
              >
                Cancel
              </button>
            </div>

            <button
              className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
              onClick={closeEditModal}
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
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeDeleteModal}
          ></div>

          <div className="relative w-11/12 md:w-96 max-w-md bg-white shadow-md rounded-xl border border-gray-400 p-6 text-center">
            <div className="flex justify-center mb-4">
              <ExclamationTriangleIcon className="h-12 w-12 text-red-500" />
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Delete Card
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this card? This action cannot be
              undone.
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
                onClick={handleDeleteCard}
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
      )}
    </>
  );
}
