import Navbar from "@/components/headerAndFooter/Navbar";
import ScrollCard from "@/components/ScrollCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Marquee } from "@/components/ui/marquee";
import { slidingImages } from "@/constants";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="flex flex-col">
      <Navbar />
      <div className="container flex items-center justify-between my-24 max-md:my-8 max-md:flex-col">
        <div className=" w-[50vw] max-md:w-full">
          <h1 className="text-8xl font-anton max-md:text-5xl">
            Where Creativity Meets Space
          </h1>
        </div>
        <div className="w-[28vw] flex flex-col max-md:w-full max-md:mt-5">
          <p className="text-black text-xl font-medium ">
            The Largest Studio Space in the City, Ready for Your Vision!
          </p>
          <div className="flex space-x-2 my-4 max-md:mt-10">
            <Input
              type="email"
              placeholder="Enter your email"
              className="rounded-3xl border-primary"
            />
            <Link href="#price">
              <Button
                className="rounded-3xl border-primary hover:bg-main-500"
                variant="outline"
              >
                Start Booking <ArrowRight />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className="items-center justify-center overflow-hidden ">
          <Marquee pauseOnHover className="[--duration:20s]">
            {slidingImages.map((slidepart, key) => (
              <ScrollCard key={key} {...slidepart} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default Hero;
