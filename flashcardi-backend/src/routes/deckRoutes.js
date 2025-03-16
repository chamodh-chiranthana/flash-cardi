import {
  addNewDeck,
  getAllDecks,
  getDeckById,
  updateDeck,
  deleteDeck,
} from "../controllers/deckController";

const deckRoutes = (app) => {
  app
    .route("/api/deck")
    .post((req, res) => {
      addNewDeck(req, res);
    })
    .get((req, res) => {
      getAllDecks(req, res);
    });

  app
    .route("/api/deck/:deckId")
    .get((req, res) => {
      getDeckById(req, res);
    })
    .put((req, res) => {
      updateDeck(req, res);
    })
    .delete((req, res) => {
      deleteDeck(req, res);
    });
};

export default deckRoutes;
