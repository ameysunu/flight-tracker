import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const NotFound: React.FC = () => {
  const history = useHistory();

  const goBack = () => {
    history.push("/");
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <h1>404 Page Not Found</h1>
      <br />
      <Button variant="outline-primary" onClick={goBack} size="lg" block>
        Go back home
      </Button>
    </div>
  );
};

export default NotFound;
