import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

import { sessionOptions } from "@lib/session";
import { addToCart } from "@lib/db/cart";

type Data = {
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

    if (!(req.body.productId && req.body.quantity)) {
      throw Error("invalid product id or quantity");
    }
    const { productId, quantity } = req.body;
    //console.log(userId, productId, quantity, "I ADD CART HEEEJ");
    const item = await addToCart(userId, productId, quantity);
    res.status(200).json({});
  } catch (error) {
    const message = (error as Error).message;
    console.error("ERROR getCartRoute:", message);
    res.status(400).json({ message });
  }
};

export default withIronSessionApiRoute(getCartRoute, sessionOptions);
