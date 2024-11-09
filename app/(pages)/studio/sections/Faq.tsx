"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { faqData } from "@/constants";

export default function Faq() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <div
      ref={containerRef}
      className="container mx-auto px-4 md:py-16 max-w-7xl"
    >
      <div className="grid md:grid-cols-[1fr,1.5fr] gap-8 md:gap-16">
        <motion.div
          ref={titleRef}
          style={{ y: titleY }}
          className="md:sticky md:top-24 h-fit"
        >
          <h2 className="font-anton text-7xl md:text-6xl font-black ">
            FREQUENTLY
            <br />
            ASKED QUESTIONS
          </h2>
          <Button
            size="lg"
            className="rounded-3xl px-4 my-2 bg-main-500 text-black hover:text-white transition-all"
          >
            Get Started <ArrowRight />
          </Button>
        </motion.div>
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((item, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger className="text-xl font-medium text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
