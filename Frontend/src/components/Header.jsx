import React, { useState } from "react";
import { BsBrightnessHigh } from "react-icons/bs";

export default function Header() {
  let color = "white";
  const [lightMode, setLightMode] = useState(false);

  if (lightMode) {
    document.documentElement.style.setProperty("background-color", "white");
    document.documentElement.style.setProperty("color", "black");
    document.documentElement.style.setProperty("border-color", "black");
  }
  if (!lightMode) {
    document.documentElement.style.setProperty("background-color", "black");
    document.documentElement.style.setProperty("color", "white");
    document.documentElement.style.setProperty("border-color", "white");

  }

  if (lightMode) color = "black";
  else color = "white";

  return (
    <>
      <nav className="flex-between  flex m-5 justify-between items-center">
        <div>
          <p className="text-red-600 drop-shadow-xl font-mono  text-4xl hover:animate-pulse">
            {" "}
            TextShare
          </p>
          <p className="opacity-70 ml-10 text-sm hover:animate-pulse ">
            * Easiest Way to Send Text
          </p>
        </div>
        <div className=" mr-5">
          <button onClick={() => setLightMode(!lightMode)}>
            <BsBrightnessHigh size={25} color={color} />
          </button>
        </div>
      </nav>
    </>
  );
}
