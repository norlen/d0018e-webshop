import { useState } from "react";
import { useCart } from "@lib/hooks";

export type Item = {
  id: string;
  quantity: number;
};

export const useCreateOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const { mutateCart } = useCart();

  const createOrder = async (
    name: string,
    email: string,
    address: string,
    phoneNumber: string,
    cart: Item[]
  ) => {
    setError(undefined);

    const url = "/api/create_order";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, address, phoneNumber, cart }),
    };

    try {
      setLoading(true);
      const response = await fetch(url, options);
      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        setError(data.message);
      }

      mutateCart();
      return data;
    } catch (err) {
      console.error("fetch error", err);
      setError((err as Error).message);
    }
  };

  return { loading, error, createOrder };
};

export default useCreateOrder;
