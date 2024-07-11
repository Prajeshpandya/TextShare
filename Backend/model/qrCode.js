import mongoose from "mongoose";

const schema = new mongoose.Schema({
  qrCodeImage: Buffer,
  expiresAt: {
    type: Date,
    expires: 0,
    default: () => new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
  },
});

export const QrCode = mongoose.model("QrCode", schema);
