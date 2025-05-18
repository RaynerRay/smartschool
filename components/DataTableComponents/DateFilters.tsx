"use client";
import {
  filterByLast7Days,
  filterByThisMonth,
  filterByThisYear,
  filterByToday,
  filterByYesterday,
} from "@/lib/dateFilters";
import React, { useState } from "react";

export default function DateFilters({
  data,
  onFilter,
  setIsSearch,
}: {
  data: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  onFilter: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  setIsSearch: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}) {
  const options = [
    { value: "life", label: "Life time" },
    { value: "today", label: "Today" },
    { value: "last-7-days", label: "Last 7 days" },
    { value: "month", label: "This Month" },
    { value: "year", label: "This year" },
  ];

  const [selectedFilter, setSelectedFilter] = useState("life");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const valueString = e.target.value;
    setSelectedFilter(valueString);
    setIsSearch(false);

    let filteredData = data;
    if (valueString === "today") {
      filteredData = filterByToday(data);
    } else if (valueString === "yesterday") {
      filteredData = filterByYesterday(data);
    } else if (valueString === "last-7-days") {
      filteredData = filterByLast7Days(data);
    } else if (valueString === "month") {
      filteredData = filterByThisMonth(data);
    } else if (valueString === "year") {
      filteredData = filterByThisYear(data);
    }

    onFilter(filteredData);
    console.log("value:", valueString);
  };

  return (
    <div>
      <select
        value={selectedFilter}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
