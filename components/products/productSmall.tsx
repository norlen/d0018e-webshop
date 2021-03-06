import Link from "next/link";
import Image from "next/image";
import BuyButton from "./buyButton";
import { useUser, useCart } from "@lib/hooks";
import { cutoff, getStock } from "@lib/util";
import StockStatus from "./stockStatus";
import { Product } from "@lib/db";

type Props = {
  product: Product;
};

const ProductSmall = ({ product }: Props) => {
  const { user } = useUser();
  const [amount, stock] = getStock(product.quantity);

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
        <div className="flex justify-between text-sm text-gray-500">
          <p className="">{product.category}</p>
          <StockStatus text={stock} amount={amount} className="mt-0.5" />
        </div>
        <p className="font-medium">{product.name}</p>
        <Link href={`/producent/${product.producerid}`}>
          <a className="hover:text-green-500 pt-1">{product.producer}</a>
        </Link>

        <p className="test-gray-800">{cutoff(product.description, 45)}</p>
      </div>
      <div className="flex justify-between align-bottom px-2 pb-2">
        <Link href={`/produkt/${product.id}`}>
          <a className="hover:text-green-500 pt-1">Läs mer</a>
        </Link>
        <div className="flex gap-6">
          <p className="font-medium pt-1">{product.price} kr/kg</p>
          <BuyButton product={product} user={user} />
        </div>
      </div>
    </div>
  );
};

export default ProductSmall;
