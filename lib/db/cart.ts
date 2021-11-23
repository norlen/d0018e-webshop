import { getMultipleRows, run } from "./connection";

export type CartItem = {
  id: string;
  name: string;
  in_stock: number;
  price: number;
  producer: string;
  category: string;
  image_url: string;
  quantity: number;
};

export const getCartByUserId = async (id: string): Promise<CartItem[]> => {
  const sql = `
  SELECT p.id,
         p.name,
         p.quantity > 0 AS in_stock,
         p.price,
         pr.name AS producer,
         c.name AS category,
         p.image_url,
         cart.quantity
  FROM cart
    INNER JOIN products AS p ON cart.product_id = p.id
    INNER JOIN category AS c ON p.category_id = c.id
    INNER JOIN producer AS pr ON p.producer_id = pr.id
  WHERE
    cart.user_id = $1;
  `;

  return await getMultipleRows(sql, [id]);
};

export const addToCart = async (
  userId: string,
  productId: string,
  quantity: number
): Promise<void> => {
  const sql = `
  INSERT INTO cart (
    user_id,
    product_id,
    quantity
  )
  VALUES
    ($1, $2, $3)
  ON CONFLICT (user_id, product_id) DO
    UPDATE SET quantity = cart.quantity + EXCLUDED.quantity;
  `;

  await run(async (client) => {
    await client.query(sql, [userId, productId, quantity]);
  });
};

export const removeFromCart = async (userId: string, productId: string) => {
  const sql = `
  DELETE FROM cart
  WHERE
    user_id = $1 AND
    product_id = $2;
  `;

  await run(async (client) => {
    await client.query(sql, [userId, productId]);
  });
};
