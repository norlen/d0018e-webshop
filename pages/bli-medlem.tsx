import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { useSignup, useUser } from "@lib/hooks";
import { classNames } from "@lib/util";

import { Button, Error, InputContainer } from "@components/common";
import LoginImage from "../assets/dan-cristian-padure-mIyZDPhuyY0-unsplash.jpg";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const MemberPage: NextPage = () => {
  // Redirect if already signed in.
  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });

  const { loading, error, signup } = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onTouched" });

  const onSubmit = handleSubmit(async ({ name, email, password }) => {
    const user = await signup({ name, email, password });
    if (user.success) {
      mutateUser(user);
    }
  });

  return (
    <>
      <Head>
        <title>Sebbes ekologiska - Bli medlem</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-4xl my-8">
        <div className="hidden lg:block lg:w-1/2 relative h-full -mb-2">
          <Image
            src={LoginImage}
            alt="Login"
            aria-hidden={true}
            width={448}
            height={560}
            className="object-cover"
          />
        </div>

        <div className="w-full px-6 py-4 md:px-8 lg:w-1/2 flex flex-col gap-4">
          <div className="mt-4">
            <h1 className="text-2xl font-semibold text-center text-green-500 dark:text-white">
              Sebastians ekologiska
            </h1>
            <p className="text-center text-gray-600 dark:text-gray-200">
              Vad roligt du vill vara med och hjälpa världen
            </p>
          </div>

          <form className="flex flex-col gap-6 w-full" onSubmit={onSubmit}>
            <InputContainer name="namn" label="Namn" error={errors.name}>
              <input
                type="text"
                placeholder="Namn"
                className={classNames(
                  "se-input autofocus",
                  errors.name ? "border-red-300" : "focus:border-green-500"
                )}
                {...register("name", {
                  required: "Namn måste finnas",
                  minLength: {
                    value: 5,
                    message: "Namn måste vara minst 5 tecken",
                  },
                  maxLength: {
                    value: 100,
                    message: "Namn får högst vara 100 tecken",
                  },
                })}
                aria-invalid={errors.name ? "true" : "false"}
              />
            </InputContainer>
            <InputContainer name="email" label="Email" error={errors.email}>
              <input
                type="email"
                placeholder="Email"
                className={classNames(
                  "se-input",
                  errors.email ? "border-red-300" : "focus:border-green-500"
                )}
                {...register("email", {
                  required: "Email måste finnas",
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Adressen har inte ett giltigt format",
                  },
                })}
                aria-invalid={errors.email ? "true" : "false"}
              />
            </InputContainer>

            <InputContainer
              name="password"
              label="Lösenord"
              error={errors.password}
            >
              <input
                type="password"
                placeholder="Lösenord"
                className={classNames(
                  "se-input",
                  errors.password ? "border-red-300" : "focus:border-green-500"
                )}
                {...register("password", {
                  required: "Lösenord måste finnas",
                  minLength: {
                    value: 5,
                    message: "Lösenord måste vara minst 5 tecken",
                  },
                  maxLength: {
                    value: 100,
                    message: "Lösenord får högst vara 100 tecken",
                  },
                })}
                aria-invalid={errors.password ? "true" : "false"}
              />
            </InputContainer>

            <Button
              disabled={!isValid}
              text="Bli medlem"
              loadingText="Skapar konto..."
              loading={loading}
              className="mt-4"
            />
            <Error message={error} />
          </form>

          <div className="flex-grow"></div>

          <div className="border-t border-green-300 w-full flex flex-col items-center">
            <p className="mt-4 text-sm font-light">
              Är du redan medlem?
              <Link href="/login">
                <a className="ml-2 text-green-500 font-medium hover:text-green-700">
                  Logga in
                </a>
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default MemberPage;
