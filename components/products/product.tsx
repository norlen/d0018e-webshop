import Image from "next/image";
import Link from "next/link";
import { useAddToCart, useUser } from "@lib/hooks";

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

const ProductC = ({ product }: Props) => {
  const { loading, error, addToCart } = useAddToCart();
  const { user } = useUser();
  // TODO: Global flash for errors.

  return (
    <div className="flex gap-4 bg-white rounded-lg">
      <div className="w-96 h-96 rounded-l-lg overflow-hidden relative">
        <Image
          src={product.image_url}
          alt={product.name}
          layout="fill"
          className="w-full h-full object-center object-cover"
        />
      </div>
      <div className="flex flex-col justify-between pr-8 py-4">
        <div className="flex flex-col">
          <p className="font-medium">{product.name}</p>
          <p className="text-sm text-gray-500">{product.category}</p>
          <p className="my-2">
            Producerat av{" "}
            <span className="font-medium">{product.producer}</span>
          </p>
          <p className="text-gray-800">{product.description}</p>
        </div>
        <div className="flex gap-6 justify-between">
          <p className="">
            Pris: <span className="font-medium">{product.price} kr/kg</span>
          </p>
          {user && user.isLoggedIn ? (
            <button
              className={`py-2 px-4 rounded-md shadow-md bg-green-300 hover:bg-green-500 w-24 h-10 ${
                loading ? "disabled opacity-50" : ""
              }`}
              onClick={() => addToCart(product.id, 1)}
            >
              {loading ? (
                <svg
                  className={`animate-spin h-5 w-5 mx-auto text-white`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <>Köp 1 kg</>
              )}
            </button>
          ) : (
            <button className="py-2 px-4 rounded-md shadow-md bg-green-300 hover:bg-green-500">
              <Link href="/login">
                <a>Köp 1 kg</a>
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductC;
