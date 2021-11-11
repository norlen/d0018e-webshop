import Link from "next/link";

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
    // {
    //   id: "about",
    //   name: "Om oss",
    //   href: "/om-oss",
    // },
  ],
};

const Navigation = () => {
  // const [open, setOpen] = useState(false);

  return (
    <nav className="px-8 h-16 flex items-center gap-8 border-b border-gray-100">
      <Link href="/">
        <a className="">
          <span className="sr-only">Home</span>
          <img className="h-8 w-8" src="/images/Logo_small.jpeg" alt="Icon" />
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

      <div className="ml-auto flex items-center gap-4 hidden">
        <Link href="/login">
          <a className="text-sm font-medium text-gray-700 hover:text-green-500">
            Logga in
          </a>
        </Link>

        <span className="h-6 w-px bg-gray-200" aria-hidden="true" />

        <Link href="/bli-medlem">
          <a className="text-sm font-medium text-gray-700 hover:text-green-500">
            Bli medlem
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
