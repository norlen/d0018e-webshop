import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@lib/session";
import { changeOrderStatus } from "@lib/db";
import {
  ApiResponse,
  writeErrorResponse,
  getAuth,
  AdminRequiredError,
} from "@lib/api";
import Joi from "joi";

const changeOrderSchema = Joi.object({
  orderId: Joi.number().min(0).required(),
  newOrderStatus: Joi.number().min(0).max(5).required(),
});

/// Updates the order status of a single order.
///
/// Administrator privileges are required to call this.
const orderUpdateRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<void>>
) => {
  try {
    if (!getAuth(req).isAdmin) {
      throw AdminRequiredError();
    }

    const { orderId, newOrderStatus } = await changeOrderSchema.validateAsync(
      req.body
    );
    await changeOrderStatus(newOrderStatus, orderId);

    res.status(200).json({});
  } catch (error) {
    writeErrorResponse(res, error as Error);
  }
};

export default withIronSessionApiRoute(orderUpdateRoute, sessionOptions);
