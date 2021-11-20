import { useState } from "react";
import useSWR from "swr";

export const useAddToCart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const { mutate } = useSWR("/api/get_cart");

  const addToCart = async (productId: string, quantity: number = 1) => {
    setError(undefined); // Clear errors.

    const url = "/api/add_cart";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity }),
    };

    try {
      setLoading(true);
      const response = await fetch(url, options);
      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        setError(data.message);
      }

      mutate();
      return data;
    } catch (err) {
      console.error("fetch error", err);
      setError((err as Error).message);
    }
  };

  return { loading, error, addToCart };
};

export default useAddToCart;
