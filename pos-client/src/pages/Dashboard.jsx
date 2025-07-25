import React, { useState } from "react";
import { MdTableBar, MdCategory } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";
import Metrics from "../components/dashboard/Metrics";
import RecentOrders from "../components/dashboard/RecentOrders"; // Corrected import
import Modal from "../components/dashboard/Modal";

const buttons = [
  { label: "Add Table", icon: <MdTableBar />, action: "table" },
  { label: "Add Category", icon: <MdCategory />, action: "category" },
  { label: "Add Dishes", icon: <BiSolidDish />, action: "dishes" },
];

const tabs = ["Metrics", "Orders", "Payments"];

const Dashboard = () => {
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Metrics");

  const handleOpenModal = (action) => {
    if (action === "table") setIsTableModalOpen(true);
  };

  return (
    <div className="bg-[#1f1f1f] min-h-screen">
      {/* Buttons & Tabs Container */}
      <div className="container mx-auto flex flex-wrap justify-center md:justify-between items-center py-6 gap-4 px-4 md:px-6">
        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          {buttons.map(({ label, icon, action }, index) => (
            <button
              key={index}
              onClick={() => handleOpenModal(action)}
              className="bg-[#1a1a1a] hover:bg-[#262626] px-5 py-3 rounded-lg text-[#f5f5f5] 
              font-semibold text-sm md:text-md flex items-center gap-2 transition-all duration-300"
            >
              {icon} {label}
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`px-5 py-3 rounded-lg text-[#f5f5f5] font-semibold text-sm md:text-md flex items-center 
              transition-all duration-300 ${
                activeTab === tab ? "bg-[#262626]" : "bg-[#1a1a1a] hover:bg-[#262626]"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4 md:p-6">
        {activeTab === "Metrics" && <Metrics />}
        {activeTab === "Orders" && <RecentOrders />}
        {activeTab === "Payments" && (
          <div className="text-center text-[#f5f5f5] text-lg mt-6">
            Payments data coming soon...
          </div>
        )}
      </div>

      {/* Modal */}
      {isTableModalOpen && <Modal setIsTableModalOpen={setIsTableModalOpen} />}
    </div>
  );
};

export default Dashboard;
