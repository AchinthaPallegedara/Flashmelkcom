import BookingCalendar from "@/components/booking/booking-calendar";
import Navbar from "@/components/headerAndFooter/Navbar";
import SessionDetails from "@/components/SessionDetails";

import React from "react";

export default function Home() {
  return (
    <div className="mb-16 ">
      <Navbar />
      <div className="container space-y-5">
        <SessionDetails pkgIndex={0} pkgType="image" />
        <BookingCalendar packageType="basic" packageDuration={2} />
      </div>
    </div>
  );
}
