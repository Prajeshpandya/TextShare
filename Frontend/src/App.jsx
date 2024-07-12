import React, { useContext, useEffect } from "react";
import RichText from "./components/RichText";
import Header from "./components/Header";
import GetData from "./components/GetData";
import { Toaster } from "react-hot-toast";
import BackgroundVideo from "./components/background/Video";
import Pass from "./components/Pass";
import { UseUserTexts } from "./apis/SendData";
import { Context } from "./main";

export default function App() {
  const { fetchUserTexts } = UseUserTexts();
  const{refresh} = useContext(Context)
  useEffect(() => {
    try {
      fetchUserTexts();
    } catch (error) {
      console.log(error);
    }
  }, [refresh]);

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
