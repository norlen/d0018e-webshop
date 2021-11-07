import client from "./create_client";

export const getProductsAll = async () => {
    try {
      const res = await client.query(
        "SELECT * FROM products;"
      );

      return res.rows;
    } catch (err) {
      console.error(err);
    }
    return [];
  };

export const getProductsByCategory = async (category: string) => {
  try {
    const query = 'SELECT * FROM Category c JOIN Products p ON c.id = p.category_id WHERE c.name=$1;';
    const res = await client.query(query, [category.toLowerCase()]);
    return res.rows;
  
  } catch (err) {
    console.error(err);
  }
  return [];
};
