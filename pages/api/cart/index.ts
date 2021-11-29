import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@lib/session";
import { CartItem, getCartByUserId } from "@lib/db";
import { ApiResponse, getAuth, writeErrorResponse } from "@lib/api";

/// Gets a user's cart.
const cartGetRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<CartItem[]>>
) => {
  try {
    const userId = getAuth(req).id;
    const cart = await getCartByUserId(userId);
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    writeErrorResponse(res, error as Error);
  }
};

export default withIronSessionApiRoute(cartGetRoute, sessionOptions);
