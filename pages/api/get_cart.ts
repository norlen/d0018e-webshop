import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

import { sessionOptions } from "@lib/session";
import { CartItem, getCartByUserId } from "@lib/db/cart";

type Data = {
  data?: CartItem[];
  message?: string;
};

const getCartRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  try {
    // Return empty list if there's no session or there isn't a logged in session.
    // Thus, this can never fail and logged out users will just get an empty cart.
    if (req.session.user && req.session.user.id) {
      const cart = await getCartByUserId(req.session.user.id);
      res.status(200).json({ data: cart });
    } else {
      res.status(200).json({ data: [] });
    }
  } catch (error) {
    const message = (error as Error).message;
    console.error("ERROR getCartRoute:", message);
    res.status(500).json({ message });
  }
};

export default withIronSessionApiRoute(getCartRoute, sessionOptions);
