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

export const updateACard = async (req, res) => {
  const { deckId, cardId } = req.params;
  // console.log(`Updating card with deckId: ${deckId} and cardId: ${cardId}`);

  const deck = await Deck.findOne({ deckId: deckId });
  if (!deck) {
    return res.status(404).json({ message: "Deck not found." });
  }

  try {
    // console.log(`Querying for card with deckId: ${deckId} and cardId: ${cardId}`);
    const card = await Card.findOneAndUpdate(
      { deckId: deckId, cardId: cardId },
      req.body,
      { new: true }
    );

    if (!card) {
      console.log(`No card found with deckId: ${deckId} and cardId: ${cardId}`);
      return res.status(404).json({ message: "Card not found." });
    }

    // console.log(`Card found and updated: ${JSON.stringify(card)}`);
    res.status(200).json(card);
  } catch (err) {
    res.status(400).json({ message: "Error updating the card." });
    console.log(err);
  }
};

export const deleteACard = async (req, res) => {
  const { deckId, cardId } = req.params;
  const deck = await Deck.findOne({ deckId: deckId });
  if (!deck) {
    return res.status(404).json({ message: "No deck found under that ID." });
  }
  try {
    const card = await Card.findOneAndDelete({
      deckId: deckId,
      cardId: cardId,
    });
    if (!card) {
      return res.status(404).json({ message: "No card found under that ID." });
    } else {
      return res.status(200).json({ message: "Card found and deleted." });
    }
  } catch (err) {
    res.status(400).json({ message: "An error occured when deleting a card." });
    console.log(err);
  }
};
