/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import axios from "axios";
import { format, startOfDay, parseISO, addHours } from "date-fns";
import { useToast } from "@/hooks/use-toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DateSelector } from "./date-selector";
import { TimeSlotSelector } from "./time-slot-selector";
import { ContactForm } from "./contact-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface Holiday {
  id: string;
  date: string;
  type: "full-day" | "time-slot";
  start_time?: string;
  end_time?: string;
}

interface Booking {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  packageType: string;
  status: string;
}

export type { Holiday, Booking };

interface BookingCalendarProps {
  packageType:
    | "I-basic"
    | "I-standard"
    | "I-professional"
    | "V-basic"
    | "V-standard"
    | "V-professional";
  packageDuration: number;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default function BookingCalendar({
  packageType,
  packageDuration,
}: BookingCalendarProps) {
  const [step, setStep] = React.useState(1);
  const [date, setDate] = React.useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = React.useState<string>();
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [holidays, setHolidays] = React.useState<Holiday[]>([]);
  const [showOverlapWarning, setShowOverlapWarning] = React.useState(false);
  const [allowOverlap, setAllowOverlap] = React.useState(false);
  const { toast } = useToast();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [confirmedBooking, setConfirmedBooking] = React.useState<any>(null);
  const router = useRouter();

  const fetchBookingsAndHolidays = React.useCallback(
    async (startDate: Date, endDate: Date) => {
      try {
        setIsLoading(true);
        const formattedStartDate = format(startDate, "yyyy-MM-dd");
        const formattedEndDate = format(endDate, "yyyy-MM-dd");

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
        console.log(error);
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

  React.useEffect(() => {
    setDate(new Date());
  }, []);

  React.useEffect(() => {
    if (date) {
      const startOfMonth = startOfDay(
        new Date(date.getFullYear(), date.getMonth(), 1)
      );
      const endOfMonth = startOfDay(
        new Date(date.getFullYear(), date.getMonth() + 1, 0)
      );
      fetchBookingsAndHolidays(startOfMonth, endOfMonth);
    }
  }, [date, fetchBookingsAndHolidays]);

  const checkTimeSlotOverlap = React.useCallback(() => {
    if (!selectedTime) return false;

    const selectedStartTime = parseISO(
      `${format(date, "yyyy-MM-dd")}T${selectedTime}`
    );
    const selectedEndTime = addHours(selectedStartTime, packageDuration);

    return bookings
      .filter((booking) => booking.status === "disapproved")
      .some((booking) => {
        const bookingStartTime = parseISO(
          `${booking.date}T${booking.start_time}`
        );
        const bookingEndTime = parseISO(`${booking.date}T${booking.end_time}`);

        return (
          (selectedStartTime >= bookingStartTime &&
            selectedStartTime < bookingEndTime) ||
          (selectedEndTime > bookingStartTime &&
            selectedEndTime <= bookingEndTime) ||
          (selectedStartTime <= bookingStartTime &&
            selectedEndTime >= bookingEndTime)
        );
      });
  }, [selectedTime, date, packageDuration, bookings]);

  const handleContinue = () => {
    if (
      packageType !== "I-basic" &&
      packageType !== "V-basic" &&
      checkTimeSlotOverlap()
    ) {
      setAllowOverlap(true);
      setShowOverlapWarning(true);
    } else if (
      (packageType === "I-basic" || packageType === "V-basic") &&
      checkTimeSlotOverlap()
    ) {
      setAllowOverlap(false);
      setShowOverlapWarning(true);
    } else {
      setStep(2);
    }
  };

  const handleBooking = async (formData: {
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
        ...formData,
        date: format(date, "yyyy-MM-dd"),
        startTime: selectedTime,
        endTime,
        packageType,
        overlap: checkTimeSlotOverlap(),
      };

      await api.post("/bookings", bookingData);
      localStorage.setItem("bookingData", JSON.stringify(bookingData)); // Store as JSON string in localStorage
      toast({
        title: "Success",
        description: `Your ${packageType} package has been booked successfully.`,
      });
      setStep(3); // Move to thank you step
      setSelectedTime(undefined);
      await fetchBookingsAndHolidays(date, date);
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

  const renderThankYouStep = () => {
    // Get booking data from localStorage
    const bookingData = localStorage.getItem("bookingData")
      ? JSON.parse(localStorage.getItem("bookingData")!)
      : null;

    if (!bookingData) {
      // If no booking data is found, you can redirect or show an error
      return <div>Booking data not found.</div>;
    }

    return (
      <div className="space-y-6 py-4">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-green-700 mb-2">
            Booking Submitted!
          </h2>
          <p className="text-gray-600">
            Thank you for your booking. We&apos;ll send you a confirmation email
            shortly.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2">
            Booking Details
          </h3>

          <div className="flex flex-col gap-3">
            <div className="flex space-x-4">
              <p className="text-gray-600">Date:</p>
              <p className="font-medium">
                {format(new Date(bookingData.date), "EEEE, MMMM do, yyyy")}
              </p>
            </div>
            <div className="flex space-x-4">
              <p className="text-gray-600">Time:</p>
              <p className="font-medium">
                {format(
                  parseISO(`2000-01-01T${bookingData.startTime}`),
                  "h:mm a"
                )}{" "}
                -
                {format(
                  parseISO(`2000-01-01T${bookingData.endTime}`),
                  "h:mm a"
                )}
              </p>
            </div>
            <div className="flex space-x-4">
              <p className="text-gray-600">Package:</p>
              <p className="font-medium">{bookingData.packageType}</p>
            </div>
            <div className="flex space-x-4">
              <p className="text-gray-600">Name:</p>
              <p className="font-medium">{bookingData.name}</p>
            </div>
            <div className="flex space-x-4">
              <p className="text-gray-600">Email:</p>
              <p className="font-medium">{bookingData.email}</p>
            </div>
            <div className="flex space-x-4">
              <p className="text-gray-600">Phone:</p>
              <p className="font-medium">{bookingData.phone}</p>
            </div>
            <div className="flex space-x-4">
              <p className="text-gray-600">Status:</p>
              <p className="font-medium capitalize">Pending Confirmation</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-blue-700">
            We&apos;ll review your booking and send you a confirmation email
            soon. Please check your inbox for further instructions.
          </p>
        </div>
      </div>
    );
  };
  const OverlapWarning = () => {
    const content = (
      <>
        <DialogHeader>
          <DialogTitle>Time Slot Overlap</DialogTitle>
          <DialogDescription>
            {allowOverlap
              ? "The selected time slot overlaps with an existing booking. We will try to adjust other bookings to accommodate your request."
              : "The selected time slot overlaps with an existing booking. Please select a different time slot."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setShowOverlapWarning(false)}
          >
            Cancel
          </Button>
          <Button
            className={`${allowOverlap ? "" : "hidden"}`}
            onClick={() => {
              setShowOverlapWarning(false);
              setStep(2);
            }}
          >
            Continue Anyway
          </Button>
        </DialogFooter>
      </>
    );

    if (isMobile) {
      return (
        <Drawer open={showOverlapWarning} onOpenChange={setShowOverlapWarning}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Time Slot Overlap</DrawerTitle>
              <DrawerDescription>
                {allowOverlap
                  ? "The selected time slot overlaps with an existing booking. We will try to adjust other bookings to accommodate your request."
                  : "The selected time slot overlaps with an existing booking. Please select a different time slot."}
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button
                variant="outline"
                onClick={() => setShowOverlapWarning(false)}
              >
                Cancel
              </Button>
              <Button
                className={`${allowOverlap ? "" : "hidden"}`}
                onClick={() => {
                  setShowOverlapWarning(false);
                  setStep(2);
                }}
              >
                Continue Anyway
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      );
    }

    return (
      <Dialog open={showOverlapWarning} onOpenChange={setShowOverlapWarning}>
        <DialogContent>{content}</DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="lg:mx-20">
      <Card className="lg:px-5 md:py-5">
        <CardHeader>
          <CardTitle>
            {step === 1 && "Please select a date and time"}
            {step === 2 && "Fill your contact information"}
            {step === 3 && "Booking Submitted"}
          </CardTitle>
          <CardDescription>
            {step === 1 &&
              `Select a date and time slot to book an appointment for your ${packageType} package`}
            {step === 2 &&
              "Please fill in your contact information to book a session"}
            {step === 3 && "Your booking has been submitted successfully"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 ? (
            <div className="grid grid-cols-2 items-center justify-between mt-5 max-md:grid-cols-1 gap-4">
              <DateSelector
                date={date}
                setDate={setDate}
                holidays={holidays}
                fetchBookingsAndHolidays={fetchBookingsAndHolidays}
              />
              <TimeSlotSelector
                date={date}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                bookings={bookings}
                holidays={holidays}
                isLoading={isLoading}
              />
            </div>
          ) : step === 2 ? (
            <ContactForm
              date={date}
              selectedTime={selectedTime}
              packageDuration={packageDuration}
              onSubmit={handleBooking}
            />
          ) : (
            renderThankYouStep()
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          {step === 1 ? (
            <Button
              onClick={handleContinue}
              disabled={!date || !selectedTime}
              className="w-full hover:bg-main-500 hover:text-black"
            >
              {isLoading ? "Loading..." : "Continue"}
            </Button>
          ) : step === 2 ? (
            <div className="flex justify-between w-full">
              <Button
                onClick={() => setStep(1)}
                className="hover:bg-main-500 hover:text-black"
                variant="outline"
              >
                Back
              </Button>
              <Button
                form="contact-form"
                type="submit"
                disabled={isLoading}
                className="hover:bg-main-500 hover:text-black"
              >
                {isLoading ? "Booking..." : "Book Appointment"}
              </Button>
            </div>
          ) : (
            <div className="flex justify-center gap-4 w-full">
              <Button
                onClick={() => router.push("/")}
                className="hover:bg-main-500 hover:text-black"
              >
                Return Home
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
      <OverlapWarning />
    </div>
  );
}
