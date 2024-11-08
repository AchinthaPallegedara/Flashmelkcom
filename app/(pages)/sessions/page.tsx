import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/header/Navbar";

export default function Component() {
  const features = [
    "10+ Background Colors",
    "Spacious 35x45ft Space",
    "Fully Air-Conditioned",
    "Makeup/Dressing/Dining Area",
    "Seating Area + Parking",
    "02 x Godox AD600B Lights",
    "02 x Parabolic 120L Softbox",
    "01 x Strip Softbox 35x160cm",
    "Large Reflector 5in1",
    '55" 4K Tether Station + Cable',
    "Parabolic 7-foot white Umbrella",
    "Curved 160cm Eye Lighter",
    "03 x White Props Boxes",
    "Optical Gobo snoot light projector",
  ];

  const packages = [
    {
      name: "Basic Session",
      price: "Rs 7,500",
      duration: "2 HOURS",
      includedFeatures: 8,
    },
    {
      name: "Standard Session",
      price: "Rs 14,500",
      duration: "5 HOURS",
      includedFeatures: 11,
      popular: true,
    },
    {
      name: "Professional Session",
      price: "Rs 22,500",
      duration: "8 HOURS",
      includedFeatures: features.length,
    },
  ];

  return (
    <div className="">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 mt-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-4">Studio Space For Rent</h2>
          <p className="text-lg text-muted-foreground">
            Professional Photography Studio Packages
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className={`relative rounded-xl ${
                pkg.popular ? "border-primary shadow-lg" : ""
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit px-3 py-1 bg-[#FFAB11] text-black font-semibold text-sm rounded-full">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl font-anton tracking-wide">
                  {pkg.name}
                </CardTitle>
                <CardDescription className="font-semibold text-base">
                  {pkg.duration}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-6">{pkg.price}</div>
                <ul className="space-y-2">
                  {features.slice(0, pkg.includedFeatures).map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={pkg.popular ? "default" : "outline"}
                >
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-muted-foreground mb-4">
            Plus, Enjoy Discounts on Camera Rentals!
          </p>
          <Button variant="outline" size="lg" className="gap-2">
            For Inquiries and Bookings: 0777 201 502
          </Button>
        </div>
      </div>
    </div>
  );
}
