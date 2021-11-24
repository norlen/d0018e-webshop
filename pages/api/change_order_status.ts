import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";

import { changeOrderStatus } from "@lib/db";

const changeOrderRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { orderId, newOrderStatus } = await req.body;
  try {
    if (orderId === undefined || newOrderStatus === undefined) {
      throw Error("Invalid order");
    }

    await changeOrderStatus(newOrderStatus, orderId);
    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export default withIronSessionApiRoute(changeOrderRoute, sessionOptions);
