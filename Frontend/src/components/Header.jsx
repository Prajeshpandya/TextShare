import React, { useState } from "react";
import { BsBrightnessHigh } from "react-icons/bs";

export default function Header() {
  

  let color= "white";

  // if (lightMode) color = "black";
  // else color = "white";

  return (
    <>
      <nav className="flex-between text-white flex m-5 justify-between items-center">
        <div>
          <p className="text-red-600 drop-shadow-xl font-mono  text-4xl hover:animate-pulse">
            {" "}
            TextShare
          </p>
          <p className="opacity-70 ml-10 text-sm hover:animate-pulse ">
            * Easiest Way to Send Text
          </p>
        </div>
        
      </nav>
    </>
  );
}
