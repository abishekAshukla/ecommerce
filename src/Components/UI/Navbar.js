import React from "react";
import { FaSearch, FaRegUser } from "react-icons/fa";
import {
  AiOutlineHeart,
  AiOutlineShopping,
  AiOutlineSearch,
} from "react-icons/ai";
import "./ui.css";

const Navbar = () => {
  return (
    <div className="flex justify-around items-center h-[52px]">
      <div className="flex">
        <img
          src="https://images.bewakoof.com/web/ic-desktop-normal-bwkf-logo.svg"
          alt="logo"
          className="h-[20px] w-[147px]"
        />
        <ul className="nav-ul flex ml-[35px]">
          <li
            className="nav-li"
            onClick={() => {
              // navigate("/");
              window.scrollTo(0, 0);
            }}
          >
            <a className="nav-a">APPLE</a>
          </li>
          <li
            onClick={() => {
              // navigate("/contact");
              window.scrollTo(0, 0);
            }}
            className="nav-li drop-li mx-[20px]"
          >
            <a className="nav-a">OPPO</a>
          </li>
          <li
            onClick={() => {
              // navigate("/resume");
              window.scrollTo(0, 0);
            }}
            className="nav-li"
          >
            <a className="nav-a">VIVO</a>
          </li>
        </ul>
      </div>

      <div className="flex items-center">
        <div className="search-box w-[320px] h-[40px] bg-[#EAEAEA] flex items-center justify-between rounded">
          <div className="text-[18px] text-gray-400 ml-[10px]">
            <FaSearch />
          </div>
          <input
            className="w-[90%] bg-[#EAEAEA] outline-none"
            type="text"
            placeholder="Search by product"
          />
        </div>

        <div className="icons flex bg-white border-l-2 border-[#8f8b8b] ml-10 px-2 items-center h-[25px]">
          <div className="search-icon text-[23px] hidden text-gray-600">
            <AiOutlineSearch />
          </div>
          <div className="text-[23px] text-gray-600 ml-[12px]">
            <FaRegUser />
          </div>
          <div className="text-[23px] text-gray-600 ml-[12px]">
            <AiOutlineHeart />
          </div>
          <div className="text-[23px] text-gray-600 ml-[12px]">
            <AiOutlineShopping />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
