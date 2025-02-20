import React, { useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { CiCircleMore } from "react-icons/ci";
import { MdOutlineReorder, MdTableBar } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";
import clsx from "clsx";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "./Modal";
import { useDispatch } from 'react-redux';
import { setCustomer } from "../../redux/slices/customerSlice";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guestCount, setGuestCount] = useState(0);

  const [name, setName] = useState();
  const [phone, setPhone] = useState();

  const navItems = [
    { id: "home", label: "Home", icon: IoHomeOutline, path: "/" },
    { id: "orders", label: "Orders", icon: MdOutlineReorder, path: "/orders" },
    { id: "tables", label: "Tables", icon: MdTableBar, path: "/tables" },
    { id: "more", label: "More", icon: CiCircleMore, path: "#" },
  ];

  // Derive active tab from URL
  const activeTab =
    navItems.find((item) => item.path === location.pathname)?.id || "home";

  const handleTabClick = (path) => {
    navigate(path);
  };
  const isDisabled =
    location.pathname === "/tables" || location.pathname === "/menu";

   const handleCreateOrder = () =>{
    // send the data to store
    dispatch(setCustomer({name, phone, guests: guestCount}));
   navigate('/tables')
   }
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#262626] p-2 h-16 flex justify-around items-center">
      {/* Navigation Container */}
      <div
        role="navigation"
        className="flex w-full justify-around items-center rounded-xl py-2 px-3"
      >
        {navItems.map(({ id, label, icon: Icon, path }) => (
          <button
            key={id}
            tabIndex="0"
            className={clsx(
              "flex flex-col items-center justify-center px-3 py-2 text-sm transition-all duration-200 rounded-lg",
              "hover:bg-[#343434] focus:outline-none focus:ring-2 focus:ring-[#F6B100]",
              activeTab === id
                ? "text-[#f5f5f5] bg-[#383838]"
                : "text-[#ababab]"
            )}
            onClick={() => handleTabClick(path)}
            aria-label={label}
            aria-current={activeTab === id ? "page" : undefined}
          >
            <Icon size={24} />
            <span className="text-xs">{label}</span>
          </button>
        ))}
      </div>

      {/* Floating Action Button (Dishes) */}
      <button
        onClick={() => setIsModalOpen(true)}
        role="button"
        className={clsx(
          "absolute bottom-16 sm:bottom-6 bg-[#F6B100] text-white rounded-full p-3 h-14 w-14 flex items-center justify-center shadow-lg hover:bg-[#e6a000] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#F6B100]",
          isDisabled ? "opacity-50 cursor-not-allowed" : ""
        )}
        aria-label="Dishes"
        disabled={isDisabled}
      >
        <BiSolidDish size={30} />
      </button>

      {/* Order Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Order"
      >
        <div>
          <label className="block text-[#ababab] mb-2 text-sm font-medium">
            Customer Name
          </label>
          <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
            <input
            value={name}
            onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter customer name"
              className="bg-transparent flex-1 text-white focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Customer Phone
          </label>
          <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
            <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
              type="number"
              placeholder="Enter customer phone"
              className="bg-transparent flex-1 text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Guest Counter */}
        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Guests
          </label>
          <div className="flex items-center justify-between bg-[#1f1f1f] px-4 py-3 rounded-lg">
            <button
              className="text-yellow-500 text-2xl disabled:opacity-50"
              onClick={() => setGuestCount((prev) => Math.max(prev - 1, 0))}
              disabled={guestCount === 0}
              aria-label="Decrease guest count"
            >
              &minus;
            </button>
            <span className="text-white">
              {guestCount} Person{guestCount !== 1 ? "s" : ""}
            </span>
            <button
              className="text-yellow-500 text-2xl"
              onClick={() => setGuestCount((prev) => prev + 1)}
              aria-label="Increase guest count"
            >
              &#43;
            </button>
          </div>
        </div>

        <button
          onClick={handleCreateOrder}
          className="w-full bg-[#F6B100] text-[#f5f5f5] rounded-lg py-3 mt-8 hover:bg-yellow-700"
        >
          Create Order
        </button>
      </Modal>
    </div>
  );
};

export default BottomNav;
