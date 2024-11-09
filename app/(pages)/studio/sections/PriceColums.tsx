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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PriceColums = () => {
  const imageFeatures = [
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
  const videoFeatures = [
    '55" 4K Tether Station + Cable',
    "Parabolic 7-foot white Umbrella",
    "Curved 160cm Eye Lighter",
    "03 x White Props Boxes",
    "Optical Gobo snoot light projector",
    "10+ Background Colors",
    "Spacious 35x45ft Space",
    "Fully Air-Conditioned",
    "Makeup/Dressing/Dining Area",
    "Seating Area + Parking",
    "02 x Godox AD600B Lights",
    "02 x Parabolic 120L Softbox",
    "01 x Strip Softbox 35x160cm",
    "Large Reflector 5in1",
  ];

  const photoPackages = [
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
      includedFeatures: imageFeatures.length,
      popular: true,
    },
    {
      name: "Professional Session",
      price: "Rs 22,500",
      duration: "8 HOURS",
      includedFeatures: imageFeatures.length,
    },
  ];
  const videoPackages = [
    {
      name: "Basic Session",
      price: "Rs 10,500",
      duration: "2 HOURS",
      includedFeatures: 8,
    },
    {
      name: "Standard Session",
      price: "Rs 18,500",
      duration: "5 HOURS",
      includedFeatures: videoFeatures.length,
      popular: true,
    },
    {
      name: "Professional Session",
      price: "Rs 28,500",
      duration: "8 HOURS",
      includedFeatures: videoFeatures.length,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto ">
      <Tabs defaultValue="photos" className="">
        <div className="flex w-full items-center justify-center">
          <TabsList className="w-48 ring-2 ring-primary rounded-3xl flex items-center justify-center my-10 space-x-2 bg-white ">
            <TabsTrigger
              value="photos"
              className="rounded-3xl data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <p className="px-2">Photos</p>
            </TabsTrigger>
            <TabsTrigger
              value="videos"
              className="rounded-3xl data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <p className="px-2">Videos</p>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="photos">
          <div className="grid md:grid-cols-3 gap-6">
            {photoPackages.map((pkg, index) => (
              <Card
                key={index}
                className={`relative rounded-xl hover:border-main-500 transition-all ${
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
                    {imageFeatures
                      .slice(0, pkg.includedFeatures)
                      .map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      pkg.popular ? "hover:bg-main-500 hover:text-black" : ""
                    }`}
                    variant={pkg.popular ? "default" : "outline"}
                  >
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="videos">
          <div className="grid md:grid-cols-3 gap-6">
            {videoPackages.map((pkg, index) => (
              <Card
                key={index}
                className={`relative rounded-xl hover:border-main-500 transition-all ${
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
                    {videoFeatures
                      .slice(0, pkg.includedFeatures)
                      .map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      pkg.popular ? "hover:bg-main-500 hover:text-black" : ""
                    }`}
                    variant={pkg.popular ? "default" : "outline"}
                  >
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      <div className="mt-10 text-center">
        <p className="text-muted-foreground mb-4">
          Plus, Enjoy Discounts on Camera Rentals!
        </p>
        <Button variant="outline" size="lg" className="gap-2">
          Need more time?  Contact us
        </Button>
      </div>
    </div>
  );
};

export default PriceColums;
