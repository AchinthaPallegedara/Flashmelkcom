import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Check, Clock2 } from "lucide-react";
import { photoPackages, videoPackages } from "@/constants";

type Props = {
  pkgIndex: number;
  pkgType: "image" | "video";
};

const SessionDetails = ({ pkgIndex, pkgType }: Props) => {
  return (
    <div className="lg:mx-20">
      <Card className="mt-5   lg:p-5">
        {(() => {
          const pkg =
            pkgType === "image"
              ? photoPackages[pkgIndex]
              : videoPackages[pkgIndex];
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
                  {Array.isArray(pkg.includedFeatures) &&
                    pkg.includedFeatures.map((feature, i) => (
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
  );
};

export default SessionDetails;
