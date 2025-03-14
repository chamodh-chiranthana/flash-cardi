import { addNewDeck, getAllDecks } from "../controllers/deckController";

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
    .put((req, res) => {
      res.status(200).send({ message: "Deck updated successfully." });
    })
    .delete((req, res) => {
      res.status(200).send({ message: "Decks deleted." });
    });
};

export default deckRoutes;
