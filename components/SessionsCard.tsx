import React from "react";

import Image from "next/image";
import { Hourglass, PencilRuler, WalletMinimal } from "lucide-react";
import Link from "next/link";

interface SessionCardProps {
  link: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  softCopies: number;
  imgLink: string;
}

const SessionsCard = ({
  link,
  title,
  description,
  price,
  duration,
  softCopies,
  imgLink,
}: SessionCardProps) => {
  return (
    <Link
      href={link}
      className="grid w-full shadow-lg hover:shadow-xl transition-all hover:opacity-85"
    >
      <div className="flex w-full h-64">
        <Image
          src={imgLink}
          alt={title}
          width={500}
          height={100}
          className="object-cover object-top "
        />
      </div>
      <div className="my-5 container">
        <h3 className="font-semibold text-xl line-clamp-1">{title}</h3>
        <div className=" flex flex-col">
          <p className="text-muted-foreground text-sm line-clamp-3">
            {description}
          </p>
          <div className="flex gap-1 mt-5 items-center ">
            <WalletMinimal size={18} className="text-main-500 " /> Rs.{price}
          </div>
          <div className="flex gap-1 items-center ">
            <Hourglass size={18} className="text-main-500" />
            {duration}
          </div>
          <div className="flex gap-1 mb-2 items-center ">
            <PencilRuler size={18} className="text-main-500" />
            {softCopies} soft copies
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SessionsCard;
