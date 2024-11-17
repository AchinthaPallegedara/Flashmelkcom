"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Clock2, ChevronDown, ChevronUp } from "lucide-react";
import { photoPackages, videoPackages } from "@/constants";

type Props = {
  pkgIndex: number;
  pkgType: "image" | "video";
};

export default function SessionDetails({ pkgIndex, pkgType }: Props) {
  const [showAllDetails, setShowAllDetails] = useState(false);

  const pkg =
    pkgType === "image" ? photoPackages[pkgIndex] : videoPackages[pkgIndex];
  const initialFeatureCount = 3;

  const toggleDetails = () => {
    setShowAllDetails(!showAllDetails);
  };

  const extraProps = [
    "Godox Curved Eyelighter - Rs.1000",
    "Godox 7 feet Umbrella - Rs.1500",
    "Godox extra AD600 light - Rs.2500",
    "Nice photo 1K video light - Rs.3500",
    "RGB Ice Light - Rs.2500",
    "Godox v1 flash - Rs.1500",
    "Camera starting from -Rs.5500",
    "Camera lens Starting from - Rs.3000",
    "Clipon mics - Rs.2500",
    "Rode PodMic - Rs.4000",
  ];

  return (
    <div className="lg:mx-20">
      <Card className="mt-5 lg:p-5">
        <CardHeader>
          <CardTitle>{pkg.name}</CardTitle>
          <CardTitle className="text-main-500 font-semibold">
            {pkg.price}
          </CardTitle>
          <CardDescription className="flex items-center font-semibold">
            <Clock2 className="mr-2 size-4" /> {pkg.duration}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.isArray(pkg.includedFeatures) &&
              pkg.includedFeatures
                .slice(0, showAllDetails ? undefined : initialFeatureCount)
                .map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
          </div>
          {showAllDetails && (
            <div className="mt-6">
              <h3 className="font-bold text-lg mb-3">
                Additional Props Available
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {extraProps.map((prop, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-xl">•</span>
                    <span className="text-sm">{prop}</span>
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
}
