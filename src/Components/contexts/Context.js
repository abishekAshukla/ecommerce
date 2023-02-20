import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [stage, setStage] = useState(0);
  const [showLoaderFul, setShowLoaderFul] = useState(false);

  return (
    <AppContext.Provider
      value={{
        stage,
        setStage,
        showLoaderFul, setShowLoaderFul
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const AppState = () => {
  return useContext(AppContext);
};

export default AppProvider;
