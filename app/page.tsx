import BookingCalendar from "@/components/Booking";
import Navbar from "@/components/headerAndFooter/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { imageFeatures, photoPackages } from "@/constants";
import { Check, Clock2 } from "lucide-react";

import React from "react";

export default function Home() {
  return (
    <div className="mb-16 ">
      <Navbar />
      <div className="container space-y-5">
        <div className="lg:mx-20">
          <Card className="mt-5   lg:p-5">
            {(() => {
              const pkg = photoPackages[0];
              return (
                <>
                  <CardHeader>
                    <CardTitle>{pkg.name}</CardTitle>

                    <CardTitle className="text-main-500 font-semibold">
                      {pkg.price}
                    </CardTitle>
                    <CardDescription className="flex items-center  font-semibold">
                      <Clock2 className="mr-2 size-4" /> {pkg.duration}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {imageFeatures
                        .slice(0, pkg.includedFeatures)
                        .map((feature, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-primary" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </>
              );
            })()}
          </Card>
        </div>
        <BookingCalendar packageType="basic" packageDuration={2} />
      </div>
    </div>
  );
}
