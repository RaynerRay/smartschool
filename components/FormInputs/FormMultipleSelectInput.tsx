"use client";
import AddNewButton from "@/components/FormInputs/AddNewButton";
import React from "react";

type Option = {
  value: string;
  label: string;
};

type FormSelectInputProps = {
  options: Option[];
  label: string;
  option: Option[]; // selected options
  setOption: (value: Option[]) => void;
  href?: string;
  labelShown?: boolean;
  toolTipText?: string;
  isSearchable?: boolean; // ignored in native select
};

export default function FormMultipleSelectInput({
  options,
  label,
  option,
  setOption,
  href,
  toolTipText,
  labelShown = true,
}: FormSelectInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValues = Array.from(e.target.selectedOptions, (o) => o.value);
    const selectedOptions = options.filter((opt) =>
      selectedValues.includes(opt.value)
    );
    setOption(selectedOptions);
    console.log(selectedOptions);
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
          multiple
          value={option.map((o) => o.value)}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
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
