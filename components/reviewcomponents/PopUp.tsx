import { useAddReview } from "@lib/hooks";
import { useState } from "react";
import { ReviewData } from "@lib/db";
import Error from "@components/error/error";

type Props = {
  productId: string;
  onAddedReview: (review: ReviewData) => void;
};

function PopUp({ productId, onAddedReview }: Props) {
  const { loading, error, addReview } = useAddReview();

  const [grade, setGrade] = useState(0);
  const [comment, setComment] = useState("");

  const onSubmit = async () => {
    const result = await addReview({
      productId,
      grade,
      comment,
    });
    if (result.success) {
      onAddedReview(result);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="relative w-full mb-3">
        <input
          type="number"
          className="input w-full rounded-lg px-4 py-2 border border-gray-500 focus:outline-none focus:border-green-500 active:outline-none"
          placeholder="Betyg: (0 - 5)"
          onChange={(e) => setGrade(parseInt(e.target.value))}
        />
      </div>

      <div className="relative w-full mb-3">
        <input
          type="text"
          className="input w-full rounded-lg px-4 py-6 border border-gray-500 focus:outline-none focus:border-green-500 active:outline-none h-30"
          placeholder="Kommentar"
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <button
        className={`w-full text-center bg-green-500 hover:bg-green-700 rounded-lg text-white py-2 px-4 font-medium ${
          loading ? "disable opacity-50 hover:bg-green-500" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Skapar recension..." : "Skapa recension"}
      </button>
      <Error message={error} />
      {error && (
        <span className="bg-red-200 rounded-md text-center py-1 text-sm border-red-500 border mt-2 w-full">
          {error}
        </span>
      )}
    </form>
  );
}

export default PopUp;
