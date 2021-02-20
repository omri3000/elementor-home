import dotenv from "dotenv";

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import privateRoutes from "./routes/private.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Allow cors
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Mongo connetion
const uri = process.env.COONNECTION_URL;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error.message));

app.get("/", (req, res) => {
  res.send(`Node app is running on port ${PORT}`);
});

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/private", privateRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
