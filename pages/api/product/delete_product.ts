import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import {
  writeErrorResponse,
  ApiResponse,
  getAuth,
  AdminRequiredError,
  ApiInternalError,
} from "@lib/api";
import Joi from "joi";
import { removeProduct } from "@lib/db";

const schema = Joi.object({
  id: Joi.number().min(0).required(),
});

/// Removes a product with new information.
///
/// Administrator privileges is required to call this.
const productDeleteRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<void>>
) => {
  try {
    if (!getAuth(req).isAdmin) {
      throw AdminRequiredError();
    }

    const { id } = await schema.validateAsync(req.body);

    await removeProduct(id);
    res.status(200).json({ success: true });
  } catch (error) {
    writeErrorResponse(res, error as Error);
  }
};

export default withIronSessionApiRoute(productDeleteRoute, sessionOptions);
