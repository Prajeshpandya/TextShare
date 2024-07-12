import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createContext } from "react";

export const server = `http://localhost:5000`;
export const Context = createContext();

const AppWrapper = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [Data, setData] = useState({});
  const [userData, setUserData] = useState([]);

  return (
    <Context.Provider
      value={{ isLoading, setIsLoading, Data, setData, userData, setUserData }}
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
