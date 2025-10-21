import React from "react";
import Accordion from "../components/Accordion";

const ITEMS = [
  {
    id: "123",
    label: "How many",
    content: "Balabalabalabala1",
  },
  {
    id: "456",
    label: "Do I need",
    content: "Balabalabalabala2",
  },
  {
    id: "789",
    label: "when do",
    content: "Balabalabalabala3",
  },
];

const AccordionPage = () => {
  return (
    <div>
      <h1>AccordionPage</h1>
      <Accordion items={ITEMS} />
    </div>
  );
};

export default AccordionPage;
