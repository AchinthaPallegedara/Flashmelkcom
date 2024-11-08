import React from "react";
import Logo from "../Logo";
import Link from "next/link";
import { Button } from "../ui/button";
import NavItem from "./NavItem";
import { ArrowRight } from "lucide-react";

const Navbar = () => {
  return (
    <header className="container mx-auto mt-2 flex h-20 items-center justify-between">
      <Link href="/" className="flex items-center space-x-2">
        <Logo />
      </Link>
      <div className="hidden md:flex space-x-6">
        <NavItem />
        <Button className="bg-[#ffab11] hover:bg-[#E09213] text-black rounded-3xl h-12  ">
          <p className="font-semibold text-lg px-2 flex justify-center items-center ">
            Book Session <ArrowRight className="mx-1 size-10" />
          </p>
        </Button>
      </div>

      <Button variant="ghost" className="md:hidden">
        <span className="sr-only">Toggle menu</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </Button>
    </header>
  );
};

export default Navbar;
