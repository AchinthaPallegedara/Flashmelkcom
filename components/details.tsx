"use client";
import { ChevronDown, ChevronUp, Clock2 } from "lucide-react";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { sessions } from "@/constants";
import { Button } from "./ui/button";

const addones = [
  "Additional Edited Image - Rs. 1500",
  "8 x 10 print - Rs. 1000",
  "12 x 15 print - Rs. 2000",
  "8 x 10 print + frame - Rs. 3000",
  "12 x 15 print + frame - Rs. 4500",
];

interface Props {
  sessionIndex: number;
}

const Details = ({ sessionIndex }: Props) => {
  const [showAllDetails, setShowAllDetails] = useState(false);
  const toggleDetails = () => {
    setShowAllDetails(!showAllDetails);
  };
  const session = sessions[sessionIndex];
  return (
    <div className="lg:mx-20">
      <Card className="mt-5 lg:p-5">
        <CardHeader>
          <CardTitle>{session.title}</CardTitle>
          <CardTitle className="text-main-500 font-semibold">
            Rs.{session.price}
          </CardTitle>
          <CardDescription className="flex items-center font-semibold">
            <Clock2 className="mr-2 size-4" />
            {session.duration}
          </CardDescription>
          <CardDescription className="flex items-center font-semibold">
            {session.softCopies} soft copies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{session.description}</p>
          {showAllDetails && (
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-3">Add-ons</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {addones.map((addon, index) => (
                  <div key={index} className="flex items-center">
                    <p className="mx-2">•</p>
                    <p>{addon}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            className="mt-4 w-full"
            onClick={toggleDetails}
          >
            {showAllDetails ? (
              <>
                Show Less <ChevronUp className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                See More <ChevronDown className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Details;
