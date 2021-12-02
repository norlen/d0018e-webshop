import { useCart, useUser } from "@lib/hooks";
import Image from "next/image";
import BuyButton from "./buyButton";
import EditPage from "./editProductPage";
import { getStock } from "@lib/util";
import StockStatus from "./stockStatus";

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
  const { user } = useUser();
  const { cartItems } = useCart();

  const diff = cartItems[product.id]?.quantity || 0;
  const finalQuantity = parseInt(product.quantity) - diff;
  const [amount, stock] = getStock(finalQuantity);

  // Special page for admins.
  if (user && user.isAdmin) {
    return <EditPage product={product} />;
  }

  return (
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

          <div className="flex gap-4">
            <StockStatus amount={amount} text={stock} className="mt-1" />
            <BuyButton productId={product.id} user={user} quantity={amount} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductC;
