"use client";
import { motion } from "framer-motion";
import { LogoHome } from "@/components/HomeLogo";
import { Menu } from "@/components/menu";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Animated background with overlay */}
      <div className="absolute inset-0 w-full h-full">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf9f7]/80 to-[#faf9f7]/60 z-10" />

        {/* Framer Motion animated background */}
        <motion.div
          className="absolute inset-0 bg-[url('/bg.webp')] bg-cover bg-center"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"], // Pan left to right, then reverse
            scale: [1, 1.1, 1], // Zoom in and out
          }}
          transition={{
            duration: 30, // Total duration for one full cycle
            repeat: Infinity, // Loop infinitely
            repeatType: "mirror", // Reverse the animation after each cycle
            ease: "easeInOut", // Smooth in and out easing
          }}
        />
      </div>

      {/* Content container */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center space-y-10">
        <LogoHome />
        <Menu />
      </div>
    </main>
  );
}
