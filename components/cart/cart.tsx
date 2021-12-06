import Link from "next/link";
import { Fragment, useState } from "react";
import { ShoppingBagIcon } from "@heroicons/react/outline";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { useCart } from "@lib/hooks";

import CartItem from "./cartItem";

const Cart = () => {
  const [open, setOpen] = useState(false);
  const { cart, mutateCart } = useCart();

  return (
    <div className="">
      <button className="group flex items-center" onClick={() => setOpen(true)}>
        <ShoppingBagIcon
          className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-green-500"
          aria-hidden="true"
        />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-green-500">
          {cart.length}
        </span>
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden"
          onClose={setOpen}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300 sm:duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300 sm:duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="w-screen max-w-md">
                  <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                    <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Kundvagn
                        </Dialog.Title>
                        <div className="ml-3 h-7 flex items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-green-500"
                            onClick={() => setOpen(false)}
                          >
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {cart.map((product) => (
                              <li key={product.name} className="py-6 flex">
                                <CartItem
                                  item={product}
                                  setOpen={setOpen}
                                  mutateCart={mutateCart}
                                />
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Totalt</p>
                        <p>
                          {cart
                            .map((i) => i.price * i.amount)
                            .reduce((acc, v) => acc + v, 0)}{" "}
                          kr
                        </p>
                      </div>
                      <div className="mt-6">
                        <Link href="/kassa">
                          <a
                            className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-500 hover:bg-green-700"
                            onClick={() => setOpen(false)}
                          >
                            Till kassan
                          </a>
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                        <p>
                          eller{" "}
                          <button
                            type="button"
                            className="text-green-500 font-medium hover:text-green-700"
                            onClick={() => setOpen(false)}
                          >
                            Fortsätt handla
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default Cart;
