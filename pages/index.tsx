import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";

import type { NextPage } from "next";
import type { Product } from "@lib/types";

import { getProductsAll } from "@lib/db";
import Link from "next/link"

type StaticProps = {
  products: Product[];
};

const ProductSmall = ({product}: {product: any}) => {
  return (
    <div className="flex gap-4 flex-col max-w-sm">
      <Link href={`/produkt/${product.id}`}>
        <a>
          <img src={product.image_url} />
        </a>
      </Link>
      <div className="flex flex-col">
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="font-medium">{product.name}</p>
        <p className="test-gray-800">{product.description}</p>
      </div>
    </div>
  );
};

const Home: NextPage<StaticProps> = ({ products }) => {
  return (
    <>
      <Head>
        <title>Sebbes butik</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>{products.map((product) => {
        return <ProductSmall key={product.id} product={product} />
      })}</div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Fetch data from DB.
  const prod = await getProductsAll();
  return {
    props: { products: prod },
    revalidate: 60,
  };
};

export default Home;
