import type { NextApiRequest, NextApiResponse } from "next";
import { ValidationError } from "joi";

export type ApiResponse<T> = {
  data?: T;
  code?: number;
  message?: string;
};

export const createErrorResponse = (code: number, message: string) => ({
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
    return { code: this.code, message: this.message };
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
  } else {
    res.status(500).json(createErrorResponse(500, "internal server error"));
  }
};

export const ApiInternalError = () =>
  new ApiError(500, "internal server error");

export const AdminRequiredError = () =>
  new ApiError(-1, "administrator is required to perform this operation");
