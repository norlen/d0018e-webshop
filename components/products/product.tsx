import { useUser } from "@lib/hooks";
import Image from "next/image";
import BuyButton from "./buyButton";
import EditPage from "./editProductPage";
import { getStock } from "@lib/util";
import StockStatus from "./stockStatus";
import { Product } from "@lib/db";
import { useState } from "react";
import Rating from "@components/reviews/rating";
import Link from "next/link";

type Props = {
  product: Product & { isdeleted: boolean };
};

const ProductC = ({ product }: Props) => {
  const { user } = useUser();
  const [amount, stock] = getStock(product.quantity);
  const [buyAmount, setBuyAmount] = useState(1);

  // Special page for admins.
  if (user && user.isAdmin) {
    return <EditPage product={product} />;
  }

  return (
    <>
      {product.isdeleted ? (
        <div className="my-2 px-4 py-2 text-center border border-green-500 bg-green-300 rounded-lg">
          Den har produkten har tyvärr utgått ur vårt sortiment. Men vi har
          många andra likvärdiga produkter!
        </div>
      ) : null}
      <div className="flex flex-col gap-4 bg-white rounded-lg">
        <div className="w-full h-96 rounded-t-lg overflow-hidden relative">
          <Image
            src={product.image_url}
            alt={product.name}
            layout="fill"
            className="w-full h-full object-center object-cover"
          />
        </div>
        <div className="flex flex-col justify-between px-8 py-4 gap-8">
          <div className="">
            <p className="text-2xl font-medium">{product.name}</p>
            <Rating rating={product.rating} />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col">
              <p className="text-gray-800">{product.description}</p>
            </div>
          </div>
          <div className="flex gap-6 justify-between mt-8">
            <div className="flex gap-8">
              <div className="flex flex-col">
                <span className="text-xs text-green-500">Kategori</span>
                <Link href={`/kategori/${product.category}`}>
                  <a className="font-medium capitalize hover:text-green-300">
                    {product.category}
                  </a>
                </Link>
              </div>
              <div className="flex flex-col ml-8">
                <span className="text-xs text-green-500">Producent</span>
                <Link href={`/producent/${product.producerid}`}>
                  <a className="font-medium hover:text-green-300">
                    {product.producer}
                  </a>
                </Link>
              </div>
              <div className="flex flex-col ml-8">
                <span className="text-xs text-green-500">Pris</span>
                <span className="font-medium">{product.price} kr/kg</span>
              </div>
              <div className="flex flex-col ml-8">
                {!product.isdeleted && (
                  <>
                    <span className="text-xs text-green-500">Lagersaldo</span>
                    <span className="font-medium -mt-2">
                      <StockStatus
                        amount={amount}
                        text={stock}
                        className="mt-1"
                      />
                    </span>
                  </>
                )}
              </div>
            </div>
            {!product.isdeleted && (
              <div className="flex gap-4">
                <div className="flex flex-col w-12">
                  <span className="text-xs text-green-500">Antal</span>
                  <input
                    id="amount"
                    type="number"
                    className=""
                    value={buyAmount}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      const set = Math.max(
                        1,
                        Math.min(value, product.quantity)
                      );
                      setBuyAmount(set);
                    }}
                  />
                </div>
                <BuyButton product={product} user={user} amount={buyAmount} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductC;
