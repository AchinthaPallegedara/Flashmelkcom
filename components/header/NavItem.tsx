"use client";
import { navItems } from "@/constants";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const NavItem = () => {
  const pathname = usePathname();
  return (
    <nav className="hidden md:flex items-center space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-lg font-medium transition-colors hover:text-primary ${
            pathname === item.href ? "border-b-2 border-primary" : ""
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavItem;
