import qrCode from "qrcode";
import { QrCode } from "../model/qrCode.js";

export const generateQrCode = async (data) => {
  try {
    return await qrCode.toBuffer(data);
  } catch (error) {
    console.log(error);
    throw new Error("Failed To Generate Qr ", error);
  }
};

export const saveQrCodeToDb = async (qrCodeBuffer) => {
  try {
    const qrCode = new QrCode({
      qrCodeImage: qrCodeBuffer,
    });
    await qrCode.save();
    return qrCode._id;
  } catch (error) {
    console.log(error);
    throw new Error("Failed To Save Qr ", error);
  }
};
