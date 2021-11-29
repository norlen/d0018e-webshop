import useAddProduct from "@lib/hooks/useAddProduct";
import React, { useState } from "react";
import FileSelector from "./fileUpload";

const AddProductPage = () => {
  const { loading, error, addProduct } = useAddProduct();
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState<FileList | null>(null);
  const [createObjectURL, setCreateObjectURL] = useState("");
  const [category, setC] = useState("");
  const [quantity, setQ] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDesc] = useState("");
  const [producer, setProducer] = useState("");

  const canSubmit = name.length > 5;

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (!canSubmit) return;

    const result = await addProduct(
      name,
      category,
      quantity,
      price,
      description,
      producer,
      "/images/default-product.png"
    );
  };

  return (
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
                placeholder="Namn"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="relative w-full mb-3">
              <input
                type="text"
                className="input w-full rounded-lg px-4 py-2 border border-gray-500 focus:outline-none focus:border-green-500 active:outline-none autofocus"
                placeholder="Kategori"
                value={category}
                onChange={(e) => setC(e.target.value)}
              />
            </div>

            <div className="relative w-full mb-3">
              <input
                type="number"
                min="0"
                className="input w-full rounded-lg px-4 py-2 border border-gray-500 focus:outline-none focus:border-green-500 active:outline-none autofocus"
                placeholder="Antal"
                value={quantity}
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
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="relative w-full mb-3">
              <input
                type="text"
                className="input w-full rounded-lg px-4 py-2 border border-gray-500 focus:outline-none focus:border-green-500 active:outline-none autofocus"
                placeholder="Beskrivning"
                value={description}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>

            <div className="relative w-full mb-3">
              <input
                type="text"
                className="input w-full rounded-lg px-4 py-2 border border-gray-500 focus:outline-none focus:border-green-500 active:outline-none autofocus"
                placeholder="Producent"
                value={producer}
                onChange={(e) => setProducer(e.target.value)}
              />
            </div>

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
  );
};

export default AddProductPage;
