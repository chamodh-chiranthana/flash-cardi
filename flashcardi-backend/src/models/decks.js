import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

export const deckSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: Date.now,
  },
  updatedAt: {
    type: Date,
    required: Date.now,
  },
});
