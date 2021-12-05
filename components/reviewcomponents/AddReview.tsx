import Button from "@components/reviewcomponents/Button";

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
      <Button color="green" onClick={onClick} text="Skriv en recension" />
    </div>
  );
}

export default AddReview;
