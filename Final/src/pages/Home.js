// src/pages/Home.js
import React from "react";
import BirthForm from "../components/BirthForm";

function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 ">
      <div className="w-full max-w-4xl flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-semibold text-center mb-2">
          Please input your birth time and birth location
        </h1>

        <p className="text-center text-sm text-blue-500 mb-10">
          More detail leads to greater accuracy
        </p>

        <div className="w-full flex justify-center">
          <BirthForm />
        </div>
      </div>
    </main>
  );
}

export default Home;
