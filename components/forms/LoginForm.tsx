import { FormEvent } from "react";
import Link from "next/link";

export default function Form({
  errorMessage,
  onSubmit,
}: {
  errorMessage: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="h-screen bg-white relative flex flex-col space-y-10 justify-center items-center">
      <div className="bg-white md:shadow-lg shadow-none rounded p-6 w-96">
        <h1 className="text-3xl font-bold leading-normal">Logga in</h1>
        <p className="text-sm leading-normal">för att kunna börja handla.</p>
        <form className="space-y-5 mt-5" onSubmit={onSubmit}>
          <div className="mb-4 relative">
            <input
              id="email"
              placeholder="Email"
              className="w-full rounded px-3 border border-gray-500 pt-5 pb-2 focus:outline-none input active:outline-none autofocus"
              type="text"
            />
          </div>
          <div className="relative flex items-center border border-gray-500 focus:ring focus:border-blue-500 rounded">
            <input
              id="password"
              placeholder="Lösenord"
              className="w-full rounded px-3 pt-5 outline-none pb-2 focus:outline-none active:outline-none input active:border-blue-500"
              type="password"
            />
          </div>
          <div className="-m-2">
            <a
              className="font-bold text-green-500 hover:bg-green-200 hover:underline hover:p-5 p-2 rounded-full"
              href="#"
            >
              Glömt lösenord?
            </a>
          </div>
          <button className="w-full text-center bg-green-500 hover:bg-green-900 rounded-full text-white py-3 font-medium">
            Logga in
          </button>
        </form>
      </div>
      <p>
        Har du inget konto?
        <a
          className="text-green-500 font-bold hover:bg-green-200 hover:underline hover:p-5 p-2 rounded-full"
          href="#"
        >
          Bli medlem
        </a>
      </p>
    </div>
  );
}
