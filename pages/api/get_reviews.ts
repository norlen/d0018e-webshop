import { NextApiRequest, NextApiResponse } from "next";
import { getAllProductReviews, ReviewData } from "@lib/db/reviews";
import { sessionOptions } from "lib/session";
import { withIronSessionApiRoute } from "iron-session/next";

type allRews = {
  data?: ReviewData[];
  message?: string;
};

const getReview = async (
  req: NextApiRequest,
  res: NextApiResponse<allRews>
) => {
  try {
    if (req.session.user && req.session.user.id) {
      if (!req.body.productId) {
        throw Error("invalid product id");
      }
      const { productId } = req.body;
      const reviews = await getAllProductReviews(productId);
      res.status(200).json({ data: reviews });
    } else {
      res.status(200).json({ data: [] });
    }
  } catch (error) {
    const message = (error as Error).message;
    console.error("ERROR getReview:", message);
    res.status(500).json({ message });
  }
};

export default withIronSessionApiRoute(getReview, sessionOptions);
