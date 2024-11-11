import MasonryGallery from "@/components/gallery/MasonryGallery";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/newTabs";

import React from "react";
import Navbar from "@/components/headerAndFooter/Navbar";
import { Newimages } from "@/constants";
import Footer from "@/components/headerAndFooter/Footer";
// import { fashionImages, images } from "@/constants";

const page = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Tabs defaultValue="latest" className="">
          <div className="flex mx-0 justify-center items-center mt-8 mb-5">
            <TabsList className="hidden md:flex bg-transparent space-x-10">
              <TabsTrigger value="latest">LATEST</TabsTrigger>
              <TabsTrigger value="fashion">FASHION</TabsTrigger>
              <TabsTrigger value="commercial">COMMERCIAL</TabsTrigger>
              <TabsTrigger value="editorial">EDITORIAL</TabsTrigger>
              <TabsTrigger value="beauty">BEAUTY</TabsTrigger>
              <TabsTrigger value="corporateProfiles">
                CORPORATE PROFILES
              </TabsTrigger>
            </TabsList>
            <TabsList className="md:hidden  bg-transparent flex flex-col">
              <div>
                <TabsTrigger value="latest">LATEST</TabsTrigger>
                <TabsTrigger value="fashion">FASHION</TabsTrigger>
                <TabsTrigger value="commercial">COMMERCIAL</TabsTrigger>
              </div>
              <div>
                <TabsTrigger value="editorial">EDITORIAL</TabsTrigger>
                <TabsTrigger value="beauty">BEAUTY</TabsTrigger>
                <TabsTrigger value="corporateProfiles">
                  CORPORATE PROFILES
                </TabsTrigger>
              </div>
            </TabsList>
          </div>
          <TabsContent value="latest">
            <MasonryGallery images={Newimages} />
          </TabsContent>
          <TabsContent value="fashion"></TabsContent>
        </Tabs>
      </div>
      <div className="w-full h-20"></div>
      <Footer />
    </>
  );
};

export default page;
