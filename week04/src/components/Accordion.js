import { useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { GoChevronUp } from "react-icons/go";

const Accordion = (props) => {
  const { items } = props;
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const handleClick = (nextIndex) => {
    setExpandedIndex((currentExpandedIndex) => {
      if (currentExpandedIndex === nextIndex) {
        return -1;
      } else {
        return nextIndex;
      }
    });
  };

  const renderedItems = items.map((item, index) => {
    const isExpanded = index === expandedIndex;
    const icon = (
      <span className="text-2xl">
        {isExpanded ? <GoChevronDown /> : <GoChevronUp />}
      </span>
    );

    return (
      <div key={item.id}>
        <div
          onClick={() => {
            handleClick(index);
          }}
          className="flex justify-between items-center p-3 bg-gray-100 border-b cursor-pointer"
        >
          {item.label}
          {icon}
        </div>
        {isExpanded && (
          <div className="flex justify-between items-center p-3 bg-gray-100 border-b cursor-pointer">
            {item.content}
          </div>
        )}
      </div>
    );
  });

  return <div>{renderedItems}</div>;
};

export default Accordion;
