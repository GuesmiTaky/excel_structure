import React from "react";

const NotFound = () => {
  const containerStyle = {
    textAlign: "center",
    marginTop: "100px",
  };

  return (
    <div style={containerStyle}>
      <h1>Site en maintenance</h1>
      <p>Nous reviendrons bientôt. Merci de votre patience.</p>
    </div>
  );
};

export default NotFound;
