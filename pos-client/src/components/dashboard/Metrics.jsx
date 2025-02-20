import React from "react";
import { itemsData, metricsData } from "../../constants";

const Metrics = () => {
  return (
    <div className="container mx-auto py-2 px-6 md:px-4">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-white text-xl">Overall Performance</h2>
          <p className="text-sm text-gray-400">Track your overall business performance at a glance.</p>
        </div>
        <button className="flex items-center gap-1 px-4 py-2 rounded-md text-white bg-gray-900">
          Last 1 Month
          <svg className="w-3 h-3" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {metricsData.map((metric, index) => {
          const textColor = metric.isIncrease ? "text-white" : "text-red-500";
          return (
            <div key={index} className="shadow-sm rounded-lg p-4" style={{ backgroundColor: metric.color }}>
              <div className="flex justify-between items-center">
                <p className="font-medium text-xs text-white">{metric.title}</p>
                <div className="flex items-center gap-1">
                  <svg className={`w-3 h-3 ${textColor}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4" fill="none">
                    <path d={metric.isIncrease ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                  </svg>
                  <p className={`font-medium text-xs ${textColor}`}>{metric.percentage}</p>
                </div>
              </div>
              <p className="mt-1 font-semibold text-2xl text-white">{metric.value}</p>
            </div>
          );
        })}
      </div>

      {/* Item Details Section */}
      <div className="flex flex-col justify-between mt-12">
        <div>
          <h2 className="font-semibold text-white text-xl">Item Details</h2>
          <p className="text-sm text-gray-400">Detailed breakdown of key business metrics.</p>
        </div>

        {/* Items Grid */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {itemsData.map((item, index) => (
            <div key={index} className="shadow-sm rounded-lg p-4" style={{ backgroundColor: item.color }}>
              <div className="flex justify-between items-center">
                <p className="font-medium text-xs text-white">{item.title}</p>
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4" fill="none">
                    <path d="M5 15l7-7 7 7" />
                  </svg>
                  <p className="font-medium text-xs text-white">{item.percentage}</p>
                </div>
              </div>
              <p className="mt-1 font-semibold text-2xl text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Metrics;
