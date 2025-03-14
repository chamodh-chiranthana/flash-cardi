const cardRoutes = (app) => {
  app
    .route("/api/card")
    .post((req, res) => {
      res.status(201).send({ message: "Card create successfully." });
    })
    .get((req, res) => {
      res.status(200).send({ message: "Cards found." });
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
