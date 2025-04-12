import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { API_BASE_URL } from "../config/api";

interface DeckProps {
  deckId: string;
  isMobile?: boolean;
}

export const AddNewCard: React.FC<DeckProps> = ({
  deckId,
  isMobile = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const handlerCreateCard = async () => {
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(`${API_BASE_URL}/deck/${deckId}/card`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          frontText: frontText,
          backText: backText,
        }),
      });

      if (response.ok) {
        setSuccessMessage("Card Created Successfully.");
        setFrontText("");
        setBackText("");
        closeModal();
      } else {
        const errData = await response.json();
        setError(errData.err || "Failed to create the card...");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full">
      <button onClick={openModal} className="w-full">
        <div
          className={`
          shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white border border-gray-300
          ${isMobile ? "h-[180px] w-full" : "h-[250px] w-[300px]"}
          flex flex-col items-center justify-center
        `}
          style={{
            perspective: "1000px",
          }}
        >
          <PlusCircleIcon
            className="text-indigo-500"
            style={{ width: isMobile ? 60 : 80, height: isMobile ? 60 : 80 }}
          />
          <p
            className={`mt-4 text-indigo-700 font-medium ${
              isMobile ? "text-sm" : "text-base"
            }`}
          >
            Add New Card
          </p>
        </div>
      </button>

      {/* Modal Overlay */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeModal}
        ></div>

        <div className="relative w-11/12 md:w-2/3 max-w-lg bg-white shadow-md rounded-xl border border-gray-400 p-8">
          <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
            Create New Card
          </h1>

          {successMessage && (
            <p className="text-green-600 mb-4">{successMessage}</p>
          )}
          {error && <p className="text-red-600 mb-4">{error}</p>}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="frontText"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
              >
                Front Text
              </label>
              <input
                type="text"
                id="frontText"
                className="mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                placeholder="Enter the Front Text"
                value={frontText}
                onChange={(e) => setFrontText(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="backText"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
              >
                Back Text
              </label>
              <textarea
                id="backText"
                className="mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full p-3 text-sm border-gray-300 rounded border"
                placeholder="Enter the Back Text"
                rows={3}
                value={backText}
                onChange={(e) => setBackText(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-start w-full mt-6">
            <button
              className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
              onClick={handlerCreateCard}
            >
              Create
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
    </div>
  );
};
