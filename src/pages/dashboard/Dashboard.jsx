import React from "react";
import { Navbar } from "../../components";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

export default Dashboard;
