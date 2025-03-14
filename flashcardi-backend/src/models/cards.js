import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const cardSchema = new Schema({
  deckId: {
    type: Schema.Types.ObjectId,
    ref: "Deck",
    required: true,
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
