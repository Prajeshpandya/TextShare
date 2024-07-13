import React, { useContext, useEffect } from "react";
import RichText from "./components/RichText";
import Header from "./components/Header";
import GetData from "./components/GetData";
import { Toaster } from "react-hot-toast";
import Pass from "./components/Pass";
import { UseUserTexts } from "./apis/SendData";
import { Context } from "./main";

export default function App() {
  const { fetchUserTexts } = UseUserTexts();
  const { refresh } = useContext(Context);
  useEffect(() => {
    try {
      fetchUserTexts();
    } catch (error) {
      console.log(error);
    }
  }, [refresh]);

  return (
    <>
      <Header />
      <GetData />
      <RichText />
      <Toaster position="top-center" />
      <Pass />
    </>
  );
}
