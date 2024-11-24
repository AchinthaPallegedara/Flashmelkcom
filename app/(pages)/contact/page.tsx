"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/headerAndFooter/Navbar";
import Footer from "@/components/headerAndFooter/Footer";
import Link from "next/link";
import Faq from "../studio/sections/Faq";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container  py-12">
        <div className="flex w-full md:items-start md:justify-between max-md:flex-col">
          <h1 className="text-7xl md:text-6xl  font-semibold max-md:text-5xl ">
            Get in Touch
          </h1>
          <p className="text-lg text-zinc-500  md:text-right md:w-72 ">
            Use google maps to find us or contact us directly for any inquiries.
          </p>
        </div>

        <Card className="mt-10 border-2 shadow-sm rounded-none">
          <CardContent className="p-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.256470691945!2d79.89654387574721!3d6.8598347931386465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25bfbc2b511fd%3A0x970308d07340f67a!2sFlash%20Me%20LK!5e0!3m2!1sen!2slk!4v1732253573171!5m2!1sen!2slk"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className=""
            ></iframe>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-12 mt-20">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-semibold mb-2">
                Contact Information
              </h2>
              <p className="text-muted-foreground w-96 mb-6">
                We are always here to help you. Feel free to contact us for any
                inquiries.
              </p>
              <div className="space-y-4 pl-2">
                <div className="flex items-center gap-3  transition-colors">
                  <Phone className="h-5 w-5 text-main-500" />
                  <div className="flex gap-2">
                    <Link
                      href="https://wa.me/+94777201502"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-main-500"
                    >
                      <span>+94 77 720 1502</span>
                    </Link>
                    |
                    <Link
                      href="tel:+94117040400"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-main-500"
                    >
                      <span>+94 11 704 0400</span>
                    </Link>
                  </div>
                </div>
                <Link
                  href="mailto:info@flashmelk.com"
                  className="flex items-center w-48 gap-3 hover:text-main-500 transition-colors"
                >
                  <Mail className="h-5 w-5 text-main-500" />
                  <span>info@flashmelk.com</span>
                </Link>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-main-500 mt-1" />
                  <p className="w-44">
                    62/10/2/1 Old Kesbewa Rd, Nugegoda 10250, Colombo, Sri Lanka
                  </p>
                </div>
              </div>
              {/* <div className="flex gap-5 mt-10">
                <Image
                  src="/wa.svg"
                  alt="whatsapp flashmelk"
                  width={35}
                  height={35}
                />
                <Image
                  src="/insta.svg"
                  alt="whatsapp flashmelk"
                  width={38}
                  height={38}
                />
                <Image
                  src="/fb.svg"
                  alt="whatsapp flashmelk"
                  width={33}
                  height={33}
                />
                <Image
                  src="/yt.svg"
                  alt="whatsapp flashmelk"
                  width={40}
                  height={40}
                />
              </div> */}
            </div>
          </div>

          <Card className="">
            <CardContent className="p-6">
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Your message"
                    className=" min-h-[150px]"
                  />
                </div>
                <Button className="w-full bg-main-500 hover:bg-black text-black hover:text-white">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Faq />
      <Footer />
    </div>
  );
}
