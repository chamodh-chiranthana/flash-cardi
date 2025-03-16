import Deck from "../models/decks";

export const addNewDeck = async (req, res) => {
  console.log("Request body: ", req.body);
  try {
    const newDeckId = await generateDeckId();
    console.log("New Deck ID: ", newDeckId); // Log the new deck ID
    let newDeck = new Deck({ ...req.body, deckId: newDeckId });
    const deck = await newDeck.save();
    res.status(201).json(deck);
  } catch (err) {
    console.log("Error saving deck: ", err); // Log any errors
    res.status(400).send(err);
  }
};

export const getAllDecks = async (req, res) => {
  try {
    const decks = await Deck.find();
    if (decks.length > 0) {
      res.status(200).json(decks);
    } else {
      res.status(404).json({ message: "No decks found." });
    }
  } catch (err) {
    res.status(500).json({ message: "Error retrieving the decks." });
  }
};

export const getDeckById = async (req, res) => {
  try {
    const deck = await Deck.findOne({ deckId: req.params.deckId });
    if (deck) {
      res.status(200).json(deck);
    } else {
      res.status(404).json({ message: "hmm... deck not found." });
    }
  } catch (err) {
    res.send(500).json({ message: "Error retrieving the deck." });
  }
};

export const updateDeck = async (req, res) => {
  try {
    const deck = await Deck.findOneAndUpdate(
      { deckId: req.params.deckId },
      req.body,
      { new: true }
    );
    if (deck) {
      res.status(200).json(deck);
    } else {
      res.status(404).json({ message: "No deck found with the given ID." });
    }
  } catch (err) {
    res.status(500).json({ message: "Error editing deck" });
  }
};

export const deleteDeck = async (req, res) => {
  try {
    const deck = await Deck.findOneAndDelete({
      deckId: req.params.deckId,
    });
    if (deck) {
      res.status(200).json({ message: "Successfully deleted the deck" });
    } else {
      res.status(404).json({ message: "woah!! Deck not found." });
    }
  } catch (err) {
    res.status(404).json({ message: "Error deleting the deck." });
  }
};

const generateDeckId = async () => {
  const date = new Date();
  const dateString = date.toISOString().slice(0, 10).replace(/-/g, "");
  try {
    const lastDeck = await Deck.findOne({
      deckId: { $regex: `^${dateString}` },
    })
      .sort({ deckId: -1 })
      .limit(1);
    let newCount = 1;
    if (lastDeck) {
      const lastIdNumber = parseInt(
        lastDeck.deckId.slice(dateString.length),
        10
      );
      newCount = lastIdNumber + 1;
    }
    return `${dateString}${String(newCount).padStart(2, "0")}`;
  } catch (err) {
    console.log("Error creating ID");
  }
};
