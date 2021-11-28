import { useState } from "react";

export const useChangeProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const changeProduct = async (
    id: string,
    name: string,
    quantity: string,
    description: string,
    price: string
  ) => {
    setError(undefined); // Clear errors.

    const url = "/api/change_product";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        name,
        quantity,
        description,
        price,
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
      return data.succesfulUpdate;
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return { loading, error, changeProduct };
};

export default useChangeProduct;
