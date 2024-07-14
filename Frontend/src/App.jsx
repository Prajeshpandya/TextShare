import React from "react";
import RichText from "./components/RichText";
import Header from "./components/Header";
import GetData from "./components/GetData";
import { Toaster } from "react-hot-toast";
import Pass from "./components/Pass";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CostumUrl from "./components/CostumUrl";
export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <GetData />
                <RichText />
                <Pass />
              </>
            }
          />
          <Route path="/customurl/:customUrl" element={<CostumUrl />} />
        </Routes>
      </Router>
      <Toaster position="top-center" />
    </>
  );
}
