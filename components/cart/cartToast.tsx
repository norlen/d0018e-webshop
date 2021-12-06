import Image from "next/image";

type Props = {
  id: any;
  visible: boolean;
  name: string;
  imagesrc: string;
};

const CartToast = ({ id, visible, name, imagesrc }: Props) => {
  return (
    <div
      className={`${
        visible ? "animate-enter" : "animate-leave"
      } max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <Image width={40} height={40} alt={name} src={imagesrc} />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">{name}</p>
            <p className="mt-1 text-sm text-gray-500">Tillagd i kundvagnen</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartToast;
