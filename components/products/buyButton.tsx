import { useAddToCart, useUser } from "@lib/hooks";
import Link from "next/link";
import React from "react";

type Props = {
  productID: string;
};

const BuyButton = ({ productID }: Props) => {
  const { loading, error, addToCart } = useAddToCart();
  const { user } = useUser();

  return (
    <>
      {user && user.isLoggedIn && !user.isAdmin ? (
        <button
          className={`py-2 px-4 rounded-md shadow-md bg-green-300 hover:bg-green-500 w-24 h-10 ${
            loading ? "disabled opacity-50" : ""
          }`}
          onClick={() => addToCart(productID, 1)}
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
      ) : user && user.isAdmin ? (
        <button className="py-2 px-4 rounded-md shadow-md bg-green-300 hover:bg-green-500">
          <Link href={`/produkt/${productID}`}>
            <a>Edit product</a>
          </Link>
        </button>
      ) : (
        <button className="py-2 px-4 rounded-md shadow-md bg-green-300 hover:bg-green-500">
          <Link href="/login">
            <a>Köp 1 kg</a>
          </Link>
        </button>
      )}
    </>
  );
};

export default BuyButton;