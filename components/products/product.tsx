import { useUser } from "@lib/hooks";
import Image from "next/image";
import { useState } from "react";
import BuyButton from "./buyButton";
import { useUpdateProduct } from "@lib/hooks";

type Props = {
  product: {
    id: string;
    name: string;
    category: string;
    quantity: string;
    producer: string;
    description: string;
    price: string;
    image_url: string;
  };
};

const ProductC = ({ product }: Props) => {
  // TODO: Global flash for errors.
  const { user } = useUser();
  const { loading, error, updateProduct } = useUpdateProduct();

  const [name, setName] = useState(product.name);
  const [quantity, setQuantity] = useState(product.quantity.toString());
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price.toString());

  const canSubmit = name.length > 1 && quantity.length > 0 && price.length > 0;

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (!canSubmit) return;

    await updateProduct({
      id: product.id,
      name,
      quantity,
      description,
      price,
    });
  };

  return user && user?.isAdmin ? (
    // if admin is logged in
    <main className="flex px-12 py-4 lg:py-8">
      <div className="w-96 h-100 rounded-l-lg overflow-hidden relative">
        <Image
          src={product.image_url}
          alt={product.name}
          layout="fill"
          className="w-full h-full object-center object-cover"
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col gap-4 rounded p-6 w-96 md:shadow-lg bg-white">
          <form onSubmit={onSubmit}>
            <div className="relative w-full mb-3">
              <span>Produkt namn</span>
              <input
                type="text"
                className="input w-full rounded-lg px-4 py-2 border border-gray-500 focus:outline-none focus:border-green-500 active:outline-none autofocus"
                placeholder="Namn"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="relative w-full mb-3">
              <span>Antal</span>
              <input
                type="number"
                min="0"
                className="input w-full rounded-lg px-4 py-2 border border-gray-500 focus:outline-none focus:border-green-500 active:outline-none"
                placeholder="Antal"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="relative w-full mb-3">
              <span>Beskrivning</span>
              <input
                type="text"
                className="input w-full rounded-lg px-4 py-2 border border-gray-500 focus:outline-none focus:border-green-500 active:outline-none"
                placeholder="Beskrivning"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="relative w-full mb-3">
              <span>Pris</span>
              <input
                type="number"
                min="0"
                className="input w-full rounded-lg px-4 py-2 border border-gray-500 focus:outline-none focus:border-green-500 active:outline-none"
                placeholder="Pris"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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
              {loading ? "Updaterar produkt..." : "Spara produkt"}
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
  ) : (
    // if customer is logged in
    <div className="flex gap-4 bg-white rounded-lg">
      <div className="w-96 h-96 rounded-l-lg overflow-hidden relative">
        <Image
          src={product.image_url}
          alt={product.name}
          layout="fill"
          className="w-full h-full object-center object-cover"
        />
      </div>
      <div className="flex flex-col justify-between pr-8 py-4">
        <div className="flex flex-col">
          <p className="font-medium">{product.name}</p>
          <p className="text-sm text-gray-500">{product.category}</p>
          <p className="my-2">
            Producerat av{" "}
            <span className="font-medium">{product.producer}</span>
          </p>
          <p className="text-gray-800">{product.description}</p>
        </div>
        <div className="flex gap-6 justify-between">
          <p className="">
            Pris: <span className="font-medium">{product.price} kr/kg</span>
          </p>
          <BuyButton productId={product.id} user={user} />
        </div>
      </div>
    </div>
  );
};

export default ProductC;
