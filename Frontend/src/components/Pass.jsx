import React, { useContext, useRef, useState } from "react";
import { Context } from "../main";

export default function Pass() {
  const [QRCodeImageSrc, setQRCodeImageSrc] = useState(null);
  const [showQr, setShowQr] = useState(false);
  const { Data } = useContext(Context);
  const dangerRef = useRef();

  

  const handleShowQRCode = () => {
    if (Data?.qrCode?.qrCodeImage?.data) {
      const base64Image = `data:image/png;base64,${btoa(
        new Uint8Array(Data.qrCode.qrCodeImage.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      )}`;
      setQRCodeImageSrc(base64Image);
      setShowQr(true);
    }
  };
  return (
    <div>
      {Data?.qrCode && (
        <button
          className="bg-gray-500 mt-5 mb-16 text-white p-4 rounded-lg w-44 hover:opacity-50 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={handleShowQRCode}
        >
          Show QR
        </button>
      )}
      <p className="text-white">{Data?.pass}</p>
      {showQr && <img src={QRCodeImageSrc} alt="QR" />}
      {showQr && (
        <div className="text-white w-1/2 mt-10 p-4 border rounded">
          <div ref={dangerRef} dangerouslySetInnerHTML={{ __html: textData }} />
        </div>
      )}
    </div>
  );
}
