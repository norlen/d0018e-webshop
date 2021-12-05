import { classNames } from "@lib/util";
import { LoadingIndicator } from ".";

type Props = {
  text: string;
  loadingText: string;
  loading: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = ({
  text,
  loadingText,
  loading,
  disabled,
  className,
  ...rest
}: Props) => (
  <button
    disabled={disabled}
    className={classNames(
      "w-full text-center bg-green-500 hover:bg-green-700 disabled:hover:bg-green-500 rounded-lg text-white py-2 px-4 font-medium",
      loading ? "opacity-50 cursor-wait" : "",
      disabled ? "opacity-50 cursor-not-allowed" : "",
      className || ""
    )}
    {...rest}
  >
    {loading ? (
      <div className="flex gap-2 justify-center">
        <LoadingIndicator />
        <span>{loadingText}</span>
      </div>
    ) : (
      <span>{text}</span>
    )}
  </button>
);

export default Button;
