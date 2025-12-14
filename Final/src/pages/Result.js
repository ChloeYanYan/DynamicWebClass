// src/pages/Result.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import AstrologyResult from "../components/AstrologyResult";
import Loading from "../components/Loading";

function Result() {
  const { birthInfo, astroResult } = useUserContext();
  const navigate = useNavigate();

  if (!birthInfo) {
    // If no result, back to home page
    return (
      <main className="min-h-screen flex flex-col items-center justify-center">
        <p className="mb-4">No birth information found. Please start again.</p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-black text-white rounded-full"
        >
          Go back
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-8 flex justify-center">
      <div className="w-full max-w-4xl">
        <button
          onClick={() => navigate("/")}
          className="mb-6 text-sm text-gray-500 hover:text-black"
        >
          &lt; Back
        </button>

        <h2 className="text-xl font-semibold mb-2">Your info:</h2>
        <pre className="text-sm text-gray-600 mb-6">
          {JSON.stringify(birthInfo, null, 2)}
        </pre>

        {!astroResult ? <Loading /> : <AstrologyResult result={astroResult} />}
      </div>
    </main>
  );
}

export default Result;
