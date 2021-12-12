import { StarIcon } from "@heroicons/react/outline";
import { StarIcon as SolidStarIcon } from "@heroicons/react/solid";
import { useState } from "react";

type Props = {
  rating: number;
};

const idx = [1, 2, 3, 4, 5];

const Rating = ({ rating }: Props) => (
  <div className="flex">
    {rating < 1
      ? idx.map(() => <StarIcon className="w-4 h-4 text-gray-500" />)
      : idx.map((value) =>
          value <= rating ? (
            <SolidStarIcon className="w-4 h-4 text-yellow-300" />
          ) : (
            <StarIcon className="w-4 h-4 text-yellow-300" />
          )
        )}
  </div>
);

type RatingInputProps = {
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
};

export const RatingInput = ({ rating, setRating }: RatingInputProps) => {
  const updateRating = (value: number) => {
    if (value != rating) {
      setRating(value);
    }
  };

  return (
    <div className="flex">
      {idx.map((value) =>
        value <= rating ? (
          <SolidStarIcon
            className="w-4 h-4 text-yellow-300"
            onMouseOver={() => updateRating(value)}
            onClick={() => updateRating(value)}
          />
        ) : (
          <StarIcon
            className="w-4 h-4 text-yellow-300"
            onMouseOver={() => updateRating(value)}
            onClick={() => updateRating(value)}
          />
        )
      )}
    </div>
  );
};

export default Rating;
