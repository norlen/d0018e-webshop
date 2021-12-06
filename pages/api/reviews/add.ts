import { NextApiRequest, NextApiResponse } from "next";
import { addReview } from "@lib/db/reviews";
import { sessionOptions } from "lib/session";
import { withIronSessionApiRoute } from "iron-session/next";
import Joi from "joi";
import {
  writeErrorResponse,
  ApiResponse,
  getAuth,
  ApiInternalError,
} from "@lib/api";

type AddReviewResponse = {
  id: string;
  name: string;
  grade: number;
  comment: string;
  created_at: string;
};

const schema = Joi.object({
  productId: Joi.number().min(0).required(),
  grade: Joi.number().min(0).max(5).required(),
  comment: Joi.string().min(5).max(1000).required(),
});

const createReview = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<AddReviewResponse>>
) => {
  try {
    const { id: userId, name } = getAuth(req);

    const { productId, grade, comment } = await schema.validateAsync(req.body);

    // id och created at
    const data = await addReview(userId, productId, comment, grade);
    if (data === undefined) {
      throw ApiInternalError();
    }

    res.status(200).json({
      success: true,
      data: { ...data, name },
    });
  } catch (error) {
    writeErrorResponse(res, error as Error);
  }
};

export default withIronSessionApiRoute(createReview, sessionOptions);
