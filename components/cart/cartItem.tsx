import Image from "next/image";
import Link from "next/link";
import { useCart } from "@lib/hooks";
import { useRemoveFromCart } from "@lib/hooks";
import { CartItem } from "@lib/db";
import toast from "react-hot-toast";
import StockStatus from "@components/products/stockStatus";
import { getStock } from "@lib/util";

type Props = {
  item: CartItem;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CartItem = ({ item, setOpen }: Props) => {
  const { mutateCart } = useCart();
  const { loading, error, removeFromCart } = useRemoveFromCart();
  const [amount, stock] = getStock(item.quantity);

  const removeItem = async (productId: string) => {
    const result = await removeFromCart({ productId });
    if (result.success) {
      await mutateCart();
    } else {
      toast.error(error || "Kunde inte ta bort, försök igen", {
        duration: 1000,
      });
    }
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
        <div className="flex justify-between">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3>
                <Link href={`/produkt/${item.id}`}>
                  <a onClick={() => setOpen(false)}>{item.name}</a>
                </Link>
              </h3>
            </div>
            <p className="text-gray-500">{item.amount} kg</p>
            <p className="text-gray-500">
              Totalt {item.amount * item.price} kr
            </p>
          </div>
          <div className="flex flex-col">
            <p className="">{item.price} kr/kg</p>
          </div>
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
          <div className="flex items-center">
            {item.isdeleted ? (
              <div className="text-red-500">Produkten har utgått</div>
            ) : (
              <>
                <div className="mt-2 mr-1 ">Lagersaldo:</div>
                <StockStatus amount={amount} text={stock} className="mt-0.5" />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
