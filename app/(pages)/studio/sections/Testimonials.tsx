import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import ReviewCard from "@/components/ReviewCard";
import { Marquee } from "@/components/ui/marquee";
import { reviews } from "@/constants";

const Testimonials = () => {
  const secondRow = reviews.slice(reviews.length / 2);
  return (
    <section className="my-20">
      <div className="flex container justify-between items-center">
        <div>
          <h2 className="text-7xl font-anton">Testimonials</h2>
        </div>
        <div>
          <p className="text-xl font-medium text-right w-[25vw]">
            What they said about us from the people we shared experiences with.
          </p>
          <div className="flex justify-end">
            <Button
              variant="outline"
              className="rounded-2xl font-semibold border-black my-3"
            >
              View on google
              <Image
                src="/googleIcon.svg"
                alt="google-icon"
                width={15}
                height={15}
              />
            </Button>
          </div>
        </div>
      </div>
      <div>
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden  ">
          <Marquee reverse pauseOnHover className="[--duration:20s]">
            {secondRow.map((review, key) => (
              <ReviewCard key={key} {...review} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#faf9f7] dark:from-black"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#faf9f7] dark:from-black"></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
