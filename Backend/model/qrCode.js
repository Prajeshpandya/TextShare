import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
   qrCodeImage:Buffer,
   
  },
);

export const QrCode = mongoose.model("QrCode", schema);
