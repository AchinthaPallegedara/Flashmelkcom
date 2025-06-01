import Link from "next/link";

import Image from "next/image";
const Footer = () => {
  return (
    <footer className="bg-black text-[#faf9f7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="flex items-center justify-start max-md:justify-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/Whitelogo.png`}
                alt="flashmelk_white_logo"
                width={250}
                height={56}
              />
            </Link>
          </div>

          {/* Quick Links */}
          <div className="max-md:justify-center max-md:w-full">
            <p className="mt-2 text-sm md:w-72 max-md:text-center max-md:justify-center">
              We believe in crafting your vision. Our commitment to excellence
              drives us to provide the best equipment, professional lights, and
              modern makeup stations, so you can take your art to new heights.
            </p>
            <h3 className="flex text-sm font-semibold text-gray-100 uppercase tracking-wider mt-5 max-md:justify-center max-md:items-center ">
              <p>Quick Links</p>
            </h3>
            <div className="mt-4 flex space-x-12 max-md:w-full max-md:items-center max-md:justify-center">
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Instagram</span>
                <Image
                  src="/instagram.svg"
                  alt="instagram"
                  width={24}
                  height={24}
                />
              </Link>
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">tiktok</span>
                <Image src="/tiktok.svg" alt="tiktok" width={24} height={24} />
              </Link>
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">facebook</span>

                <Image
                  src="/facebook.svg"
                  alt="instagram"
                  width={28}
                  height={28}
                />
              </Link>
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">google</span>
                <Image src="/google.svg" alt="google" width={30} height={30} />
              </Link>
            </div>
          </div>

          {/* Contact Info and Newsletter */}
          <div>
            <h3 className="flex text-sm font-semibold text-gray-200 uppercase tracking-wider max-md:items-center max-md:justify-center">
              Contact Us
            </h3>
            <ul className="max-md:flex max-md:flex-col mt-4 space-y-1 max-md:justify-center max-md:items-center max-md:text-center">
              <li className="flex items-center">
                <a
                  href="mailto:info@studiospace.com"
                  className="hover:text-main-500 underline underline-offset-4 transition-colors duration-300"
                >
                  info@flashmelk.com
                </a>
              </li>
              <li className="flex items-center hover:text-main-500 transition-colors duration-300">
                <span>+94 77 720 1502</span>
              </li>
              <li className="flex items-center hover:text-main-500 transition-colors duration-300">
                <span>+94 11 704 0400</span>
              </li>
              <li className="flex items-center hover:text-main-500 transition-colors duration-300">
                <span>Nugegoda | Near Delkanda Colour Lights</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 max-md:text-center max-md:mx-5">
            Flash Me LK ⚡ Creative Studio &copy; Powered By DSLR Rent LK
          </p>
          <div className="mt-4 sm:mt-0 flex items-center gap-1 justify-end ">
            <p className="flex">Design & Develop by</p>
            <Link
              href={"https://www.claviq.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex font-semibold text-orange-600"
            >
              <Image
                src="/claviq.png"
                alt="claviq"
                width={46}
                height={20}
                className="mt-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
