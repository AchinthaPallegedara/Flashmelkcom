import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
}

export function ServiceCard({
  icon,
  title,
  description,
  image,
}: ServiceCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-transform hover:scale-105"
        />
      </div>
      <CardHeader>
        <div className="flex items-center space-x-2">
          {icon}
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}
