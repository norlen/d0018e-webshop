import Link from "next/link";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

const navigation = {
  pages: [
    {
      id: "fruits",
      name: "Frukt",
      href: "/kategori/frukt/",
    },
    {
      id: "vegetables",
      name: "Grönsaker",
      href: "/kategori/gronsaker/",
    },
    {
      id: "meat",
      name: "Kött",
      href: "/kategori/kott/",
    },
    // {
    //   id: "producers",
    //   name: "Producenter",
    //   href: "/producenter/",
    // },
    // {
    //   id: "about",
    //   name: "Om oss",
    //   href: "/om-oss",
    // },
  ],
};

const FEATURE_LOGIN = false;

const Navigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 pt-5 pb-2 flex">
                <button
                  type="button"
                  className="p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6 flex flex-col">
                {navigation.pages.map((page) => (
                  <Link href={page.href} key={page.name}>
                    <a className="font-medium text-gray-900">{page.name}</a>
                  </Link>
                ))}
              </div>

              {FEATURE_LOGIN && (
                <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                  <div className="flow-root">
                    <Link href="#">
                      <a className="-m-2 p-2 block font-medium text-gray-900">
                        Logga in
                      </a>
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link href="#">
                      <a className="-m-2 p-2 block font-medium text-gray-900">
                        Skapa konto
                      </a>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        {/* <p className="bg-indigo-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p> */}

        <nav aria-label="Top" className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="h-16 flex items-center">
              <button
                type="button"
                className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <Link href="/">
                <a className="ml-4 flex lg:ml-0">
                  <span className="sr-only">Home</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark.svg?color=green&shade=600"
                    alt=""
                  />
                </a>
              </Link>

              {/* Flyout menus */}
              <div className="ml-8 gap-8 hidden lg:flex">
                {navigation.pages.map((page) => (
                  <div key={page.name}>
                    <Link href={page.href}>
                      <a
                        id={`${page.name}-heading`}
                        className="font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </Link>
                  </div>
                ))}
              </div>

              <div className="ml-auto flex items-center">
                {FEATURE_LOGIN && (
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <Link href="#">
                      <a className="text-sm font-medium text-gray-700 hover:text-gray-800">
                        Logga in
                      </a>
                    </Link>

                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <Link href="#">
                      <a className="text-sm font-medium text-gray-700 hover:text-gray-800">
                        Skapa konto
                      </a>
                    </Link>
                  </div>
                )}

                {/* Cart */}
                {/* <Cart /> */}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navigation;
