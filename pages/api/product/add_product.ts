import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

import { sessionOptions } from "@lib/session";
import {
  writeErrorResponse,
  ApiResponse,
  getAuth,
  AdminRequiredError,
  ApiInternalError,
} from "@lib/api";
import Joi from "joi";
import { addProduct } from "@lib/db";

type Data = {
  message?: string;
};

const schema = Joi.object({
  name: Joi.string().min(1).required(),
  category: Joi.number().min(0).required(),
  quantity: Joi.number().min(0).required(),
  price: Joi.number().min(0).required(),
  description: Joi.string(),
  producer: Joi.number().min(0).required(),
  image_url: Joi.string().min(1).required(),
});

/// Creates a new product.
///
/// Administrator privileges is required to call this.
const getProductRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<void>>
) => {
  try {
    if (!getAuth(req).isAdmin) {
      throw AdminRequiredError();
    }

    const {
      name,
      category,
      quantity,
      price,
      description,
      producer,
      image_url,
    } = await schema.validateAsync(req.body);

    // db add product
    const succes = await addProduct(
      name,
      category,
      quantity,
      price,
      description,
      producer,
      image_url
    );
    if (!succes) {
      throw ApiInternalError();
    }
    res.status(200).json({ success: true });
  } catch (error) {
    writeErrorResponse(res, error as Error);
  }
};

export default withIronSessionApiRoute(getProductRoute, sessionOptions);
