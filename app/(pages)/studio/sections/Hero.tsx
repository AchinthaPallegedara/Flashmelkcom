import Navbar from "@/components/header/Navbar";
import ScrollCard from "@/components/ScrollCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Marquee } from "@/components/ui/marquee";
import { slidingImages } from "@/constants";
import { ArrowRight } from "lucide-react";
import React from "react";

const Hero = () => {
  return (
    <section className="flex flex-col">
      <Navbar />
      <div className="container flex items-center justify-between my-24">
        <div className=" w-[50vw]">
          <h1 className="text-8xl font-anton">
            Transform Your Vision Into Reality.
          </h1>
        </div>
        <div className="w-[28vw] flex flex-col">
          <p className="text-black text-xl font-medium ">
            A modern studio space designed for creators, artists, and innovators
          </p>
          <div className="flex space-x-2 my-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="rounded-3xl border-primary"
            />
            <Button
              className="rounded-3xl border-primary hover:bg-main-500"
              variant="outline"
            >
              Start Booking <ArrowRight />
            </Button>
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
