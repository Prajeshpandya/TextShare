import cookieParser from "cookie-parser";
import express from "express";
import { config } from "dotenv";
import { connDb } from "./data/database.js";
import TextRouter from "./routes/text.js";
import { errorMiddleWare } from "./middleware/errorhandler.js";
import cors from "cors";

export const app = express();

config({
  path: "./.env",
});

connDb();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*", //we can give specific domain , that only take accept the request from that specific domain
    methods: ["GET", "PUT", "DELETE", "POST", "PATCH"],
    credentials: true, //for get header details like cookie...
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//using Routes
app.use("/text", TextRouter);
app.use("/", (req, res, next) => {
  res.send("API is Working with /api/v1 !");
});

//using error middleware
app.use(errorMiddleWare);

app.listen(port, () => {
  console.log(`server is working on ${port}`);
});
