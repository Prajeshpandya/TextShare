import mongoose from "mongoose";

export const connDb = () => {
  mongoose
    .connect(process.env.DB_URI, {
      dbName: "TextShare",
    })
    .then((c) => {
      console.log(`database connected to ${c.connection.host}`);
    })
    .catch((error) => console.log(error));
};