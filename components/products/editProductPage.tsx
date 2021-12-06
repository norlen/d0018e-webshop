import { useDeleteProduct, useUpdateProduct, useUser } from "@lib/hooks";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Product } from "@lib/db";

type Props = {
  product: Product;
};

const EditPage = ({ product }: Props) => {
  const { loading, error, updateProduct } = useUpdateProduct();
  const delHook = useDeleteProduct();
  const router = useRouter();

  const [name, setName] = useState(product.name);
  const [quantity, setQuantity] = useState(product.quantity.toString());
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price.toString());

  const canSubmit = name.length > 1 && quantity.length > 0 && price.length > 0;

  const onClick = async (e: any) => {
    e.preventDefault();
    await delHook.deleteProduct({ id: product.id });
    router.push("/");
  };

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
  return (
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
              <textarea
                className="w-full rounded-lg border border-gray-500 focus:outline-none focus:border-green-500 active:outline-none autofocus"
                placeholder="Beskrivning"
                value={description}
                rows={3}
                cols={10}
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

            <div className="flex flex-col gap-4 rounded p-6 w-85 bg-white">
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
              {/* DELETE BUTTON */}
              <button
                onClick={(e) => onClick(e)}
                className={`w-full text-center bg-red-500 hover:bg-red-700 rounded-lg text-white py-2 px-4 font-medium ${
                  delHook.loading ? "disable opacity-50 hover:bg-red-500" : ""
                } ${!"cursor-not-allowed"}`}
                disabled={delHook.loading}
              >
                {delHook.loading ? "Raderar produkt..." : "Radera produkt"}
              </button>
            </div>
            {error && (
              <span className="bg-red-200 rounded-md text-center py-1 text-sm border-red-500 border mt-2 w-full">
                {error}
              </span>
            )}
            {delHook.error && (
              <span className="bg-red-200 rounded-md text-center py-1 text-sm border-red-500 border mt-2 w-full">
                {delHook.error}
              </span>
            )}
          </form>
        </div>
      </div>
    </main>
  );
};

export default EditPage;
