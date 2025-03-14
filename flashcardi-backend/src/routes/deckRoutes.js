const deckRoutes = (app) => {
  app
    .route("/api/deck")
    .post((req, res) => {
      res.status(201).send({ message: "Deck create successfully." });
    })
    .get((req, res) => {
      res.status(200).send({ message: "Decks found." });
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
