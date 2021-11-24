import { useState } from "react";

export const useChangeOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const changeOrder = async (orderId: string, newOrderStatus: string) => {
    setError(undefined); // Clear errors.

    const url = "/api/change_order_status";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId, newOrderStatus }),
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

  return { loading, error, changeOrder };
};

export default useChangeOrder;
