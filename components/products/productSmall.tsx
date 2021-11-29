import Link from "next/link";
import Image from "next/image";
import BuyButton from "./buyButton";
import { useUser } from "@lib/hooks";

const cutoff = (s: string, maxlen: number): string => {
  if (s.length > maxlen) {
    s = s.slice(0, maxlen - 3);
    s = s.concat("...");
  }
  return s;
};

type Props = {
  product: {
    id: string;
    name: string;
    category: string;
    producer: string;
    description: string;
    price: string;
    image_url: string;
  };
};

const ProductSmall = ({ product }: Props) => {
  const { user } = useUser();

  return (
    <div className="flex gap-4 flex-col max-w-sm bg-white rounded-lg shadow-md">
      <Link href={`/produkt/${product.id}`}>
        <a className="block h-96 w-96 relative rounded-t-lg overflow-hidden">
          <Image
            src={product.image_url}
            layout="fill"
            className="object-cover"
            alt={product.name}
          />
        </a>
      </Link>
      <div className="flex flex-col px-2">
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="font-medium">{product.name}</p>
        <p className="font-medium">{product.producer}</p>
        <p className="test-gray-800">{cutoff(product.description, 45)}</p>
      </div>
      <div className="flex justify-between align-bottom px-2 pb-2">
        <Link href={`/produkt/${product.id}`}>
          <a className="hover:text-green-500 pt-1">Läs mer</a>
        </Link>
        <div className="flex gap-6">
          <p className="font-medium pt-1">{product.price} kr/kg</p>
          <BuyButton productId={product.id} user={user} />
        </div>
      </div>
    </div>
  );
};

export default ProductSmall;
