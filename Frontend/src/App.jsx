import React from "react";
import RichText from "./components/RichText";
import Header from "./components/Header";
import GetData from "./components/GetData";
import { Toaster } from "react-hot-toast";
import BackgroundVideo from "./components/background/Video";

export default function App() {
  return (
    <>
      <div className="relative">
        <BackgroundVideo />
        <div className="relative z-10">
          <Header />
          <GetData />
          <RichText />
          <Toaster position="top-center" />
        </div>
      </div>
    </>
  );
}
