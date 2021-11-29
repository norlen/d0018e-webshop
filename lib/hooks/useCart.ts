import useSWR from "swr";
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

  const cart = (data && data.data) || [];
  return { cart, mutateCart };
};

export default useCart;
