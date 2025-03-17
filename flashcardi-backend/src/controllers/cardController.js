import Card from "../models/cards";
import Deck from "../models/decks";

export const createACard = async (req, res) => {
  try {
    const { deckId } = req.params;

    const deck = await Deck.findOne({ deckId: deckId });
    if (!deck) {
      return res.status(404).json({ message: "Deck not found." });
    }
    const newCardId = await generateCardId(deckId);
    let newCard = new Card({ ...req.body, cardId: newCardId, deckId: deckId });
    const card = await newCard.save();
    res.status(200).json(card);
  } catch (err) {
    res.status(400).json({ message: "Error creating the card." });
    console.log(err);
  }
};

export const getCardsByDeck = async (req, res) => {
  try {
    const { deckId } = req.params;

    const deck = await Deck.findOne({ deckId: deckId });
    if (!deck) {
      return res
        .status(404)
        .json({ message: "Couldn't find the deck you are looking for." });
    }
    const cards = await Card.find({ deckId: deckId });
    if (cards.length === 0) {
      res.status(404).json({ message: "No cards found for this deck." });
    }
    res.status(200).json(cards);
  } catch (err) {
    res.status(400).json({ message: "Error fetching cards" });
    console.log(err);
  }
};

const generateCardId = async (deckId) => {
  try {
    const lastCard = await Card.findOne({
      deckId: deckId,
      cardId: { $regex: `^${deckId}CD` },
    })
      .sort({ cardId: -1 })
      .limit(1);

    let newCount = 1;
    if (lastCard) {
      const lastIdNumber = parseInt(
        lastCard.cardId.slice(deckId.length + 2),
        10
      );
      newCount = lastIdNumber + 1;
    }
    return `${deckId}CD${String(newCount).padStart(2, "0")}`;
  } catch (err) {
    console.log("Error creating the card.");
  }
};
