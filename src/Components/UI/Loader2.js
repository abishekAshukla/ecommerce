import React from "react";
import { AppState } from "../contexts/Context";

const Loader2 = () => {
  const { showLoaderFul } = AppState();
  return (
    <div
      style={{ display: showLoaderFul === true ? "" : "none" }}
      className="bg-white z-[9] fixed shadow-md shadow-black rounded-[10px] flex items-center justify-between flex-col text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5"
    >
      <div className="border-8 border-gray-300 border-t-[#FFD835] rounded-full w-20 h-20 animate-spin "></div>
    </div>
  );
};

export default Loader2;
