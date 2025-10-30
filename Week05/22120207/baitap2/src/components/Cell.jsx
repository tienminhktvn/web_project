const Cell = ({
  color,
  imgSrc,
  alt,
  hover,
  handleMouseDown,
  row,
  col,
  isValidTarget,
}) => {
  const bgColor = {
    backgroundColor: `${color}`,
  };

  const cellClass = `cell text-center p-2 w-20 h-20 ${
    isValidTarget ? "border-4 border-green-400" : "border border-transparent"
  }`;

  return (
    <div style={bgColor} className={cellClass} data-row={row} data-col={col}>
      {imgSrc && (
        <img
          src={imgSrc}
          alt={alt}
          data-piece={alt}
          className={`${
            hover ? "hover:cursor-pointer" : ""
          } inline-block w-full h-full object-contain`}
          draggable="false"
          onMouseDown={handleMouseDown}
        />
      )}
    </div>
  );
};

export default Cell;
