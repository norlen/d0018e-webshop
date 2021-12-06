import { useAddReview } from "@lib/hooks";
import { ReviewData } from "@lib/db";
import { Error, Button, InputError } from "@components/common";
import { useForm } from "react-hook-form";

type Props = {
  productId: string;
  onAddedReview: (review: ReviewData) => void;
};

type FormData = {
  grade: number;
  comment: string;
};

function PopUp({ productId, onAddedReview }: Props) {
  const { loading, error, addReview } = useAddReview();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onTouched" });

  const onSubmit = handleSubmit(async ({ grade, comment }) => {
    const result = await addReview({
      productId,
      grade,
      comment,
    });
    if (result.success) {
      onAddedReview(result);
    }
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label
          className="block text-sm font-medium w-full text-gray-700"
          htmlFor="grade"
        >
          Betyg
        </label>
        <input
          id="grade"
          type="number"
          className="se-input autofocus"
          placeholder="Betyg: (0 - 5)"
          {...register("grade", {
            required: "Ett betyg måste sättas",
            min: { value: 0, message: "Minsta betyget som kan sättas är 0" },
            max: { value: 5, message: "Kan inte sätta betyg högre än 5" },
          })}
          aria-invalid={errors.grade ? "true" : "false"}
        />
        {errors.grade && <InputError>{errors.grade.message}</InputError>}
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
}

export default PopUp;
