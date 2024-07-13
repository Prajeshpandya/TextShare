import React, { useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createContext } from "react";

export const server = `http://localhost:5000`;
export const Context = createContext();

const AppWrapper = () => {
  const passwordRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [Data, setData] = useState({});
  const [userData, setUserData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [getData, setGetData] = useState("");


  return (
    <Context.Provider
      value={{ isLoading, passwordRef,getData, setGetData, setIsLoading, Data, setData, userData, setUserData,refresh, setRefresh }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
