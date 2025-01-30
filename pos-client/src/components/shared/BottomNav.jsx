import React, { useState } from 'react';
import { IoHomeOutline } from "react-icons/io5";
import { CiCircleMore } from "react-icons/ci";
import { MdOutlineReorder, MdTableBar } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate(tab === 'home' ? '/' : `/${tab}`);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: IoHomeOutline },
    { id: 'orders', label: 'Orders', icon: MdOutlineReorder },
    { id: 'tables', label: 'Tables', icon: MdTableBar },
    { id: 'more', label: 'More', icon: CiCircleMore },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#262626] p-2 h-16 flex justify-around items-center">
      {/* Navigation Container */}
      <div
        role="navigation"
        className="flex w-full  justify-around items-center    rounded-xl py-2 px-3"
      >
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={clsx(
              'flex flex-col items-center justify-center px-3 py-2 text-sm transition-all duration-200 rounded-lg',
              'hover:bg-[#343434] focus:outline-none focus:ring-2 focus:ring-[#F6B100]',
              activeTab === id ? 'text-[#f5f5f5]' : 'text-[#ababab]'
            )}
            onClick={() => handleTabClick(id)}
            aria-label={label}
            aria-current={activeTab === id ? 'page' : undefined}
          >
            <Icon size={24} />
            <span className="text-xs">{label}</span>
          </button>
        ))}
      </div>

      {/* Floating Action Button (Dishes) */}
      <button
        role="button"
        className="absolute bottom-16 sm:bottom-6 bg-[#F6B100] text-white rounded-full p-3 h-14 w-14 flex items-center justify-center shadow-lg hover:bg-[#e6a000] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#F6B100]"
        aria-label="Dishes"
      >
        <BiSolidDish size={30} />
      </button>
    </div>
  );
};

export default BottomNav;