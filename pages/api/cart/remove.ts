import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@lib/session";
import { removeFromCart } from "@lib/db";
import { ApiResponse, getAuth, writeErrorResponse } from "@lib/api";
import Joi from "joi";

const deleteSchema = Joi.object({
  productId: Joi.number().min(0),
});

/// Removes a product from a user's cart.
const cartRemoveRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<void>>
) => {
  try {
    const userId = getAuth(req).id;

    const { productId } = await deleteSchema.validateAsync(req.body);
    await removeFromCart(userId, productId);
    res.status(200).json({ data: undefined });
  } catch (error) {
    writeErrorResponse(res, error as Error);
  }
};

export default withIronSessionApiRoute(cartRemoveRoute, sessionOptions);
