import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";

import { updateProduct } from "@lib/db";

const changeOrderRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, name, quantity, description, price } = await req.body;
  try {
    if (
      id === undefined ||
      name === undefined ||
      quantity === undefined ||
      description === undefined ||
      price === undefined
    ) {
      throw Error("Invalid product information");
    }

    const succesfulUpdate = await updateProduct(
      id,
      name,
      quantity,
      description,
      price
    );
    res.status(200).json({ succesfulUpdate });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export default withIronSessionApiRoute(changeOrderRoute, sessionOptions);
