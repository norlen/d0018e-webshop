import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@lib/session";
import { createOrder } from "@lib/db";
import {
  ApiResponse,
  writeErrorResponse,
  getAuth,
  ApiInternalError,
} from "@lib/api";
import Joi from "joi";

type CreateOrderResponse = {
  orderId: string;
};

const createOrderSchema = Joi.object({
  name: Joi.string().normalize().min(5).max(100).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string()
    .regex(/^([+]46|0)\d{9}$/)
    .required(),
  address: Joi.string().normalize().min(5).max(100).required(),
  postalCode: Joi.string().regex(/\d{5}/).required(),
  city: Joi.string().normalize().min(1).max(100).required(),
  subtotal: Joi.number().min(1),
  cart: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().min(0).required(),
        quantity: Joi.number().min(1).required(),
      })
    )
    .min(1)
    .required(),
});

/// Creates an order from the products passed.
const orderAddRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<CreateOrderResponse>>
) => {
  try {
    const userId = getAuth(req).id;

    const {
      name,
      email,
      phoneNumber,
      address,
      postalCode,
      city,
      cart,
      subtotal,
    } = await createOrderSchema.validateAsync(req.body);

    const fullAddress = [address, postalCode, city].join(", ");
    const customer = {
      id: userId,
      name,
      email,
      phoneNumber,
      address: fullAddress,
    };

    const orderId = await createOrder(customer, cart, subtotal);
    if (orderId === undefined) {
      throw ApiInternalError();
    }

    res.status(200).json({ success: true, data: { orderId } });
  } catch (error) {
    writeErrorResponse(res, error as Error);
  }
};

export default withIronSessionApiRoute(orderAddRoute, sessionOptions);
