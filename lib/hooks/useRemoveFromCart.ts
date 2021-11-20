import { useState } from "react";
import { useCart } from "@lib/hooks";

export const useRemoveFromCart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const { cart, mutateCart } = useCart();

  const removeFromCart = async (productId: string) => {
    setError(undefined); // Clear errors.

    const url = "/api/remove_cart";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    };

    try {
      setLoading(true);
      const response = await fetch(url, options);
      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        setError(data.message);
      }

      mutateCart({ data: cart.filter((i) => i.id !== productId) });
      return data;
    } catch (err) {
      console.error("fetch error", err);
      setError((err as Error).message);
    }
  };

  return { loading, error, removeFromCart };
};

export default useRemoveFromCart;
