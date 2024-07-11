import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    textData: {
      type: String,
      required: [true, "Please enter the TextData!"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    expiresAt: {
      type: Date,
      expires:0,
      default: () => new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
    },
    pass: {
      type: Number,
      default: () => Math.floor(1000 + Math.random() * 9000), //random 4 digit code for access data
      unique: true,
    },
    qrCode: {
      type: mongoose.Schema.ObjectId,
      ref: "QrCode",
      required: false,
    },
    customUrl: {
      type: String,
      unique: true,
      required: false,
    },
  },
  { timestamps: true }
);

export const Text = mongoose.model("Text", schema);
