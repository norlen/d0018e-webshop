import create_client from "./create_client";

export type CartItem = {
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
  SELECT p.name,
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

  const client = create_client();
  let cart = [];
  try {
    await client.connect();
    const res = await client.query(sql, [id]);
    cart = res.rows;
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
  return cart;
};
