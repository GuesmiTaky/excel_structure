import React, { useEffect } from "react";
import NavBar from "./navBar/NavBar";
import { Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const checkTokenAccess = () => {
    const token = localStorage.getItem("userInfo");
    return token ? true : false;
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!checkTokenAccess()) {
      navigate("/admin/login");
    }
  }, [navigate]);

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Dashboard;
