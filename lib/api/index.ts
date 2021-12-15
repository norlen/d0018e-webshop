import type { NextApiRequest, NextApiResponse } from "next";
import { ValidationError } from "joi";
import * as errorCodes from "@lib/errorCodes";
import { DatabaseError } from "pg";

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  code?: number;
  message?: string;
};

export const createErrorResponse = (code: number, message: string) => ({
  success: false,
  code,
  message,
});

export class ApiError extends Error {
  code: number;

  constructor(code: number, msg: string) {
    super(msg);
    this.code = code;
  }

  createErrorResponse() {
    return { success: false, code: this.code, message: this.message };
  }
}

export const getAuth = (req: NextApiRequest) => {
  if (!(req.session.user && req.session.user.id)) {
    throw new ApiError(1, "invalid user session");
  }
  return req.session.user;
};

export const writeErrorResponse = <T>(
  res: NextApiResponse<ApiResponse<T>>,
  error: Error
) => {
  if (error instanceof ValidationError) {
    res.status(400).json(createErrorResponse(400, error.message));
  } else if (error instanceof ApiError) {
    res.status(403).json((error as ApiError).createErrorResponse());
  } else if (error instanceof DatabaseError) {
    res.status(500).json(createErrorResponse(500, "internal server error"));
  } else {
    res.status(500).json(createErrorResponse(500, "internal server error"));
  }
};

export const ApiInternalError = () =>
  new ApiError(errorCodes.INTERNAL_ERROR, "internal server error");

export const AdminRequiredError = () =>
  new ApiError(
    errorCodes.ADMIN_REQUIRED,
    "administrator is required to perform this operation"
  );

export const UserDoesNotExistError = () =>
  new ApiError(
    errorCodes.WRONG_LOGIN_INFO,
    "user with that combination of email and password does not exists"
  );

export const UserAlreadyExistsError = () =>
  new ApiError(
    errorCodes.USER_ALREADY_EXISTS,
    "user with that email already exists"
  );

export const InconsistentCartError = () =>
  new ApiError(
    errorCodes.INCONSISTENT_CART,
    "cart is not consistent between client and server"
  );

export const InconsistentPriceError = () =>
  new ApiError(errorCodes.INCONSISTENT_PRICE, "prices have been updated");

export const NegativeStockError = () =>
  new ApiError(errorCodes.NEGATIVE_STOCK, "stock cannot be negative");
