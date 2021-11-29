import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@lib/session";
import { addToCart } from "@lib/db";
import { ApiResponse, writeErrorResponse, getAuth } from "@lib/api";
import Joi from "joi";

const createSchema = Joi.object({
  productId: Joi.number().min(0),
  quantity: Joi.number().min(1).max(100),
});

/// Adds a single product to the cart.
///
/// If the product already exists in the cart, the quantity in incremented instead.
const cartAddRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<void>>
) => {
  try {
    const userId = getAuth(req).id;

    const { productId, quantity } = await createSchema.validateAsync({
      productId: req.body.productId,
      quantity: req.body.quantity,
    });
    await addToCart(userId, productId, quantity);
    res.status(200).json({ success: true });
  } catch (error) {
    writeErrorResponse(res, error as Error);
  }
};

export default withIronSessionApiRoute(cartAddRoute, sessionOptions);
