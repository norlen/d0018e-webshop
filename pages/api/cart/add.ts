import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@lib/session";
import { addToCart } from "@lib/db";
import { ApiResponse, writeErrorResponse, getAuth } from "@lib/api";
import Joi from "joi";

const createSchema = Joi.object({
  productId: Joi.number().min(0).required(),
  amount: Joi.number().min(1).max(100).required(),
});

/// Adds a single product to the cart.
///
/// If the product already exists in the cart, the amount in incremented instead.
const cartAddRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<void>>
) => {
  try {
    const userId = getAuth(req).id;

    const { productId, amount } = await createSchema.validateAsync(req.body);
    await addToCart(userId, productId, amount);
    res.status(200).json({ success: true });
  } catch (error) {
    writeErrorResponse(res, error as Error);
  }
};

export default withIronSessionApiRoute(cartAddRoute, sessionOptions);
