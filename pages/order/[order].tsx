import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "@lib/session";

import type { NextPage } from "next";
import { getOrderById, getOrderItems, Order, OrderItem } from "@lib/db";
import { getOrderStatusName } from "@lib/util";

type SSRProps = {
  order: Order;
};

const ProductPage: NextPage<SSRProps> = ({ order }) => {
  return (
    <>
      <Head>
        <title>Sebbes ekologiska</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col py-2 lg:py-8 lg:px-12 justify-center max-w-lg mx-auto mt-8 gap-4 px-4 bg-white rounded-lg border border-gray-300">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl">Leveransinformation</h1>
          <div className="flex flex-col">
            <h3 className="font-medium text-gray-700 text-sm">Namn</h3>
            <p>{order.name}</p>
          </div>
          <div className="flex flex-col">
            <h3 className="font-medium text-gray-700 text-sm">Email</h3>
            <p>{order.email}</p>
          </div>
          <div className="flex flex-col">
            <h3 className="font-medium text-gray-700 text-sm">Adress</h3>
            <p>{order.address}</p>
          </div>
          <div className="flex flex-col">
            <h3 className="font-medium text-gray-700 text-sm">Telefonnummer</h3>
            <p>{order.phonenumber}</p>
          </div>
          <div className="flex flex-col">
            <h3 className="font-medium text-gray-700 text-sm">Status</h3>
            <p>{getOrderStatusName(order.status)}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl">Produkter</h1>
          <div className="divide-y divide-gray-200">
            {order?.items?.map((item) => (
              <li key={item.name} className="py-6 flex">
                <CartItem item={item} />
              </li>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-6 pb-2 px-2">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Totalt</p>
              <p>
                {order.items
                  .map((i) => i.price * i.amount)
                  .reduce((acc, v) => acc + v, 0)}{" "}
                kr
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

type OrderItemProps = {
  item: OrderItem;
};

const CartItem = ({ item }: OrderItemProps) => {
  return (
    <>
      <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
        <Image
          width={96}
          height={96}
          src={item.imageurl}
          alt={item.name}
          className="w-full h-full object-center object-cover"
        />
      </div>

      <div className="ml-4 flex-1 flex flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <Link href={`/produkt/${item.name}`}>
                <a>{item.name}</a>
              </Link>
            </h3>
            <p className="">{item.price} kr/kg</p>
          </div>
          <p className="text-gray-500">Antal {item.amount}</p>
          <p className="text-gray-500">Totalt {item.amount * item.price} kr</p>
        </div>
      </div>
    </>
  );
};

const getServerSidePropsNext: GetServerSideProps = async ({ req, params }) => {
  if (
    !(
      req.session.user &&
      req.session.user.id &&
      params &&
      typeof params.order === "string"
    )
  ) {
    return { notFound: true };
  }

  const order = await getOrderById(params.order);
  if (
    !order ||
    (order.userid !== req.session.user.id && !req.session.user.isAdmin)
  ) {
    return { notFound: true };
  }
  const items = await getOrderItems(order.id);
  order.items = items;

  return {
    props: { order },
  };
};

export const getServerSideProps = withIronSessionSsr(
  getServerSidePropsNext,
  sessionOptions
);

export default ProductPage;
