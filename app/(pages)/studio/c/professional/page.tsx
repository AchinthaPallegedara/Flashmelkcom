import BookingCalendar from "@/components/booking/booking-calendar";
import Navbar from "@/components/headerAndFooter/Navbar";
import SessionDetails from "@/components/SessionDetails";
import React from "react";

const page = () => {
  return (
    <div className="mb-16 ">
      <Navbar />
      <div className="container space-y-5">
        <SessionDetails pkgIndex={0} pkgType="cyc" />
        <BookingCalendar packageType="C-professional" packageDuration={5} />
      </div>
    </div>
  );
};

export default page;
