type Props = {
  message?: string;
};

export const Error = ({ message }: Props) => {
  if (!message) return null;

  return (
    <span className="block bg-red-200 rounded-md text-center py-1 text-sm border-red-500 border mt-2 w-full">
      {message}
    </span>
  );
};

export const InputError = ({ children }: any) => (
  <span role="alert" className="text-sm text-red-500">
    {children}
  </span>
);

export default Error;
