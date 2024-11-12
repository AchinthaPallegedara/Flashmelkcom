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
      const timeSlotDate = parseISO(
        `${format(date, "yyyy-MM-dd")}T${timeSlot}`
      );
      const formattedDate = format(timeSlotDate, "yyyy-MM-dd");
      const now = new Date();

      // Disable past time slots for today
      if (isToday(date) && isBefore(timeSlotDate, now)) {
        return false;
      }

      const holidayUnavailable = holidays.some((holiday) => {
        if (holiday.date === formattedDate && holiday.type === "full-day") {
          return true;
        }

        if (holiday.date === formattedDate && holiday.type === "time-slot") {
          const holidayStart = parseISO(`${holiday.date}T${holiday.startTime}`);
          const holidayEnd = parseISO(`${holiday.date}T${holiday.endTime}`);
          const timeSlotHour = timeSlotDate.getHours();
          const holidayStartHour = holidayStart.getHours();
          const holidayEndHour = holidayEnd.getHours();

          return (
            timeSlotHour >= holidayStartHour && timeSlotHour < holidayEndHour
          );
        }

        return false;
      });

      if (holidayUnavailable) {
        return false;
      }

      return !bookings.some((booking) => {
        if (booking.date !== formattedDate) {
          return false;
        }

        const bookingStart = parseISO(`${booking.date}T${booking.startTime}`);
        const bookingEnd = parseISO(`${booking.date}T${booking.endTime}`);
        const timeSlotHour = timeSlotDate.getHours();
        const bookingStartHour = bookingStart.getHours();
        const bookingEndHour = bookingEnd.getHours();

        return (
          timeSlotHour >= bookingStartHour && timeSlotHour < bookingEndHour
        );
      });
    },
    [bookings, holidays, date]
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
