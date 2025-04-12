"use client";

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useState, useContext } from "react";
import { DeckContext } from "../contexts/DeckProvider";
import { API_BASE_URL } from "../config/api";

interface AddNewDeckProps {
  isMobile?: boolean;
}

export const AddNewDeck = ({ isMobile = false }: AddNewDeckProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deckTitle, setDeckTitle] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { setDecks } = useContext(DeckContext);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    if (!isCreating) {
      setIsOpen(false);
      setError(null);
      setSuccessMessage(null);
    }
  };

  const handleCreateDeck = async () => {
    setError(null);
    setSuccessMessage(null);
    setIsCreating(true);

    try {
      const response = await fetch(`${API_BASE_URL}/deck`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: deckTitle,
          description: deckDescription,
        }),
      });

      if (response.ok) {
        // Refresh the decks list
        try {
          const decksResponse = await fetch(`${API_BASE_URL}/deck`);
          if (decksResponse.ok) {
            const decksData = await decksResponse.json();
            setDecks(decksData);
          }
        } catch (err) {
          console.error("Error refreshing decks:", err);
        }

        setSuccessMessage("Deck Created Successfully.");
        setDeckTitle("");
        setDeckDescription("");

        // Delay closing the modal to show success message
        setTimeout(() => {
          closeModal();
          setIsCreating(false);
        }, 1500);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to create deck.");
        setIsCreating(false);
      }
    } catch (error) {
      setError("Network Error. Please try again.");
      console.error("Error creating deck: ", error);
      setIsCreating(false);
    }
  };

  // Mobile version of Add button
  if (isMobile) {
    return (
      <div className="min-w-[100px] max-w-[100px] h-[100px]">
        <button
          onClick={openModal}
          className="h-[100px] w-[100px] border-2 border-black rounded-lg flex flex-col items-center justify-center"
        >
          <PlusCircleIcon style={{ width: 30, height: 30 }} />
        </button>

        {/* Modal with responsive styling */}
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={closeModal}
            ></div>

            <div className="relative w-5/6 p-5 bg-white shadow-md rounded-xl border border-gray-400">
              <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-3 text-lg">
                Create New Deck
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
                    rows={2}
                    value={deckDescription}
                    onChange={(e) => setDeckDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="flex items-center justify-start w-full mt-6">
                <button
                  className={`focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-6 py-1.5 text-xs ${
                    isCreating ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                  onClick={handleCreateDeck}
                  disabled={isCreating}
                >
                  {isCreating ? "Creating..." : "Create"}
                </button>
                <button
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-6 py-1.5 text-xs"
                  onClick={closeModal}
                  disabled={isCreating}
                >
                  Cancel
                </button>
              </div>

              <button
                className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
                onClick={closeModal}
                aria-label="close modal"
                disabled={isCreating}
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
      </div>
    );
  }

  // Desktop version
  return (
    <div className="w-full">
      <button onClick={openModal} className="w-full">
        <div className="w-full max-w-[400px] h-[140px] content-center px-6 border-2 border-black rounded-xl flex items-center justify-center mx-auto">
          <PlusCircleIcon
            style={{ width: 48, height: 48 }}
            className="text-indigo-600"
          />
        </div>
      </button>

      {/* Modal - fixed opacity issue and made single modal instance */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          ></div>

          <div className="relative w-11/12 md:w-2/3 max-w-lg bg-white shadow-md rounded-xl border border-gray-400 p-8">
            <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
              Create New Deck
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
                  isCreating ? "opacity-75 cursor-not-allowed" : ""
                }`}
                onClick={handleCreateDeck}
                disabled={isCreating}
              >
                {isCreating ? "Creating..." : "Create"}
              </button>
              <button
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                onClick={closeModal}
                disabled={isCreating}
              >
                Cancel
              </button>
            </div>

            <button
              className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
              onClick={closeModal}
              aria-label="close modal"
              disabled={isCreating}
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
    </div>
  );
};
