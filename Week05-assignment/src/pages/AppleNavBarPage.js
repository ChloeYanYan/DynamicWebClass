import React from "react";
import AppleNavBar from "../components/AppleNavBar";

const ITEMS = [
  { id: "1", label: "All products" },
  { id: "2", label: "Laptops" },
  { id: "3", label: "Desktops" },
  { id: "4", label: "Displays" },
];

const AppleNavBarPage = () => {
  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="mb-4 text-xl font-semibold">Mimic Apple.com</h1>
      <div className="bg-blue-100 px-4 py-2 rounded-full">
        <AppleNavBar items={ITEMS} />
      </div>
    </div>
  );
};

export default AppleNavBarPage;
