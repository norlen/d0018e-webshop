type Props = {
  name: string;
  grade: number;
  comment: string;
  created_at: string;
};

const Review = ({ name, grade, comment, created_at }: Props) => (
  <div className="md:container md:mx-auto box-border w-52 h-36 border-b-2 border-b-green-100 pt-4">
    <div>
      <p className="font-semibold">{name}</p>
    </div>
    <div>
      <p className="">
        <span>Betyg: </span>
        {grade}
        <span> av 5</span>
      </p>
    </div>
    <div className="break-words whitespace-normal pt-2">
      <p className="font-sans text-lg italic">{comment}</p>
    </div>
    <div>
      <p className="text-sm italic">{created_at}</p>
    </div>
  </div>
);

export default Review;
