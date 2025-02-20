import React, { useState ,useEffect} from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { useMutation } from "@tanstack/react-query";
import { addTable } from "../../https";
import { enqueueSnackbar } from "notistack";

const Modal = ({ setIsTableModalOpen }) => {
  const [tableData, setTableData] = useState({ tableNo: "", seats: "" });

  // Handle Form Change
  const handleInputChange = (e) => {
    let { name, value } = e.target;
  
    if (name === "seats") {
      value = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      if (value !== "" && parseInt(value, 10) < 1) {
        enqueueSnackbar("Seats must be at least 1!", { variant: "warning" });
        return;
      }
    }
  
    setTableData((prev) => ({ ...prev, [name]: value }));
  };
  

  // Mutation Hook
  const tableMutation = useMutation({
    mutationFn: addTable,
    onSuccess: () => {
      setTableData({ tableNo: "", seats: "" }); // Reset form
      setIsTableModalOpen(false); // Close modal
      enqueueSnackbar("Table Added successful!", { variant: "success" });
    },
    onError: (error) => {
        const errorMessage = error?.response?.data?.message || "Something went wrong!";
        enqueueSnackbar(errorMessage, { variant: "error" });
     
    },
  });

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (tableMutation.isPending) return; // Prevent double submission
  
    const trimmedData = {
      tableNo: tableData.tableNo.trim(),
      seats: Number(tableData.seats.trim()),
    };
  
    if (!trimmedData.tableNo || !trimmedData.seats) {
      enqueueSnackbar("Please fill in all fields!", { variant: "warning" });
      return;
    }
  
    tableMutation.mutate(trimmedData);
  };
  
  
  
//   allow users to close the modal using the Esc key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsTableModalOpen(false);
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsTableModalOpen]);
  
  
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={() => setIsTableModalOpen(false)}
    >
      <motion.div
  role="dialog"
  aria-labelledby="modal-title"
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.9 }}
  transition={{ duration: 0.3, ease: "easeInOut" }}
  className="bg-[#262626] p-6 rounded-lg shadow-lg w-96"
  onClick={(e) => e.stopPropagation()}
>
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
        <h2 id="modal-title" className="text-[#f5f5f5] text-xl font-semibold">
      Add Table
    </h2>
          <button
            onClick={() => setIsTableModalOpen(false)}
            className="text-[#f5f5f5] hover:text-red-500"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
          {/* Table Number */}
          <div>
            <label className="block text-[#ababab] mb-2 text-md font-medium">
              Table Number
            </label>
            <div className="flex items-center rounded-lg p-4 bg-[#1f1f1f]">
              <input
                type="text"
                name="tableNo"
                value={tableData.tableNo}
                onChange={handleInputChange}
                className="bg-transparent flex-1 text-white focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Number of Seats */}
          <div>
            <label className="block text-[#ababab] mb-2 text-md font-medium">
              Number of Seats
            </label>
            <div className="flex items-center rounded-lg p-4 bg-[#1f1f1f]">
              <input
                type="number"
                name="seats"
                value={tableData.seats}
                onChange={handleInputChange}
                className="bg-transparent flex-1 text-white focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={tableMutation.isPending}
            className={`w-full mt-6 py-3 text-lg rounded-lg font-bold transition-all ${
              tableMutation.isPending
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
            }`}
          >
            {tableMutation.isPending ? "Adding..." : "Add Table"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Modal;
