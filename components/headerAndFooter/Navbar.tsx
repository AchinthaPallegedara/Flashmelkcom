import React from "react";
import Logo from "../Logo";
import Link from "next/link";
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <header className="container mx-auto mt-2 flex h-24 items-center justify-between">
      <div className="flex-1" />

      <div className="flex items-center justify-center">
        <Link href="/" className="flex items-center space-x-2">
          <Logo />
        </Link>
      </div>

      <div className="flex-1 flex justify-end cursor-pointer  ">
        <Menu
          size={30}
          className=" hover:text-main-500  transition-all hover:size-8"
        />
      </div>
    </header>
  );
};

export default Navbar;
