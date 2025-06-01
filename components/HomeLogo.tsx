"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function LogoHome() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="flex flex-col items-center"
    >
      <div className="flex items-center justify-center space-x-2 cursor-pointer">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/Orangelogo.png`}
          alt="flashmelk_logo"
          width={150}
          height={55}
        />
        {/* <p className="text-5xl font-anton">FLASH ME LK</p> */}
      </div>
    </motion.div>
  );
}
