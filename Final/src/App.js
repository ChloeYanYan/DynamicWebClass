// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Home from "./pages/Home";
import Result from "./pages/Result";
import "./index.css";

function App() {
  return (
    <UserProvider>
      <div className="min-h-screen bg-white text-black">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
