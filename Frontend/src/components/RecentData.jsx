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
    <>
      
      <div className="flex flex-row items-center">
        <div
          id="btnPass"
          className="border-2 mr-4 flex flex-col mb-8 justify-center items-center rounded-xl w-48 text-center p-4 text-2xl"
        >
          <p>Pass: {data.pass}</p>
          <button
            className="text-sm hidden relative text-white"
            onClick={() => copyText(data.pass)}
          >
            {isCopied ? "Copied" : "Copy"}
          </button>
        </div>

        <div
          id="btn"
          className="border-2 mb-8 mr-4  flex flex-col justify-center items-center rounded-xl w-fit text-center p-4 text-sm"
        >
          <p className="text-base">You can also access this with the URL:</p>
          <p className="text-lg">
            https://textshare-1.onrender.com/customurl/{data.customUrl}
          </p>
          <button
            className="text-sm hidden relative text-white"
            onClick={() =>
              copyText(
                `https://textshare-1.onrender.com/customurl/${data.customUrl}`
              )
            }
          >
            {isCopied ? "Copied" : "Copy"}
          </button>
        </div>
        {showQr && (
          <img className="w-28 mr-4 mb-6 h-28" src={QRCodeImageSrc} alt="QR" />
        )}
        <div
          id="btnData"
          onClick={() => copyText(data.textData)}
          className="flex flex-col p-4 border rounded"
        >
          {/* <div>{data.textData}</div> */}
          <div ref={passwordRef}>
            <textarea
              className="text-white"
              defaultValue={data.textData}
              readOnly
            ></textarea>
          </div>
          <button className="text-sm hidden relative text-white">
            {isCopied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </>
  );
}
