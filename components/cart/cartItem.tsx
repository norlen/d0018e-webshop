import Image from "next/image";
import Link from "next/link";
import { useRemoveFromCart, CartRequest } from "@lib/hooks";
import { CartItem } from "@lib/db";
import { KeyedMutator } from "swr";

type Props = {
  item: CartItem;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mutateCart: KeyedMutator<CartRequest>;
};

const CartItem = ({ item, setOpen, mutateCart }: Props) => {
  const { loading, error, removeFromCart } = useRemoveFromCart();

  const removeItem = async (productId: string) => {
    await removeFromCart({ productId });
    await mutateCart();
  };

  return (
    <>
      <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
        <Image
          width={96}
          height={96}
          src={item.image_url}
          alt={item.name}
          className="w-full h-full object-center object-cover"
        />
      </div>

      <div className="ml-4 flex-1 flex flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <Link href={`/produkt/${item.id}`}>
                <a onClick={() => setOpen(false)}>{item.name}</a>
              </Link>
            </h3>
            <p className="">{item.price} kr/kg</p>
          </div>
          <p className="text-gray-500">Antal {item.quantity}</p>
          <p className="text-gray-500">
            Totalt {item.quantity * item.price} kr
          </p>
        </div>
        <div className="flex-1 flex items-end justify-between text-sm">
          <button
            type="button"
            className={`font-medium text-green-500 hover:text-green-700 ${
              loading ? "disabled opacity-50 hover:text-green-500" : ""
            }`}
            onClick={() => removeItem(item.id)}
          >
            {loading ? "Tar bort..." : "Ta bort"}
          </button>
        </div>
      </div>
    </>
  );
};

export default CartItem;
