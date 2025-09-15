//core react library
import React from "react";
//react dom is for browser based projects
import ReactDOM from "react-dom/client";

//import our App component so we can render it
import App from "./App";

import "./global.css";

//grab a element by ID to assign as the root entry for our react project
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
