import React from 'react';
import { FaSearch, FaUserCircle, FaBell } from "react-icons/fa";
import logo from "../../assets/images/logo.png";

const Header = () => {
  return (
    <header className="flex flex-wrap justify-between items-center py-4 px-4 md:px-8 bg-[#1a1a1a]">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-4 md:mb-0">
        <img src={logo} className="h-8 w-8 object-contain" alt="logo" />
        <h1 className="text-lg font-semibold text-[#f5f5f5]">Restro</h1>
      </div>
      
      {/* Search Bar */}
      <div className="flex items-center gap-4 bg-[#1f1f1f] rounded-[20px] px-4 py-2 w-full md:w-[500px] mb-4 md:mb-0">
        <FaSearch className="text-[#f5f5f5]" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent w-full outline-none text-[#f5f5f5] placeholder:text-[#ababab]"
        />
      </div>
      
      {/* User Info */}
      <div className="flex items-center gap-4">
        {/* Notification Icon */}
        <div className="bg-[#1f1f1f] rounded-[15px] p-2 md:p-3 cursor-pointer">
          <FaBell className="text-[#f5f5f5] text-xl md:text-2xl" />
        </div>
        
        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer">
          <FaUserCircle className="text-[#f5f5f5] text-3xl md:text-4xl" />
          <div className="flex flex-col items-start">
            <h1 className="text-sm md:text-md text-[#f5f5f5] font-semibold">Bashir Ahmed</h1>
            <p className="text-xs text-[#ababab] font-medium">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
