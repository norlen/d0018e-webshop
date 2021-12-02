import useSWR from "swr";
import { useState, useEffect } from "react";
import { CartItem } from "@lib/db";
import { fetcher } from "@lib/util";

export type CartRequest = {
  data: CartItem[];
};

export const useCart = () => {
  const { data, mutate: mutateCart } = useSWR<CartRequest>(
    "/api/cart",
    fetcher
  );
  const [cartItems, setCartItems] = useState<Record<string, CartItem>>({});

  useEffect(() => {
    const newItems: Record<string, CartItem> = {};
    if (data && data.data) {
      for (let i = 0; i < data.data.length; i++) {
        newItems[data.data[i].id] = data.data[i];
      }
      setCartItems(newItems);
    }
  }, [data]);
  const cart = (data && data.data) || [];

  return { cart, cartItems, mutateCart };
};

export default useCart;
