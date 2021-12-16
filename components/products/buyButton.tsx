import Link from "next/link";
import React from "react";
import { useAddToCart, useCart } from "@lib/hooks";
import { User } from "pages/api/user";
import toast from "react-hot-toast";
import CartToast from "@components/cart/cartToast";
import { CartItem, Product } from "@lib/db";
import { Button } from "@components/common";

type Props = {
  product: Product;
  user?: User;
  amount?: number;
};

const BuyButton = ({ product, user, amount }: Props) => {
  if (user && user.isLoggedIn) {
    return (
      <CustomerBuyButton
        isAdmin={user.isAdmin}
        product={product}
        amount={amount}
      />
    );
  }
  return <VisitorBuyButton amount={amount} />;
};

type CustomerButtonProps = {
  isAdmin: boolean;
  product: Product;
  amount?: number;
};

const CustomerBuyButton = ({
  isAdmin,
  product,
  amount,
}: CustomerButtonProps) => {
  const { cart, cartItems, mutateCart } = useCart();
  const { error, addToCart } = useAddToCart();

  const addProduct = async (amount: number) => {
    const currentAmount = cartItems[product.id]?.amount || 0;
    if (currentAmount + amount > product.quantity) {
      toast.error("ojoj nu har du tömt lagersaldot", {
        duration: 1000,
      });
      return;
    }

    // Optmistically update the cart, assume the call succeeds. And don't revalidate.
    let data: CartItem[];
    if (cartItems[product.id]) {
      data = cart.map((item) => {
        let newAmount = item.amount;
        if (item.id == product.id) {
          newAmount += amount;
        }
        return { ...item, amount: newAmount };
      });
    } else {
      data = [...cart, { ...product, amount, isdeleted: false }];
    }
    await mutateCart({ data }, false);

    const result = await addToCart({ productId: product.id, amount });
    if (result.success) {
      // Show the toast whenever the call actually succeeded (or an error if it failed). And the revalidate the data.
      toast.custom((t) => (
        <CartToast
          visible={t.visible}
          name={product.name}
          imagesrc={product.image_url}
        />
      ));
      mutateCart();
    } else {
      toast.error(error || "Kunde inte lägga till, försök igen", {
        duration: 1000,
      });
    }
  };

  if (isAdmin) {
    return (
      <button className="py-2 px-4 rounded-md shadow-md bg-green-300 hover:bg-green-500">
        <Link href={`/produkt/${product.id}`}>
          <a>Ändra produkt</a>
        </Link>
      </button>
    );
  }

  return (
    <Button
      text={amount !== undefined ? "Köp" : "Köp 1 kg"}
      loadingText=""
      loading={false}
      disabled={product.quantity <= 0}
      onClick={() => addProduct(amount || 1)}
      className="py-2 px-4 shadow-md w-24 h-10"
    />
  );
};

const VisitorBuyButton = ({ amount }: { amount?: number }) => (
  <button className="py-2 px-4 rounded-md shadow-md bg-green-300 hover:bg-green-500">
    <Link href="/login">
      <a>{amount !== undefined ? "Köp" : "Köp 1 kg"}</a>
    </Link>
  </button>
);

export default BuyButton;
