import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

import { sessionOptions } from "@lib/session";
import { createOrder } from "@lib/db";

type Data = {
  orderId?: string;
  message?: string;
};

/// For the create order we take the client side items, just to make sure that they match.
/// Otherwise, we might have some issues where the cart has been updated behind their backs.
/// Like in another tab, and the updates haven't been visible for the client.
const createOrderRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  try {
    if (!(req.session.user && req.session.user.id)) {
      throw Error("invalid user session");
    }
    const userId = req.session.user.id;

    if (!validateCart(req.body.cart)) {
      throw Error("invalid cart items");
    }
    const { cart, name, phoneNumber, email, address } = req.body;

    if (!validateCustomer(name, phoneNumber, email, address)) {
      throw Error("invalid customer data");
    }
    const customer = {
      id: userId,
      name,
      phoneNumber,
      email,
      address,
    };

    const orderId = await createOrder(customer, cart);
    if (orderId === undefined) {
      res.status(500).json({ message: "failed to create order" });
    } else {
      res.status(200).json({ orderId });
    }
  } catch (error) {
    const message = (error as Error).message;
    console.error("ERROR createOrderRoute:", message);
    res.status(400).json({ message });
  }
};

/// Sanity check these fields.
const validateCustomer = (
  name: unknown,
  phoneNumber: unknown,
  email: unknown,
  address: unknown
) => {
  const check = (s: unknown) =>
    s !== undefined && typeof s === "string" && s.length > 5;
  return check(name) && check(phoneNumber) && check(email) && check(address);
};

/// Perform some sanity checks on the supplied product ids and quantities.
const validateCart = (cart: unknown) => {
  if (!(cart && Array.isArray(cart))) return false;

  for (let i = 0; i < cart.length; ++i) {
    if (!(cart[i].id && typeof cart[i].id !== "string")) return false;
    if (!(cart[i].quantity && typeof cart[i].quantity !== "number"))
      return false;
  }
  return true;
};

export default withIronSessionApiRoute(createOrderRoute, sessionOptions);
