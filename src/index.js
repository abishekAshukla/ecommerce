import React from "react";
import ReactDOM from "react-dom/client";
import APIProvider from "./Components/contexts/Apis";
import AppProvider from "./Components/contexts/Context";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider>
      <APIProvider>
        <App />
      </APIProvider>
    </AppProvider>
  </React.StrictMode>
);
