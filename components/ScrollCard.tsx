import Image from "next/image";
import React from "react";

interface ScrollCardProps {
  img1: string;
  img2: string;
  img3: string;
}

const ScrollCard = ({ img1, img2, img3 }: ScrollCardProps) => {
  return (
    <div className="flex items-center ">
      <Image
        src={img1}
        alt="1"
        width={256}
        height={384}
        className="w-64 h-96 mx-1.5 object-cover"
      />
      <div className="flex flex-col space-y-3 mx-1.5">
        <Image
          src={img2}
          alt="1"
          width={256}
          height={256}
          className="size-64 object-cover"
        />
        <Image
          src={img3}
          alt="1"
          width={256}
          height={256}
          className="size-64 object-cover"
        />
      </div>
    </div>
  );
};

export default ScrollCard;
