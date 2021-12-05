import { useState } from "react";

export const useFetchReviews = () => {
  const [error, setError] = useState<string | undefined>(undefined);

  const getReviewOnlyData = async (productId: string) => {
    const url = "/api/get_reviews";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    };
    try {
      const response = await fetch(url, options);
      const response_data = await response.json();

      if (!response.ok) {
        setError(response_data.message);
      }
      return response_data;
    } catch (err) {
      console.error("fetch error", err);
      setError((err as Error).message);
    }
  };
  return { error, getReviewOnlyData };
};
