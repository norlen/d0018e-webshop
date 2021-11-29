import { User } from "pages/api/user";
import { useCallAPI } from "./useCallAPI";

export * from "./useUser";
export * from "./useCart";

export type LoginRequest = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const { loading, error, call } = useCallAPI<LoginRequest, User>("/api/login");
  return { loading, error, login: call };
};

export type SignupRequest = {
  email: string;
  name: string;
  password: string;
};

export const useSignup = () => {
  const { loading, error, call } = useCallAPI<SignupRequest, User>(
    "/api/signup"
  );
  return { loading, error, signup: call };
};

export type CartAddRequest = {
  productId: string;
  quantity: number;
};

export const useAddToCart = () => {
  const { loading, error, call } = useCallAPI<CartAddRequest, void>(
    "/api/cart/add"
  );
  return { loading, error, addToCart: call };
};

export type CartRemoveRequest = {
  productId: string;
};

export const useRemoveFromCart = () => {
  const { loading, error, call } = useCallAPI<CartRemoveRequest, void>(
    "/api/cart/remove"
  );
  return { loading, error, removeFromCart: call };
};

export type OrderUpdateRequest = {
  orderId: string;
  newOrderStatus: number;
};

export const useUpdateOrder = () => {
  const { loading, error, call } = useCallAPI<OrderUpdateRequest, void>(
    "/api/order/update"
  );
  return { loading, error, updateOrder: call };
};

export type ProductUpdateRequest = {
  id: string;
  name: string;
  description: string;
  price: string;
  quantity: string;
};

export const useUpdateProduct = () => {
  const { loading, error, call } = useCallAPI<ProductUpdateRequest, void>(
    "/api/product/update"
  );
  return { loading, error, updateProduct: call };
};

export type OrderAddRequest = {
  name: string;
  email: string;
  address: string;
  postalCode: string;
  city: string;
  phoneNumber: string;
  cart: {
    id: string;
    quantity: number;
  }[];
  subtotal: number;
};

export type OrderAddResponse = {
  orderId: string;
};

export const useAddOrder = () => {
  const { loading, error, call } = useCallAPI<
    OrderAddRequest,
    OrderAddResponse
  >("/api/order/add");
  return { loading, error, addOrder: call };
};
