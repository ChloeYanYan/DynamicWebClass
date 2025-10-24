import React from "react";
import { Link, NavLink } from "react-router-dom";
import Panel from "./Panel";

const Navbar = () => {
  /*
  V6+ of REact Router changed the way NavLink works. You used to have access to a var isActive
  Now we need to write an inline checker function
  Here is how to style NavLink weith Tailwind and the new version of React Router and Remix
  */

  // define our base class and our active class at js vars

  const baseClass = "text-blue-500";
  const activeClass =
    "text-blue-500 border-l-4 border-blue-500 font-bold decoration-solid pl-4";
  return (
    <Panel className="sticky top-0 overflow-y-scroll flex flex-col item-start">
      <NavLink
        to="/"
        className={({ isActive }) =>
          // isActive is a prop we get for free from NavLink
          // ({isActive}) => {} is like (props) => {const {isActive} = props}
          // now we have isActive destructured out of our props we get for free from NavLink
          // use a ternary to apply base or active class
          //conditionToCheck ? return this is true : else do this
          isActive ? activeClass : baseClass
        }
      >
        Button
      </NavLink>

      <NavLink
        to="/accordion"
        className={({ isActive }) => (isActive ? activeClass : baseClass)}
      >
        Accordion
      </NavLink>

      <NavLink
        to="/dropdown"
        className={({ isActive }) => (isActive ? activeClass : baseClass)}
      >
        Dropdown
      </NavLink>

      <NavLink
        to="/apple"
        className={({ isActive }) => (isActive ? activeClass : baseClass)}
      >
        Apple
      </NavLink>
    </Panel>
  );
};

/*
LINK COMPONENTS DO THE JOB BUT THEY ARE NOT AWARE OF IF THEY ARE THE ACTIVE LINK
const Navbar = () => {
  return (
    <Panel className="sticky top-0 overflow-y-scroll flex flex-col item-start">
      <Link to="/" className="text-blue-500">
        Button
      </Link>

      <Link to="/accordion" className="text-blue-500">
        Accordion
      </Link>

      <Link to="/dropdown" className="text-blue-500">
        Dropdown
      </Link>
    </Panel>
  )
}
  */

export default Navbar;
