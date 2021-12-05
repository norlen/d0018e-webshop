import { NextApiRequest, NextApiResponse } from "next";
import { addReview } from "@lib/db/reviews";
import { sessionOptions } from "lib/session";
import { withIronSessionApiRoute } from "iron-session/next";

type Data = {
  message?: string;
};

const createReview = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  try {
    if (!(req.session.user && req.session.user.id)) {
      throw Error("invalid user session");
    }
    const userId = req.session.user.id;

    if (!(req.body.productId && req.body.grade && req.body.comment)) {
      throw Error("invalid product id, grade or comment");
    }
    const { productId, grade, comment } = req.body;
    // Är lite osäker på om/hur vi kan verifiera att data verkligen satts in databasen och det har gått bra.
    await addReview(userId, productId, comment, grade);
    res.status(200).json({});
  } catch (error) {
    const message = (error as Error).message;
    console.error("ERROR createReview:", message);
    res.status(400).json({ message });
  }
};

export default withIronSessionApiRoute(createReview, sessionOptions);
