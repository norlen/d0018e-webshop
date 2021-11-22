import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

import { sessionOptions } from "@lib/session";
import { Order, getOrderById, getOrderItems } from "@lib/db";

type Data = {
  order?: Order;
  message?: string;
};

const getCartRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  try {
    if (req.session.user && req.session.user.id) {
      const order = await getOrderById(req.session.user.id);
      const items = await getOrderItems(order.id);
      order.items = items;
      res.status(200).json({ order });
    } else {
      res.status(403);
    }
  } catch (error) {
    const message = (error as Error).message;
    console.error("ERROR getCartRoute:", message);
    res.status(500).json({ message });
  }
};

export default withIronSessionApiRoute(getCartRoute, sessionOptions);
