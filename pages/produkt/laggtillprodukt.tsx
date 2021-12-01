import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { getProducersAll } from "@lib/db/producer";
import { getCategoriesAll } from "@lib/db/categories";
import React, { useState } from "react";
import { useAddProduct } from "@lib/hooks";
import SelectList from "@components/products/selectList";

const defaultImage: string = "/images/default-product.png";
const defaultDescription: string = "Beskrivning kommer snart...";

type ListItem = {
  name: string;
  id: string;
};

type StaticProps = {
  categories: ListItem[];
  producers: ListItem[];
};

const AddProductPage: NextPage<StaticProps> = ({
  categories,
  producers,
}: StaticProps) => {
  const [selectedProducer, setSelectedProducer] = useState(producers[0]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const { loading, error, addProduct } = useAddProduct();

  const [name, setName] = useState("");
  const [quantity, setQ] = useState("");
  const [price, setPrice] = useState("");
  const [[desc1, desc2], setDesc] = useState(["", defaultDescription]);
  const [[image1, image2], setImageURL] = useState(["", defaultImage]);

  const canSubmit = name.length > 0 && price.length > 0;

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (!canSubmit) return;

    // if description is empty just insert: "Beskrivning kommer"
    const description = desc1 === "" ? desc2 : desc1;
    // if image_url is empty just choose default image
    const image_url = image1 === "" ? image2 : image1;

    const category: string = selectedCategory.id;
    const producer: string = selectedProducer.id;
    await addProduct({
      name,
      category,
      quantity,
      price,
      description,
      producer,
      image_url,
    });
    setName("");
    setQ("");
    setPrice("");
    setDesc(["", defaultDescription]);
    setImageURL(["", defaultImage]);
    setSelectedCategory(categories[0]);
    setSelectedProducer(producers[0]);
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
              <h1 className="text-3xl font-bold">Lägg till produkt</h1>
            </div>
            <form onSubmit={onSubmit}>
              <div className="relative w-full mb-3">
                <input
                  type="text"
                  className="input w-full rounded-lg px-4 py-2 border border-gray-500 focus:outline-none focus:border-green-500 active:outline-none autofocus"
                  placeholder="Produkt namn"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="relative w-full mb-3">
                <input
                  type="number"
                  min="0"
                  className="input w-full rounded-lg px-4 py-2 border border-gray-500 focus:outline-none focus:border-green-500 active:outline-none autofocus"
                  placeholder="Antal"
                  value={quantity}
                  required
                  onChange={(e) => setQ(e.target.value)}
                />
              </div>

              <div className="relative w-full mb-3">
                <input
                  type="number"
                  min="0"
                  className="input w-full rounded-lg px-4 py-2 border border-gray-500 focus:outline-none focus:border-green-500 active:outline-none autofocus"
                  placeholder="Pris"
                  value={price}
                  required
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="relative w-full mb-3">
                <textarea
                  className="w-full rounded-lg border border-gray-500 focus:outline-none focus:border-green-500 active:outline-none autofocus"
                  placeholder="Beskrivning"
                  value={desc1}
                  rows={3}
                  cols={10}
                  onChange={(e) =>
                    setDesc([e.target.value, defaultDescription])
                  }
                />
              </div>

              <div className="relative w-full mb-3">
                <input
                  type="text"
                  className="input w-full rounded-lg px-4 py-2 border border-gray-500 focus:outline-none focus:border-green-500 active:outline-none autofocus"
                  placeholder="Bild url"
                  value={image1}
                  onChange={(e) => setImageURL([e.target.value, defaultImage])}
                />
              </div>
              <SelectList
                selectedItem={selectedCategory}
                setSelectedItem={setSelectedCategory}
                list={categories}
              />
              <SelectList
                selectedItem={selectedProducer}
                setSelectedItem={setSelectedProducer}
                list={producers}
              />

              <button
                className={`w-full text-center bg-green-500 hover:bg-green-700 rounded-lg text-white py-2 px-4 font-medium ${
                  loading || !canSubmit
                    ? "disable opacity-50 hover:bg-green-500"
                    : ""
                } ${!canSubmit && "cursor-not-allowed"}`}
                disabled={loading || !canSubmit}
              >
                {loading ? "Skapar produkt..." : "Skapa produkt"}
              </button>
              {error && (
                <span className="bg-red-200 rounded-md text-center py-1 text-sm border-red-500 border mt-2 w-full">
                  {error}
                </span>
              )}
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Fetch data from DB.
  const categories = await getCategoriesAll();
  const producers = await getProducersAll();
  return {
    props: { categories, producers },
    revalidate: 120,
  };
};

export default AddProductPage;
