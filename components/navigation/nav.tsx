import Link from "next/link";
import Image from "next/image";

import { useUser } from "@lib/hooks";

import Cart from "@components/cart/cart";
import { fetcher } from "@lib/util";
import { useRouter } from "next/router";

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

    /*     {
      id: "addproduct",
      name: "Lägg till produkt",
      href: "/produkt/läggtillprodukt",
    }, */
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

const Navigation = () => {
  const { user, mutateUser } = useUser();
  const router = useRouter();

  return (
    <nav className="px-8 h-16 flex items-center gap-8 border-b border-gray-100 bg-white">
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

      <div className="ml-auto flex items-center gap-4">
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
                      router.push("/produkt/laggtillprodukt");
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
