import React from "react";
import { twMerge } from "tailwind-merge";

const Button = ({ text, onClick, color }) => {
  const colorDict = {
    green: "bg-teal-100 text-teal-800 hover:bg-teal-200",
    gray: "bg-gray-200 text-gray-500 hover:bg-gray-300",
    red: "bg-red-100 text-red-800 hover:bg-red-200",
  };

  const className = twMerge(
    "sm:w-[120px] w-[60px] justify-center py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent",
    colorDict[color]
  );
  return (
    <button className={className} onClick={() => onClick()}>
      {text}
    </button>
  );
};

export default Button;
