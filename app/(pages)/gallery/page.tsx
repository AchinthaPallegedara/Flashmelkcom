import MasonryGallery from "@/components/MasonryGallery";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React from "react";
import Navbar from "@/components/header/Navbar";
import { images } from "@/constants";
// import { fashionImages, images } from "@/constants";

const page = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <Tabs defaultValue="latest" className="">
          <div className="flex mx-0 justify-center items-center mt-8 mb-5">
            <TabsList className="bg-transparent">
              <TabsTrigger value="latest">LATEST</TabsTrigger>
              <TabsTrigger value="fashion">FASHION</TabsTrigger>
              <TabsTrigger value="commercial">COMMERCIAL</TabsTrigger>
              <TabsTrigger value="editorial">EDITORIAL</TabsTrigger>
              <TabsTrigger value="beauty">BEAUTY</TabsTrigger>
              <TabsTrigger value="corporateProfiles">
                CORPORATE PROFILES
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="latest">
            <MasonryGallery images={images} />
          </TabsContent>
          <TabsContent value="fashion">
            {/* <MasonryGallery images={fashionImages} /> */}
          </TabsContent>
        </Tabs>
      </div>
      <div className="w-full h-20"></div>
    </>
  );
};

export default page;
