import Link from "next/link";
import React from "react";
import { useAddToCart, useCart } from "@lib/hooks";
import { User } from "pages/api/user";
import toast from "react-hot-toast";
import CartToast from "@components/cart/cartToast";

type Props = {
  productId: string;
  quantity: number;
  name: string;
  imagesrc: string;
  user?: User;
};

const BuyButton = ({ productId, user, quantity, name, imagesrc }: Props) => {
  if (user && user.isLoggedIn) {
    return (
      <CustomerBuyButton
        isAdmin={user.isAdmin}
        productId={productId}
        quantity={quantity}
        name={name}
        imagesrc={imagesrc}
      />
    );
  }
  return <VisitorBuyButton />;
};

type CustomerButtonProps = {
  isAdmin: boolean;
  productId: string;
  quantity: number;
  name: string;
  imagesrc: string;
};

const CustomerBuyButton = ({
  isAdmin,
  name,
  imagesrc,
  productId,
  quantity,
}: CustomerButtonProps) => {
  const { mutateCart } = useCart();
  const { loading, error, addToCart } = useAddToCart();

  const addProduct = async (quantity: number) => {
    toast.custom((t) => (
      <CartToast
        id={t.id}
        visible={t.visible}
        name={name}
        imagesrc={imagesrc}
      />
    ));
    const result = await addToCart({ productId, quantity });
    if (result.success) {
      await mutateCart();
    } else {
      toast.error(error || "Kunde inte lägga till, försök igen", {
        duration: 1000,
      });
    }
  };
  const canBuy = quantity > 0 && !loading;

  if (isAdmin) {
    return (
      <button className="py-2 px-4 rounded-md shadow-md bg-green-300 hover:bg-green-500">
        <Link href={`/produkt/${productId}`}>
          <a>Ändra produkt</a>
        </Link>
      </button>
    );
  }

  return (
    <button
      className={`py-2 px-4 rounded-md shadow-md bg-green-300 hover:bg-green-500 w-24 h-10 ${
        !canBuy ? "disabled opacity-50 hover:bg-green-300" : ""
      }`}
      disabled={!canBuy}
      onClick={() => addProduct(1)}
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
  );
};

const VisitorBuyButton = () => (
  <button className="py-2 px-4 rounded-md shadow-md bg-green-300 hover:bg-green-500">
    <Link href="/login">
      <a>Köp 1 kg</a>
    </Link>
  </button>
);

export default BuyButton;
