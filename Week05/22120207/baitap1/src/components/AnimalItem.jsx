const AnimalItem = ({ animal, color = [] }) => {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to bottom, ${color[0]}, ${color[1]})`,
  };

  return (
    <div
      style={gradientStyle}
      className={
        "rounded-sm text-center text-9xl p-5 shadow-[3px_3px_5px_rgba(0,0,0,0.3)]"
      }
    >
      {animal}
    </div>
  );
};

export default AnimalItem;
