import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import ButtonPage from "./pages/ButtonPage";
import AccordionPage from "./pages/AccordionPage";
import DropdownPage from "./pages/DropdownPage";
import AppleNavBarPage from "./pages/AppleNavBarPage";

const App = () => {
  return (
    <div className="container mx-auto grid grid-cols-6 gap-4 mt-4">
      <Navbar />
      {/* navbar exists outside of our route list so its just there all the time */}
      <div className="col-span-5">
        <Routes>
          <Route path="/" element={<ButtonPage />} />
          <Route path="/accordion" element={<AccordionPage />} />
          <Route path="/dropdown" element={<DropdownPage />} />
          <Route path="/apple" element={<AppleNavBarPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
