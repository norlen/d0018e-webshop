import { useState } from "react";

export const useAddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const addProduct = async (
    name: string,
    category: string,
    quantity: string,
    price: string,
    description: string,
    producer: string,
    image_url: string
  ) => {
    setError(undefined); // Clear errors.
    console.log("ADDPRODUCT");
    console.log("name: " + name);
    console.log("category: " + category);
    console.log("quantity: " + quantity);
    console.log("price: " + price);
    console.log("desc: " + description);
    console.log("producer: " + producer);
    console.log("image_url: " + image_url);
    const url = "/api/add_product";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        category,
        quantity,
        price,
        description,
        producer,
        image_url,
      }),
    };

    try {
      setLoading(true);
      const response = await fetch(url, options);
      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        setError(data.message);
      }
      return data;
    } catch (err) {
      console.error("fetch error", err);
      setError((err as Error).message);
    }
  };

  return { loading, error, addProduct };
};

export default useAddProduct;
