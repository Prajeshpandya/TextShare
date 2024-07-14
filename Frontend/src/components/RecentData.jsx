import React, { useCallback, useContext, useEffect, useState } from "react";
import { Context } from "../main";

export default function RecentData({ data }) {
  const { passwordRef, userData } = useContext(Context);
  const [QRCodeImageSrc, setQRCodeImageSrc] = useState(null);
  const [showQr, setShowQr] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleShowQRCode = useCallback(() => {
    if (data?.qrCode?.qrCodeImage && data.qrCode?.qrCodeImage.data) {
      const base64Image = `data:image/png;base64,${btoa(
        new Uint8Array(data.qrCode.qrCodeImage.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      )}`;
      setQRCodeImageSrc(base64Image);
      setShowQr(true);
    }
  }, [data]);

  useEffect(() => {
    handleShowQRCode();
  }, [userData]);

  const copyText = async (text) => {
    await window.navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 500);
  };

  return (
    <div className="flex flex-col items-center">
      <div id="btnPass" className="border-2 flex flex-col mb-8 justify-center items-center rounded-xl w-80 text-center p-4 text-2xl">
        <p>{data.pass}</p>
        <button
          ref={passwordRef}
          className="text-sm hidden relative text-white"
          onClick={() => copyText(data.pass)}
        >
          {isCopied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="text-sm relative text-white">
        <p>You can also access this with the URL:</p>
      </div>
      <div id="btn" className="border-2 mb-8 flex flex-col justify-center items-center rounded-xl w-80 text-center p-4 text-2xl">
        <p>{data.customUrl}</p>
        <button
          className="text-sm hidden relative text-white"
          onClick={() => copyText(data.customUrl)}
        >
          {isCopied ? "Copied" : "Copy"}
        </button>
      </div>
      {showQr && <img src={QRCodeImageSrc} alt="QR" />}
      <div id="btnData"  onClick={() => copyText(data.textData)}  className="flex flex-col w-1/2 mt-10 p-4 border rounded">
        <div>{data.textData}</div>
        <button className="text-sm hidden relative text-white">{isCopied ? "Copied" : "Copy"}</button>
      </div>
    </div>
  );
}
