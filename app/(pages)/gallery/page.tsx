/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/newTabs";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/headerAndFooter/Navbar";
import Footer from "@/components/headerAndFooter/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import MasonryGalleryDesktop from "@/components/gallery/MasonryGallery";
import MasonryGalleryMobile from "@/components/gallery/MasonryGalleryMobile";

interface SubImage {
  sub_image_url: string;
}

interface GalleryImage {
  id: string;
  main_image_url: string;
  title: string;
  sub_images: SubImage[];
}
// Hook to detect media query
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = () => setMatches(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

const Page = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const fetchGalleryImages = async (
    category: GalleryCategory | null = null
  ) => {
    try {
      setLoading(true);
      const url = category ? `/api/galleries/${category}` : "/api/galleries";

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const data = await response.json();

      // Transform the data to the required format
      const transformedData = data.map((item: GalleryImage, index: number) => ({
        id: index + 1,
        src: item.main_image_url,
        title: item.title,
        width: 600,
        height: 400,
        subImages: item.sub_images.map(
          (subItem: SubImage, subIndex: number) => ({
            id: subIndex + 101,
            src: subItem.sub_image_url,
            width: 300,
            height: 200,
          })
        ),
      }));

      setImages(transformedData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all images initially
  useEffect(() => {
    fetchGalleryImages();
  }, []);
  type GalleryCategory =
    | "LATEST"
    | "FASHION"
    | "COMMERCIAL"
    | "EDITORIAL"
    | "BEAUTY"
    | "CORPORATE_PROFILES";

  const handleTabChange = (value: string) => {
    const category = value as GalleryCategory;
    if (category === "LATEST") {
      fetchGalleryImages();
    } else {
      fetchGalleryImages(category);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <Tabs
          defaultValue="LATEST"
          className=""
          onValueChange={handleTabChange}
        >
          <div className="flex mx-0 justify-center items-center mt-8 mb-5 ">
            <TabsList className="hidden sm:flex bg-transparent space-x-8  text-zinc-500 max-lg:space-x-1 max-md:space-x-0 ">
              <TabsTrigger
                value="LATEST"
                className="data-[state=active]:text-zinc-500 text-xs font-normal hover:underline transition-all duration-500 tracking-wider"
              >
                LATEST
              </TabsTrigger>
              <TabsTrigger
                value="FASHION"
                className="data-[state=active]:text-zinc-500 text-xs font-normal hover:underline transition-all duration-500  tracking-wider"
              >
                FASHION
              </TabsTrigger>
              <TabsTrigger
                value="COMMERCIAL"
                className="data-[state=active]:text-zinc-500 text-xs font-normal hover:underline transition-all duration-500  tracking-wider"
              >
                COMMERCIAL
              </TabsTrigger>
              <TabsTrigger
                value="EDITORIAL"
                className="data-[state=active]:text-zinc-500 text-xs font-normal hover:underline transition-all duration-500  tracking-wider"
              >
                EDITORIAL
              </TabsTrigger>
              <TabsTrigger
                value="BEAUTY"
                className="data-[state=active]:text-zinc-500 text-xs font-normal hover:underline transition-all duration-500  tracking-wider"
              >
                BEAUTY
              </TabsTrigger>
              <TabsTrigger
                value="CORPORATE_PROFILES"
                className="data-[state=active]:text-zinc-500 text-xs font-normal hover:underline transition-all duration-500  tracking-wider"
              >
                CORPORATE PROFILES
              </TabsTrigger>
            </TabsList>
            <TabsList className="sm:hidden bg-transparent flex flex-col space-y-[-8px] tracking-wider text-zinc-500 ">
              <div className="text-center">
                <TabsTrigger
                  value="LATEST"
                  className="data-[state=active]:text-zinc-500 text-xs font-normal hover:underline transition-all duration-500  underline-offset-2"
                >
                  LATEST
                </TabsTrigger>
                <TabsTrigger
                  value="FASHION"
                  className="data-[state=active]:text-zinc-500 text-xs font-normal hover:underline transition-all duration-500  underline-offset-2"
                >
                  FASHION
                </TabsTrigger>
                <TabsTrigger
                  value="COMMERCIAL"
                  className="data-[state=active]:text-zinc-500 text-xs font-normal hover:underline transition-all duration-500  underline-offset-2"
                >
                  COMMERCIAL
                </TabsTrigger>
                <TabsTrigger
                  value="EDITORIAL"
                  className="data-[state=active]:text-zinc-500 text-xs font-normal hover:underline transition-all duration-500  underline-offset-2"
                >
                  EDITORIAL
                </TabsTrigger>
              </div>
              <div>
                <TabsTrigger
                  value="BEAUTY"
                  className="data-[state=active]:text-zinc-500 text-xs font-normal hover:underline transition-all duration-500  underline-offset-2"
                >
                  BEAUTY
                </TabsTrigger>
                <TabsTrigger
                  value="CORPORATE_PROFILES"
                  className="data-[state=active]:text-zinc-500 text-xs font-normal hover:underline transition-all duration-500  underline-offset-2"
                >
                  CORPORATE PROFILES
                </TabsTrigger>
              </div>
            </TabsList>
          </div>

          {error && (
            <div className="text-red-500 text-center py-4">Error: {error}</div>
          )}

          {loading ? (
            <div className=" grid grid:cols-1 md:grid-cols-4 gap-4 transition-all duration-300">
              {Array(12)
                .fill("")
                .map((_, idx) => (
                  <Skeleton
                    key={idx}
                    className="w-full h-96 bg-slate-100 rounded-none"
                  />
                ))}
            </div>
          ) : (
            <>
              <TabsContent value="LATEST">
                {isMobile ? (
                  <MasonryGalleryMobile images={images} />
                ) : (
                  <MasonryGalleryDesktop images={images} />
                )}
              </TabsContent>
              <TabsContent value="FASHION">
                {isMobile ? (
                  <MasonryGalleryMobile images={images} />
                ) : (
                  <MasonryGalleryDesktop images={images} />
                )}
              </TabsContent>
              <TabsContent value="COMMERCIAL">
                {isMobile ? (
                  <MasonryGalleryMobile images={images} />
                ) : (
                  <MasonryGalleryDesktop images={images} />
                )}
              </TabsContent>
              <TabsContent value="EDITORIAL">
                {isMobile ? (
                  <MasonryGalleryMobile images={images} />
                ) : (
                  <MasonryGalleryDesktop images={images} />
                )}
              </TabsContent>
              <TabsContent value="BEAUTY">
                {isMobile ? (
                  <MasonryGalleryMobile images={images} />
                ) : (
                  <MasonryGalleryDesktop images={images} />
                )}
              </TabsContent>
              <TabsContent value="CORPORATE_PROFILES">
                {isMobile ? (
                  <MasonryGalleryMobile images={images} />
                ) : (
                  <MasonryGalleryDesktop images={images} />
                )}
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
      <div className="w-full h-20"></div>
      <Footer />
    </>
  );
};

export default Page;
