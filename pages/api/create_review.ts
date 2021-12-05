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

// Valideringsschema, se https://joi.dev/api/?v=17.5.0#string
const schema = Joi.object({
  productId: Joi.number().min(0).required(),
});

const createReview = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<AddReviewResponse>>
) => {
  try {
    // Kastar error om användaren inte är inloggad.
    const userId = getAuth(req).id;

    // validera input
    const { productId, grade, comment } = await schema.validateAsync(req.body);

    // du kan ju returna review id här, så kan du skicka tillbaka det jag antar tillhör en review.
    // {
    //    id: ...,
    //    name: ...,
    //    productId: ...,
    //    comment: ...,
    //    grade: ...
    // }
    const id = await addReview(userId, productId, comment, grade);
    const data = await getReviewFromId(id);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    // Hjälpfunktion som returnerar ett error i formatet vi vill
    writeErrorResponse(res, error as Error);
  }
};

export default withIronSessionApiRoute(createReview, sessionOptions);
