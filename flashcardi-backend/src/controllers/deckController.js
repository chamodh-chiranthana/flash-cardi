import Deck from "../models/decks";

export const addNewDeck = async (req, res) => {
  console.log("Request body: ", req.body);
  let newDeck = new Deck(req.body);
  try {
    const deck = await newDeck.save();
    res.status(201).json(deck);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const getAllDecks = async (req, res) => {
  try {
    const decks = await Deck.find();
    res.status(200).json(decks);
  } catch (err) {
    res.send(404).json({ message: "No decks found" });
  }
};
