import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";

import { useUser } from "@lib/hooks";
import { fetcher } from "@lib/util";

import Cart from "@components/cart/cart";

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
      href: "/kategori/grönsaker/",
    },
    {
      id: "meat",
      name: "Kött",
      href: "/kategori/kött/",
    },
    // {
    //   id: "producers",
    //   name: "Producenter",
    //   href: "/producenter/",
    // },
    {
      id: "about",
      name: "Om oss",
      href: "/om",
    },
  ],
};

const Navigation = () => {
  const { user, mutateUser } = useUser();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const search = () => {
    if (query.length > 0) {
      router.push(`/sok/${query}`);
    }
  };

  return (
    <nav className="px-8 h-16 flex items-center justify-between gap-8 border-b border-gray-100 bg-white shadow-sm">
      <div className="flex items-center gap-8">
        <Link href="/">
          <a className="">
            <span className="sr-only">Home</span>
            <Image
              height={32}
              width={32}
              src="/images/Logo_small.png"
              alt="Home"
            />
          </a>
        </Link>

        <div className="flex gap-8">
          {navigation.pages.map((page) => (
            <Link key={page.name} href={page.href}>
              <a className="font-medium text-gray-900 hover:text-green-500">
                {page.name}
              </a>
            </Link>
          ))}
        </div>
      </div>

      <form className="relative w-full max-w-xs" onSubmit={() => search()}>
        <input
          type="search"
          name="search"
          placeholder="Sök"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border border-gray-300 h-8 px-2 rounded-lg text-sm focus:outline-none pl-8 focus:ring-green-500 focus:border-green-500"
        />
        <SearchIcon
          className="absolute left-2 top-2 w-4 h-4 cursor-pointer text-gray-500 hover:text-green-700"
          type="submit"
        />
      </form>
      {/* 
      <div className="rounded-md h-8">
        <button className="absolute left-0 top-0 mt-5 mr-4 inline-flex items-center px-3 text-gray-500 text-sm">
          <SearchIcon className="w-4 h-4" />
        </button>
        <input
          type="text"
          name="search"
          id="search"
          className="block w-full sm:text-sm h-8 text-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Sök"
        />
        <input
          type="text"
          name="first-name"
          id="first-name"
          autoComplete="given-name"
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-full"
        />
      </div>

      <div className="pt-2 relative mx-auto text-gray-600">
        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder="Search"
        />
        <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
          <SearchIcon className="w-4 h-4" />
        </button>
      </div> */}

      <div className="flex items-center gap-4">
        {/* Show login and register button if user is not logged in, otherwise logout button. */}
        {user && user.isLoggedIn ? (
          <>
            {/* must wrap this in Link? */}
            <Link href="#">
              <a
                className="text-sm font-medium text-gray-700 hover:text-green-500"
                onClick={async (e) => {
                  e.preventDefault();
                  mutateUser(
                    await fetcher("/api/logout", { method: "POST" }),
                    false
                  );
                  router.push("/login");
                }}
              >
                Logga ut
              </a>
            </Link>
            <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
            <div className="flex items-center gap-8">
              <Link href="/order/orders">
                <a className="text-sm font-medium text-gray-700 hover:text-green-500">
                  Beställningar
                </a>
              </Link>
            </div>

            {/* Show cart if customer account*/}
            {user && user.isAdmin ? (
              <div className="ml-auto flex items-center gap-4">
                <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                <Link href="#">
                  <a
                    className="text-sm font-medium text-gray-700 hover:text-green-500"
                    onClick={async (e) => {
                      e.preventDefault();
                      router.push("/produkt/lagg-till");
                    }}
                  >
                    Lägg Till Produkter
                  </a>
                </Link>
              </div>
            ) : (
              <>
                <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                <Cart />
              </>
            )}
          </>
        ) : (
          <div className="flex items-center gap-8">
            <Link href="/bli-medlem">
              <a className="text-sm font-medium text-gray-700 hover:text-green-500">
                Bli medlem
              </a>
            </Link>

            <Link href="/login">
              <a className="text-sm font-medium text-gray-700 hover:text-green-500">
                Logga in
              </a>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
