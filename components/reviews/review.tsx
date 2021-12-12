import Rating from "./rating";
import { formatDistanceToNow } from "date-fns";
import { sv } from "date-fns/locale";

type Props = {
  name: string;
  grade: number;
  comment: string;
  created_at: string;
};

const Review = ({ name, grade, comment, created_at }: Props) => (
  <div className="">
    <div className="flex justify-between">
      <div className="flex flex-col">
        <p className="block font-semibold">{name}</p>
        <div className="">
          <Rating rating={grade} />
        </div>
      </div>

      <div>
        <p className="text-sm italic">
          {formatDistanceToNow(Date.parse(created_at), {
            addSuffix: true,
            locale: sv,
          })}
        </p>
      </div>
    </div>
    <p className="text-sm">{comment}</p>
  </div>
);

export default Review;
