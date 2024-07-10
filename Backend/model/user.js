import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required:false
  },
  email: {
    type: String,
    required:false
  },
  password: {
    type: String,
    required:false
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const User = mongoose.model("User", schema);
