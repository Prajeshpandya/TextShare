import React from "react";
import RichText from "./components/RichText";
import Header from "./components/Header";
import GetData from "./components/GetData";
import {Toaster} from "react-hot-toast"
export default function App() {
  return (
    <>
      <Header />
      <GetData />
      <RichText />
      <Toaster position="top-center" />

    </>
  );
}
