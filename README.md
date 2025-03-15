# Flashcard Backend API

This repository contains the backend API for a flashcard application built with Express.js, Node.js, and MongoDB Atlas. It provides endpoints for managing flashcard decks and individual flashcards.

## Features

* **Deck Management:**
    * **Create:** Add new study decks.
    * **Read:** Retrieve all study decks.
    * *Future: Update and Delete decks.*
* **Flashcard Management:**
    * *Future: Create, Read, Update, and Delete individual flashcards within decks.*
* **MongoDB Atlas Integration:**
    * Data persistence using MongoDB Atlas.
* **Simple and Efficient:**
    * Built with Express.js for fast and reliable performance.
* **Nodemon Integration:**
    * Easy development with automatic server restarts on code changes.

## Prerequisites

* Node.js and npm (Node Package Manager) installed on your system.
* A MongoDB Atlas account and connection string.

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd <your-repository-directory>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure MongoDB Atlas:**

    * Create a `.env` file in the root directory of your project.
    * Add your MongoDB Atlas connection string to the `.env` file:

        ```
        MONGODB_URI=your_mongodb_atlas_connection_string
        ```

    * Replace `your_mongodb_atlas_connection_string` with your actual connection string.

4.  **Start the server:**

    ```bash
    npm start
    ```

    This will start the server using Nodemon, and it will automatically restart when you make changes to the code.

5.  **Access the API:**

    The API will be available at `http://localhost:3000` 

## API Endpoints (Current Status)

* **Decks:**
    * `GET /decks`: Get all study decks.
    * `POST /decks`: Create a new study deck.
    * *Future: `GET /decks/:deckId`, `PUT /decks/:deckId`, `DELETE /decks/:deckId`*
* **Flashcards:**
    * *Future: All flashcard related endpoints.*

## Development

* Make changes to the code in the `src` directory (or your chosen directory structure).
* Nodemon will automatically restart the server when changes are detected.

## Completed Tasks

* **Day 1 (Thursday, March 13th):** Set up Node.js project, initialize npm, install Express.js.
* **Day 2 (Friday, March 14th):** Configure MongoDB connection. Plan the data structure for the Deck and Card collections. Document the planned structure.
* **Day 3 (Saturday, March 15th):** Create API endpoint: `GET /decks` (Get all study decks).
* **Day 3 (Saturday, March 15th):** Create API endpoint: `POST /decks` (Create a new study deck).

## Future Enhancements (Optional)

* Implement user authentication.
* Add testing with Jest or Mocha
* Add input validation
* Add error handling.
* Complete all CRUD operations for decks and flashcards.

## Contributing

Closed for now...

## License

[Your License (e.g., MIT)](LICENSE)
