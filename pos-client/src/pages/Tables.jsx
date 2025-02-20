import React, { useState } from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import TableCard from "../components/tables/TableCard";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTables } from "../https";
import { enqueueSnackbar } from "notistack";

const Tables = () => {
  const [status, setStatus] = useState("all");

  const { data: resData, isError } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      return await getTables();
    },
    placeholderData: keepPreviousData,
  });

  if (isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" });
  }

  // ✅ Filtered table data based on status
  const filteredTables = resData?.data?.data?.filter((table) =>
    status === "all" ? true : table.status === "Booked"
  );
console.log(resData);
  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden">
      <div className="flex items-center justify-between px-10 py-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wide">
            Tables
          </h1>
        </div>
        <div className="flex items-center justify-around gap-4">
          <button
            onClick={() => setStatus("all")}
            className={`text-[#ababab] text-lg ${
              status === "all" && "bg-[#383838]"
            } rounded-lg px-5 font-semibold`}
          >
            All
          </button>
          <button
            onClick={() => setStatus("booked")}
            className={`text-[#ababab] text-lg ${
              status === "booked" && "bg-[#383838]"
            } rounded-lg px-5 font-semibold`}
          >
            Booked
          </button>
        </div>
      </div>

      {/* 🔥 4 Cards per row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-4 sm:px-8 py-4 overflow-auto h-[calc(100vh-13rem)]">
  {filteredTables?.map((table) => (
    <TableCard
      key={table._id}
      id={table._id}
      name={table.tableNo}
      status={table.status}
      initials={table?.currentOrder?.customerDetails?.name}
      seats={table.seats || "N/A"} // Default to "N/A" if seats are missing
    />
  ))}
</div>


      <BottomNav />
    </section>
  );
};

export default Tables;
