import cookieParser from "cookie-parser";
import express from "express";
import { config } from "dotenv";
import { connDb } from "./data/database.js";
import TextRouter from "./routes/text.js"
import { errorMiddleWare } from "./middleware/errorhandler.js";

export const app = express();

config({
  path: "./.env",
});

connDb();

const port = 5000;

app.use(express.json());
app.use(cookieParser());

//using Routes
app.use("/text",TextRouter);


//using error middleware
app.use(errorMiddleWare);

app.listen(port, () => {
  console.log(`server is working on ${port}`);
});