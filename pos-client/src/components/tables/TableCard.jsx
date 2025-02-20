import React, { useCallback } from "react";
import { getAvatarName, getBgColor } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTable } from "../../redux/slices/customerSlice";
import { FaLongArrowAltRight } from "react-icons/fa";

const TableCard = ({ name, status, initials, seats }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    if (status === "Booked") return;
    dispatch(updateTable({ tableNo: name }));
    navigate("/menu");
  }, [status, dispatch, name, navigate]);

  return (
    <div
      onClick={handleClick}
      className="w-full sm:w-[300px] md:w-[280px] lg:w-[260px] xl:w-[240px] min-w-[200px] h-[180px]
  bg-[#262626] p-4 rounded-xl cursor-pointer flex flex-col justify-between shadow-lg
  hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
    >
      {/* Table Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-[#f5f5f5] text-lg font-semibold flex items-center">
          Table <FaLongArrowAltRight className="text-[#ababab] ml-2" /> {name}
        </h1>
        <p
          className={`px-3 py-1 rounded-lg text-sm font-semibold ${
            status === "Booked"
              ? "text-green-500 bg-green-900"
              : "text-yellow-400 bg-yellow-800"
          }`}
        >
          {status}
        </p>
      </div>

      {/* Avatar Section */}
      <div className="flex items-center justify-center mt-3">
        <h1
          className="text-white rounded-full w-14 h-14 flex items-center justify-center text-lg font-bold"
          style={{ backgroundColor: initials ? getBgColor() : "#1f1f1f" }}
        >
          {getAvatarName(initials) || "N/A"}
        </h1>
      </div>

      {/* Seats Info */}
      <p className="text-[#ababab] text-xs text-center mt-2">
        Seats: <span className="text-[#f5f5f5] font-semibold">{seats}</span>
      </p>
    </div>
  );
};

export default TableCard;
