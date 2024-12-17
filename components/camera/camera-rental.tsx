"use client";

import { useState, useEffect } from "react";
import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { ProductCard } from "./product-card";
import { FilterSidebar } from "./filter-sidebar";
import Footer from "../headerAndFooter/Footer";
import Image from "next/image";
import { products } from "@/constants";

export function CameraRental() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleRequest = (product: (typeof products)[0]) => {
    const message = `Hi, I'm interested in renting the ${product.name} for Rs ${product.price} per night. Can you provide more information?`;
    const whatsappUrl = `https://wa.me/+94777201502?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  useEffect(() => {
    const MAIN_BRANDS = ["Sony", "Canon", "Sigma", "Godox", "NiceFoto"];

    const filtered = products.filter((product) => {
      // Filter by search term
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Filter by category
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;

      // Filter by brand
      const matchesBrand =
        !selectedBrand ||
        (selectedBrand === "Other"
          ? !MAIN_BRANDS.includes(product.brand) // Exclude main brands
          : product.brand === selectedBrand); // Exact match for selected brand

      return matchesSearch && matchesCategory && matchesBrand;
    });

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, selectedBrand]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="hidden md:block">
              <div className="flex items-center justify-center space-x-2">
                <Image
                  src={"/flashmelkIcon.svg"}
                  alt="flashmelk_logo"
                  width={30}
                  height={30}
                />
                <p className="text-3xl font-anton">FLASH ME LK</p>
              </div>
            </div>

            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search Products"
                  className="w-full pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
            </div>
            <div className="flex-shrink-0">
              <h1 className="text-3xl font-bold text-black font-anton">
                DSLR Rent LK
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 pb-16">
        <h2 className="text-3xl font-bold mb-6 mt-12">Rent Your Gear</h2>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filters */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden mb-4">
                <Menu className="mr-2 h-4 w-4" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <FilterSidebar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
              />
            </SheetContent>
          </Sheet>

          {/* Desktop Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
              {filteredProducts.length === 0 ? (
                <div className="text-center col-span-full">
                  <p className="text-lg text-gray-600">
                    No products found. Try adjusting your filters.
                  </p>
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onRequest={handleRequest}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
