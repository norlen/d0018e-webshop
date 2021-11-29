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
import { updateProduct } from "@lib/db";

const schema = Joi.object({
  id: Joi.number().min(0).required(),
  name: Joi.string().min(1).required(),
  quantity: Joi.number().min(0).required(),
  description: Joi.string().min(1).required(),
  price: Joi.number().min(1).required(),
});

/// Updates a product with new information.
///
/// Administrator privileges is required to call this.
const productUpdateRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<void>>
) => {
  try {
    if (!getAuth(req).isAdmin) {
      throw AdminRequiredError();
    }

    const { id, name, description, price, quantity } =
      await schema.validateAsync(req.body);

    const success = await updateProduct(id, name, quantity, description, price);
    if (!success) {
      throw ApiInternalError();
    }

    res.status(200).json({ success: true });
  } catch (error) {
    writeErrorResponse(res, error as Error);
  }
};

export default withIronSessionApiRoute(productUpdateRoute, sessionOptions);
