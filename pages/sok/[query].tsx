import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";

import type { NextPage } from "next";
import { searchProducts, Product } from "@lib/db";

import ProductSmall from "@components/products/productSmall";

type StaticProps = {
  query: string;
  products: Product[];
};

const ProductPage: NextPage<StaticProps> = ({ query, products }) => {
  return (
    <>
      <Head>
        <title>Sebbes ekologiska - {query}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="lg:px-12 py-4 lg:py-8">
        <div className="flex flex-wrap gap-10 justify-center">
          {products.map((product) => {
            return <ProductSmall key={product.id} product={product} />;
          })}
        </div>
      </main>
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
  if (!(params && params.query && typeof params.query === "string")) {
    return { notFound: true };
  }
  const { query } = params;

  const products = await searchProducts(query);
  return {
    props: { query, products },
    revalidate: 5,
  };
};

export default ProductPage;
