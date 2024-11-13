/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import MasonryGallery from "@/components/gallery/MasonryGallery";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/newTabs";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/headerAndFooter/Navbar";
import Footer from "@/components/headerAndFooter/Footer";

interface SubImage {
  sub_image_url: string;
}

interface GalleryImage {
  id: string;
  main_image_url: string;
  title: string;
  sub_images: SubImage[];
}

const Page = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      console.log(transformedData);
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
          <div className="flex mx-0 justify-center items-center mt-8 mb-5">
            <TabsList className="hidden md:flex bg-transparent space-x-10">
              <TabsTrigger value="LATEST">LATEST</TabsTrigger>
              <TabsTrigger value="FASHION">FASHION</TabsTrigger>
              <TabsTrigger value="COMMERCIAL">COMMERCIAL</TabsTrigger>
              <TabsTrigger value="EDITORIAL">EDITORIAL</TabsTrigger>
              <TabsTrigger value="BEAUTY">BEAUTY</TabsTrigger>
              <TabsTrigger value="CORPORATE_PROFILES">
                CORPORATE PROFILES
              </TabsTrigger>
            </TabsList>
            <TabsList className="md:hidden bg-transparent flex flex-col">
              <div>
                <TabsTrigger value="LATEST">LATEST</TabsTrigger>
                <TabsTrigger value="FASHION">FASHION</TabsTrigger>
                <TabsTrigger value="COMMERCIAL">COMMERCIAL</TabsTrigger>
              </div>
              <div>
                <TabsTrigger value="EDITORIAL">EDITORIAL</TabsTrigger>
                <TabsTrigger value="BEAUTY">BEAUTY</TabsTrigger>
                <TabsTrigger value="CORPORATE_PROFILES">
                  CORPORATE PROFILES
                </TabsTrigger>
              </div>
            </TabsList>
          </div>

          {error && (
            <div className="text-red-500 text-center py-4">Error: {error}</div>
          )}

          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <TabsContent value="LATEST">
              <MasonryGallery images={images} />
            </TabsContent>
          )}

          <TabsContent value="FASHION">
            <MasonryGallery images={images} />
          </TabsContent>
          <TabsContent value="COMMERCIAL">
            <MasonryGallery images={images} />
          </TabsContent>
          <TabsContent value="EDITORIAL">
            <MasonryGallery images={images} />
          </TabsContent>
          <TabsContent value="BEAUTY">
            <MasonryGallery images={images} />
          </TabsContent>
          <TabsContent value="CORPORATE_PROFILES">
            <MasonryGallery images={images} />
          </TabsContent>
        </Tabs>
      </div>
      <div className="w-full h-20"></div>
      <Footer />
    </>
  );
};

export default Page;
