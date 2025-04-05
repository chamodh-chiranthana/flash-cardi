"use client";

import React, { useContext, useState, useEffect } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { CardContext } from "../contexts/CardProvider";

export default function CardModals() {
  const {
    editingCard,
    isEditCardModalOpen,
    isDeletingCardModalOpen,
    closeCardEditModal,
    closeCardDeleteModal,
    updateCard,
    removeCard,
  } = useContext(CardContext);

  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Set up the form when the editing card changes
  useEffect(() => {
    if (editingCard) {
      setFrontText(editingCard.frontText);
      setBackText(editingCard.backText);
      setError(null);
      setSuccessMessage(null);
      setDeleteError(null);
    }
  }, [editingCard]);

  const submitCardEdit = async () => {
    if (!editingCard) return;

    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(
        `http://localhost:8080/api/deck/${editingCard.deckId}/card/${editingCard.cardId}`,
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
          cardId: editingCard.cardId,
          deckId: editingCard.deckId,
          frontText: frontText,
          backText: backText,
        });
        setSuccessMessage("Card updated successfully");
        setTimeout(() => {
          closeCardEditModal();
        }, 1500);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to update card");
      }
    } catch (err) {
      setError("Network error, please try again.");
      console.error("Error updating card: ", err);
    }
  };

  const deleteCard = async () => {
    if (!editingCard) return;

    setIsDeleting(editingCard.cardId);
    setDeleteError(null);

    try {
      const response = await fetch(
        `http://localhost:8080/api/deck/${editingCard.deckId}/card/${editingCard.cardId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        removeCard(editingCard.cardId);
        setTimeout(() => {
          closeCardDeleteModal();
        }, 1000);
      } else {
        const errorData = await response.json();
        setDeleteError(
          errorData.error || "Failed to delete card. Please try again."
        );
      }
    } catch (err) {
      setDeleteError("Network error. Please try again.");
      console.error("Error deleting card:", err);
    } finally {
      setIsDeleting(null);
    }
  };

  if (!editingCard) return null;

  return (
    <>
      {/* Edit Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity ${
          isEditCardModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeCardEditModal}
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
              onClick={closeCardEditModal}
            >
              Cancel
            </button>
          </div>

          <button
            className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
            onClick={closeCardEditModal}
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
          isDeletingCardModalOpen
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeCardDeleteModal}
        ></div>

        <div className="relative w-11/12 md:w-96 max-w-md bg-white shadow-md rounded-xl border border-gray-400 p-6 text-center">
          <div className="flex justify-center mb-4">
            <ExclamationTriangleIcon className="h-12 w-12 text-red-500" />
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Card</h2>
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
              onClick={closeCardDeleteModal}
              disabled={isDeleting === editingCard.cardId}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={deleteCard}
              disabled={isDeleting === editingCard.cardId}
            >
              {isDeleting === editingCard.cardId ? (
                <span className="flex items-center">Deleting...</span>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
