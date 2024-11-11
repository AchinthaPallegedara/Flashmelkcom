"use client";

import * as React from "react";
import axios from "axios";
import { Calendar } from "@/components/ui/calendar";
import {
  addDays,
  format,
  isBefore,
  isAfter,
  startOfDay,
  parseISO,
  addHours,
  isSameDay,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCallback, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "./ui/phone-input";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().min(15).max(16),
});

interface Holiday {
  id: string;
  date: string;
  type: "full-day" | "time-slot";
  startTime?: string; // Optional: only for time-slot type
  endTime?: string; // Optional: only for time-slot type
  description: string;
}

interface Booking {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  packageType: string;
}

interface BookingCalendarProps {
  packageType: "basic" | "advance" | "platinum";
  packageDuration: number;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const TIME_SLOTS = Array.from(
  { length: 13 },
  (_, i) => `${(i + 8).toString().padStart(2, "0")}:00`
);

export default function BookingCalendar({
  packageType,
  packageDuration,
}: BookingCalendarProps) {
  const [step, setStep] = React.useState(1);
  const [date, setDate] = React.useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = React.useState<string>();
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();
  const [holidays, setHolidays] = React.useState<Holiday[]>([]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // Memoize fetchBookingsAndHolidays to avoid unnecessary re-creations
  const fetchBookingsAndHolidays = useCallback(
    async (startDate: Date, endDate: Date) => {
      try {
        setIsLoading(true);
        const formattedStartDate = format(startDate, "yyyy-MM-dd");
        const formattedEndDate = format(endDate, "yyyy-MM-dd");

        // Fetch both bookings and holidays for the date range
        const [bookingsResponse, holidaysResponse] = await Promise.all([
          api.get<Booking[]>(
            `/bookings?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
          ),
          api.get<Holiday[]>(
            `/holidays?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
          ),
        ]);

        setBookings(bookingsResponse.data);
        setHolidays(holidaysResponse.data);
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to fetch calendar data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [toast]
  );

  // Fetch holidays and bookings for the entire month when date is set
  useEffect(() => {
    if (date) {
      const startOfMonth = startOfDay(
        new Date(date.getFullYear(), date.getMonth(), 1)
      );
      const endOfMonth = startOfDay(
        new Date(date.getFullYear(), date.getMonth() + 1, 0)
      );
      fetchBookingsAndHolidays(startOfMonth, endOfMonth); // Fetch holidays for the entire month
    }
  }, [date, fetchBookingsAndHolidays]); // Only depend on `date` and `fetchBookingsAndHolidays`

  const fetchBookings = React.useCallback(
    async (selectedDate: Date) => {
      try {
        setIsLoading(true);
        const formattedDate = format(selectedDate, "yyyy-MM-dd");
        const { data } = await api.get<Booking[]>(
          `/bookings?date=${formattedDate}`
        );
        setBookings(data);
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to fetch bookings. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [toast]
  );

  React.useEffect(() => {
    fetchBookings(date);
  }, [date, fetchBookings]);

  const isTimeSlotAvailable = React.useCallback(
    (timeSlot: string) => {
      const timeSlotDate = parseISO(
        `${format(date, "yyyy-MM-dd")}T${timeSlot}`
      );

      const formattedDate = format(timeSlotDate, "yyyy-MM-dd");

      // First check holidays
      const holidayUnavailable = holidays.some((holiday) => {
        // Check if there's a full-day holiday
        if (holiday.date === formattedDate && holiday.type === "full-day") {
          return true;
        }

        // Check time-slot specific holidays
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

      // Then check regular bookings
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

  const handleBooking = async ({
    name,
    email,
    phone,
  }: {
    name: string;
    email: string;
    phone: string;
  }) => {
    if (!selectedTime) return;
    const endTime = format(
      addHours(parseISO(`2000-01-01T${selectedTime}`), packageDuration),
      "HH:mm"
    );

    try {
      setIsLoading(true);

      const bookingData = {
        name,
        email,
        phone,
        date: format(date, "yyyy-MM-dd"),
        startTime: selectedTime,
        endTime,
        packageType,
      };

      console.log("Booking", bookingData);

      // Make the booking API call with all data
      await api.post("/bookings", bookingData);

      toast({
        title: "Success",
        description: `Your ${packageType} package has been booked successfully.`,
      });

      setSelectedTime(undefined);
      await fetchBookings(date);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to book appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Define a submit handler that calls handleBooking with form values.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted with values:", values);
    handleBooking(values); // Pass form data (name, email, phone) directly to handleBooking
  }

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
  const handleContinue = () => {
    if (date && selectedTime) {
      setStep(2);
    }
  };

  return (
    <>
      {step === 1 ? (
        <div className="lg:mx-20">
          <Card className="lg:px-5 md:py-5">
            <CardHeader>
              <CardTitle>Please select a date and time</CardTitle>
              <CardDescription>
                Select a date and time slot to book an appointment for your{" "}
                {packageType} package
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 items-center justify-between mt-5 max-md:grid-cols-1">
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
                    fetchBookingsAndHolidays(startOfMonth, endOfMonth); // Fetch holidays for the selected month
                  }}
                  disabled={(date) => {
                    const today = startOfDay(new Date());
                    const maxDate = addDays(today, 60);
                    const targetDate = startOfDay(date);

                    // Check if the date is before today or after the max date
                    if (
                      isBefore(targetDate, today) ||
                      isAfter(targetDate, maxDate)
                    ) {
                      return true;
                    }

                    // Check if the date matches any holiday with 'full-day' type
                    const isHoliday = holidays.some(
                      (holiday) =>
                        isSameDay(
                          targetDate,
                          startOfDay(new Date(holiday.date))
                        ) && holiday.type === "full-day"
                    );

                    return isHoliday; // Disable the date if it's a full-day holiday
                  }}
                  components={{
                    IconLeft: () => <ChevronLeft className="h-10 w-10" />,
                    IconRight: () => <ChevronRight className="h-10 w-10" />,
                  }}
                />
              </div>
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
                      <h3 className="text-sm font-medium mb-4 rounded-none">
                        {period}
                      </h3>
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
            </CardContent>
            <CardFooter className="flex justify-end">
              <div className="mt-8">
                <Button
                  onClick={handleContinue}
                  disabled={!date || !selectedTime}
                  className="w-full hover:bg-main-500 hover:text-black"
                >
                  {isLoading ? "Loading..." : "Continue"}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div className="lg:mx-20">
          <Card className="lg:px-5 md:py-5">
            <CardHeader>
              <CardTitle>Fill your contact information</CardTitle>
              <CardDescription>
                Please fill in your contact information to book a session
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid">
                  <div className="space-y-2">
                    <div>
                      <h3 className="text-sm text-zinc-500 font-normal">
                        Date :
                      </h3>
                      <p className="font-medium text-xl">
                        {format(date, "EEEE MMMM d, yyyy")}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm text-zinc-500 font-normal">
                        Time :
                      </h3>
                      <p className="font-medium text-xl">
                        {selectedTime &&
                          `${format(
                            parseISO(`2024-01-01T${selectedTime}`),
                            "h:mm a"
                          )} - ${format(
                            addHours(
                              parseISO(`2000-01-01T${selectedTime}`),
                              packageDuration
                            ),
                            "h:mm a"
                          )}`}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-2"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input placeholder="Vinod Jayaweera" {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="me@gmail.com" {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <PhoneInput {...field} defaultCountry="LK" />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="mt-8">
                <Button
                  onClick={() => setStep(1)}
                  className="mr-4 hover:bg-main-500 hover:text-black"
                  variant={"outline"}
                >
                  Back
                </Button>
              </div>
              <div className="mt-8">
                <Button
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={
                    form.formState.isSubmitting ||
                    isLoading ||
                    !form.formState.isValid
                  }
                  className=" hover:bg-main-500 hover:text-black"
                >
                  {isLoading ? "Booking..." : "Book Appointment"}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
