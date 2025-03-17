import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const cardSchema = new Schema({
  deckId: {
    type: String,
    ref: "Deck",
    required: true,
  },
  cardId: {
    type: String,
    required: true,
    unique: true,
  },
  frontText: {
    type: String,
    required: true,
  },
  backText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Card", cardSchema, "cards");
