import React from "react";
import { FaSearch, FaUserCircle, FaBell } from "react-icons/fa";
import logo from "../../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { IoLogOut } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../https";
import { removeUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";

const Header = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
 
      dispatch(removeUser());
      navigate("/auth");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="flex flex-wrap items-center justify-between p-4 md:p-6 bg-[#1a1a1a]">
      {/* Left - Logo */}
      <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer">
        <img src={logo} className="h-8 w-8 object-contain" alt="logo" />
        <h1 className="text-lg font-semibold text-[#f5f5f5]">Restro</h1>
      </div>

      {/* Middle - Search Bar (Hidden on Mobile) */}
      <div className="hidden md:flex items-center gap-4 bg-[#1f1f1f] rounded-[20px] px-4 py-2 w-[400px]">
        <FaSearch className="text-[#f5f5f5]" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent w-full outline-none text-[#f5f5f5] placeholder:text-[#ababab]"
        />
      </div>

      {/* Right - User & Icons */}
      <div className="flex items-center gap-3">
        {/* Admin Dashboard Button (Only for Admins) */}
        {userData.role === "Admin" && (
          <div
            onClick={() => navigate("/dashboard")}
            className="bg-[#1f1f1f] rounded-[15px] p-2 cursor-pointer"
          >
            <MdDashboard className="text-[#f5f5f5] text-xl" />
          </div>
        )}

        {/* Notification Icon */}
        <div className="bg-[#1f1f1f] rounded-[15px] p-2 cursor-pointer">
          <FaBell className="text-[#f5f5f5] text-xl" />
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          <FaUserCircle className="text-[#f5f5f5] text-3xl" />
          <div className="hidden md:block">
            <h1 className="text-sm text-[#f5f5f5] font-semibold">
              {userData.name || "Test User"}
            </h1>
            <p className="text-xs text-[#ababab] font-medium">
              {userData.role || "Role"}
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <IoLogOut
          onClick={handleLogout}
          className="text-[#f5f5f5] cursor-pointer hover:text-red-500"
          size={30}
        />
      </div>

      {/* Mobile Search Bar (Hidden on Desktop) */}
      <div className="flex md:hidden w-full mt-3">
        <div className="flex items-center gap-4 bg-[#1f1f1f] rounded-[20px] px-4 py-2 w-full">
          <FaSearch className="text-[#f5f5f5]" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent w-full outline-none text-[#f5f5f5] placeholder:text-[#ababab]"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
