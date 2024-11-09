import Hero from "@/app/(pages)/studio/sections/Hero";
import React from "react";
import Rates from "./sections/Rates";
import Testimonials from "./sections/Testimonials";
import Faq from "./sections/Faq";
import Footer from "@/components/headerAndFooter/Footer";

const page = () => {
  return (
    <div>
      <Hero />
      <Rates />
      <Testimonials />
      <Faq />
      <Footer />
    </div>
  );
};

export default page;
