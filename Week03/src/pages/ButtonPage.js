import React from "react";
import Button from "../components/Button";

const ButtonPage = () => {
  return (
    <div>
      <h1>Button Page</h1>
      <div>
        <Button
          primary
          outline
          onClick={() => {
            console.log("CLICK");
          }}
        >
          Primary
        </Button>
      </div>

      <div>
        <Button secondary rounded className="fixed top-0 right-0">
          Secondary
        </Button>
      </div>

      <div>
        <Button success>Success</Button>
      </div>

      <div>
        <Button warning>Warning</Button>
      </div>

      <div>
        <Button danger outline rounded>
          Danger
        </Button>
      </div>
    </div>
  );
};

export default ButtonPage;
