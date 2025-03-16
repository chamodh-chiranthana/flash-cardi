import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const deckSchema = new Schema({
  deckId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: "Title of the deck is required",
  },
  description: {
    type: String,
    required: "Description of the deck is required",
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

export default mongoose.model("Deck", deckSchema, "decks");
