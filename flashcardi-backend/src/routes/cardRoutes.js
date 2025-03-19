import {
  createACard,
  getCardsByDeck,
  updateACard,
  deleteACard,
} from "../controllers/cardController";

const cardRoutes = (app) => {
  app
    .route("/api/deck/:deckId/card")
    .post((req, res) => {
      createACard(req, res);
    })
    .get((req, res) => {
      getCardsByDeck(req, res);
    });

  app
    .route("/api/deck/:deckId/card/:cardId")
    .put((req, res) => {
      updateACard(req, res);
    })
    .delete((req, res) => {
      deleteACard(req, res);
    });
};

export default cardRoutes;
