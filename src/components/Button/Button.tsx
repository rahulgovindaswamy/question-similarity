const Button = (props: any) => {
  const { label, onClick, disable, type, children } = props;
  return (
    <button
      type={type}
      disabled={disable}
      className={`border ${
        disable
          ? "bg-gray-500 text-white px-4 py-2 text-sm rounded-sm"
          : "bg-[#1081A6] text-white w-fit px-4 py-2 text-sm rounded-md cursor-pointer shadow-md hover:text-white"
      }`}
      onClick={onClick}
      onKeyDown={(event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === "Enter") {
          onClick && onClick();
        }
      }}
    >
      {label ? label : children}
    </button>
  );
};

export default Button;
