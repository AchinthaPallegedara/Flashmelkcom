import * as React from "react";
import { format, parseISO, isBefore, isToday } from "date-fns";
import { cn } from "@/lib/utils";
import { Booking, Holiday } from "./booking-calendar";

interface TimeSlotSelectorProps {
  date: Date;
  selectedTime: string | undefined;
  setSelectedTime: (time: string | undefined) => void;
  bookings: Booking[];
  holidays: Holiday[];
  isLoading: boolean;
}

const TIME_SLOTS = Array.from(
  { length: 13 },
  (_, i) => `${(i + 8).toString().padStart(2, "0")}:00`
);

export function TimeSlotSelector({
  date,
  selectedTime,
  setSelectedTime,
  bookings,
  holidays,
  isLoading,
}: TimeSlotSelectorProps) {
  const isTimeSlotAvailable = React.useCallback(
    (timeSlot: string) => {
      const selectedDateStr = format(date, "yyyy-MM-dd");
      const timeSlotDate = parseISO(`${selectedDateStr}T${timeSlot}`);
      const now = new Date();

      // 1. Disable past time slots for today
      if (isToday(date) && isBefore(timeSlotDate, now)) {
        return false;
      }

      // 2. Check if the time slot falls within a holiday (full-day or time-slot specific)
      const isHolidayUnavailable = holidays.some((holiday) => {
        const holidayDateStr = holiday.date; // e.g., "2024-12-24"

        if (holidayDateStr === selectedDateStr) {
          if (holiday.type === "full-day") {
            return true; // Disable for full-day holidays
          }

          // Parse the start and end times for time-slot-specific holidays
          const holidayStart = parseISO(
            `${holidayDateStr}T${holiday.start_time}`
          );
          const holidayEnd = parseISO(`${holidayDateStr}T${holiday.end_time}`);

          return timeSlotDate >= holidayStart && timeSlotDate < holidayEnd;
        }
        return false;
      });

      if (isHolidayUnavailable) {
        return false;
      }

      // 3. Check if the time slot overlaps with an existing booking
      const isBookingUnavailable = bookings.some((booking) => {
        const bookingDateStr = booking.date; // e.g., "2024-11-14"

        if (bookingDateStr === selectedDateStr) {
          // Parse the start and end times for bookings
          const bookingStart = parseISO(
            `${bookingDateStr}T${booking.start_time}`
          );
          const bookingEnd = parseISO(`${bookingDateStr}T${booking.end_time}`);

          return timeSlotDate >= bookingStart && timeSlotDate < bookingEnd;
        }
        return false;
      });

      return !isBookingUnavailable; // Time slot is available only if no overlap is found
    },
    [date, holidays, bookings]
  );

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time === selectedTime ? undefined : time);
  };

  const TimeSlotButton = React.memo(({ time }: { time: string }) => {
    const available = isTimeSlotAvailable(time);

    return (
      <button
        onClick={() => available && handleTimeSelect(time)}
        className={cn(
          "py-3 px-4 text-sm border rounded-none",
          "hover:border-main-500 transition-colors",
          selectedTime === time &&
            "bg-black text-white hover:border-transparent",
          !available && "opacity-50 cursor-not-allowed hover:border-border"
        )}
        disabled={!available || isLoading}
        aria-label={`Select time slot ${time}`}
      >
        {format(parseISO(`2024-01-01T${time}`), "h:mm a")}
      </button>
    );
  });

  TimeSlotButton.displayName = "TimeSlotButton";

  return (
    <div className="grid">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">
          {format(date, "EEEE, MMMM d, yyyy")}
        </h2>
        <div className="flex items-center text-muted-foreground mt-1">
          <span>(GMT +05:30) Asia, Colombo</span>
        </div>
      </div>

      <div className="space-y-6">
        {["AM", "PM"].map((period) => (
          <div key={period}>
            <h3 className="text-sm font-medium mb-4 rounded-none">{period}</h3>
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.filter((time) => {
                const hour = parseInt(time.split(":")[0]);
                return period === "AM" ? hour < 12 : hour >= 12;
              }).map((time) => (
                <TimeSlotButton key={time} time={time} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
