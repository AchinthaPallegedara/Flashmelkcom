import BookingCalendar from "@/components/booking/booking-calendar";
import Details from "@/components/details";
import Navbar from "@/components/headerAndFooter/Navbar";

import React from "react";

const page = () => {
  return (
    <div className="mb-16 ">
      <Navbar />
      <div className="container space-y-5">
        <Details sessionIndex={3} />
        <BookingCalendar packageType="FamilySession" packageDuration={1} />
      </div>
    </div>
  );
};

export default page;
