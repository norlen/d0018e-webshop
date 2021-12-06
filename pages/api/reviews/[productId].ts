import { NextApiRequest, NextApiResponse } from "next";
import { getAllProductReviews, ReviewData } from "@lib/db/reviews";
import { sessionOptions } from "lib/session";
import { withIronSessionApiRoute } from "iron-session/next";
import Joi from "joi";

const schema = Joi.object({
  productId: Joi.number().min(0).required(),
});

const getReview = async (
  req: NextApiRequest,
  res: NextApiResponse<ReviewData[]>
) => {
  try {
    const { productId } = await schema.validateAsync(req.query);
    const reviews = await getAllProductReviews(productId);
    res.status(200).json(reviews);
  } catch (error) {
    const message = (error as Error).message;
    console.error("ERROR getReview:", message);
    res.status(500).json([]);
  }
};

export default withIronSessionApiRoute(getReview, sessionOptions);
