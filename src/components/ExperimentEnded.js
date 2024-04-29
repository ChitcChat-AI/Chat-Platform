import React from "react";
import Logo from "../img/logo.png";

const ExperimentEnded = ({ text, experimentID, clientID }) => {
  return (
    <div className="flex flex-col items-center h-screen bg-slate-100 pt-10">
      <img src={Logo} alt="logo" className="w-48 h-48 mb-5" />
      <div className="flex flex-col items-center justify-center w-[500px] p-4 bg-white rounded-lg shadow-lg">
        <p className="text-3xl text-center">{text}</p>
      </div>
    </div>
  );
};

export default ExperimentEnded;
