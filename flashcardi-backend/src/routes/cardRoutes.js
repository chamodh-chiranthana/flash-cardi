import { createACard, getCardsByDeck } from "../controllers/cardController";

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
    .route("/api/card/:cardId")
    .put((req, res) => {
      res.status(200).send({ message: "Card updated successfully." });
    })
    .delete((req, res) => {
      res.status(200).send({ message: "Cards deleted." });
    });
};

export default cardRoutes;
