import { useReviews } from "@lib/hooks";
import { useState } from "react";
import CreateReview from "@components/reviews/create-review";
import { Dialog } from "@headlessui/react";
import Review from "./review";

type Props = {
  productId: string;
};

function ReviewComponent({ productId }: Props) {
  const { reviews, mutateReviews } = useReviews(productId);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col w-full gap-8 bg-white mt-4 rounded-lg px-4 py-4">
        <h1 className="text-green-500 text-xl">Kundrecensioner</h1>
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <Review
              key={review.id}
              name={review.name}
              grade={review.grade}
              comment={review.comment}
              created_at={review.created_at}
            />
          ))
        ) : (
          <p className="text-center text-green-500 font-sans font-bold text-base">
            Bli den första att recensera denna produkt!
          </p>
        )}
      </div>
      <div className="w-full flex flex-col gap-2 items-center bg-white mt-4 rounded-lg px-4 py-4">
        <h1 className="text-green-500 text-xl mt-2">
          Har du tankar om produkten? Dela dina insikter
        </h1>
        <div className="text-sm flex flex-col gap-1">
          <p className="">
            Vi ser väldigt gärna att du delar med dig dina tankar och
            funderingar.
          </p>
          <p>
            Var det här den <span className="font-bold">bästa</span> produkten
            du någonsin smakat? Eller var det ingen höjdare?
          </p>
          <p>
            Oavsett vad du tycker och tänker, dela gärna med dig så vi kan bli
            ännu bättre och hjälpa världen ännu mer.
          </p>
        </div>
        <button
          className={`bg-green-500 w-60 text-center hover:bg-green-700 rounded-lg text-white py-2 px-3 font-medium mt-2`}
          onClick={() => setIsOpen(true)}
        >
          Skriv en recension
        </button>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex flex-col gap-2 mb-4">
                <Dialog.Title className="text-center text-2xl font-medium text-green-500">
                  Skapa recension
                </Dialog.Title>
                <Dialog.Description className="text-center text-gray-700 text-sm">
                  Dela med dig av dina åsikter av produkten
                </Dialog.Description>
              </div>

              <CreateReview
                productId={productId}
                onAddedReview={(review) => {
                  mutateReviews([review, ...(reviews || [])]);
                  setIsOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default ReviewComponent;
