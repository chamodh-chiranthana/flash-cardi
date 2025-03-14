import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import deckRoutes from "./src/routes/deckRoutes";
import cardRoutes from "./src/routes/cardRoutes";

dotenv.config();

const app = express();
const PORT = 3000;

deckRoutes(app);
cardRoutes(app);

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Successfully connected to MongoDB Database.");
  })
  .catch((err) => {
    console.error("Error connectnig to MongoDB database", err);
  });

app.get("/", (req, res) => {
  res.send(`Welcome to flashcardi backend ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Your server is running on ${PORT}`);
});
