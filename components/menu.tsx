"use client";

import { menuItems } from "@/constants";
import { motion } from "framer-motion";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export function Menu() {
  return (
    <motion.nav
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-12"
    >
      <ul className="flex flex-col items-center gap-6 mt-10">
        {menuItems.map((item) => (
          <motion.li key={item.title} variants={itemVariants}>
            <Link
              href={item.href}
              className="text-slate-800 text-2xl font-normal tracking-wider hover:text-main-500 transition-colors duration-300 relative group"
            >
              {item.title}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-main-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  );
}
