import React from "react";
import { useLocation } from "react-router-dom";

const ReactGoogleMaps = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const margin = searchParams.get("margin") || "0";

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "600px",
        position: "relative",
        overflow: "hidden",
        paddingBottom: "75%",
        margin: margin,
      }}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2896.087473222151!2d5.473055776558833!3d43.45877096498369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c9930a47a7d569%3A0x6d13b99eb954e82b!2sExcel%20structure%20ingenierie!5e0!3m2!1sfr!2sus!4v1693750940588!5m2!1sfr!2sus"
        style={{
          border: "0",
          borderRadius: "20px",
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
        }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Maps Embed"
      ></iframe>
    </div>
  );
};

export default ReactGoogleMaps;
