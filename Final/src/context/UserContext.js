// src/context/UserContext.js
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [birthInfo, setBirthInfo] = useState(null);
  const [astroResult, setAstroResult] = useState(null);

  return (
    <UserContext.Provider
      value={{ birthInfo, setBirthInfo, astroResult, setAstroResult }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUserContext must be used inside UserProvider");
  return ctx;
}
