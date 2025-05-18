"use client";

import { filterByDateRange } from "@/lib/dateFilters";
import React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar, DateRange } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function DateRangeFilter({
  data,
  onFilter,
  setIsSearch,
  className,
}: {
  data: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  onFilter: (filteredData: any[]) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  setIsSearch: (isSearch: boolean) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  className?: string;
}) {
  const [date, setDate] = React.useState<DateRange>({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 0, 20), 20),
  });

  const handleChange = (selectedDate: DateRange | undefined) => {
    if (!selectedDate) return;
    
    console.log(selectedDate);
    setDate(selectedDate);
    setIsSearch(false);
    
    const startDate = selectedDate.from;
    const endDate = selectedDate.to;
    
    if (startDate && endDate) {
      const filteredData = filterByDateRange(data, startDate, endDate);
      onFilter(filteredData);
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(value) => {
              // Ensure we're handling the DateRange type correctly
              if (value && 'from' in value) {
                handleChange(value as DateRange);
              } else {
                // If somehow we get a single Date, convert it to DateRange format
                handleChange({ from: value as Date, to: undefined });
              }
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}