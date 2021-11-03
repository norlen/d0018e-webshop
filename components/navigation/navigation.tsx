import Link from "next/link";
import { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { classNames } from "@lib/util";

import Cart from "@components/cart/cart";

const navigation = {
  categories: [
    {
      id: "greens",
      name: "Frukt och Grönt",
      featured: [
        {
          name: "Senaste",
          href: "#",
          imageSrc:
            "https://images.unsplash.com/photo-1506277548624-5d9498cde122?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2676&q=80",
          imageAlt: "Äpplen från en lokal producent",
        },
        {
          name: "Populärt - Mixlåda",
          href: "#",
          imageSrc:
            "https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2574&q=80",
          imageAlt: "En blanding av olika frukter",
        },
      ],
      sections: [
        {
          id: "fruit",
          name: "Frukt/Grönt",
          items: [
            // { name: "Mixlådor", href: "#" },
            { name: "Äpplen", href: "/kategori/apple" },
            { name: "Päron", href: "/kategori/paron" },
            { name: "Tomater", href: "/kategori/tomater" },
            { name: "Rotfrukter", href: "/kategori/rotfrukter" },
            { name: "Sallad", href: "/kategori/sallad" },
            // { name: "T-Shirts", href: "#" },
            // { name: "Jackets", href: "#" },
            // { name: "Activewear", href: "#" },
            { name: "Visa alla", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Mixlådor",
          items: [
            { name: "Blandade frukter", href: "/produkt/fruktmix" },
            { name: "Rotfruktslådor", href: "/produkt/rotfruktsmix" },
            { name: "Middagslådan", href: "/middagsmix" },
            // { name: "Sunglasses", href: "#" },
            // { name: "Hats", href: "#" },
            // { name: "Belts", href: "#" },
          ],
        },
        {
          id: "producers",
          name: "Producenter",
          items: [
            { name: "Sebbes gård", href: "/producent/sebbemannen" },
            { name: "My Way", href: "#" },
            { name: "Re-Arranged", href: "#" },
            { name: "Counterfeit", href: "#" },
            { name: "Significant Other", href: "#" },
          ],
        },
      ],
    },
    {
      id: "meat",
      name: "Kött",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "Artwork Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg",
          imageAlt:
            "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
        },
      ],
      sections: [
        // {
        //   id: "clothing",
        //   name: "Clothing",
        //   items: [
        //     { name: "Tops", href: "#" },
        //     { name: "Pants", href: "#" },
        //     { name: "Sweaters", href: "#" },
        //     { name: "T-Shirts", href: "#" },
        //     { name: "Jackets", href: "#" },
        //     { name: "Activewear", href: "#" },
        //     { name: "Browse All", href: "#" },
        //   ],
        // },
        // {
        //   id: "accessories",
        //   name: "Accessories",
        //   items: [
        //     { name: "Watches", href: "#" },
        //     { name: "Wallets", href: "#" },
        //     { name: "Bags", href: "#" },
        //     { name: "Sunglasses", href: "#" },
        //     { name: "Hats", href: "#" },
        //     { name: "Belts", href: "#" },
        //   ],
        // },
        // {
        //   id: "brands",
        //   name: "Brands",
        //   items: [
        //     { name: "Re-Arranged", href: "#" },
        //     { name: "Counterfeit", href: "#" },
        //     { name: "Full Nelson", href: "#" },
        //     { name: "My Way", href: "#" },
        //   ],
        // },
      ],
    },

   /*  { id: "about",
    name: "Om oss",
    featured: [
      {
        name: "New Arrivals",
        href: "#",
        imageSrc:
          "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
        imageAlt:
          "Drawstring top with elastic loop closure and textured interior padding.",
      },
      {
        name: "Artwork Tees",
        href: "#",
        imageSrc:
          "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg",
        imageAlt:
          "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
      },
    ],
    sections: [
    ],
  } */


  ],
  pages: [
    { name: "Producenter", href: "../producenter" },
    { name: "Om oss", href: "../om-oss" },
  ],
};
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
                  className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Links */}
              <Tab.Group as="div" className="mt-2">
                <div className="border-b border-gray-200">
                  <Tab.List className="-mb-px flex px-4 space-x-8">
                    {navigation.categories.map((category) => (
                      <Tab
                        key={category.name}
                        className={({ selected }) =>
                          classNames(
                            selected
                              ? "text-indigo-600 border-indigo-600"
                              : "text-gray-900 border-transparent",
                            "flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium"
                          )
                        }
                      >
                        {category.name}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>
                <Tab.Panels as={Fragment}>
                  {navigation.categories.map((category) => (
                    <Tab.Panel
                      key={category.name}
                      className="pt-10 pb-8 px-4 space-y-10"
                    >
                      <div className="grid grid-cols-2 gap-x-4">
                        {category.featured.map((item) => (
                          <div
                            key={item.name}
                            className="group relative text-sm"
                          >
                            <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                              <img
                                src={item.imageSrc}
                                alt={item.imageAlt}
                                className="object-center object-cover"
                              />
                            </div>
                            <Link href={item.href}>
                              <a
                                href={item.href}
                                className="mt-6 block font-medium text-gray-900"
                              >
                                <span
                                  className="absolute z-10 inset-0"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </a>
                            </Link>

                            <p aria-hidden="true" className="mt-1">
                              Shop now
                            </p>
                          </div>
                        ))}
                      </div>
                      {category.sections.map((section) => (
                        <div key={section.name}>
                          <p
                            id={`${category.id}-${section.id}-heading-mobile`}
                            className="font-medium text-gray-900"
                          >
                            {section.name}
                          </p>
                          <ul
                            role="list"
                            aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                            className="mt-6 flex flex-col space-y-6"
                          >
                            {section.items.map((item) => (
                              <li key={item.name} className="flow-root">
                                <Link href={item.href}>
                                  <a
                                    href={item.href}
                                    className="-m-2 p-2 block text-gray-500"
                                  >
                                    {item.name}
                                  </a>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                {navigation.pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <Link href={page.href}>
                      <a
                        href={page.href}
                        className="-m-2 p-2 block font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </Link>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                <div className="flow-root">
                  <Link href="#">
                    <a className="-m-2 p-2 block font-medium text-gray-900">
                      Sign in
                    </a>
                  </Link>
                </div>
                <div className="flow-root">
                  <Link href="#">
                    <a className="-m-2 p-2 block font-medium text-gray-900">
                      Create account
                    </a>
                  </Link>
                </div>
              </div>
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
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <a>
                    <span className="sr-only">Workflow</span>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark.svg?color=green&shade=600"
                      alt=""
                    />
                  </a>
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="h-full flex space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-gray-700 hover:text-gray-800",
                                "relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px"
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute top-full inset-x-0 text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

                              <div className="relative bg-white">
                                <div className="max-w-7xl mx-auto px-8">
                                  <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div
                                          key={item.name}
                                          className="group relative text-base sm:text-sm"
                                        >
                                          <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-center object-cover"
                                            />
                                          </div>
                                          <Link href={item.href}>
                                            <a className="mt-6 block font-medium text-gray-900">
                                              <span
                                                className="absolute z-10 inset-0"
                                                aria-hidden="true"
                                              />
                                              {item.name}
                                            </a>
                                          </Link>

                                          <p
                                            aria-hidden="true"
                                            className="mt-1"
                                          >
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p
                                            id={`${section.name}-heading`}
                                            className="font-medium text-gray-900"
                                          >
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li
                                                key={item.name}
                                                className="flex"
                                              >
                                                <Link href={item.href}>
                                                  <a className="hover:text-gray-800">
                                                    {item.name}
                                                  </a>
                                                </Link>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <Link href={page.href} key={page.name}>
                      <a className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                        {page.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Link href="#">
                    <a className="text-sm font-medium text-gray-700 hover:text-gray-800">
                      Sign in
                    </a>
                  </Link>

                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  <Link href="#">
                    <a className="text-sm font-medium text-gray-700 hover:text-gray-800">
                      Create account
                    </a>
                  </Link>
                </div>

                {/* Search */}
                {/* <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <SearchIcon className="w-6 h-6" aria-hidden="true" />
                  </a>
                </div> */}

                {/* Cart */}
                <Cart />
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navigation;
