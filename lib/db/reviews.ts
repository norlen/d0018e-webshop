import { getMultipleRows, getSingleRow, run } from "./connection";

export type ReviewData = {
  id: string;
  name: string;
  grade: number;
  comment: string;
  created_at: string;
};

export type AddReviewData = {
  id: string;
  comment: string;
  grade: number;
  created_at: string;
};

export const addReview = async (
  userId: string,
  productId: string,
  comment: string,
  grade: number
): Promise<AddReviewData | undefined> => {
  const sql = `
    INSERT INTO review (
      user_id,
      product_id,
      comment,
      grade
    )
    VALUES
      ($1, $2, $3, $4)
      RETURNING id, comment, grade, TO_CHAR(created_at, 'YYYY Mon DD HH24:MI') AS created_at;
    `;
  let data = undefined;
  await run(async (client) => {
    const res = await client.query(sql, [userId, productId, comment, grade]);
    if (res.rows.length > 0) {
      data = res.rows[0];
    }
  });
  return data;
};

export const removeReview = async (userId: string, productId: string) => {
  const sql = `
    DELETE FROM review
    WHERE
      user_id = $1 AND
      product_id = $2;
    `;

  await run(async (client) => {
    await client.query(sql, [userId, productId]);
  });
};

export const getAllProductReviews = async (
  productId: string
): Promise<ReviewData[]> => {
  const sql = `
  SELECT us.name,
         re.grade,
         re.comment,
         TO_CHAR(re.created_at, 'YYYY Mon DD HH24:MI') created_at
  FROM review AS re
    INNER JOIN users AS us ON us.id = re.user_id
  WHERE re.product_id = $1
  ORDER BY
     re.created_at DESC;`;

  return await getMultipleRows(sql, [productId]);
};

export const getLatestProductReview = async (
  productId: string
): Promise<ReviewData | undefined> => {
  const sql = `
  SELECT re.created_at
  FROM review AS re
  WHERE re.product_id = $1
  ORDER BY
    re.created_at DESC
  FETCH FIRST ROW ONLY;`;

  return await getSingleRow(sql, [productId]);
};
