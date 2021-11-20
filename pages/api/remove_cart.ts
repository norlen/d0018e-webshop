import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

import { sessionOptions } from "@lib/session";
import { CartItem, removeFromCart } from "@lib/db";

type Data = {
  data?: CartItem;
  message?: string;
};

const getCartRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  try {
    if (!(req.session.user && req.session.user.id)) {
      throw Error("invalid user session");
    }
    const userId = req.session.user.id;

    if (!req.body.productId) {
      throw Error("invalid product id");
    }
    const { productId } = req.body;

    const item = await removeFromCart(userId, productId);
    res.status(200).json({ data: item });
  } catch (error) {
    const message = (error as Error).message;
    console.error("ERROR getCartRoute:", message);
    res.status(400).json({ message });
  }
};

export default withIronSessionApiRoute(getCartRoute, sessionOptions);
