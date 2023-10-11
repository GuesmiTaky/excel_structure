// GlobalLoader.js
import React from "react";
import { Spin } from "antd";

const GlobalLoader = ({ loading }) => {
  return (
    <Spin
      style={{
        marginTop: "20%",
        color: "green",
        display: "flex",
        margin: "auto",
        alignItems: "center",
        justifyContent: "center",
      }}
      spinning={loading}
      tip="Chargement en cours..."
      size="large"
    />
  );
};

export default GlobalLoader;
