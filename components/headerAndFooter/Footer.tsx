import { Dot, Mail, PhoneCall } from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { FooterImage } from "@/constants";

const Footer = () => {
  return (
    <footer className="bg-black/85 h-[65vh] w-full flex flex-col">
      {/* Social media links */}
      <div className="w-full h-16 bg-black flex items-center justify-center">
        <div className="flex text-white space-x-8">
          <Link
            href={"/"}
            className="flex items-center justify-center space-x-2"
          >
            <Image src="/tiktok.svg" width={15} height={15} alt="tiktok" />
            <p>tiktok</p>
          </Link>
          <Dot className="text-main-500" />
          <Link
            href={"/"}
            className="flex items-center justify-center space-x-2"
          >
            <Image
              src="/instagram.svg"
              width={15}
              height={15}
              alt="instagram"
            />
            <p>instagram</p>
          </Link>
          <Dot className="text-main-500" />
          <Link
            href={"/"}
            className="flex items-center justify-center space-x-2"
          >
            <Image src="/facebook.svg" width={20} height={20} alt="facebook" />
            <p>facebook</p>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow flex flex-col justify-between">
        <div className="flex flex-grow">
          <div className="grid grid-cols-3 container pt-10 space-x-5">
            {/* About section */}
            <div className="grid">
              <Image
                src="/flashmewhite.svg"
                width={200}
                height={100}
                alt="logo"
              />
              <p className=" text-white">
                Where Art Meets Innovation: Colombo&apos;s Premier Studio
                Rentals.
              </p>
              <p className="mb-20 text-white">
                We believe in crafting your vision. Our commitment to excellence
                drives us to provide the best equipment, professional lights,
                and modern makeup stations, so you can take your art to new
                heights.
              </p>
            </div>

            {/* Latest photos section */}
            <div>
              <h4 className="text-2xl text-white font-semibold">
                Latest Photos
              </h4>
              <div className="w-10 h-0.5 bg-main-500" />
              <div className="mt-5 flex flex-wrap">
                {FooterImage.map((img, index) => (
                  <Image
                    key={index}
                    src={img}
                    width={100}
                    height={100}
                    alt="photo"
                    className="size-20 m-1 object-cover hover:border-main-500 hover:border"
                  />
                ))}
              </div>
            </div>

            {/* Contacts section */}
            <div>
              <h4 className="text-2xl text-white font-semibold">Contacts</h4>
              <div className="w-10 h-0.5 bg-main-500 mb-10" />
              <p className="flex items-center text-white">
                <PhoneCall className="mr-2 my-2 size-5" />
                +94 77 123 4567
              </p>
              <p className="flex items-center text-white">
                <Mail className="mr-2 my-2 size-5" />
                info@flashmelk.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom "hello" div */}
        <div className="w-full h-16  flex items-center justify-center border-t border-main-500/30 text-white ">
          <p className="text-center">
            Copyright © 2024 Flash Me Lk. Powered by DSLR Rent Lk. All Rights
            Reserved.
            <br /> Designed & Developed by
            <Link href="https://claviq.com">
              <span className=" font-bold mx-1 hover:text-orange-500">
                Claviq
              </span>
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
