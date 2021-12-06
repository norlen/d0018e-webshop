type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

function AddReview({ onClick }: Props) {
  return (
    <div className="p-3 w-80 object-left-top">
      <p className="text-xl text-left p-2 font-semibold ">Dela dina insikter</p>
      <p className="text-left p-2 font-normal text-sm">
        Om du har använt denna produkt, dela gärna vad du tycker med övriga
        kunder.
      </p>
      <button
        className={`bg-green-500 w-60 text-center hover:bg-green-700 rounded-lg text-white py-2 px-3 font-medium`}
        onClick={onClick}
      >
        Skriv en recension
      </button>
    </div>
  );
}

export default AddReview;
