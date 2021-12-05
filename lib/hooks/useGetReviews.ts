import useSWR from "swr";
import { ReviewData } from "@lib/db";
import { fetcher } from "@lib/util";

export type ReviewRequest = {
  data: ReviewData[];
};

export const useGetReviews = (productId: string) => {
  const { data: reviews, mutate: mutateReviews } = useSWR(
    `/api/get_reviews/${productId}`,
    fetcher
  );

  return { reviews, mutateReviews };
};

export default useGetReviews;
