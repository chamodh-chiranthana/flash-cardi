import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export const AddNewDeck = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deckTitle, setDeckTitle] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleCreateDeck = async () => {
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("http://localhost:8080/api/deck", {
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
        setSuccessMessage("Deck Created Successfully.");
        setDeckTitle("");
        setDeckDescription("");
        closeModal();
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to create deck.");
      }
    } catch (error) {
      setError("Network Error. Please try again.");
      console.error("Error creating deck: ", error);
    }
  };

  return (
    <div className="mb-10">
      <button onClick={openModal}>
        <div className="grid w-[270px] h-[92px] content-center px-5  border-2 border-black mt-10 rounded-xl justify-center">
          <div>
            <PlusCircleIcon style={{ width: 50, height: 50 }} />
          </div>
        </div>
      </button>
      <div>
        <div
          className={`py-40 fixed inset-0 z-50 transition-opacity ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          ></div>
          <div
            role="alert"
            className="container mx-auto w-11/12 md:w-2/3 max-w-lg"
          >
            <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded-xl border border-gray-400">
              <div className="w-full flex justify-start text-gray-600 mb-3"></div>
              <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
                Create New Deck
              </h1>
              {successMessage && (
                <p style={{ color: "green" }}>{successMessage}</p>
              )}
              {error && <p style={{ color: "red" }}>{error}</p>}
              <label
                htmlFor="name"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
              >
                Deck Title
              </label>
              <input
                id="name"
                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                placeholder="Enter deck name"
                value={deckTitle}
                onChange={(e) => setDeckTitle(e.target.value)}
              />

              <label
                htmlFor="description"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
              >
                Description
              </label>
              <textarea
                id="description"
                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full p-3 text-sm border-gray-300 rounded border"
                placeholder="Enter description"
                rows={3}
                value={deckDescription}
                onChange={(e) => setDeckDescription(e.target.value)}
              ></textarea>

              <div className="flex items-center justify-start w-full">
                <button
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
                  onClick={handleCreateDeck}
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
      </div>
    </div>
  );
};
