import { getSingleRow, getMultipleRows, run } from "./connection";

export type Product = {
  id: string;
  name: string;
  description: string;
  quantity: string;
  price: string;
  image_url: string;
  category: string;
  producer: string;
};

// returns boolean to indicate if an update was made or not.
export const updateProduct = async (
  id: string,
  name: string,
  quantity: string,
  description: string,
  price: string
) => {
  const sql = `
    UPDATE Products
    SET name = $1, quantity = $2, price = $3, description = $4
    WHERE id = $5
    RETURNING id;
    `;
  let successfulUpdate: boolean = false;
  const result = await run(async (client) => {
    const res = await client.query(sql, [
      name,
      quantity,
      price,
      description,
      id,
    ]);
    if (res.rows[0] != undefined) {
      successfulUpdate = true;
    }
  });
  return successfulUpdate;
};

export const getProductById = async (
  id: string
): Promise<Product | undefined> => {
  const sql = `
  SELECT p.id,
         p.name,
         p.description,
         p.quantity,
         p.price,
         p.image_url,
         c.name as category,
         pr.name as producer 
  FROM products AS p 
  JOIN category AS c on c.id = p.category_id
  JOIN producer AS pr on pr.id = p.producer_id 
  WHERE p.id = $1;`;

  return await getSingleRow(sql, [id]);
};

export const getProductsAll = async (): Promise<Product[]> => {
  const sql = `
  SELECT p.id,
         p.name,
         p.description,
         p.quantity,
         p.price,
         p.image_url,
         c.name as category,
         pr.name as producer
  FROM products as p
    JOIN category AS c on c.id = p.category_id
    JOIN producer AS pr on pr.id = p.producer_id;`;

  return await getMultipleRows(sql);
};

export const getProductsByCategory = async (
  category: string
): Promise<Product[]> => {
  const sql = `
  SELECT p.id,
         p.name,
         p.description,
         p.quantity,
         p.price,
         p.image_url,
         c.name as category,
         pr.name as producer
  FROM category as c
    JOIN products AS p on p.category_id = c.id
    JOIN producer AS pr on pr.id = p.producer_id
  WHERE
    c.name = $1;`;

  return await getMultipleRows(sql, [category.toLowerCase()]);
};
