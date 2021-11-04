import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";

import type { NextPage } from "next";
import type { Product } from "@lib/types";

type StaticProps = {
  category: string;
  products: Product[];
};

const Category: NextPage<StaticProps> = ({ category, products }) => {
  return (
    <>
      <Head>
        <title>Sebbes butik - {category}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>Kategori: {category}</div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!(params && params.category)) {
    return { notFound: true };
  }

  // Fetch data from DB.

  return {
    props: { category: params.category },
    revalidate: 60,
  };
};

export default Category;
