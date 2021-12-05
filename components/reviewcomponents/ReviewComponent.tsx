import { useGetReviews, useAddReview } from "@lib/hooks";
import { useState } from "react";
import Reviews from "@components/reviewcomponents/Reviews";
import AddReview from "@components/reviewcomponents/AddReview";
import PopUp from "@components/reviewcomponents/PopUp";

type Props = {
  product_id: string;
};

function ReviewComponent({ product_id }: Props) {
  const productId = product_id;
  const { reviews, mutateReviews } = useGetReviews(productId);
  const { loading, error, addReview } = useAddReview();

  const [PopUpState, setPopState] = useState(false);
  const [grade, setGrade] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

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
    if (!canSubmit) return;

    const receivedReview = await addReview({
      productId,
      grade,
      comment,
    });
    if (receivedReview) {
      mutateReviews(receivedReview);
    }

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
            {typeof reviews !== "undefined" ? (
              reviews.length > 0
            ) : false ? (
              <Reviews rews={reviews} />
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
