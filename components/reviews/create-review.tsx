import { useAddReview } from "@lib/hooks";
import { ReviewData } from "@lib/db";
import { Error, Button, InputError } from "@components/common";
import { useForm } from "react-hook-form";
import { RatingInput } from "./rating";
import { useState } from "react";

type Props = {
  productId: string;
  onAddedReview: (review: ReviewData) => void;
};

type FormData = {
  comment: string;
};

const CreateReview = ({ productId, onAddedReview }: Props) => {
  const { loading, error, addReview } = useAddReview();
  const [rating, setRating] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onChange" });

  const onSubmit = handleSubmit(async ({ comment }) => {
    const result = await addReview({
      productId,
      grade: Math.max(1, Math.min(5, rating)), // Clamp to [1,5].
      comment,
    });
    if (result.success) {
      onAddedReview(result);
    }
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <p className="block text-sm font-medium w-full text-gray-700">Betyg</p>
        <RatingInput rating={rating} setRating={setRating} />
      </div>

      <div className="flex flex-col gap-1">
        <label
          className="block text-sm font-medium w-full text-gray-700"
          htmlFor="comment"
        >
          Recension
        </label>
        <textarea
          id="comment"
          placeholder="Kommentar"
          className="se-input"
          {...register("comment", {
            required: "En recension måste finnas",
            minLength: { value: 5, message: "Skriv lite mer vad du tycker" },
            maxLength: {
              value: 1000,
              message: "Kommentaren är för lång, håll den under 1000 tecken",
            },
          })}
          aria-invalid={errors.comment ? "true" : "false"}
        />
        {errors.comment && <InputError>{errors.comment.message}</InputError>}
      </div>

      <Button
        text="Skapa recension"
        loadingText="Skapar recension..."
        loading={loading}
        disabled={!isValid}
      />
      <Error message={error} />
    </form>
  );
};

export default CreateReview;
