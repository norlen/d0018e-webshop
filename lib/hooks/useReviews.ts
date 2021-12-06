import useSWR from "swr";
import { ReviewData } from "@lib/db";
import { fetcher } from "@lib/util";

export type ReviewRequest = {
  data: ReviewData[];
};

export const useReviews = (productId: string) => {
  const { data: reviews, mutate: mutateReviews } = useSWR<ReviewData[]>(
    `/api/reviews/${productId}`,
    fetcher
  );

  return { reviews, mutateReviews };
};

export default useReviews;
