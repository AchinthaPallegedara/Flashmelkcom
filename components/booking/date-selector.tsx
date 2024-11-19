import { Calendar } from "@/components/ui/calendar";
import { addDays, isBefore, isAfter, startOfDay, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Holiday {
  id: string;
  date: string;
  type: "full-day" | "half-day";
  start_time?: string;
  end_time?: string;
}

interface DateSelectorProps {
  date: Date;
  setDate: (date: Date) => void;
  holidays: Holiday[];
  fetchBookingsAndHolidays: (startDate: Date, endDate: Date) => void;
}

export function DateSelector({
  date,
  setDate,
  holidays,
  fetchBookingsAndHolidays,
}: DateSelectorProps) {
  return (
    <div className="grid items-center max-md:justify-center max-md:mb-10">
      <Calendar
        mode="single"
        className="flex-1"
        selected={date}
        onSelect={(newDate) => newDate && setDate(newDate)}
        onMonthChange={(newDate) => {
          const startOfMonth = startOfDay(
            new Date(newDate.getFullYear(), newDate.getMonth(), 1)
          );
          const endOfMonth = startOfDay(
            new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0)
          );
          fetchBookingsAndHolidays(startOfMonth, endOfMonth);
        }}
        disabled={(date) => {
          const today = startOfDay(new Date());
          const maxDate = addDays(today, 60);
          const targetDate = startOfDay(date);

          if (isBefore(targetDate, today) || isAfter(targetDate, maxDate)) {
            return true;
          }

          const isHoliday = holidays.some(
            (holiday) =>
              isSameDay(targetDate, startOfDay(new Date(holiday.date))) &&
              holiday.type === "full-day"
          );

          return isHoliday;
        }}
        components={{
          IconLeft: () => <ChevronLeft className="h-10 w-10" />,
          IconRight: () => <ChevronRight className="h-10 w-10" />,
        }}
      />
    </div>
  );
}
