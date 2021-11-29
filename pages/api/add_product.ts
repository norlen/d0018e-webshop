import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

import { sessionOptions } from "@lib/session";
import AddProductPage from "@components/products/addProductPage";
import { addProduct } from "@lib/db";

type Data = {
  message?: string;
};

const getProductRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  try {
    if (
      !(req.session.user && req.session.user.id && req.session.user.isAdmin)
    ) {
      throw Error("invalid user session");
    }
    console.log("ADDPRODUCT");
    console.log("name: " + req.body.name);
    console.log("category: " + req.body.category);
    console.log("quantity: " + req.body.quantity);
    console.log("price: " + req.body.price);
    console.log("description: " + req.body.description);
    console.log("producer: " + req.body.producer);
    console.log("image_url: " + req.body.image_url);

    if (
      !(
        req.body.name &&
        req.body.category &&
        req.body.quantity &&
        req.body.price &&
        req.body.description &&
        req.body.producer &&
        req.body.image_url
      )
    ) {
      throw Error("invalid arguments");
    }
    const {
      name,
      category,
      quantity,
      price,
      description,
      producer,
      image_url,
    } = req.body;
    // db add product
    const item = await addProduct(
      name,
      category,
      quantity,
      price,
      description,
      producer,
      image_url
    );
    res.status(200).json({});
  } catch (error) {
    const message = (error as Error).message;
    console.error("ERROR getProductRoute:", message);
    res.status(400).json({ message });
  }
};

export default withIronSessionApiRoute(getProductRoute, sessionOptions);
