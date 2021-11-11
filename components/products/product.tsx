import Image from "next/image";

type Props = {
  product: {
    id: string;
    name: string;
    category: string;
    producer: string;
    description: string;
    price: string;
    image_url: string;
  };
};

const ProductC = ({ product }: Props) => {
  console.log("product", product);

  return (
    <div className="flex gap-4">
      <div className="w-96 h-96 rounded-lg overflow-hidden relative">
        <Image
          src={product.image_url}
          alt={product.name}
          layout="fill"
          className="w-full h-full object-center object-cover"
        />
      </div>
      <div className="flex flex-col justify-between">
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
          <button className="py-2 px-4 rounded-md shadow-md bg-green-300 todohover:bg-green-500 disabled cursor-not-allowed opacity-50">
            Köp 1 kg
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductC;
