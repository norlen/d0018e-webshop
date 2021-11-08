import Link from "next/link";
import Image from "next/image";

const ProductSmall = ({ product }: { product: any }) => {
  return (
    <div className="flex gap-4 flex-col max-w-sm">
      <Link href={`/produkt/${product.id}`}>
        <a className="h-96 w-96 relative">
          <Image
            src={product.image_url}
            layout="fill"
            className="object-cover"
          />
        </a>
      </Link>
      <div className="flex flex-col">
        <p className="text-sm text-gray-200">{product.category}</p>
        <p className="font-medium">{product.name}</p>
        <p className="test-gray-800">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductSmall;
