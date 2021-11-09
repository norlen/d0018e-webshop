import create_client from "./create_client";

export const getProductById = async (id: string) => {
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

  const client = create_client();
  let products = undefined;
  try {
    await client.connect();
    const res = await client.query(sql, [id]);
    if (res.rows.length > 0) {
      products = res.rows[0];
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
  return products;
};

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

  const client = create_client();
  let products = [];
  try {
    await client.connect();
    const res = await client.query(sql);
    products = res.rows;
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
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

  const client = create_client();
  let products = [];
  try {
    await client.connect();
    const res = await client.query(sql, [category.toLowerCase()]);
    products = res.rows;
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
  return products;
};
