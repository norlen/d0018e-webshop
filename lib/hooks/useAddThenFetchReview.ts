import { useState } from "react";

export const useAddThenFetchReview = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const getReviewData = async (
    productId: string,
    grade: number,
    comment: string
  ) => {
    setError(undefined);

    const url = "/api/create_review";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, grade, comment }),
    };

    const url_two = "/api/get_reviews";
    const options_two = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    };

    try {
      setLoading(true);
      const response = await fetch(url, options);
      const response_data = await response.json();

      const response_two = await fetch(url_two, options_two);
      const response_two_data = await response_two.json();
      setLoading(false);

      if (!response.ok) {
        setError(response_data.message);
      }

      if (!response_two.ok) {
        setError(response_two_data.message);
      }
      return response_two_data;
    } catch (err) {
      console.error("fetch error", err);
      setError((err as Error).message);
    }
  };

  return { loading, error, getReviewData };
};

export default useAddThenFetchReview;
