import { useReviews } from "@lib/hooks";
import { useState } from "react";
import Reviews from "@components/reviewcomponents/Reviews";
import AddReview from "@components/reviewcomponents/AddReview";
import PopUp from "@components/reviewcomponents/PopUp";
import { Dialog } from "@headlessui/react";

type Props = {
  productId: string;
};

function ReviewComponent({ productId }: Props) {
  const { reviews, mutateReviews } = useReviews(productId);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="pt-8 pb-6 mx-auto max-w-full md:max-w-5xl">
        <div className="flex gap-4 bg-white rounded-lg overflow-auto">
          <div className="w-96 h-auto rounded-l-lg overflow-hidden relative">
            <AddReview onClick={() => setIsOpen(true)} />
          </div>
          <div className="flex flex-col justify-evenly w-10/12 pr-8 py-4">
            {reviews && reviews.length > 0 ? (
              <Reviews rews={reviews} />
            ) : (
              <p className="text-center text-green-500 font-sans font-bold text-base">
                Inga recensioner för tillfället.
              </p>
            )}
          </div>
        </div>
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

              <PopUp
                productId={productId}
                onAddedReview={(review) =>
                  mutateReviews([...(reviews || []), review])
                }
              />

              {/* <button onClick={() => setIsOpen(false)}>Deactivate</button>
              <button onClick={() => setIsOpen(false)}>Cancel</button> */}
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default ReviewComponent;
