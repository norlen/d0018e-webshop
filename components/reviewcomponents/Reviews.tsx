import Review from "@components/reviewcomponents/Review";
import { ReviewData } from "@lib/db";

function Reviews({ rews }: any) {
  return (
    <div className="space-y-4 pl-16">
      <div className="flow-root overflow-auto">
        {rews.map((review: ReviewData) => {
          return (
            <Review
              key={review.id}
              name={review.name}
              grade={review.grade}
              comment={review.comment}
              created_at={review.created_at}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Reviews;
