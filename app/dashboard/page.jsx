import React from "react";
import { salsa } from "../Utils/font";

const Dashboard = () => {
  return (
    <div className="bg-orange py-10 px-[4vw]">
      <p className={`text-2xl ${salsa.className} text-brown font-semibold`}>
        Account Details
      </p>
      <div></div>
    </div>
  );
};

export default Dashboard;
