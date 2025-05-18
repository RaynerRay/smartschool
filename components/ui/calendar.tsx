"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

// Custom day picker implementation to replace react-day-picker
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
]

// Define types for our date selection
export type DateRange = {
  from: Date | undefined;
  to: Date | undefined;
};

type DayInfo = {
  date: Date;
  day: number;
  isOutside: boolean;
  isToday: boolean;
  isSelected: boolean;
  isRangeStart?: boolean;
  isRangeEnd?: boolean;
  isRangeMiddle?: boolean;
};

// Create a separate interface for the props that aren't in HTMLAttributes
interface CalendarBaseProps {
  mode?: "single" | "range";
  selected?: Date | DateRange;
  onSelect?: (date: Date | DateRange | undefined) => void;
  showOutsideDays?: boolean;
  numberOfMonths?: number;
  defaultMonth?: Date;
  initialFocus?: boolean;
}

// Extend CalendarBaseProps with HTMLAttributes, omitting onSelect to avoid conflict
export interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>, CalendarBaseProps {}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}

function isSameDay(date1: Date | undefined, date2: Date | undefined): boolean {
  if (!date1 || !date2) return false
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

function isDateInRange(date: Date, from: Date | undefined, to: Date | undefined): boolean {
  if (!date || !from) return false
  if (!to) return isSameDay(date, from)
  
  const timestamp = date.getTime()
  return timestamp >= from.getTime() && timestamp <= to.getTime()
}

function isDateAfter(date1: Date | undefined, date2: Date | undefined): boolean {
  if (!date1 || !date2) return false
  return date1.getTime() > date2.getTime()
}

function isDateBefore(date1: Date | undefined, date2: Date | undefined): boolean {
  if (!date1 || !date2) return false
  return date1.getTime() < date2.getTime()
}

function addMonths(date: Date, count: number): Date {
  const result = new Date(date)
  const month = result.getMonth() + count
  const year = result.getFullYear() + Math.floor(month / 12)
  result.setFullYear(year)
  result.setMonth(month % 12)
  return result
}

export function Calendar({
  mode = "single",
  selected,
  onSelect,
  className,
  showOutsideDays = true,
  numberOfMonths = 1,
  defaultMonth,
  initialFocus,
  ...props
}: CalendarProps) {
  const today = React.useMemo(() => new Date(), [])
  const [currentMonth, setCurrentMonth] = React.useState<Date>(
    defaultMonth || 
    (selected as DateRange)?.from || 
    selected as Date || 
    today
  )

  const months = React.useMemo(() => {
    const months = []
    for (let i = 0; i < numberOfMonths; i++) {
      months.push(addMonths(currentMonth, i))
    }
    return months
  }, [currentMonth, numberOfMonths])

  const handleDateSelect = (day: Date) => {
    if (!onSelect) return
    
    if (mode === "single") {
      onSelect(day as Date)
    } else if (mode === "range") {
      const selectedRange = selected as DateRange
      if (!selectedRange || !selectedRange.from) {
        onSelect({ from: day, to: undefined })
      } else if (selectedRange.from && !selectedRange.to) {
        if (isDateAfter(day, selectedRange.from)) {
          onSelect({ ...selectedRange, to: day })
        } else {
          onSelect({ from: day, to: selectedRange.from })
        }
      } else {
        onSelect({ from: day, to: undefined })
      }
    }
  }

  const handleMonthChange = (increment: number) => {
    setCurrentMonth(addMonths(currentMonth, increment))
  }

  return (
    <div className={cn("p-3", className)} {...props}>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0">
        {months.map((month, monthIndex) => {
          const year = month.getFullYear()
          const monthNumber = month.getMonth()
          const daysInMonth = getDaysInMonth(year, monthNumber)
          const firstDayOfMonth = getFirstDayOfMonth(year, monthNumber)
          
          // Generate a grid of days for the month
          const days: (DayInfo | null)[] = []
          
          // Add empty slots for days before the first day of the month
          for (let i = 0; i < firstDayOfMonth; i++) {
            if (showOutsideDays) {
              // Calculate the day from previous month
              const prevMonth = monthNumber - 1 < 0 ? 11 : monthNumber - 1
              const prevYear = prevMonth === 11 ? year - 1 : year
              const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth)
              const day = daysInPrevMonth - firstDayOfMonth + i + 1
              
              const date = new Date(prevYear, prevMonth, day)
              
              days.push({
                date,
                day,
                isOutside: true,
                isToday: isSameDay(date, today),
                isSelected: mode === "single" 
                  ? isSameDay(date, selected as Date) 
                  : isDateInRange(date, (selected as DateRange)?.from, (selected as DateRange)?.to),
                isRangeStart: mode === "range" && isSameDay(date, (selected as DateRange)?.from),
                isRangeEnd: mode === "range" && isSameDay(date, (selected as DateRange)?.to)
              })
            } else {
              days.push(null)
            }
          }
          
          // Add days of the current month
          for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, monthNumber, day)
            
            days.push({
              date,
              day,
              isOutside: false,
              isToday: isSameDay(date, today),
              isSelected: mode === "single" 
                ? isSameDay(date, selected as Date) 
                : isDateInRange(date, (selected as DateRange)?.from, (selected as DateRange)?.to),
              isRangeStart: mode === "range" && isSameDay(date, (selected as DateRange)?.from),
              isRangeEnd: mode === "range" && isSameDay(date, (selected as DateRange)?.to),
              isRangeMiddle: mode === "range" && 
                (selected as DateRange)?.from && 
                (selected as DateRange)?.to && 
                isDateAfter(date, (selected as DateRange)?.from) && 
                isDateBefore(date, (selected as DateRange)?.to)
            })
          }
          
          // Add empty slots for days after the last day of the month
          const totalDaysDisplayed = days.filter(Boolean).length
          const remainingCells = 42 - totalDaysDisplayed // 6 rows * 7 columns
          
          if (showOutsideDays && remainingCells > 0) {
            const nextMonth = monthNumber + 1 > 11 ? 0 : monthNumber + 1
            const nextYear = nextMonth === 0 ? year + 1 : year
            
            for (let day = 1; day <= remainingCells; day++) {
              const date = new Date(nextYear, nextMonth, day)
              
              days.push({
                date,
                day,
                isOutside: true,
                isToday: isSameDay(date, today),
                isSelected: mode === "single" 
                  ? isSameDay(date, selected as Date) 
                  : isDateInRange(date, (selected as DateRange)?.from, (selected as DateRange)?.to),
                isRangeStart: mode === "range" && isSameDay(date, (selected as DateRange)?.from),
                isRangeEnd: mode === "range" && isSameDay(date, (selected as DateRange)?.to)
              })
            }
          }
          
          return (
            <div key={`${year}-${monthNumber}`} className="space-y-4">
              <div className="flex justify-center pt-1 relative items-center">
                {monthIndex === 0 && (
                  <button
                    onClick={() => handleMonthChange(-1)}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1"
                    )}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                )}
                <div className="text-sm font-medium">
                  {MONTHS[monthNumber]} {year}
                </div>
                {monthIndex === months.length - 1 && (
                  <button
                    onClick={() => handleMonthChange(1)}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1"
                    )}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="w-full">
                <div className="flex">
                  {DAYS.map((day) => (
                    <div 
                      key={day} 
                      className="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]"
                    >
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 mt-2">
                  {days.map((dayInfo, dayIndex) => {
                    if (!dayInfo) {
                      return <div key={dayIndex} className="h-9 w-9" />
                    }
                    
                    const { date, day, isOutside, isToday, isSelected, isRangeStart, isRangeEnd, isRangeMiddle } = dayInfo
                    
                    return (
                      <div
                        key={dayIndex}
                        className={cn(
                          "h-9 w-9 text-center text-sm p-0 relative",
                          isRangeEnd && "rounded-r-md",
                          isRangeStart && "rounded-l-md"
                        )}
                      >
                        <button
                          type="button"
                          onClick={() => handleDateSelect(date)}
                          className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "h-9 w-9 p-0 font-normal",
                            isOutside && "text-muted-foreground",
                            isToday && "bg-accent text-accent-foreground",
                            isSelected && !isRangeMiddle && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                            isRangeMiddle && "bg-accent text-accent-foreground"
                          )}
                        >
                          {day}
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

Calendar.displayName = "Calendar"