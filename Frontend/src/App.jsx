import React, { useContext, useEffect } from "react";
import RichText from "./components/RichText";
import Header from "./components/Header";
import GetData from "./components/GetData";
import { Toaster } from "react-hot-toast";
import BackgroundVideo from "./components/background/Video";
import Pass from "./components/Pass";
import { UseUserTexts } from "./apis/SendData";

export default function App() {
  const { fetchUserTexts } = UseUserTexts();
  useEffect(() => {
    try {
      fetchUserTexts();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className="relative">
        <BackgroundVideo />
        <div className="relative z-10">
          <Header />
          <GetData />
          <RichText />
          <Toaster position="top-center" />
          <Pass />
        </div>
      </div>
    </>
  );
}
