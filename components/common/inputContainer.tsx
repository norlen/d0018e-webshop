import { InputError } from ".";

type Props = {
  name: string;
  label: string;
  error?: { message?: string };
  children: JSX.Element;
};

export const InputContainer: React.FC<Props> = ({
  name,
  label,
  error,
  children,
}: Props) => (
  <div className="flex flex-col gap-2">
    <label
      className="block text-sm font-medium w-full text-gray-600"
      htmlFor={name}
    >
      {label}
    </label>
    {children}
    {error && <InputError>{error.message}</InputError>}
  </div>
);

export default InputContainer;
