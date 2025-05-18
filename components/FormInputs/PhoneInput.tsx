"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-react";
import { countries } from "@/countries";

type TextInputProps = {
  register: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  setPhoneCode: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  errors: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  label: string;
  type?: string;
  name: string;
  toolTipText?: string;
  unit?: string;
  placeholder?: string;
  icon?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export default function PhoneInput({
  register,
  errors,
  label,
  name,
  toolTipText,
  unit,
  icon,
  placeholder,
  setPhoneCode,
}: TextInputProps) {
  const Icon = icon;
  const initialCountryCode = "ZW";

  const modifiedCountries = countries.map((country) => ({
    value: country.value,
    label: `${country.countryCode} ${country.phoneCode}`,
    phoneCode: country.phoneCode,
    currencyCode: country.currencyCode,
    countryCode: country.countryCode,
    flag: country.flag,
  }));

  const initialCountry = modifiedCountries.find(
    (item) => item.countryCode === initialCountryCode
  );

  const [selectedCountry, setSelectedCountry] = useState<any>(initialCountry); // eslint-disable-line

  useEffect(() => {
    if (selectedCountry && setPhoneCode) {
      setPhoneCode(selectedCountry.phoneCode);
    }
  }, [selectedCountry, setPhoneCode]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = modifiedCountries.find((c) => c.value === e.target.value);
    if (country) {
      setSelectedCountry(country);
      setPhoneCode(country.phoneCode);
    }
  };

  return (
    <div>
      <div className="flex space-x-2 items-center">
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
        {toolTipText && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button>
                  <CircleHelp className="w-4 h-4 text-slate-500" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{toolTipText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      <div className="mt-2">
        <div className="flex gap-2">
          <div className="w-32">
            <select
              className="block w-full rounded-md border border-gray-300 bg-white py-2 px-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              value={selectedCountry?.value}
              onChange={handleCountryChange}
            >
              {modifiedCountries.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
          </div>

          <div className="relative rounded-md flex-1">
            {icon && (
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Icon className="text-slate-300 w-4 h-4" />
              </div>
            )}
            <input
              id={name}
              type="tel"
              {...register(`${name}`, { required: true })}
              className={cn(
                "block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-sm",
                (errors[`${name}`] && "focus:ring-red-500 pl-8") ||
                  (icon && "pl-8")
              )}
              placeholder={placeholder || label}
            />
            {unit && (
              <p className="bg-white py-2 px-3 rounded-tr-md rounded-br-md absolute inset-y-0 right-1 my-[2px] flex items-center">
                {unit}
              </p>
            )}
          </div>
        </div>

        {errors[name] && (
          <span className="text-xs text-red-600">{label} is required</span>
        )}
      </div>
    </div>
  );
}
