import React, { useContext, useRef, useState } from "react";
import { Context } from "../main";

export default function Pass() {
  const [QRCodeImageSrc, setQRCodeImageSrc] = useState(null);
  const [showQr, setShowQr] = useState(false);
  const { userData } = useContext(Context);
  const dangerRef = useRef();

  const { passwordRef } = useContext(Context);

  const userObject =
    userData && userData.length > 0
      ? userData.reduce((acc, item) => ({ ...acc, [item.data]: item }), {})
      : {};

  const handleShowQRCode = () => {
    if (
      userObject?.undefined?.qrCode?.qrCodeImage &&
      userObject?.undefined.qrCode?.qrCodeImage.data
    ) {
      console.log("Workk");
      const base64Image = `data:image/png;base64,${btoa(
        new Uint8Array(userObject?.undefined?.qrCode?.qrCodeImage.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      )}`;
      setQRCodeImageSrc(base64Image);
      setShowQr(true);
    }
  };

  return (
    <div className="m-auto justify-center items-center flex flex-col">
      <p className="text-red-600 drop-shadow-xl font-mono  text-2xl hover:animate-pulse">
        With Multiple Way You Can Access The Data
      </p>
      <button
        className="bg-gray-500 mt-5 mb-16 text-white p-4 rounded-lg w-44 hover:opacity-50 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={handleShowQRCode}
      >
        Show QR
      </button>

      <p
        ref={passwordRef}
        className="border-2 mb-8  rounded-xl w-22 text-center  p-4    text-2xl "
      >
        {userObject?.undefined?.pass}
      </p>
      <p className="border-2 mb-8  rounded-xl w-22 text-center  p-4    text-2xl ">
        {userObject?.undefined?.customUrl}
      </p>
      {showQr && <img src={QRCodeImageSrc} alt="QR" />}

      <div className=" w-1/2 mt-10 p-4 border rounded">
        <div
          ref={dangerRef}
          dangerouslySetInnerHTML={{
            __html: userObject?.undefined?.textData,
          }}
        />
      </div>

      <p>You Can also Access this with the custom url : </p>
    </div>
  );
}
