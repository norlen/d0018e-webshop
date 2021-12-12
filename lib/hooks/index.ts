import { User } from "pages/api/user";
import { useCallAPI } from "./useCallAPI";
import { ReviewData } from "@lib/db";

export * from "./useUser";
export * from "./useCart";
export * from "./useReviews";

export type ApiResponse = {
  success: boolean;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const { loading, error, call } = useCallAPI<LoginRequest, User & ApiResponse>(
    "/api/login"
  );
  return { loading, error, login: call };
};

export type SignupRequest = {
  email: string;
  name: string;
  password: string;
};

export const useSignup = () => {
  const { loading, error, call } = useCallAPI<
    SignupRequest,
    User & ApiResponse
  >("/api/signup");
  return { loading, error, signup: call };
};

export type CartAddRequest = {
  productId: string;
  amount: number;
};

export const useAddToCart = () => {
  const { loading, error, call } = useCallAPI<CartAddRequest, ApiResponse>(
    "/api/cart/add"
  );
  return { loading, error, addToCart: call };
};

export type CartRemoveRequest = {
  productId: string;
};

export const useRemoveFromCart = () => {
  const { loading, error, call } = useCallAPI<CartRemoveRequest, ApiResponse>(
    "/api/cart/remove"
  );
  return { loading, error, removeFromCart: call };
};

export type OrderUpdateRequest = {
  orderId: string;
  newOrderStatus: number;
};

export const useUpdateOrder = () => {
  const { loading, error, call } = useCallAPI<OrderUpdateRequest, ApiResponse>(
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

export type ProductDeleteRequest = {
  id: string;
};

export const useDeleteProduct = () => {
  const { loading, error, call } = useCallAPI<
    ProductDeleteRequest,
    ApiResponse
  >("/api/product/delete_product");
  return { loading, error, deleteProduct: call };
};

export const useUpdateProduct = () => {
  const { loading, error, call } = useCallAPI<
    ProductUpdateRequest,
    ApiResponse
  >("/api/product/update");
  return { loading, error, updateProduct: call };
};

export type ProductAddRequest = {
  name: string;
  category: string;
  quantity: string;
  price: string;
  description: string;
  producer: string;
  image_url: string;
};

export type ProductAddResponse = {
  successfullAdd: boolean;
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
    amount: number;
  }[];
  subtotal: number;
};

export type OrderAddResponse = {
  orderId: string;
};

export const useAddProduct = () => {
  const { loading, error, call } = useCallAPI<
    ProductAddRequest,
    ProductAddResponse & ApiResponse
  >("/api/product/add_product");
  return { loading, error, addProduct: call };
};

export const useAddOrder = () => {
  const { loading, error, call } = useCallAPI<
    OrderAddRequest,
    OrderAddResponse & ApiResponse
  >("/api/order/add");
  return { loading, error, addOrder: call };
};

export type AddReviewRequest = {
  productId: string;
  grade: number;
  comment: string;
};

export const useAddReview = () => {
  const { loading, error, call } = useCallAPI<
    AddReviewRequest,
    ReviewData & ApiResponse
  >("/api/reviews/add");
  return { loading, error, addReview: call };
};
