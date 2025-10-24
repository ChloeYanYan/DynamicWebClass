import React, { useState } from "react";

const AppleNavBar = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const renderedItems = items.map((item, index) => {
    const isActive = index === activeIndex;
    const itemClasses = isActive
      ? "bg-black text-white px-4 py-2 rounded-full"
      : "text-black px-4 py-2 rounded-full";

    return (
      <button
        key={item.id}
        onClick={() => handleClick(index)}
        className={itemClasses}
      >
        {item.label}
      </button>
    );
  });

  return <div className="flex space-x-8">{renderedItems}</div>;
};

export default AppleNavBar;
