import React, { useContext, useEffect } from "react";
import RichText from "./components/RichText";
import Header from "./components/Header";
import GetData from "./components/GetData";
import { Toaster } from "react-hot-toast";
import Pass from "./components/Pass";
// import { UseUserTexts } from "./apis/SendData";
// import { Context } from "./main";

export default function App() {
  // const { fetchUserTexts } = UseUserTexts();
  // const { refresh, userData } = useContext(Context);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await fetchUserTexts();
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, [refresh, userData]);

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
