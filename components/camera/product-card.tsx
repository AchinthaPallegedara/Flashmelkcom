import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  brand: string;
}

interface ProductCardProps {
  product: Product;
  onRequest: (product: Product) => void;
}

export function ProductCard({ product, onRequest }: ProductCardProps) {
  return (
    <div className="group bg-white border rounded-none overflow-hidden flex flex-col transition-all hover:shadow-lg">
      <div className="relative aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-medium text-lg mb-2 line-clamp-2">
          {product.name}
        </h3>
        <div className="text-sm text-gray-600 mb-2">{product.category}</div>
        <div className="mt-auto">
          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-2xl font-bold text-main-500">
              Rs {product.price}
            </span>
            <span className="text-sm text-gray-600">Per Night</span>
          </div>
          <Button
            className="w-full rounded-none flex items-center justify-center gap-2 text-base hover:bg-main-500 hover:text-black transition-colors "
            onClick={() => onRequest(product)}
          >
            Rent Now
            <Image src={"/waicon.svg"} alt="whatsapp" width={20} height={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
