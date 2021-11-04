import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";

import type { NextPage } from "next";
import type { Product } from "@lib/types";

type StaticProps = {
  products: Product[];
};

const Home: NextPage<StaticProps> = ({ products }) => {
  return (
    <>
      <Head>
        <title>Sebbes butik</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>{/* ALL PRODUCTS GO HERE */}</div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Fetch data from DB.

  return {
    props: { products: [] },
    revalidate: 60,
  };
};

export default Home;
