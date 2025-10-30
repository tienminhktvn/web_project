const Button = ({ text, className, highlight, onClick }) => {
  const highlightClass = "border-b-2 text-black font-bold";

  return (
    <button
      type="button"
      className={`${className} ${
        highlight === text ? highlightClass : ""
      } hover:cursor-pointer focus:outline-none transition-transform hover:scale-110 active:scale-90`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
