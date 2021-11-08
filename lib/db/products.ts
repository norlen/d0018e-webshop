import client from "./create_client";

export const getProductsAll = async () => {
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
  
  let products = [];
  try {
    client.connect();
    const res = await client.query(sql);
    products = res.rows;
  } catch (err) {
    console.error(err);
  } finally {
    client.end();
  }
  return products;
};

export const getProductsByCategory = async (category: string) => {
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
  
  let products = [];
  try {
    client.connect();
    const res = await client.query(sql, [category.toLowerCase()]);
    products = res.rows;
  } catch (err) {
    console.error(err);
  } finally {
    client.end();
  }
  return products;
};
