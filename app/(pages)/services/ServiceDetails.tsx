import Image from "next/image";
interface ServiceDetailsProps {
  title: string;
  description: string;
  features: string[];
  pricing: string;
  bgColor: string;
  image: string;
  imgside?: "left" | "right";
}

export function ServiceDetails({
  title,
  description,
  features,
  pricing,
  bgColor,
  image,
  imgside = "right",
}: ServiceDetailsProps) {
  return (
    <section className={`w-full py-12 md:py-24 lg:py-32 ${bgColor}`}>
      <div className="container px-4 md:px-6">
        {imgside === "right" ? (
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {title}
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                {description}
              </p>
              <ul className="grid gap-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className=" h-4 w-4 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <p className="font-semibold">Pricing: {pricing}</p>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={image}
                  alt={title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform hover:scale-105"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex items-center justify-center">
              <div className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={image}
                  alt={title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform hover:scale-105"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {title}
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                {description}
              </p>
              <ul className="grid gap-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className=" h-4 w-4 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <p className="font-semibold">Pricing: {pricing}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
