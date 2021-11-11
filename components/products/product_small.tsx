import Link from "next/link";
import Image from "next/image";

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
  return (
    <div className="flex gap-4 flex-col max-w-sm">
      <Link href={`/produkt/${product.id}`}>
        <a className="h-96 w-96 relative rounded-lg overflow-hidden">
          <Image
            src={product.image_url}
            layout="fill"
            className="object-cover"
            alt={product.name}
          />
        </a>
      </Link>
      <div className="flex flex-col">
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="font-medium">{product.name}</p>
        <p className="font-medium">{product.producer}</p>
        <p className="test-gray-800">{cutoff(product.description, 50)}</p>
      </div>
      <div className="flex justify-between align-bottom">
        <Link href={`/produkt/${product.id}`}>
          <a className="hover:text-green-500 pt-1">Läs mer</a>
        </Link>
        <div className="flex gap-6">
          <p className="font-medium pt-1">{product.price} kr/kg</p>
          <button className="py-2 px-4 rounded-md shadow-md bg-green-300 todohover:bg-green-500 disabled cursor-not-allowed opacity-50">
            Köp 1 kg
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSmall;
