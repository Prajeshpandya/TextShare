import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createContext } from "react";

export const server = `http://localhost:5000`

const AppWrapper = () => {
  const context = createContext();
  const [isLoading, setIsLoading] = useState(false);
  const [Data, setData] = useState([]);

  return (
    <context.Provider value={{ isLoading, setIsLoading, Data, setData }}>
      <App />
    </context.Provider>
  );
};


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
