import React, { useState } from "react";
import useUser from "@lib/hooks/useUser";
import Form from "@components/forms/LoginForm";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";

type StaticProps = {};

const Login: NextPage<StaticProps> = () => {
  // here we just check if user is already logged in and redirect to profile
  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = useState("");
  async function handleSubmit(event: any) {
    event.preventDefault();

    const body = {
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    };

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw "new error";
      }
      const jsonData = await response.json();
      mutateUser(jsonData);
    } catch (error) {
      setErrorMsg((error as Error).message);
    }
  }
  return (
    <>
      <Head>
        <title>Sebbes butik - Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-12 py-4 lg:py-8">
        <div className="login">
          <Form errorMessage={errorMsg} onSubmit={handleSubmit} />
        </div>
      </main>
    </>
  );
};

export default Login;
