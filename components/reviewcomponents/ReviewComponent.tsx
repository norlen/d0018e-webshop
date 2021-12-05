import { ReviewData } from "@lib/db";
import { useAddThenFetchReview } from "@lib/hooks";
import { useState } from "react";
import Reviews from "@components/reviewcomponents/Reviews";
import AddReview from "@components/reviewcomponents/AddReview";
import PopUp from "@components/reviewcomponents/PopUp";

type Props = {
  product_id: string;
  reviews: ReviewData[];
};

function ReviewComponent({ product_id, reviews }: Props) {
  const { loading, error, getReviewData } = useAddThenFetchReview();

  const [PopUpState, setPopState] = useState(false);
  const [grade, setGrade] = useState<number>();
  const [comment, setComment] = useState<string>("");
  const [fetchedReviews, setReviews] = useState<ReviewData[]>(reviews);

  const productId = product_id;

  const updateGrade = (thegrade: number) => {
    setGrade(thegrade);
  };
  const updateComment = (thecomment: string) => {
    setComment(thecomment);
  };

  const validateGrade = (grade: number | undefined): boolean => {
    if (grade === undefined) {
      return false;
    } else if (grade >= 0 || grade < 6) {
      return true;
    }
    return false;
  };

  const canSubmit = validateGrade(grade) && comment.length > 5;

  const onSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Nu submittas de");
    if (!canSubmit) return;

    const sentReviews: ReviewData[] = await getReviewData(
      productId,
      grade as number,
      comment
    );
    setReviews(sentReviews);
    setPopState(!PopUpState);
  };

  const onClick = () => {
    console.log("click");
    setPopState(!PopUpState);
  };

  return (
    <div>
      <div className="pt-8 pb-6 mx-auto max-w-full md:max-w-5xl">
        <div className="flex gap-4 bg-white rounded-lg overflow-auto">
          <div className="w-96 h-auto rounded-l-lg overflow-hidden relative">
            <AddReview onClick={onClick} />
          </div>
          <div className="flex flex-col justify-evenly w-10/12 pr-8 py-4">
            {fetchedReviews.length > 0 ? (
              <Reviews rews={fetchedReviews} />
            ) : (
              <p className="text-center text-green-500 font-sans font-bold text-base">
                Inga recensioner för tillfället.
              </p>
            )}
          </div>
        </div>
      </div>
      <PopUp
        visible={PopUpState}
        onClick={onClick}
        onSubmit={onSubmit}
        updateGrade={updateGrade}
        updateComment={updateComment}
        loading={loading}
        error={error}
        canSubmit={canSubmit}
      />
    </div>
  );
}

export default ReviewComponent;
