import { NextApiRequest, NextApiResponse } from "next";
import { addReview, getReviewFromId } from "@lib/db/reviews";
import { sessionOptions } from "lib/session";
import { withIronSessionApiRoute } from "iron-session/next";
import Joi from "joi";
import { writeErrorResponse, ApiResponse, getAuth } from "@lib/api";

type AddReviewResponse = {
  id: string;
  name: string;
  grade: number;
  comment: string;
  created_at: string;
};

const schema = Joi.object({
  productId: Joi.number().min(0).required(),
});

const createReview = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<AddReviewResponse>>
) => {
  try {
    const userId = getAuth(req).id;

    const { productId, grade, comment } = await schema.validateAsync(req.body);

    const id = await addReview(userId, productId, comment, grade);
    const data = await getReviewFromId(id);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    writeErrorResponse(res, error as Error);
  }
};

export default withIronSessionApiRoute(createReview, sessionOptions);
