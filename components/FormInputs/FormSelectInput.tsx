"use client";
import AddNewButton from "@/components/FormInputs/AddNewButton";
import React from "react";

export type Option = {
  value: string;
  label: string;
};

type FormSelectInputProps = {
  options: Option[];
  label: string;
  option: Option | Option[]; // single or multiple selected values
  setOption: (value: Option | Option[] | null) => void;

  href?: string;
  labelShown?: boolean;
  toolTipText?: string;
  isSearchable?: boolean; // ignored in native <select>
  isMultiple?: boolean;
};

export default function FormSelectInput({
  options,
  label,
  option,
  setOption,
  href,
  toolTipText,
  labelShown = true,
  isMultiple = false,
}: FormSelectInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (isMultiple) {
      const selectedValues = Array.from(e.target.selectedOptions, (o) => o.value);
      const selectedOptions = options.filter((opt) =>
        selectedValues.includes(opt.value)
      );
      setOption(selectedOptions);
    } else {
      const selectedValue = e.target.value;
      const selectedOption = options.find((opt) => opt.value === selectedValue);
      setOption(selectedOption || null);
    }
  };

  return (
    <div>
      {labelShown && (
        <h2 className="pb-2 block text-sm font-medium leading-6 text-gray-900">
          Select {label}
        </h2>
      )}
      <div className="flex items-center space-x-2">
        <select
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={
            isMultiple
              ? (option as Option[]).map((o) => o.value)
              : (option as Option)?.value || ""
          }
          onChange={handleChange}
          multiple={isMultiple}
        >
          {!isMultiple && <option value="">-- Select {label} --</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {href && toolTipText && (
          <AddNewButton toolTipText={toolTipText} href={href} />
        )}
      </div>
    </div>
  );
}