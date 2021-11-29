import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

import { useUser, useLogin } from "@lib/hooks";

const LoginPage: NextPage = () => {
  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, login } = useLogin();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const data = await login({ email, password });
    if (data) {
      mutateUser(data);
    }
  };

  return (
    <>
      <Head>
        <title>Sebbes butik - Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-12 py-4 lg:py-8">
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col gap-4 rounded p-6 w-96 md:shadow-lg bg-white">
            <div>
              <h1 className="text-3xl font-bold">Logga in</h1>
              <p className="text-sm text-gray-500">
                för att kunna börja handla.
              </p>
            </div>

            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
              <input
                id="email"
                placeholder="Email"
                className="input w-full rounded-lg px-4 py-2 border border-gray-500 focus:outline-none focus:border-green-500 active:outline-none autofocus"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                id="password"
                placeholder="Lösenord"
                className="input w-full rounded-lg px-4 py-2 border border-gray-500 focus:outline-none focus:border-green-500 active:outline-none"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className={`w-full text-center bg-green-500 hover:bg-green-700 rounded-lg text-white py-2 px-4 font-medium ${
                  loading ? "disable opacity-50" : ""
                }`}
              >
                {loading ? "Loggar in..." : "Logga in"}
              </button>
              {error && (
                <span className="bg-red-200 rounded-md text-center py-1 text-sm border-red-500 border">
                  {error}
                </span>
              )}
              {/* <Link href="#">
                  <a className="font-medium text-green-500 hover:text-green-700 mx-auto">
                    Glömt lösenord?
                  </a>
                </Link> */}
            </form>
          </div>

          <p>
            Har du inget konto?
            <Link href="/bli-medlem">
              <a className="ml-2 text-green-500 font-medium hover:text-green-700">
                Bli medlem
              </a>
            </Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
