import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/outline";
import { classNames } from "@lib/util";

type Props = {
  text: string;
  amount: number;
  className?: string;
};

const StockStatus = ({ text, amount, className }: Props) => (
  <p className="flex flex-row gap-2 mt-2 content-center">
    {text}{" "}
    {amount > 0 ? (
      <CheckCircleIcon
        className={classNames("w-4 h-4 text-green-500", className || "")}
      />
    ) : (
      <XCircleIcon
        className={classNames("w-4 h-4 text-red-300", className || "")}
      />
    )}
  </p>
);

export default StockStatus;
