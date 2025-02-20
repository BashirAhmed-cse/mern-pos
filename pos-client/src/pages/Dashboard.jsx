import React, { useState } from "react";
import { MdTableBar, MdCategory } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";
import Metrics from "../components/dashboard/Metrics";
import RecentOrder from "../components/dashboard/RecentOrder";

const buttons = [
  { label: "Add Table", icon: <MdTableBar />, action: "table" },
  { label: "Add Category", icon: <MdCategory />, action: "category" },
  { label: "Add Dishes", icon: <BiSolidDish />, action: "dishes" },
];

const tabs = ["Metrics", "Orders", "Payments"];

const Dashboard = () => {

    const [activeTab, setActiveTab] = useState("Metrics");

  const handleButtonClick = (action) => {
    console.log(`Clicked: ${action}`);
    // Handle navigation or API calls based on `action`
  };

  return (
    <div className="bg-[#1f1f1f] h-[calc(100vh-5rem)] ">
      <div className="container mx-auto flex flex-wrap justify-center md:justify-between items-center py-14 gap-6 px-6">
        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          {buttons.map(({ label, icon, action }, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(action)}
              className="bg-[#1a1a1a] hover:bg-[#262626] px-6 py-3 rounded-lg text-[#f5f5f5] 
              font-semibold text-md flex items-center gap-2 transition-all duration-300"
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
              className={`
                 px-6 py-3 rounded-lg text-[#f5f5f5] 
              font-semibold text-md flex items-center gap-2 transition-all duration-300
               ${activeTab === tab ? "bg-[#262626]" : "bg-[#1a1a1a] hover:bg-[#262626]"} `}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
       {activeTab === "Metrics" && <Metrics/>}
       {activeTab === "Orders" && <RecentOrder/>}
     
    </div>
  );
};

export default Dashboard;
