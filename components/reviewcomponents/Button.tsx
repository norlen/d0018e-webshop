type Props = {
  color: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
};

function Button({ color, onClick, text }: Props) {
  return (
    <div>
      <button
        className={`bg-${color}-500 w-60 text-center hover:bg-green-700 rounded-lg text-white py-2 px-3 font-medium`}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}

Button.defaultProps = {
  color: "green",
};
export default Button;
