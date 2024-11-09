import React from "react";
import Image from "next/image";

type Props = {
  reviewer: string;
  review: string;
  rating: number;
  role: string;
};

const ReviewCard = ({ reviewer, review, rating, role }: Props) => {
  return (
    <div className="w-80 h-72 border-2 border-primary bg-white mx-2 p-5 flex flex-col justify-between hover:border-main-500">
      <div>
        <div className="flex  justify-between items-center">
          <div>
            <h3 className="text-3xl font-anton">{reviewer}</h3>
          </div>
          <div className="flex space-x-1">
            {[...Array(rating)].map((_, i) => (
              <Image
                key={i}
                src="/star.svg"
                alt="star"
                width={20}
                height={20}
              />
            ))}
          </div>
        </div>
        <p className="text-zinc-500 font-medium">{role}</p>
      </div>

      <p className="text-lg font-medium  ">{review}</p>
    </div>
  );
};

export default ReviewCard;
